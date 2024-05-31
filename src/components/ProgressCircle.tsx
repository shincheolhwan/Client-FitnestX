import React, {useEffect, useState} from 'react';
import './ProgressCircle.scss';

interface ProgressCircleProps {
    progress: number;
    target: number;
    showTarget?: boolean;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({progress, target, showTarget = false}) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (animatedProgress / target) * circumference;

    useEffect(() => {
        setAnimatedProgress(progress);
    }, [progress]);

    return (
        <svg className="progressCircle" width="60" height="60" viewBox="0 0 60 60">
            <circle className="circle-bg" cx="30" cy="30" r={radius}/>
            <circle
                className={`circle-progress ${progress === target ? "done" : "progress"}`}
                cx="30"
                cy="30"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
            />
            {
                showTarget ?
                    <>
                        <text x="26" y="28" className="circle-text progress">{progress}</text>
                        <text x="35" y="38" className="circle-text target">{target}</text>
                    </>
                    :
                    <>
                        <text x="30" y="33" className="circle-text normal">{progress}</text>
                    </>
            }
        </svg>
    );
};

export default ProgressCircle;
