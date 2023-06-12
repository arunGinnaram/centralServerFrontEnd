import React from "react";
import "./Registration.css";
import User from "./user.png";
import axios from "axios";
import WebcamCapture from "./WebcamCapture";
import CamCapture from "./CamCapture";
import { useLogin } from "../context/LoginDetailsContext";

function Registration() {
  const baseURL = "http://localhost:8367/bioenable/capture";
  let baseUrl = "http://192.168.1.96:8080/register";
  const chipURL = "http://192.168.1.96:8080/chipValidity?chip=";
  const submitURL = "http://192.168.1.96:8080/saveBib";
  const { state } = useLogin();
  const [det, setDet] = React.useState({});
  const [reg, setReg] = React.useState();
  const [httpStaus, setHttpStaus] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [rollNum, setRollNum] = React.useState();
  const [lti, setLti] = React.useState("");
  const [rti, setRti] = React.useState("");
  const [ltiIso, setLtiIso] = React.useState("");
  const [rtiIso, setRtiIso] = React.useState("");
  const [chest, setChest] = React.useState();
  const [chipp1, setChipp1] = React.useState();
  const [chipp2, setChipp2] = React.useState();

  React.useEffect(() => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: state?.Authorization,
    };
    axios
      .post(baseURL, { headers })
      .then((response) => {
        setHttpStaus(true);
        setPost(response.data);
      })
      .catch((err) => {
        setHttpStaus(false);
        console.log(err.message);
      });
  }, [post]);
  const urlChange = () => {
    if (document.getElementById("rollNo").value.length === 7) {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        Authorization: state?.Authorization,
      };
      axios
        .post(
          baseUrl,
          { rollNo: document.getElementById("rollNo").value },
          { headers }
        )
        .then((response) => {
          console.log(response.data);
          setReg(response.data);
          if (response.data.status === "NOTVALID") {
            alert("Registration number is not valid");
          } else if (response.data.status === "ALREADY") {
            alert("Candidate is registrated");
          } else if (response.data.status === "CHECK") {
            alert("Once check the roll number or date");
          } else if (response.data.status == undefined) {
            setDet(response.data);
          } else {
            alert(response.data.status);
          }
        })
        .catch((err) => console.log(err.message));
    } else {
    }
  };

  const [base, setBase] = React.useState("");
  const sendState = (index) => {
    setBase(index);
  };

  const compare = (event) => {
    const chip1 = document.getElementById("chip1").value;
    const chip2 = document.getElementById("chip2").value;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: state?.Authorization,
    };
    if (chip1 !== "" || chip2 !== "") {
      if (chip1 === chip2) {
        alert("Enter again");
      } else {
        axios
          .post(chipURL + event.target.value, {}, { headers })
          .then((response) => {
            if (response.data.message === "ALREADY") {
              alert("Chip code already assigned and result was not processed");
              setChipp1("");
              setChipp2("");
            } else if (response.data.message === "SUFILE") {
              alert("Chip code is not in SU file");
              setChipp1("");
              setChipp2("");
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  };

  const handleChip1 = (event) => {
    setChipp1(event.target.value);
  };

  const handleChip2 = (event) => {
    setChipp2(event.target.value);
  };

  const handleChest = (event) => {
    setChest(event.target.value);
  };

  const handleRoll = (event) => {
    setRollNum(event.target.value);
  };

  const captureLeftFinger = () => {
    if (httpStaus) {
      if (post.ErrorCode === "0") {
        document.getElementById("imgFinger").src =
          "data:image/jpg;base64," + post.BitmapData;
        setLti("data:image/jpg;base64," + post.BitmapData);
        setLtiIso("data:image/jpg;base64," + post.IsoTemplate);
      }
    }
  };

  const captureRightFinger = () => {
    if (httpStaus) {
      if (post.ErrorCode === "0") {
        document.getElementById("rti").src =
          "data:image/jpg;base64," + post.BitmapData;
        setRti("data:image/jpg;base64," + post.BitmapData);
        setRtiIso("data:image/jpg;base64," + post.IsoTemplate);
      }
    }
  };

  const submitForm = () => {
    const roll = document.getElementById("rollNo").value;
    const bib = document.getElementById("bib").value;
    const chip1 = document.getElementById("chip1").value;
    const chip2 = document.getElementById("chip2").value;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: state?.Authorization,
    };
    axios
      .post(
        submitURL,
        {
          rollNo: roll,
          bib: bib,
          imagedata: base,
          chip1: chip1,
          chip2: chip2,
          imagedata_face: null,
          ltiimagedata: lti,
          rtiimagedata: rti,
          lti_iso: ltiIso,
          Rti_iso: rtiIso,
        },
        { headers }
      )
      .then((response) => {
        alert(response.data.TOKEN);
        setRollNum("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="header">
        <div className="roll">
          <label>
            <h2>Roll No.</h2>
          </label>
          <input
            placeholder="Enter roll no"
            className="roll-no"
            id="rollNo"
            maxLength="8"
            onInput={urlChange}
            onChange={handleRoll}
            value={rollNum}
          ></input>
        </div>
        <h2>
          Batch : <span>{state?.Batch}</span>
        </h2>
        <div>
          <h3 className="registered">
            <span>{state?.Registered}</span>
            <span>/</span>
            <span>{state?.Maximum}</span>
          </h3>
        </div>
        <button className="btns">Logout</button>
      </div>
      {reg?.UniqueId && reg?.RollNo === rollNum && (
        <div className="container" id="container">
          <div className="info">
            <div className="candidate">
              <p className="data">
                Name:
                <span className="candidate-data">{det.Name}</span>
              </p>
              <p className="data">
                F Name:<span className="candidate-data">{det.FatherName}</span>
              </p>
              <p className="data">
                Gender:
                <span className="candidate-data">{det.Gender}</span>
              </p>
              <p className="data">
                DOB:<span className="candidate-data">{det.dob}</span>
              </p>
              <p className="data">
                Category:<span className="candidate-data">{det.Caste}</span>
              </p>
            </div>
          </div>
          <img src={User} alt="candidate" className="photo" />
          <div className="chips-and-image">
            <div className="chips">
              <div>
                <label>Chest No</label>
                <input
                  className="roll-no"
                  id="bib"
                  value={chest}
                  onChange={handleChest}
                ></input>
              </div>
              <div>
                <label>Chip 1</label>
                <input
                  className="roll-no"
                  onMouseOut={compare}
                  onChange={handleChip1}
                  id="chip1"
                  name="chip"
                  value={chipp1}
                ></input>
              </div>
              <div>
                <label>Chip 2</label>
                <input
                  className="roll-no"
                  onMouseOut={compare}
                  onChange={handleChip2}
                  id="chip2"
                  name="chip"
                  value={chipp2}
                ></input>
              </div>
            </div>
          </div>
          <div className="thumbs-and-livecam">
            <div className="thumb-impressions">
              <div className="thumbs">
                <img alt="LTI" id="imgFinger"></img>
                <button className="btns" onClick={captureLeftFinger}>
                  Capture L.T.I
                </button>
              </div>
              <div className="thumbs">
                <img alt="RTI" id="rti"></img>
                <button className="btns" onClick={captureRightFinger}>
                  Capture R.T.I
                </button>
              </div>
            </div>
            <div className="livecam">
              <CamCapture sendState={sendState} />
            </div>
          </div>
          <div className="btn">
            <button className="submit" onClick={submitForm}>
              Submit Registration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registration;
