import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import "./Register_2.scss"
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import {TbGenderBigender} from "react-icons/tb";
import {FaRegCalendarAlt} from "react-icons/fa";
import {MdOutlineMonitorWeight, MdHeight} from "react-icons/md";
import exerciseImage from "../../images/exercise_1.png"

interface pageProps {
    gender: string,
    setGender: Dispatch<SetStateAction<string>>,
    year: string,
    setYear: Dispatch<SetStateAction<string>>,
    month: string,
    setMonth: Dispatch<SetStateAction<string>>,
    day: string,
    setDay: Dispatch<SetStateAction<string>>,
    weight: string,
    setWeight: Dispatch<SetStateAction<string>>,
    height: string,
    setHeight: Dispatch<SetStateAction<string>>,
    signUp: () => void
}

const Register_2: React.FC<pageProps> = ({
                                             gender,
                                             setGender,
                                             year,
                                             setYear,
                                             month,
                                             setMonth,
                                             day,
                                             setDay,
                                             weight,
                                             setWeight,
                                             height,
                                             setHeight,
                                             signUp
                                         }) => {

    const selectGender = (selectedGender: string): void => {
        setGender(selectedGender);
    }

    const inputYear = (e: ChangeEvent<HTMLInputElement>): void => {
        setYear(e.target.value);
    }

    const inputMonth = (e: ChangeEvent<HTMLInputElement>): void => {
        setMonth(e.target.value);
    }

    const inputDay = (e: ChangeEvent<HTMLInputElement>): void => {
        setDay(e.target.value);
    }

    const inputWeight = (e: ChangeEvent<HTMLInputElement>): void => {
        setWeight(e.target.value);
    }

    const inputHeight = (e: ChangeEvent<HTMLInputElement>): void => {
        setHeight(e.target.value);
    }

    return (
        <div className={"Register_2"}>
            <div className={"header-wrapper"}>
                <div className={"header-image-wrapper"}>
                    <img src={exerciseImage} alt={"exercise"}/>
                </div>
                <div className={"header-text-wrapper"}>
                    <div className={"header-1"}>
                        Let's complete your profile
                    </div>
                    <div className={"header-2"}>
                        It will help use to know more about you!
                    </div>
                </div>
            </div>
            <div className={"content-wrapper"}>
                <div className={"input-wrapper gender"}>
                    <span className={"icon"}><TbGenderBigender/></span>
                    <span className={`selection ${gender === "남자" ? "selected" : ""}`}
                          onClick={() => selectGender("남자")}>Male</span>
                    <span className={`selection ${gender === "여자" ? "selected" : ""}`}
                          onClick={() => selectGender("여자")}>Female</span>
                </div>
                <div className={"input-wrapper age"}>
                    <span className={"icon"}><FaRegCalendarAlt/></span>
                    <InputBox
                        type={"number"}
                        placeholder={"YYYY"}
                        value={year}
                        onChange={inputYear}
                    />
                    <InputBox
                        type={"number"}
                        placeholder={"MM"}
                        value={month}
                        onChange={inputMonth}
                    />
                    <InputBox
                        type={"number"}
                        placeholder={"DD"}
                        value={day}
                        onChange={inputDay}
                    />
                </div>
                <div className={"input-wrapper"}>
                    <InputBox
                        type={"number"}
                        placeholder={"Your Weight"}
                        icon={<MdOutlineMonitorWeight/>}
                        value={weight}
                        onChange={inputWeight}
                    />
                    <div className={"unit"}>
                        <span className={"unit-text"}>KG</span>
                    </div>
                </div>
                <div className={"input-wrapper"}>
                    <InputBox
                        type={"number"}
                        placeholder={"Your Height"}
                        icon={<MdHeight/>}
                        value={height}
                        onChange={inputHeight}
                    />
                    <div className={"unit"}>
                        <span className={"unit-text"}>CM</span>
                    </div>
                </div>
            </div>
            <div className={"footer-wrapper"}>
                <Button label={"Next >"} onClick={signUp}/>
            </div>
        </div>
    )
}

export default Register_2
