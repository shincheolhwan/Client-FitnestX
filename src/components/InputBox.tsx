import React, {useState} from 'react';
import './InputBox.scss';

// Props의 타입 정의
interface InputProps {
    placeholder?: string;
    icon?: React.ReactNode;
}

// Input 컴포넌트 정의
const Input: React.FC<InputProps> = ({placeholder,icon}) => {
    // input 상자의 값을 state로 관리
    const [value, setValue] = useState<string>('');

    // input 값이 변경될 때마다 실행되는 핸들러
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className="input-box">
            {icon && <span className="icon">{icon}</span>}
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default Input;
