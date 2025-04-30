import React, { ReactNode } from 'react';
import './popup.css';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div
                className="popup-content"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <button className="popup-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;
