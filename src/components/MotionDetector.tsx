import React, {useEffect, useRef, useState} from "react";
import * as tmPose from '@teachablemachine/pose';

interface MotionDetectorProps {
}

// Input 컴포넌트 정의
const MotionDetector: React.FC<MotionDetectorProps> = ({}: MotionDetectorProps) => {
    // More API functions here:
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
    const [predictions, setPredictions] = useState<string[]>();

    const size = 400;
    // the link to your model provided by Teachable Machine export panel
    let model: tmPose.CustomPoseNet,
        webcam: tmPose.Webcam,
        maxPredictions: number;

    useEffect(() => {
        let canvas = canvasRef.current;
        if (canvas) {
            canvas.width = size;
            canvas.height = size;
            const context = canvas?.getContext('2d');
            contextRef.current = context
            setCtx(context)
        }
    }, [canvasRef]);

    useEffect(() => {
    }, [predictions]);

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
        await webcam.play();
        window.requestAnimationFrame(loop);
    };

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element
        const {pose, posenetOutput} = await model.estimatePose(webcam.canvas);
        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);
        let classes: string[] = []
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
            classes.push(classPrediction)
            // labelContainer.childNodes[i].innerHTML = classPrediction;
        }
        setPredictions(classes)
        // finally draw the poses
        drawPose(pose);
    }

    function drawPose(pose: { keypoints: any; score?: number; }) {
        if (webcam.canvas && ctx) {
            ctx.drawImage(webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }

    return (
        <div>
            <div>Teachable Machine Image Model</div>
            <button type="button" onClick={init}>Start</button>
            <canvas ref={canvasRef}></canvas>
            <div>
                {
                    predictions?.map((index, prediction) => (
                            <h3 key={prediction}>{index}</h3>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default MotionDetector;
