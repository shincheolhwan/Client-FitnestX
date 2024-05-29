import React from "react";
import "./WorkoutDetailBaseLayer.scss";
import squatImage from "../../../images/squat.png";
import backImage from "../../../images/back.png";
import {useNavigate} from "react-router-dom";

const WorkoutDetailBaseLayer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={"WorkoutDetailBaseLayer"}>
            <div className={"header-wrapper"}>
                <div className={"header-button-wrapper"}>
                    <button className={"back-button"} onClick={() => navigate(-1)}>
                        <img src={backImage} alt={"<"}/>
                    </button>
                </div>
            </div>
            <div className={"content-wrapper"}>
                <div className={"image-wrapper"}>
                    <img src={squatImage} alt={"squat"}/>
                </div>
            </div>
        </div>
    )
}

export default WorkoutDetailBaseLayer;
