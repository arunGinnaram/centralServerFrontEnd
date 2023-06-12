import React from "react";
import "./Registration.css";
import User from "./user.png";
import axios from "axios";
import WebcamCapture from "./WebcamCapture";
import CamCapture from "./CamCapture";
import { useLogin } from "../context/LoginDetailsContext";
import { useNavigate } from "react-router-dom";

export let webcam = false;
function Registration() {
  const baseURL = "http://localhost:8367/bioenable/capture";
  //const baseURL = "http://localhost:8080/login";
  let baseUrl = "http://localhost:8080/register";
  const chipURL = "http://localhost:8080/chipValidity?chip=";
  const submitURL = "http://localhost:8080/saveBib";
  const { state, dispatch } = useLogin();
  const [det, setDet] = React.useState({});
  const [reg, setReg] = React.useState();

  // console.log(state);

  let { Authorization, Maximum, Batch, Registered } = state;
  console.log(Authorization, Maximum, Batch, Registered);

  // console.log("Authorization", state.Authorization);
  // console.log("Login", state.userData);

  // const auth = state?.Authorization;
  // console.log(!reg?.UniqueId);
  const urlChange = () => {
    // baseUrl = baseUrl + document.getElementById("rollNo").value;
    // console.log(baseUrl);
    if (document.getElementById("rollNo").value.length === 7) {
      webcam = true;
      const headers = {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
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
            //document.getElementById("container").style.display = "none";
          } else if (response.data.status === "ALREADY") {
            alert("Candidate is registrated");
            //document.getElementById("container").style.display = "none";
          } else if (response.data.status === "CHECK") {
            alert("Once check the roll number or date");
            //document.getElementById("container").style.display = "none";
          } else if (response.data.status == undefined) {
            setDet(response.data);
            //document.getElementById("container").style.display = "block";
          } else {
            alert(response.data.status);
            //document.getElementById("container").style.display = "none";
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      webcam = false;
      //document.getElementById("container").style.display = "none";
    }
  };

  const [base, setBase] = React.useState("");
  const sendState = (index) => {
    console.log(index);
    setBase(index);
    console.log(base);
  };
  // const [post, setPost] = React.useState({});
  // React.useEffect(() => {
  //   const headers = { "Access-Control-Allow-Origin": "*" };
  //   axios
  //     .post(baseURL, { username: "prathap", password: "123" }, { headers })
  //     .then((response) => {
  //       setPost(response.data);
  //       console.log(post);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, [post.STATUS]);
  const [httpStaus, setHttpStaus] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [rollNum, setRollNum] = React.useState("");
  const [lti, setLti] = React.useState("");
  const [rti, setRti] = React.useState("");
  const [ltiIso, setLtiIso] = React.useState("");
  const [rtiIso, setRtiIso] = React.useState("");
  const [chest, setChest] = React.useState("");
  const [chipp1, setChipp1] = React.useState("");
  const [chipp2, setChipp2] = React.useState("");

  // React.useEffect(() => {
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: state?.Authorization,
  //   };
  //   axios
  //     .post(baseURL, { headers })
  //     .then((response) => {
  //       setHttpStaus(true);
  //       setPost(response.data);
  //     })
  //     .catch((err) => {
  //       setHttpStaus(false);
  //       console.log(err.message);
  //     });
  // }, [post, state?.Registered]);

  const chip1 = (event) => {
    const chip1 = document.getElementById("chip1").value;
    const chip2 = document.getElementById("chip2").value;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
    };
    if (chip1 !== "") {
      if (chip1 === chip2) {
        alert("Enter again");
        //chip1 = null;
        //chip2 = null;
      } else {
        axios
          .post(chipURL + event.target.value, {}, { headers })
          .then((response) => {
            console.log(response.data.message);
            if (response.data.message === "ALREADY") {
              alert("Chip code already assigned and result was not processed");
              setChipp1("");
              // setChipp2("");
            } else if (response.data.message === "SUFILE") {
              alert("Chip code is not in SU file");
              setChipp1("");
              // setChipp2("");
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  };

  const chip2 = (event) => {
    const chip1 = document.getElementById("chip1").value;
    const chip2 = document.getElementById("chip2").value;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
    };
    if (chip2 !== "") {
      if (chip1 === chip2) {
        alert("Enter again");
        //chip1 = null;
        //chip2 = null;
      } else {
        axios
          .post(chipURL + event.target.value, {}, { headers })
          .then((response) => {
            console.log(response.data.message);
            if (response.data.message === "ALREADY") {
              alert("Chip code already assigned and result was not processed");
              // setChipp1("");
              setChipp2("");
            } else if (response.data.message === "SUFILE") {
              alert("Chip code is not in SU file");
              // setChipp1("");
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
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
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
    if (httpStaus) {
      // document.getElementById("txtStatus").value =
      //   "ErrorCode: " +
      //   res.data.ErrorCode +
      //   " ErrorDescription: " +
      //   res.data.ErrorDescription;

      if (post.ErrorCode === "0") {
        document.getElementById("imgFinger").src =
          "data:image/jpg;base64," + post.BitmapData;
        setLti("data:image/jpg;base64," + post.BitmapData);
        setLtiIso("data:image/jpg;base64," + post.IsoTemplate);
      }
    }
  };

  const captureRightFinger = () => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
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
    if (httpStaus) {
      // document.getElementById("txtStatus").value =
      //   "ErrorCode: " +
      //   res.data.ErrorCode +
      //   " ErrorDescription: " +
      //   res.data.ErrorDescription;

      if (post.ErrorCode === "0") {
        document.getElementById("rti").src =
          "data:image/jpg;base64," + post.BitmapData;
        setRti("data:image/jpg;base64," + post.BitmapData);
        setRtiIso("data:image/jpg;base64," + post.IsoTemplate);
      }
    }
    console.log(post.IsoTemplate + " " + httpStaus);
  };

  const submitForm = () => {
    const roll = document.getElementById("rollNo").value;
    const bib = document.getElementById("bib").value;
    webcam = true;
    const chip1 = document.getElementById("chip1").value;
    const chip2 = document.getElementById("chip2").value;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
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
        console.log(response.data);
        alert(response.data.TOKEN);
        dispatch({
          type: "BATCH",
          value: response.data.Batch,
        });
        dispatch({
          type: "REGISTERED",
          value: response.data.Registered,
        });

        dispatch({
          type: "MAXIMUM",
          value: response.data.Maximum,
        });
        setChest("");
        setChipp1("");
        setChipp2("");
        setRollNum("");
        document.getElementById("imgFinger").src = "";
        document.getElementById("rti").src = "";
      })
      .catch((err) => {
        console.log(err.message);
        // document.getElementById("container").style.display = "none";
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
          Batch : <span>{Batch}</span>
        </h2>
        <div>
          <h3 className="registered">
            <span>{Registered}</span>
            <span>/</span>
            <span>{Maximum}</span>
          </h3>
        </div>
        <button className="btns">Logout</button>
      </div>
      {reg?.UniqueId && reg?.RollNo === rollNum && (
        <div className="container" id="container">
          <div className="info">
            {/* <h2 className="title">Basic Information</h2> */}
            {/* <p>Registration No</p> */}
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
              {/* <div className="values">
              <p className="candidate-data">Ram</p>
              <p className="candidate-data">Raj</p>
              <p className="candidate-data">Male</p>
              <p className="candidate-data">1/1/1999</p>
              <p className="candidate-data">OC</p>
            </div> */}
            </div>
            {/* <p>PET Date</p>
          <p>PET Venue</p> */}
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
                  onMouseOut={chip1}
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
                  onMouseOut={chip2}
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
              {/* <img
                className="captured-photo"
                height="280px"
                width="280px"
              ></img> */}
              {/* <div className="buttons">
              <button className="refresh">
                <i className="fa fa-refresh"></i>
              </button>
              <button>Capture</button>
            </div> */}
            </div>
          </div>
          {/* <div className="captured-photo">
          <p>Captured Photo</p>
          <img alt="Captured Photo"></img>
        </div> */}
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
