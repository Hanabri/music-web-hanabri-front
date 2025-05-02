import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Popup from '../popup/Popup';
import './floatingBall.module.css';

interface FloatingBallProps {
    children: ReactNode;
    snapThreshold?: number;
}

interface Position {
    x: number;
    y: number;
}

const FloatingBall: React.FC<FloatingBallProps> = ({
                                                       children,
                                                       snapThreshold = 0.1
                                                   }) => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const ballRef = useRef<HTMLDivElement>(null);
    const startPos = useRef<Position>({ x: 0, y: 0 });
    const initialPos = useRef<Position>({ x: 0, y: 0 });
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!ballRef.current) return;

        const initialPos = {
            x: window.innerWidth - ballRef.current.offsetWidth,
            y: window.innerHeight * 0.8
        };
        setPosition(snapToEdge(initialPos.x, initialPos.y, true));
    }, []);

    const snapToEdge = (currentX: number, currentY: number, forceSnap = false): Position => {
        if (!ballRef.current) return { x: 0, y: 0 };

        const ballWidth = ballRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const centerX = currentX + ballWidth/2;

        const leftBoundary = windowWidth * snapThreshold;
        const rightBoundary = windowWidth * (1 - snapThreshold);

        if (forceSnap) {
            if (centerX < leftBoundary) {
                return { x: 1, y: currentY };
            } else if (centerX > rightBoundary) {
                return { x: windowWidth - ballWidth - 1, y: currentY };
            }
            return { x: currentX, y: currentY };
        }

        return {
            x: Math.max(0, Math.min(currentX, windowWidth - ballWidth)),
            y: Math.max(0, Math.min(currentY, window.innerHeight - (ballRef.current?.offsetHeight || 0)))
        };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        startPos.current = {
            x: e.clientX,
            y: e.clientY,
        };
        initialPos.current = {
            x: ballRef.current?.offsetLeft || 0,
            y: ballRef.current?.offsetTop || 0
        };
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && ballRef.current) {
            const dx = e.clientX - startPos.current.x;
            const dy = e.clientY - startPos.current.y;

            const rawPos = {
                x: initialPos.current.x + dx,
                y: initialPos.current.y + dy
            };

            setPosition(snapToEdge(rawPos.x, rawPos.y));
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (!isDragging || !ballRef.current) return;

        setIsDragging(false);

        const deltaX = Math.abs(e.clientX - startPos.current.x);
        const deltaY = Math.abs(e.clientY - startPos.current.y);

        if (deltaX < 5 && deltaY < 5 &&
          ballRef.current.offsetLeft === initialPos.current.x &&
          ballRef.current.offsetTop === initialPos.current.y) {
            setPopupOpen(true);
        }

        const currentX = ballRef.current.offsetLeft;
        const currentY = ballRef.current.offsetTop;
        setPosition(snapToEdge(currentX, currentY, true));
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
      <>
          <div
            ref={ballRef}
            className={`floating-ball ${isDragging ? 'dragging' : ''}`}
            style={{
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'pointer'
            }}
            onMouseDown={handleMouseDown}
          >
              {children}
          </div>
          <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
              <h2>LOG IN</h2>
              <div className="music-controls">
                  {/* 在此添加自定义内容 */}
              </div>
          </Popup>
      </>
    );
};

export default FloatingBall;
