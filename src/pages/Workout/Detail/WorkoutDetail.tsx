import React from "react";
import "./WorkoutDetail.scss"
import WorkoutDetailBaseLayer from "./WorkoutDetailBaseLayer";
import WorkoutDetailBottomSheet from "./WorkoutDetailBottomSheet";
import Button from "../../../components/Button";
import {useNavigate, useParams} from "react-router-dom";

const WorkoutDetail = () => {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <div className={"WorkoutDetail"}>
            <WorkoutDetailBaseLayer/>
            <WorkoutDetailBottomSheet/>
            <div className={"footer-wrapper"}>
                <Button label={"Start Workout"} onClick={() => {navigate(`/workout/${params.name}/doing`)}}/>
            </div>
        </div>
    )
}

export default WorkoutDetail;
