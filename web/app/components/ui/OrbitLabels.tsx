"use client";

import { useState, useEffect, useRef, ReactNode, useCallback } from "react";

interface OrbitLabelsProps {
  items: ReactNode[];
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  duration?: number;
  itemWidth?: number;
  itemHeight?: number;
  className?: string;
}

const ORBIT_DURATION = 58;

export default function OrbitLabels({
  items = [],
  baseWidth = 540,
  radiusX = 45,
  radiusY = 50,
  duration = ORBIT_DURATION,
  itemWidth = 160,
  itemHeight = 80,
  className = "",
}: OrbitLabelsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Array<{ left: string; top: string; zIndex: number; scale: number; opacity: number }>>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  const totalItems = items.length;
  const angleStep = 360 / totalItems;

  const calculatePositions = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = (timestamp - startTimeRef.current) / 1000;
    const progress = (elapsed % duration) / duration;
    
    const newPositions = items.map((_, index) => {
      const baseAngle = index * angleStep;
      const currentAngle = baseAngle + (progress * 360);
      
      // Calculate 3D effect based on position in orbit
      const angleRad = (currentAngle * Math.PI) / 180;
      
      // z-index based on position (items in front have higher z-index)
      const zIndex = Math.round(Math.sin(angleRad) * 50 + 50);
      
      // scale based on z-position - increased min scale to 0.9 for better readability
      const scale = 0.9 + (Math.sin(angleRad) + 1) * 0.1;
      
      // no transparency - always fully visible for maximum clarity
      const opacity = 1;
      
      const left = `${50 + radiusX * Math.cos(angleRad)}%`;
      const top = `${50 + radiusY * Math.sin(angleRad)}%`;
      
      return { left, top, zIndex, scale, opacity };
    });
    
    setPositions(newPositions);
    animationRef.current = requestAnimationFrame(calculatePositions);
  }, [items.length, angleStep, duration, radiusX, radiusY]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(calculatePositions);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [calculatePositions]);

  // Reset animation when props change
  useEffect(() => {
    startTimeRef.current = null;
  }, [radiusX, radiusY, duration, items.length]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        width: baseWidth, 
        height: baseWidth,
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
      aria-hidden="true"
    >
      {/* 3D container with rotation */}
      <div 
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(15deg)',
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="absolute pointer-events-auto"
            style={{
              width: itemWidth,
              height: itemHeight,
              left: positions[index]?.left || '50%',
              top: positions[index]?.top || '50%',
              transform: `translate(-50%, -50%) scale(${positions[index]?.scale || 1})`,
              opacity: positions[index]?.opacity || 1,
              zIndex: positions[index]?.zIndex || 50,
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out, filter 0.4s ease-out',
              filter: `drop-shadow(0px ${positions[index]?.zIndex ? (positions[index].zIndex - 50) * 0.5 : 0}px 8px rgba(0,0,0,0.15))`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}