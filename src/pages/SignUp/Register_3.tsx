import React from "react";
import './Register_3.scss';
import exerciseImage from "../../images/exercise_2.png";
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";

interface pageProps {
    ID: string
}

const Register_3: React.FC<pageProps> = ({ID}) => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/home");
    }

    return (
        <div className={"Register_3"}>
            <div className={"header-wrapper"}>
                <div className={"header-image-wrapper"}>
                    <img src={exerciseImage} alt={"exercise"}/>
                </div>
                <div className={"header-text-wrapper"}>
                    <div className={"header-1"}>
                        Welcome, {ID}
                    </div>
                    <div className={"header-2"}>
                        You are all set now, let's reach your
                    </div>
                    <div className={"header-2"}>
                        goals together with us
                    </div>
                </div>
            </div>
            <div className={"footer-wrapper"}>
                <Button label={"Go To Home"} onClick={goToHome}/>
            </div>
        </div>
    )
}

export default Register_3;
