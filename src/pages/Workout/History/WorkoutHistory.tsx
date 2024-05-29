import React, {useEffect, useState} from "react";
import "./WorkoutHistory.scss"
import backImage from "../../../images/back.png";
import {useNavigate} from "react-router-dom";
import WorkoutHistoryBox from "../../../components/WorkoutHistoryBox";
import axios from "axios";
import {useCookies} from "react-cookie";
import moment from "moment";

interface ExerciseHistory {
    id: number,
    doCount: number,
    targetCount: number,
    name: string,
    date: string
}

const WorkoutHistory: React.FC = () => {
    const [cookie] = useCookies(['id']);
    const navigate = useNavigate();
    const [exerciseHistoryDates, setExerciseHistoryDates] = useState<String[]>([]);
    const [exerciseHistories, setExerciseHistories] = useState<{ [key: string]: ExerciseHistory[] }>({});

    useEffect(() => {
        axios.get(`/users/exercise-record/${cookie.id}`)
            .then((res) => {
                let lastDate = "";
                let dates = [];
                let histories: { [key: string]: ExerciseHistory[] } = {};

                for (const history of res.data) {
                    const date = moment(history.work_date).format("YYYY-MM-DD");
                    if (lastDate === "" || lastDate !== history.work_date) {
                        lastDate = history.work_date;
                        dates.push(date);
                        histories[date] = [];
                    }

                    histories[date].push({
                        id: history.id,
                        doCount: history.do_count,
                        targetCount: history.target_count,
                        name: history.exercise_name,
                        date: moment(history.work_date).format("YYYY-MM-DD")
                    });

                }

                setExerciseHistoryDates(dates);
                setExerciseHistories(histories);
            })

    }, [])

    return (
        <div className={"WorkoutHistory"}>
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
            <div className={"content-wrapper"}>
                {
                    exerciseHistoryDates.map(date => {
                        const histories = exerciseHistories[`${date}`];

                        return (
                            <div className={"date-wrapper"} id={`date-${date}`}>
                                <div className={"date-text-wrapper"}>
                                    <div className={"date-text"}>
                                        {date}
                                    </div>
                                </div>
                                <div className={"workout-history-list-wrapper"}>
                                    {
                                        histories.map((history: { id: number; name: string; targetCount: number; doCount: number; }) => {
                                            return (
                                                <div className={"workout-history-box-wrapper"}
                                                     id={`workout-history-${history.id}`}>
                                                    <WorkoutHistoryBox
                                                        name={history.name}
                                                        targetCount={history.targetCount}
                                                        doCount={history.doCount}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WorkoutHistory;
