import React, {ChangeEvent, useState} from 'react';
import "./Login.scss";
import {IoAccessibility, IoLockClosed} from "react-icons/io5";
import {MdOutlineLogin} from "react-icons/md";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [ID, setID] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [, setCookie, removeCookie] = useCookies(['id']);

    const inputID = (e: ChangeEvent<HTMLInputElement>): void => {
        setID(e.target.value);
    }

    const inputPassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    }

    const login = (): void => {
        axios.post("/users/login", {
            id: ID,
            password: password,
        })
            .then(res => {
                if (res.data === "fail") {
                    alert("fail to login.");
                    return;
                }

                removeCookie('id');
                setCookie('id', ID);
                navigate("/workout");
            }).catch(() => {
            alert("fail to login.");
        })
    }

    const goToRegister = (): void => {
        navigate("/register");
    }

    return (
        <div className={"Login"}>
            <div className={"header-wrapper"}>
                <div className={"header-1"}>
                    Hey there,
                </div>
                <div className={"header-2"}>
                    Welcome Back
                </div>
            </div>
            <div className={"content-wrapper"}>
                <div className={"input-wrapper"}>
                    <InputBox
                        placeholder={"ID"}
                        icon={<IoAccessibility/>}
                        value={ID}
                        onChange={inputID}
                    />
                </div>
                <div className={"input-wrapper"}>
                    <InputBox
                        placeholder={"Password"}
                        icon={<IoLockClosed/>}
                        type={"password"}
                        value={password}
                        onChange={inputPassword}
                    />
                </div>
            </div>
            <div className={"footer-wrapper"}>
                <div className={"button-wrapper"}>
                    <Button label={"Login"} icon={<MdOutlineLogin/>} onClick={login}/>
                </div>
                <div className={"text-wrapper"}>
                    Don't have an account yet?&nbsp;
                    <span className={"link-register-text"} onClick={goToRegister}>Register</span>
                </div>
            </div>
        </div>
    )
}

export default Login;
