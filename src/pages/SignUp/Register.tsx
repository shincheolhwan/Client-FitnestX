import React, {useState} from 'react';
import './Register.scss';
import Register_1 from "./Register_1";
import Register_2 from "./Register_2";
import Register_3 from "./Register_3";
import axios from "axios";
import {useCookies} from "react-cookie";

const Register: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [ID, setID] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [day, setDay] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [, setCookie] = useCookies(['id']);

    const startRegister = (): void => {
        if (!validateID(ID)) {
            alert("Please check ID.");
            return;
        }
        if (!validatePassword(password)) {
            alert("Please check Password.");
            return;
        }

        setStep(2);
    };

    const validateID = (inputID: string): boolean => {
        if (inputID === "") {
            return false;
        }
        return true;
    }

    const validatePassword = (inputPassword: string): boolean => {
        if (inputPassword === "") {
            return false;
        }
        return true;
    }

    const validateGender = (inputGender: string): boolean => {
        if (inputGender === "") {
            return false;
        }

        return true;
    }

    const validateBirth = (inputYear: string, inputMonth: string, inputDay: string): boolean => {
        if (inputYear.length !== 4) {
            return false;
        }

        if (inputMonth.length !== 2) {
            return false;
        }

        if (inputDay.length !== 2) {
            return false;
        }

        return true;
    }

    const validateWeight = (inputWeight: string): boolean => {
        if (inputWeight === "") {
            return false;
        }

        return true;
    }

    const validateHeight = (inputGender: string): boolean => {
        if (inputGender === "") {
            return false;
        }

        return true;
    }

    const signUp = (): void => {
        if (!validateID(ID)) {
            alert("Please check ID.");
            return;
        }
        if (!validatePassword(password)) {
            alert("Please check Password.");
            return;
        }
        if (!validateGender(gender)) {
            alert("Please check Gender.");
            return;
        }
        if (!validateBirth(year, month, day)) {
            alert("Please check Birth.");
            return;
        }
        if (!validateWeight(weight)) {
            alert("Please check Weight.");
            return;
        }
        if (!validateHeight(height)) {
            alert("Please check Height.");
            return;
        }

        axios.post("/users", {
            id: ID,
            password: password,
            gender: gender,
            birth: `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`,
            weight: weight,
            height: height,
        })
            .then(res => {
                if (res.data === "success") {
                    setCookie('id', ID);
                    setStep(3);
                } else {
                    alert("fail to register.");
                }
            })
    }


    return (
        <div className={"Register"}>
            {
                step === 1 ? <Register_1
                    startRegister={startRegister}
                    ID={ID}
                    setID={setID}
                    password={password}
                    setPassword={setPassword}
                /> : <></>
            }
            {
                step === 2 ? <Register_2
                    gender={gender}
                    setGender={setGender}
                    year={year}
                    setYear={setYear}
                    month={month}
                    setMonth={setMonth}
                    day={day}
                    setDay={setDay}
                    weight={weight}
                    setWeight={setWeight}
                    height={height}
                    setHeight={setHeight}
                    signUp={signUp}
                /> : <></>
            }
            {
                step === 3 ? <Register_3
                    ID={ID}
                /> : <></>
            }
        </div>
    )
}

export default Register;
