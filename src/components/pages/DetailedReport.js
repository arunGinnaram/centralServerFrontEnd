import React from "react";
import "./DetailedReport.css";
import axios from "axios";
import { useLogin } from "../../context/LoginDetailsContext";

function DetailedReport() {
  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;
  console.log(Authorization, STATUS);

  let [pstBatch, setPstBatch] = React.useState("Select");
  const pst = () => {
    let val = document.getElementById("det-report").value;
    console.log(val);
    setPstBatch(val);
  };
  console.log(pstBatch);

  const detailedReport = async (e) => {
    const chest = document.getElementById("chest").value;
    if (pst !== "Select" && chest !== "") {
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
      alert("Please enter complete details");
    }
  };

  return (
    <div className="contain">
      <div className="details-card">
        <div className="select-detailed-batch">
          <span>Select Batch</span>
          <select id="det-report" onChange={pst}>
            <option selected>Select</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className="enter-chest">
          <span>Enter Chest No&nbsp;</span>
          <input className="chest" id="chest"></input>
        </div>
        <button className="btndet" onClick={detailedReport}>
          Generate Detailed Report
        </button>
      </div>
    </div>
  );
}

export default DetailedReport;
