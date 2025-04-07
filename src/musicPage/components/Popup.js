// 步骤1: 新建 Popup.js 组件
import React from 'react';
import '../css/popup.css';

const Popup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" >
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="popup-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;
