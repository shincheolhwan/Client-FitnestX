import React, {useEffect, useState} from "react";
import "./Workout.scss";
import LineChart from "../../components/LineChart";
import Button from "../../components/Button";
import backImage from "../../images/back.png";
import WorkoutBox from "../../components/WorkoutBox";
import {useCookies} from "react-cookie";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import moment from "moment";

interface ExerciseSet {
    userExerciseId: number;
    name: string;
    targetCount: number;
}

const Workout = () => {
    const navigate = useNavigate();
    const [cookie] = useCookies(['id']);
    const [exerciseSet, setExerciseSet] = useState<ExerciseSet[]>([]);
    const [exercisePercents, setExercisePercents] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const [todayExerciseHistory, setTodayExerciseHistory] = useState<Set<string>>(new Set());


    useEffect(() => {
        axios.get(`/users/${cookie.id}/exercise-set`)
            .then(res => {
                setExerciseSet(res.data.map((el: {
                    user_exercise_id: number;
                    exercise_name: string;
                    target_count: number;
                }) => {
                    return {
                        userExerciseId: el.user_exercise_id,
                        name: el.exercise_name,
                        targetCount: el.target_count
                    }
                }));
            })

        axios.get(`/users/exercise-record/${cookie.id}/week`)
            .then(res => {
                // percents
                let percents = [0, 0, 0, 0, 0, 0, 0];
                for (let record of res.data) {
                    const day = moment(record.work_date).day();
                    percents[day] = record.do_count / record.target_count * 100;
                }
                setExercisePercents(percents);

                // today exercise history
                const now = moment();
                let histories = res.data.filter((el: { work_date: string }) => {
                    return now.day() === moment(el.work_date).day();
                }).map((el: { exercise_name: string }) => el.exercise_name);
                setTodayExerciseHistory(new Set(histories));
            })
    }, [])

    const goToWorkoutHistory = () => {
        navigate("/workout/history");
    }

    return (
        <div className={"Workout"}>
            <div className={"top-sheet-wrapper"}>
                <div className={"header-wrapper"}>
                    <div className={"header-button-wrapper"}>
                        <button className={"back-button"} onClick={() => navigate(-1)}>
                            <img src={backImage} alt={"<"}/>
                        </button>
                    </div>
                    <div className={"header-text"}>
                        Workout Tracker
                    </div>
                </div>
                <div className={"chart-wrapper"}>
                    <LineChart day={(moment().day() + 1) % 7} pastData={exercisePercents}/>
                </div>
            </div>
            <div className={"bottom-sheet-wrapper"}>
                <div className={"content-wrapper"}>
                    <div className={"content-header-wrapper"}>
                        <div className={"content-header-text"}>
                            Today Workout Course
                        </div>
                    </div>
                    <div className={"content-main-wrapper"}>
                        <div className={"workout-list-wrapper"}>
                            <div className={"workout-list-header"}>
                                Exercises
                            </div>
                            <div className={"workout-list-content"}>
                                {
                                    exerciseSet?.map(el => {
                                        function routeToExercise() {
                                            if (todayExerciseHistory.has(el.name)) {
                                                alert("already Done!");
                                            } else {
                                                navigate(`/workout/${el.name}/detail`);
                                            }
                                        }

                                        return (
                                            <div className={"workout-box-wrapper"}
                                                 key={`exercise-${el.userExerciseId}`}>
                                                <WorkoutBox
                                                    name={el.name}
                                                    targetCount={el.targetCount}
                                                    onClick={routeToExercise}
                                                    done={todayExerciseHistory.has(el.name)}
                                                />
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"footer-wrapper"}>
                <Button label={"Check Your History"} onClick={goToWorkoutHistory}/>
            </div>
        </div>
    )
}

export default Workout;
