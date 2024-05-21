import React, {useState} from 'react';
import './InputBox.scss';

// Props의 타입 정의
interface InputProps {
    placeholder?: string;
    icon?: React.ReactNode;
    value?: string;
}

// Input 컴포넌트 정의
const InputBox: React.FC<InputProps> = ({placeholder,icon,value}) => {
    return (
        <div className="input-box">
            {icon && <span className="icon">{icon}</span>}
            <input
                type="text"
                placeholder={placeholder}
                value={value}
            />
        </div>
    );
};

export default InputBox;
