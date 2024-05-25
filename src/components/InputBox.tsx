import React, {ChangeEvent} from 'react';
import './InputBox.scss';

// Props의 타입 정의
interface InputProps {
    type?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Input 컴포넌트 정의
const InputBox: React.FC<InputProps> = ({type, placeholder, icon, value, onChange}) => {
    return (
        <div className="input-box">
            {icon ? <span className="icon">{icon}</span> : <></>}
            <input
                type={type ?? "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputBox;
