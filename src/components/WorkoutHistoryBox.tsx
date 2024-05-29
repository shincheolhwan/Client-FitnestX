import React from "react";
import "./WorkoutHistoryBox.scss";
import SquatsImage from "../images/squatSmall.png";
import ProgressCircle from "./ProgressCircle";

interface WorkoutHistoryBoxProps {
    name: string;
    targetCount: number;
    doCount: number;
}

const WorkoutBox: React.FC<WorkoutHistoryBoxProps> = ({
                                                          name,
                                                          targetCount,
                                                          doCount
                                                      }) => {
    return (
        <div className={"WorkoutHistoryBox"}>
            <div className={"workout-history-box-image-wrapper"}>
                <img className={"workout-image"} src={SquatsImage} alt={"workout image"}/>
            </div>
            <div className={"workout-history-box-text-wrapper"}>
                <div className={"workout-name-text"}>
                    {name}
                </div>

                <div className={"workout-sub-text"}>
                    목표 개수: {targetCount}&nbsp;&nbsp;&nbsp;&nbsp;실제 개수: {doCount}
                </div>
            </div>
            <div className={"workout-history-box-progress-circle-wrapper"}>
                <ProgressCircle progress={doCount} target={targetCount} />
            </div>
        </div>
    )
}


export default WorkoutBox;
