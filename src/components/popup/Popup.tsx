import React, { ReactNode } from 'react';
import styles from './popup.module.css';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.popuOverlay} onClick={onClose}>
            <div
                className={styles.popupContent}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <button className={styles.popupClose} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;
