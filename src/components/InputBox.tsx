import React, {useState} from 'react';
import './InputBox.scss';

// Props의 타입 정의
interface InputProps {
    placeholder?: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: ()=>void;
}

// Input 컴포넌트 정의
const InputBox: React.FC<InputProps> = ({placeholder,icon,value,onChange}) => {
    return (
        <div className="input-box">
            {icon && <span className="icon">{icon}</span>}
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputBox;
