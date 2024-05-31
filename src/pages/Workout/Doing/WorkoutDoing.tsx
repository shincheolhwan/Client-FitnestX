import React, {useEffect, useState} from "react";
import "./WorkoutDoing.scss";
import MotionDetector from "../../../components/MotionDetector";
import backImage from "../../../images/back.png";
import {useNavigate, useParams} from "react-router-dom";
import ProgressCircle from "../../../components/ProgressCircle";
import axios from "axios";
import {useCookies} from "react-cookie";
import Button from "../../../components/Button";
import moment from "moment";
import PercentBar from "../../../components/PercentBar";

interface Exercise {
    id: number;
    name: string;
    targetCount: number;
}

const camSize = Math.min(window.innerWidth - 60, 300);

const WorkoutDoing = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [cookie] = useCookies(['id']);
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [count, setCount] = useState(0);


    useEffect(() => {
        axios.get(`/users/${cookie.id}/exercise-set`)
            .then((res) => {
                const exercise = res.data.find((el: { exercise_name: string; }) => {
                    return el.exercise_name === params.name
                })
                setExercise({
                    id: exercise.user_exercise_id,
                    name: exercise.exercise_name,
                    targetCount: exercise.target_count,
                });
            })
    }, [])


    const finish = () => {
        axios.post(`/users/exercise-record`, {
            user_id: cookie.id,
            exercise_name: params.name,
            target_count: exercise?.targetCount,
            do_count: count,
            work_date: moment().format("YYYYMMDD")
        }).then(res => {
            if (res.data === "success") {
                alert("Complete Workout!");
                navigate("/workout");
            }
        })
    }

    return (
        <div className={"WorkoutDoing"}>
            <div className={"header-wrapper"}>
                <div className={"header-button-wrapper"}>
                    <button className={"back-button"} onClick={() => navigate(-1)}>
                        <img src={backImage} alt={"<"}/>
                    </button>
                </div>
                <div className={"header-text"}>
                    {params.name}
                </div>
            </div>
            <div className={"content-wrapper"}>
                <div className={"motion-detector-wrapper"}>
                    {exercise ? <MotionDetector
                        size={camSize}
                        count={count}
                        setCount={setCount}
                        targetCount={exercise.targetCount}
                    /> : <></>}

                </div>
                <div className={"EMG-wrapper"}>
                    <div className={"EMG-title"}>
                        EMG value
                    </div>
                    <div className={"EMG-bar-wrapper"}>
                        <PercentBar  value={10}/>
                    </div>
                </div>
                <div className={"progress-wrapper"}>
                    <div className={"progress-title"}>
                        count
                    </div>
                    <div className={"progress-circle-wrapper"}>
                        {
                            exercise ?
                                <ProgressCircle progress={count} target={exercise.targetCount} showTarget={true}/>
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
            <div className={"footer-wrapper"}>
                {exercise ? <Button label={"Finish"} onClick={finish}/> : <></>}
            </div>

        </div>
    )
}

export default WorkoutDoing;
