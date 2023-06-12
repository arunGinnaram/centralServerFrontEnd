import React from "react";
import Webcam from "react-webcam";
import "./Registration.css";

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div className="livecam">
      <div className="capture">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        {imgSrc && (
          <img src={imgSrc} alt="captured" className="captured-photo" />
        )}
      </div>
      <div className="buttons">
        <button className="refresh">
          <i className="fa fa-refresh"></i>
        </button>
        <button onClick={capture}>Capture</button>
      </div>
    </div>
  );
};

export default WebcamCapture;
