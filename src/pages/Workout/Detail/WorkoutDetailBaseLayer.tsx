import React from "react";
import "./WorkoutDetailBaseLayer.scss";
import squatImage from "../../../images/squat.png";
import backImage from "../../../images/back.png";

const WorkoutDetailBaseLayer: React.FC = () => {
    return (
        <div className={"WorkoutDetailBaseLayer"}>
            <div className={"header-wrapper"}>
                <div className={"header-button-wrapper"}>
                    <button className={"back-button"}>
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
