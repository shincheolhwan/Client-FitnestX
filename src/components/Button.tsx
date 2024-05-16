import React from 'react';
import './Button.scss';

interface ButtonProps {
    label?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    type?: 'primary' | 'secondary' | 'icon-only';
}

const Button: React.FC<ButtonProps> = ({ label, icon, onClick, type = 'primary' }) => {
    return (
        <button className={`btn ${type}`} onClick={onClick}>
            {icon && <span className="icon">{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    );
};

export default Button;
