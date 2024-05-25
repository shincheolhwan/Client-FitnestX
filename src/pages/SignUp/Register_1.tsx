import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import './Register_1.scss';
import InputBox from "../../components/InputBox";
import {IoAccessibility, IoLockClosed} from "react-icons/io5";
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";

interface pageProps {
    startRegister: () => void
    ID: string
    setID: Dispatch<SetStateAction<string>>
    password: string
    setPassword: Dispatch<SetStateAction<string>>
}

const Register_1: React.FC<pageProps> = ({
                                             startRegister,
                                             ID,
                                             setID,
                                             password,
                                             setPassword
                                         }) => {
    const navigate = useNavigate();

    const goToLogin = (): void => {
        navigate('/login');
    };

    const inputID = (e: ChangeEvent<HTMLInputElement>): void => {
        setID(e.target.value);
    }

    const inputPassword = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    }

    return (
        <div className={"Register_1"}>
            <div className={"header-wrapper"}>
                <div className={"header-1"}>
                    Hey there,
                </div>
                <div className={"header-2"}>
                    Create an Account
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
                    <Button label={"Register"} onClick={startRegister}/>
                </div>
                <div className={"text-wrapper"}>
                    Already have an account?&nbsp;
                    <span className={"link-login-text"} onClick={goToLogin}>Login</span>
                </div>
            </div>
        </div>
    )
}

export default Register_1;
