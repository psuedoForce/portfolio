import React, { useEffect, useRef, useState, useMemo } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';
import { motion } from 'framer-motion';

interface PretextBlockProps {
  text: string;
  font: string;
  lineHeight: number;
  className?: string;
  delay?: number;
  stagger?: number;
  align?: 'left' | 'center' | 'right';
}

export const PretextBlock: React.FC<PretextBlockProps> = ({
  text,
  font,
  lineHeight,
  className = '',
  delay = 0,
  stagger = 0.05,
  align = 'left',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ text: string; width: number }[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure container width on resize without causing DOM thrashing
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Prepare text segments (cached by useMemo so we don't re-prepare unless text or font changes)
  const prepared = useMemo(() => {
    if (!text || !font) return null;
    return prepareWithSegments(text, font, { whiteSpace: 'pre-wrap' });
  }, [text, font]);

  // Layout lines whenever width or prepared text changes
  useEffect(() => {
    if (!prepared || containerWidth === 0) return;
    try {
      const { lines } = layoutWithLines(prepared, containerWidth, lineHeight);
      setLines(lines);
    } catch (e) {
      console.error("Error formatting pretext layout:", e);
    }
  }, [prepared, containerWidth, lineHeight]);

  return (
    <div
      ref={containerRef}
      className={`pretext-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: lines.length * lineHeight || lineHeight,
        font: font,
      }}
    >
      {lines.map((line, i) => {
        let xPos = 0;
        if (align === 'center') xPos = (containerWidth - line.width) / 2;
        if (align === 'right') xPos = containerWidth - line.width;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: 90, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            whileHover={{ scale: 1.03, color: '#16b39a', x: 5, transition: { duration: 0.2 } }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 12,
              mass: 0.8,
              delay: delay + i * stagger,
            }}
            style={{
              position: 'absolute',
              top: i * lineHeight,
              left: Math.max(0, xPos),
              whiteSpace: 'pre',
              willChange: 'transform, opacity, color',
              transformOrigin: 'bottom center',
            }}
          >
            {line.text}
          </motion.div>
        );
      })}
    </div>
  );
};
