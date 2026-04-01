import React, { useEffect, useRef, useMemo, useState } from 'react';
import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext';

interface WildPretextBlockProps {
    text: string;
    font: string;
    lineHeight: number;
    className?: string;
    align?: 'left' | 'center' | 'right' | 'justify';
}

export const WildPretextBlock: React.FC<WildPretextBlockProps> = ({
    text,
    font,
    lineHeight,
    className = '',
    align = 'center',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // To keep React from thrashing, we'll draw to a ref layer or use a tight state loop.
    // Using pure DOM refs for absolute maximum performance during mousemove!
    const linesContainerRef = useRef<HTMLDivElement>(null);

    // Mouse position ref
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const targetMouseRef = useRef({ x: -1000, y: -1000 });

    // Measure container
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            setContainerWidth(entries[0].contentRect.width);
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const prepared = useMemo(() => {
        if (!text || !font) return null;
        return prepareWithSegments(text, font, { whiteSpace: 'pre-wrap' });
    }, [text, font]);

    // The physics/layout loop
    useEffect(() => {
        if (!prepared || containerWidth === 0 || !linesContainerRef.current) return;

        let animationFrameId: number;
        const container = linesContainerRef.current;

        // We create pooled DOM elements to avoid recreating them on every frame
        const lineElements: HTMLDivElement[] = [];
        const getElement = (index: number) => {
            while (lineElements.length <= index) {
                const el = document.createElement('div');
                el.style.position = 'absolute';
                el.style.whiteSpace = 'pre';
                el.style.willChange = 'transform';
                // Give it a nice glowy transition color when near mouse
                el.style.transition = 'color 0.2s';
                container.appendChild(el);
                lineElements.push(el);
            }
            return lineElements[index];
        };

        const renderLoop = () => {
            // Smoothly interpolate mouse position for jelly physics
            mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.15;
            mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.15;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const R = 90; // The radius of the "force field" bubble around the mouse

            let cursor = { segmentIndex: 0, graphemeIndex: 0 };
            let y = 0;
            let elIndex = 0;

            // We loop until paragraph is exhausted
            while (true) {
                // Is this Y row intersecting the circle?
                // y is the top of the line, y + lineHeight is the bottom. We check the center of the line.
                const lineCenterY = y + lineHeight / 2;
                const dy = lineCenterY - my;

                if (Math.abs(dy) < R) {
                    // It intersects! Calculate the horizontal boundaries of the circle at this Y
                    const dxIntersect = Math.sqrt(R * R - dy * dy);
                    const xLeftBoundary = mx - dxIntersect;
                    const xRightBoundary = mx + dxIntersect;

                    const maxLeftWidth = Math.max(0, xLeftBoundary);

                    if (maxLeftWidth > 20) {
                        // Layout a chunk for the left side of the orb
                        const leftLine = layoutNextLine(prepared, cursor, maxLeftWidth);
                        if (leftLine && leftLine.text.trim()) {
                            const el = getElement(elIndex++);
                            el.textContent = leftLine.text;

                            // Apply alignment logically for the left chunk
                            let xPos = 0;
                            if (align === 'center') xPos = maxLeftWidth - leftLine.width; // align right against bubble
                            if (align === 'right') xPos = maxLeftWidth - leftLine.width;

                            el.style.transform = `translate3d(${xPos}px, ${y}px, 0)`;
                            // Subtle coloration when near the bubble
                            el.style.color = '#16b39a';
                            cursor = leftLine.end;
                        } else if (leftLine) {
                            cursor = leftLine.end;
                        }
                    }

                    // Layout the remaining text for the right side of the orb
                    const rightRemainingWidth = containerWidth - xRightBoundary;
                    if (rightRemainingWidth > 20 && cursor) {
                        const rightLine = layoutNextLine(prepared, cursor, rightRemainingWidth);
                        if (rightLine) {
                            const el = getElement(elIndex++);
                            el.textContent = rightLine.text;

                            let xPos = xRightBoundary; // anchor to right boundary
                            if (align === 'center') xPos = xRightBoundary; // default start

                            el.style.transform = `translate3d(${xPos}px, ${y}px, 0)`;
                            el.style.color = '#573ded';
                            cursor = rightLine.end;
                        } else {
                            break;
                        }
                    }
                } else {
                    // No intersection. Layout a normal full line.
                    const line = layoutNextLine(prepared, cursor, containerWidth);
                    if (line === null) break;

                    const el = getElement(elIndex++);
                    el.textContent = line.text;

                    let xPos = 0;
                    if (align === 'center') xPos = (containerWidth - line.width) / 2;
                    if (align === 'right') xPos = containerWidth - line.width;

                    el.style.transform = `translate3d(${xPos}px, ${y}px, 0)`;
                    el.style.color = 'var(--text-primary)';

                    cursor = line.end;
                }

                y += lineHeight;

                // Safety break
                if (y > 2000) break;
            }

            // Hide any unused elements
            for (let i = elIndex; i < lineElements.length; i++) {
                lineElements[i].style.transform = `translate3d(-9999px, -9999px, 0)`;
            }

            // Ensure container has enough height
            container.style.height = `${y}px`;

            animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            targetMouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            // Move target super far away so the text springs back to normal
            targetMouseRef.current = { x: -1000, y: -1000 };
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            // Cleanup DOM exactly matching react standards
            lineElements.forEach(el => el.remove());
        };
    }, [prepared, containerWidth, lineHeight, align]);

    return (
        <div
            ref={containerRef}
            className={`pretext-container ${className}`}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: lineHeight,
                font: font,
            }}
        >
            {/* We inject absolute positioned divs via DOM ref above to hit 144hz perf! */}
            <div
                ref={linesContainerRef}
                style={{ width: '100%', position: 'relative' }}
            />
        </div>
    );
};
