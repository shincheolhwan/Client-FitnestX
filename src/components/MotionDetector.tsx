import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import "./MotionDetector.scss";
import * as tmPose from '@teachablemachine/pose';

interface MotionDetectorProps {
    size: number;
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
    targetCount: number;
}

interface predictClass {
    probability: number;
    className: string;
}

const MotionDetector: React.FC<MotionDetectorProps> = ({size = 100, count, setCount, targetCount}) => {
    // More API functions here:
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [predictClass, setPredictClass] = useState<predictClass>({
        probability: 0,
        className: "stand"
    });
    const [curClass, setCurClass] = useState<predictClass>({
        probability: 0,
        className: "stand"
    });
    const [EMG, setEMG] = useState<number>(0);

    // the link to your model provided by Teachable Machine export panel
    let model: tmPose.CustomPoseNet,
        webcam: tmPose.Webcam,
        maxPredictions: number;

    useEffect(() => {
        let canvas = canvasRef.current;
        if (canvas) {
            canvas.width = size;
            canvas.height = size;
            contextRef.current = canvas.getContext('2d');
            init();
        }
    }, []);


    useEffect(() => {
        if (count >= targetCount) {
            return;
        }

        if (curClass.className === "squats" && predictClass.className === "stand") {
            setCount(prev => prev + 1);
        }
        setCurClass(predictClass);
    }, [predictClass])

    async function init() {
        const URL = "/my_model/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        webcam = new tmPose.Webcam(size, size, true); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.getWebcam();
        await webcam.play();
        window.requestAnimationFrame(loop);
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // #1: run input through posenet
        const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
        // #2: run input through teachable machine classification model
        const prediction = (await model.predictTopK(posenetOutput, 1))[0];
        prediction.probability = Number(prediction.probability.toFixed(2));
        if (prediction.probability >= 0.95) {
            setPredictClass(prediction);
        }

        // #3: finally draw the poses
        drawPose(pose);
    }

    function drawPose(pose: { keypoints: any; score?: number; }) {
        if (webcam.canvas && contextRef.current) {
            contextRef.current.drawImage(webcam.canvas, 0, 0);
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, contextRef.current);
            }
        }
    }

    return (
        <div className={"MotionDetector"}>
            <div className={"motion-detector-canvas-wrapper"}>
                <canvas className={"motion-detector-canvas"} ref={canvasRef}/>
            </div>
            <div className={"motion-detector-text-wrapper"}>
                <div className={"class-text"}>
                    {curClass.className} {curClass.probability}
                </div>
            </div>
        </div>
    );
}

export default MotionDetector;
