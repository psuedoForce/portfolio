import React, { useEffect, useRef, useState, useMemo } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';
import { motion } from 'framer-motion';

interface PretextProps {
    text: string;
    font: string;
    lineHeight: number;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

export const AndroidPretextBlock: React.FC<PretextProps> = ({
    text,
    font,
    lineHeight,
    align = 'center',
    className = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // Measure container efficiently for reflows
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

    // Compute Lines once based on fixed width
    const lines = useMemo(() => {
        if (!prepared || containerWidth === 0) return [];
        try {
            const { lines } = layoutWithLines(prepared, containerWidth, lineHeight);
            return lines;
        } catch (e) {
            return [];
        }
    }, [prepared, containerWidth, lineHeight]);

    // Framer motion variants for the lively kinematic word reveal
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger by line like a wave instead of word
                delayChildren: 0.2,
            },
        },
    };

    const lineVariants: any = {
        hidden: { opacity: 0, y: 15, filter: 'blur(3px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { type: 'spring', damping: 14, stiffness: 100 }
        }
    };

    const wordWaveVariants: any = {
        wave: (idx: number) => ({
            y: [0, -4, 0],
            color: ['var(--text-secondary)', 'var(--primary)', 'var(--text-secondary)'],
            filter: [
                'drop-shadow(0px 0px 0px rgba(61, 220, 132, 0))',
                'drop-shadow(0px 8px 16px rgba(61, 220, 132, 0.15))',
                'drop-shadow(0px 0px 0px rgba(61, 220, 132, 0))'
            ],
            transition: {
                repeat: Infinity,
                duration: 3,
                delay: idx * 0.1,
                ease: "easeInOut"
            }
        })
    };



    return (
        <div
            ref={containerRef}
            className={`pretext-container ${className}`}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: lines.length * lineHeight || lineHeight,
                font: font,
                perspective: '1000px', // 3D perspective for child rotation
            }}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ width: '100%', height: '100%', position: 'relative' }}
            >
                {lines.map((line, i) => {
                    // Split line into words for independent physics/hover interaction
                    const words = line.text.split(/(\s+)/); // Preserve spaces so flex handles layout perfectly

                    // Filter trailing spaces so flex justification visually centers correctly
                    if (words.length > 0 && words[words.length - 1].trim() === '') {
                        words.pop();
                    }

                    return (
                        <motion.div
                            key={`${i}`}
                            variants={lineVariants}
                            style={{
                                position: 'absolute',
                                top: i * lineHeight,
                                left: 0,
                                width: '100%',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
                                whiteSpace: 'pre',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            {words.map((word, j) => {
                                // Return spaces as plain text block so they don't break layout
                                if (word.trim() === '') {
                                    return <span key={j}>{word}</span>;
                                }

                                return (
                                    <motion.span
                                        key={j}
                                        style={{
                                            display: 'inline-block',
                                            transformOrigin: 'bottom center',
                                        }}
                                    >
                                        <motion.span
                                            custom={i * 20 + j}
                                            variants={wordWaveVariants}
                                            animate="wave"
                                            whileHover={{
                                                scale: 1.15,
                                                y: -4,
                                                color: 'var(--primary)',
                                                filter: 'drop-shadow(0px 4px 12px rgba(61, 220, 132, 0.4))',
                                                transition: { type: 'spring', stiffness: 300, damping: 10 },
                                            }}
                                            style={{
                                                display: 'inline-block',
                                                cursor: 'default',
                                                willChange: 'transform, color, filter',
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    </motion.span>
                                );
                            })}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};
