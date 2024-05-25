import React from 'react';
import './OnBoarding_1.scss';
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button";

const OnBoarding_1: React.FC = () => {
    const navigate = useNavigate();

    const getStarted = (): void => {
        navigate('/login');
    };

    return (
        <div className={"OnBoarding_1"}>
            <div className={"content-wrapper"}>
                <div className={"title-wrapper"}>
                    <div className={"title-text"}>
                        <div>Fitnest</div>
                        <div className={"X"}>X</div>
                    </div>
                    <div className={"sub-title-text"}>
                        Everybody Can Train
                    </div>
                </div>
            </div>
            <div className={"footer-wrapper"}>
                <Button label={"Get Started"} onClick={getStarted}/>
            </div>
        </div>
    );
}

export default OnBoarding_1;
