import React from "react";
import "./WorkoutDetailBottomSheet.scss"
import useBottomSheet from "../../../hook/useBottomSheet";
import YouTube from "react-youtube";

const WorkoutDetailBottomSheet = () => {
    const {sheet, content} = useBottomSheet(100, window.innerHeight / 2);

    return (
        <div className={"WorkoutDetailBottomSheet"} ref={sheet}>
            <BottomSheetHeader/>
            <div className={"bottom-sheet-content-wrapper"} ref={content}>
                <BottomSheetContent/>
                <div style={{height: "140px"}}/>
            </div>
        </div>
    )
}

const BottomSheetHeader: React.FC = () => {
    return (
        <div className={"BottomSheetHeader"}>
            <div className={"handle"}/>
        </div>
    );
};

const BottomSheetContent: React.FC = () => {
    return (
        <div className={"BottomSheetContent"}>
            <div className={"header-wrapper"}>
                <div className={"header-text-wrapper"}>
                    <div className={"header-1"}>
                        스쿼트
                    </div>
                </div>
            </div>

            <div className={"content-wrapper"}>
                <div className={"video-content-wrapper"}>
                    <YouTube
                        videoId={"xqvCmoLULNY"}
                        style={{
                            display: "inline-flex",
                            borderRadius: "20px",
                            overflow: "hidden"
                        }}
                        opts={{
                            height: `${(window.innerWidth - 60) * 9 / 16}`,
                            width: `${window.innerWidth - 60}`,
                        }}
                    />
                </div>
                <div className={"text-content-wrapper"}>
                    <div className={"title-text"}>
                        descriptions
                    </div>
                    <div className={"main-text"}>
                        스쿼트는 웨이트 트레이닝의 가장 대표적인 운동 중 하나이며, 데드리프트, 벤치 프레스와 함께 웨이트 트레이닝의 트로이카 운동으로 꼽힌다. 중량을 겨루는 스포츠인 파워리프팅
                        중 하나이다. 바벨 또는 덤벨을 들고 무릎 관절을 굽혔다 펴는 행동을 반복함으로써, 하반신의 대퇴사두근과 하퇴삼두근, 대둔근, 중전근 등의 근육을 성장시키는 운동으로,
                        하체의 근육량 증가에 커다란 효과가 있다.
                    </div>
                </div>

                <div className={"text-content-wrapper"}>
                    <div className={"title-wrapper"}>
                        <div className={"title-text"}>
                            How To Do It
                        </div>
                        <div className={"main-text"}>
                            1. Stand with your feet slightly wider than shoulder width apart.<br/>
                            2. Cross your arms in front of you so that your hands are resting on your
                            shoulders.<br/>
                            3. Bend your knees and drop down as low as you can. Keep your gaze straight ahead.<br/>
                            4. Push back up to starting position.<br/>
                        </div>
                    </div>

                    <div className={"main-text"}>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default WorkoutDetailBottomSheet;
