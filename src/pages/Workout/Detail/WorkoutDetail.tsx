import React from "react";
import "./WorkoutDetail.scss"
import WorkoutDetailBaseLayer from "./WorkoutDetailBaseLayer";
import WorkoutDetailBottomSheet from "./WorkoutDetailBottomSheet";
import Button from "../../../components/Button";

const WorkoutDetail = () => {
    return (
        <div className={"WorkoutDetail"}>
            <WorkoutDetailBaseLayer/>
            <WorkoutDetailBottomSheet/>
            <div className={"footer-wrapper"}>
                <Button label={"Start WorkoutBox"}/>
            </div>
        </div>
    )
}

export default WorkoutDetail;
