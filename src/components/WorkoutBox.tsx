import React from "react";
import "./WorkoutBox.scss";
import SquatsImage from "../images/squatSmall.png";
import IconNext from "../images/iconNext.png";
import IconCheck from "../images/iconCheck.png";

interface WorkoutProps {
    name?: string;
    targetCount?: number;
    onClick?: () => void;
    done?: boolean;
}

const WorkoutBox: React.FC<WorkoutProps> = ({
                                             name,
                                             targetCount,
                                             onClick = function () {
                                             },
                                             done = false
                                         }) => {
    return (
        <div className={"WorkoutBox"} onClick={onClick}>
            <div className={"workout-box-image-wrapper"}>
                <img className={"workout-image"} src={SquatsImage} alt={"workout image"}/>
            </div>
            <div className={"workout-box-text-wrapper"}>
                <div className={"workout-name-text"}>
                    {name}
                </div>
                <div className={"workout-target-text"}>
                    {targetCount}x
                </div>
            </div>
            <div className={"workout-box-icon-image-wrapper"}>
                <img className={"icon-image"} src={done ? IconCheck : IconNext} alt={"icon"}/>
            </div>
        </div>
    )
}


export default WorkoutBox;
