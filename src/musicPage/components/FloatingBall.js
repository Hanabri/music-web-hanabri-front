import React, { useState, useEffect, useRef } from 'react';
import Popup from './Popup'; // 新增导入
import '../css/floatingBall.css'; // 需要创建样式文件

const FloatingBall = ({ children, snapThreshold = 0.1  }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const ballRef = useRef(null);
    const startPos = useRef({ x: 0, y: 0 });
    const initialPos = useRef({ x: 0, y: 0 });
    // 新增弹窗状态
    const [isPopupOpen, setPopupOpen] = useState(false);
    // 修改初始化逻辑（强制触发吸附）
    useEffect(() => {
        if (!ballRef.current) return;

        // 强制右侧初始化
        const initialPos = {
            x: window.innerWidth - ballRef.current.offsetWidth,
            y: window.innerHeight * 0.8
        };
        // 强制应用吸附逻辑
        setPosition(snapToEdge(initialPos.x, initialPos.y, true));
    }, []);
    // 优化吸附逻辑
    const snapToEdge = (currentX, currentY, forceSnap = false) => {
        const ballWidth = ballRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const centerX = currentX + ballWidth/2;

        // 计算吸附阈值边界
        const leftBoundary = windowWidth * snapThreshold;
        const rightBoundary = windowWidth * (1 - snapThreshold);

        if (forceSnap) {
            // 仅当中心点越过阈值边界时才吸附
            if (centerX < leftBoundary) {
                return { x: 1, y: currentY }; // 吸附到左边缘
            } else if (centerX > rightBoundary) {
                return { x: windowWidth - ballWidth - 1, y: currentY }; // 吸附到右边缘
            }
            return { x: currentX, y: currentY }; // 保持原位
        }

        // 拖动时保持原有边界限制
        return {
            x: Math.max(0, Math.min(currentX, windowWidth - ballWidth)),
            y: Math.max(0, Math.min(currentY, window.innerHeight - ballRef.current.offsetHeight))
        };
    };

    // 鼠标事件处理
    const handleMouseDown = (e) => {
        setIsDragging(true);
        // 新增点击起始坐标记录
        startPos.current = {
            x: e.clientX,
            y: e.clientY,
            elementX: e.target.getBoundingClientRect().x,
            elementY: e.target.getBoundingClientRect().y
        };
        // 保持原有元素位置记录
        initialPos.current = {
            x: ballRef.current.offsetLeft,
            y: ballRef.current.offsetTop
        };
    };


    const handleMouseMove = (e) => {
        if (isDragging) {
            const dx = e.clientX - startPos.current.x;
            const dy = e.clientY - startPos.current.y;

            // 计算原始位置后立即进行吸附判断
            const rawPos = {
                x: initialPos.current.x + dx,
                y: initialPos.current.y + dy
            };

            // 实时应用吸附逻辑
            setPosition(snapToEdge(rawPos.x, rawPos.y));
        }
    };

    const handleMouseUp = (e) => {
        if (!isDragging) return;

        setIsDragging(false);

        // 计算鼠标移动距离
        const deltaX = Math.abs(e.clientX - startPos.current.x);
        const deltaY = Math.abs(e.clientY - startPos.current.y);

        // 当移动距离小于5px且元素位置未变化时视为点击
        if (deltaX < 5 && deltaY < 5 &&
            ballRef.current.offsetLeft === initialPos.current.x &&
            ballRef.current.offsetTop === initialPos.current.y) {
            setPopupOpen(true);
        }

        // 保持原有吸附逻辑
        const currentX = ballRef.current.offsetLeft;
        const currentY = ballRef.current.offsetTop;
        setPosition(snapToEdge(currentX, currentY, true));
    };
    // 新增移动距离计算
    const calculateMoveDistance = () => {
        return Math.sqrt(
            Math.pow(position.x - initialPos.current.x, 2) +
            Math.pow(position.y - initialPos.current.y, 2)
        );
    };

    // 事件监听
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
                cursor: isDragging ? 'grabbing' : 'grab'
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
