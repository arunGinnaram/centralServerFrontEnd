import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import JsonData from "./results.json";
import ProgressBar from "./ProgressBar";
import { useLogin } from "../context/LoginDetailsContext";
import "./Table.css";

function Table() {
  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;
  const status = useRef(false);
  const id = useRef(null);
  const baseURL = "http://localhost:8082/getResults1?batch=";
  const [jsonData, setJsonData] = React.useState([]);
  const [batch, setBatch] = React.useState("select");

  const milliseconds = 76329456;

  const formatTime = (milliseconds) => {
    const milli = Math.floor(milliseconds % 1000);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
      milli.toString().padStart(2, "0"),
    ].join(":");
  };

  const formattedTime = formatTime(milliseconds);
  let times = [];
  let rowTimes = [];
  for (let i = 0; i < jsonData.length; i++) {
    if (jsonData[i].startTime > 0) {
      status.current = true;
    }
    rowTimes.push(jsonData[i].startTime);
    for (let j = 1; j <= jsonData[i].nooflaps_candidate; j++) {
      rowTimes.push(jsonData[i]["time" + j]);
    }

    times.push(rowTimes);
    rowTimes = [];
  }

  let lapTimes = [];
  let lapRowTimes = [];
  for (let i = 0; i < jsonData.length; i++) {
    for (let j = 1; j <= jsonData[i].nooflaps_candidate; j++) {
      lapRowTimes.push(jsonData[i]["lap" + j]);
    }
    lapTimes.push(lapRowTimes);
    lapRowTimes = [];
  }

  let row = [];
  let rows = [];
  let val = 0;
  let currTime = new Date();
  let currTimeMilliSec =
    currTime.getHours() * 60 * 60 * 1000 +
    currTime.getMinutes() * 60 * 1000 +
    currTime.getSeconds() * 1000 +
    currTime.getMilliseconds();
  const startTime = (sample) => {
    return (
      Number(sample.split(":")[0]) * 60 * 60 * 1000 +
      Number(sample.split(":")[1]) * 60 * 1000 +
      Number(sample.split(":")[2]) * 1000 +
      Number(sample.split(":")[3])
    );
  };
  let prog = 0;
  let trackTime = 180000;

  const attendance = async (e) => {
    if (batch != "select") {
      axios({
        url:
          "http://localhost:8088/runResults?batch=" +
          batch +
          "&resultType=attendance", //your url
        method: "GET",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
        },
      }).then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  const processResults = async (e) => {
    if (batch != "select") {
      axios({
        url: "http://localhost:8088/processResults?batch=" + batch, //your url
        method: "GET",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  const download5kResults = async (e) => {
    if (batch !== "select") {
      axios({
        url:
          "http://localhost:8088/runResults?batch=" + batch + "&resultType=All", //your url
        method: "GET",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  const download5kQualifiedResults = async (e) => {
    if (batch !== "select") {
      axios({
        url:
          "http://localhost:8088/runResults?batch=" + batch + "&resultType=Q", //your url
        method: "GET",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  const download5kNotQualifiedResults = async (e) => {
    if (batch !== "select") {
      axios({
        url:
          "http://localhost:8088/runResults?batch=" + batch + "&resultType=NQ", //your url
        method: "GET",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  const pstConsolidatedReport = async (e) => {
    if (batch !== "select") {
      axios({
        url:
          "http://localhost:8088/pstReport?batch=" +
          batch +
          "&resultType=PSTReport", //your url
        method: "GET",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  const pstQualifiedReport = async (e) => {
    if (batch !== "select") {
      axios({
        url:
          "http://localhost:8088/pstReport?batch=" +
          batch +
          "&resultType=PSTReportQ", //your url
        method: "GET",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  const pstNotQualifiedReport = async (e) => {
    if (batch !== "select") {
      axios({
        url:
          "http://localhost:8088/pstReport?batch=" +
          batch +
          "&resultType=PSTReportNQ",
        method: "GET",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  for (let i = 0; i < jsonData.length; i++) {
    row.push(
      <td>{jsonData[i].bib}</td>,
      <td>{jsonData[i].gender}</td>,
      <td>{formatTime(jsonData[i].startTime)}</td>
    );

    for (let j = 1; j <= jsonData[i].nooflaps_candidate; j++) {
      if (jsonData[i]["lap" + j] == 0) {
        val = (
          ((currTimeMilliSec - times[i][j - 1]) / trackTime) *
          100
        ).toFixed(0);

        prog = val;
        if (times[i][j - 1] == 0) 
		{
			val = 0;
			prog = "";
		}
        if (val > 90) {
          prog = 90;
        }
      } else {
        prog = 100;
      }

      row.push(
        <td>
          <div className="progress-div">
            <ProgressBar
              bgcolor={
                lapTimes[i][j - 1] == 0
                  ? val >= 200
                    ? "red"
                    : val >= 150
                      ? "orange"
                      : val >= 125
                        ? "yellow"
                        : val <= 0
                          ? "transparent"
                          : "blue"
                  : times[i][j] - times[i][j - 1] >= trackTime * 2
                    ? "red"
                    : times[i][j] - times[i][j - 1] >= trackTime * 1.5
                      ? "orange"
                      : times[i][j] - times[i][j - 1] >= trackTime * 1.25
                        ? "yellow"
                        : "blue"
              }
              progress={prog}
              height={22}
            />
			{lapTimes[i][j - 1] == 0?<p className="lapTime text-center">{prog}</p>:<p className="lapTime text-center">{formatTime(jsonData[i]["lap" + j])}</p>}
            
          </div>
        </td>
      );
	  console.log(trackTime);
	  console.log(times[i][j] - times[i][j - 1]);
	   trackTime = lapTimes[i][j - 1];
    }
    row.push(
      <td>{formatTime(jsonData[i].finishTime)}</td>,
      <td>{formatTime(jsonData[i].nettime)}</td>
    );
    rows.push(<tr>{row}</tr>);
    row = [];

   
  }

  let head = [];
  if (jsonData[0] != undefined) {
    for (let i = 1; i <= jsonData[0].nooflaps_candidate; i++) {
      head.push(<th>Lap {i}</th>);
    }
  }
  let component;
  const batchSet = (event) => {
    if (id.current != null) clearInterval(id.current);
     var batch1 = event.target.value;
	 setBatch(batch1);
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };

    id.current = setInterval(() => {
      axios
        .post(
          "http://localhost:8082/getResults1?batch=" + batch1,
          {},
          { headers }
        )
        .then((response) => {
          setJsonData(response.data);
        })
        .catch((err) => console.log(err.message));
    }, 5000);
  };

  if (status.current == true) {
    component = (
      <>
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Bib</th>
              <th>Gender</th>
              <th>Start Time</th>
              {head}
              <th>Finish Time</th>
              <th>Net Time</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </>
    );
  }

  const [showPST, setShowPST] = useState(false);
  const showPSTPET = () => {
    setShowPST(!showPST);
  };



  const petblock = () => {
    document.getElementById("pet").style.display = "block";
    document.getElementById("pst").style.display = "none";
  }


  const pstblock = () => {
    document.getElementById("pst").style.display = "block";
    document.getElementById("pet").style.display = "none";
  }

  return (
    <div style={{ maxWidth: "86.5%", marginLeft: "6.7%", marginTop: "-7%" }}>
      <div
        className="navbar  "
        style={{ backgroundColor: "#63A15F", display: "flex", padding: "1.2%" }} >
        <div
          href="#"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
          style={{
            color: "white",
            marginLeft: "-0.5%",
            fontWeight: "500",
            letterSpacing: "0.8px",
            cursor: "pointer"
          }}
          onClick={showPSTPET}
        >
          Results
        </div>

        {showPST && (
          <div className="animate__animated animate__fadeInLeft" style={{ display: "flex", position: "absolute", left: "8%" }}>
            <div>
              <select
                className="form-control"
                id="batch"
                onChange={batchSet}
                name="batch" >
                <option value="" selected>
                  Select Batch
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
				<option value="2">4</option>
                <option value="3">5</option>
              </select>
            </div>
            <div>
              <a
                style={{ color: "white" }}
                data-target="#pet"
                data-toggle="collapse"
                className="nav-link float-left"
                href="#"
                onClick={petblock}>
                PET
              </a>
            </div>
           
            <div id="pet" className="animate__animated animate__fadeInLeft" style={{ fontSize: "14px", display: "none" }}>
              <a
                onClick={attendance}
                style={{ color: "white" }}
                className="nav-link float-left ml-2"
                href="#"
              >
                Attendence
              </a>
              <a
                onClick={processResults}
                style={{ color: "white" }}
                className="nav-link float-left ml-2"
                href="#"

              >

                Process Results
              </a>
              <a
                onClick={download5kResults}
                style={{ color: "white" }}
                className="nav-link float-left ml-2"
                href="#"
              >
                PET Results
              </a>
              <a
                onClick={download5kQualifiedResults}
                style={{ color: "white" }}
                className="nav-link float-left ml-2"
                href="#"
              >

                PET Qualified
              </a>
              <a
                onClick={download5kNotQualifiedResults}
                style={{ color: "white" }}
                className="nav-link float-left ml-2"
                href="#"
              >

                PET Not Qualified
              </a>
            </div>
            {/* )} */}

            <div  >
              <a
                style={{ color: "white" }}
                data-target="#pst"
                data-toggle="collapse"
                className="nav-link float-left"
                href="#"
                // onClick={hidePET}
                onClick={pstblock}
              >
                PST
              </a>
            </div>
            {/* {showDivPstCollapse && ( */}
            <div id="pst" className="animate__animated animate__fadeInLeft" style={{ display: "none" }}>
              <a
                onClick={pstConsolidatedReport}
                style={{ color: "white" }}
                className="nav-link float-left ml-2"
                href="#"
              >
                PST Results
              </a>
              <a
                onClick={pstQualifiedReport}
                style={{ color: "white" }}
                className="nav-link float-left ml-2"
                href="#"
              >

                PST Qualified
              </a>
              <a
                onClick={pstNotQualifiedReport}
                style={{ color: "white" }}
                className="nav-link float-left ml-2"
                href="#"
              >

                PST Not Qualified
              </a>
            </div>
           


          </div>
        )}
      </div>
      {component}
    </div>
  );
}

export default Table;