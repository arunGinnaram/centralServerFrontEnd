import React from "react";
import "./PstResults.css";
import axios from "axios";
import { useLogin } from "../../context/LoginDetailsContext";

function PstResults() {
  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;
  console.log(Authorization, STATUS);

  let [pstBatch, setPstBatch] = React.useState("Select");
  const pst = () => {
    let val = document.getElementById("pst").value;
    console.log(val);
    setPstBatch(val);
  };
  console.log(pstBatch);

  const pstConsolidatedReport = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/pstReport?batch=1&resultType=PSTReport", //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
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
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/pstReport?batch=1&resultType=PSTReportQ", //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
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

  const pstNotQualifiedReport = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/pstReport?batch=1&resultType=PSTReportNQ", //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
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

  const pstConsolidatedDistrictwise = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/pstReportDistrictwise?batch=1&resultType=PSTReportDistrict", //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
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

  const pstConsolidatedDistrictwiseQualified = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/pstReportDistrictwise?batch=1&resultType=PSTReportDistrictQ", //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
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

  const pstConsolidatedDistrictwiseNotQualified = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/pstReportDistrictwise?batch=1&resultType=PSTReportDistrictNQ", //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
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

  const PSTSheet = async (e) => {
    const chest = document.getElementById("chest").value;
    if (chest !== "") {
      axios({
        url: "http://192.168.1.96:8088/pstSheet?rollNo=" + chest, //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
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
      alert("Please enter roll number");
    }
  };

  return (
    <div>
      <div className="conta">
        <div className="pstcard">
          <div className="select-pst-batch">
            <span>Select Batch</span>
            <select id="pst" onChange={pst}>
              <option selected>Select</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="download-pdfs">
            <div className="download-btns">
              <button className="btnpst" onClick={pstConsolidatedReport}>
                PST Consolidated Report
              </button>
              <button className="btnpst" onClick={pstQualifiedReport}>
                PST Qualified Report
              </button>
              <button className="btnpst" onClick={pstNotQualifiedReport}>
                PST Not Qualified Report
              </button>
            </div>
            <div className="download-btns">
              <button className="btnpst" onClick={pstConsolidatedDistrictwise}>
                PST Consolidated Report Districtwise
              </button>
              <button
                className="btnpst"
                onClick={pstConsolidatedDistrictwiseQualified}
              >
                PST Qualified Report Districtwise
              </button>
              <button
                className="btnpst"
                onClick={pstConsolidatedDistrictwiseNotQualified}
              >
                PST Not Qualified Report Districtwise
              </button>
            </div>
          </div>
          <div className="cand-pst">
            <span>Enter Roll No/Chest No</span>
            <input className="chest" id="chest"></input>
            <button className="btnpstsheet" onClick={PSTSheet}>
              Candidate PST Sheet
            </button>
          </div>
        </div>
        {/* <div className="petcard">
          <span>Select Batch</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div> */}
      </div>
    </div>
  );
}

export default PstResults;
