import React from 'react';
import './PercentBar.scss';

interface PercentBarProps {
    value: number;
}

const PercentBar: React.FC<PercentBarProps> = ({value}) => {
    return (
        <div className="PercentBar">
            <div className="percent-filled" style={{width: `${value}%`}}>
            </div>
        </div>
    );
};

export default PercentBar;
