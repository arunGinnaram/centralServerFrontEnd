import { useRef, useEffect, useState } from "react";
import "./CamCapture.css";
import * as faceapi from "face-api.js";
import { webcam } from "./Registration";

function CamCapture({ sendState, image }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [imgSrc, setImgSrc] = useState("");

  const message = () => {
    document.getElementById("capturedImage").src = imgSrc;
    sendState(imgSrc);
  };

  useEffect(() => {
    startVideo();

    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceDetection();
    });
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const faceDetection = async () => {
    setInterval(async () => {
      // if (webcam) {
      //   console.log(webcam);
      //   clearInterval(id);
      // }
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      //   document.getElementById("p").innerHTML =
      //     canvasRef.current.innerHtml.toDataURL();

      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });
      if (detections.length === 0)
        document.getElementById("btn").disabled = true;
      else {
        document.getElementById("btn").disabled = false;
        setImgSrc(canvasRef.current.innerHtml.toDataURL());
      }

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 5000);
  };

  return (
    <div className="cam">
      {/* <h1> AI FACE DETECTION</h1> */}
      <div className="capture">
        <div className="cam__video">
          <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
        </div>
        <img id="capturedImage"></img>
      </div>
      <canvas
        ref={canvasRef}
        width="940"
        height="650"
        className="cam__canvas"
      />
      <button id="btn" onClick={message}>
        Capture
      </button>
    </div>
  );
}

export default CamCapture;
