import React,{useState,useEffect} from "react";
import "./PetResults.css";
import axios from "axios";
import { useLogin } from "../../context/LoginDetailsContext";

function PstResults() {
  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;
  console.log(Authorization, STATUS);

  let [pstBatch, setPstBatch] = React.useState("Select");
  const[locations, setLocations] = useState([]);
  const[venue, setVenue] = useState("Select");
  const pst = () => {
    let val = document.getElementById("pst").value;
    setPstBatch(val);
  };

  useEffect(()=>{
	  document.getElementById("carousel").setAttribute("class","petcard carousel slide mx-auto zoomed");
	  axios({
        url: "http://localhost:8088/getVenuesFromLocalForImageSync", 
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
           setLocations(response.data);
      });
	  
  },[])
  const attendance = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://localhost:8088/runResults?batch=1&resultType=attendance", //your url
        method: "GET",
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

  const process5kResults = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/processResults?batch=1&resultType=All", //your url
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

  const download5kResults = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/runResults?batch=1&resultType=All", //your url
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

  const download5kQualifiedResults = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/runResults?batch=1&resultType=Q", //your url
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

  const download5kNotQualifiedResults = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/runResults?batch=1&resultType=NQ", //your url
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

  const download5kResultsDistrictwise = async (e) => {
    if (pstBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8088/runResultsDistrictwise?batch=1&resultType=AllDistrict", //your url
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

  const download5kResultsQualifiedDistrictwise = async (e) => {
    if (pstBatch !== "") {
      axios({
        url: "http://192.168.1.96:8088/runResultsDistrictwise?batch=1&resultType=QDistrict", //your url
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

  const download5kResultsNotQualifiedDistrictwise = async (e) => {
    if (pstBatch !== "") {
      axios({
        url: "http://192.168.1.96:8088/runResultsDistrictwise?batch=1&resultType=NQDistrict", //your url
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
  
  
  const venueMet = (event)=>{
	  alert(event.target.value);
  }

  return (
    <div>
      <div className="cont">
        <div  id="carousel" className="petcard carousel slide mx-auto" style={{width:"90%"}}>
         
            
  <ul className="carousel-indicators">  
   <li style={{backgroundColor:"black"}} data-target="#carousel" data-slide-to="0" class="active"></li>
   <li style={{backgroundColor:"black"}} data-target="#carousel" data-slide-to="1"></li>
   <li style={{backgroundColor:"black"}} data-target="#carousel" data-slide-to="2"></li>
  </ul>
 
 
  <div className="carousel-inner">  
     <div style={{height:"400px"}} className="carousel-item active"> 
	       
          	<span class="text-uppercase pull-center">SELECT BATCH</span>	
           <select id="pst" onChange={pst} class="form-control w-25 mx-auto"
									required="required">
									<option>1</option>
                                    <option>2</option>
									<option>3</option>
								</select>
			<span class="text-uppercase pull-center">SELECT LOCATION</span>	
         <select  class="form-control w-25 mx-auto" id="venue" onChange={venueMet}>
              <option selected>ALL</option>
              {locations.map((location)=><option value={location}>{location}</option>)}
            </select>
          <div className="download-pet-pdfs">
            <div className="download-pet-btns">
              <button className="btnpet progress-bar-striped " onClick={attendance}>
                Attendance Report
              </button>
              <button className="btnpet progress-bar-striped " onClick={process5kResults}>
                Process/Generate 5K Results
              </button>
              <button className="btnpet progress-bar-striped ">
                Analysis Report Check Any Discrepancies
              </button>
            </div>
            <div className="download-pet-btns">
              <button className="btnpet progress-bar-striped " onClick={download5kResults}>
                Download 5K Results
              </button>
              <button className="btnpet progress-bar-striped " onClick={download5kQualifiedResults}>
                Download 5K Qualified Results
              </button>
              <button
                className="btnpet progress-bar-striped "
                onClick={download5kNotQualifiedResults}
              >
                Download 5K Not Qualified Results
              </button>
            </div>
           
          </div></div> 
     <div style={{height:"400px"}} className="carousel-item"> <div className="select-pst-batch">
            <span>Select Batch</span>
            <select id="pst" >
              <option selected>Select</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="download-pdfs">
            <div className="download-btns">
              <button className="btnpst progress-bar-striped">
                PST Consolidated Report
              </button>
              <button className="btnpst progress-bar-striped">
                PST Qualified Report
              </button>
              <button className="btnpst progress-bar-striped">
                PST Not Qualified Report
              </button>
            </div>
            <div className="download-btns">
              <button className="btnpst progress-bar-striped" >
                PST Consolidated Report Districtwise
              </button>
              <button
                className="btnpst progress-bar-striped"
                
              >
                PST Qualified Report Districtwise
              </button>
              <button
                className="btnpst progress-bar-striped"
                
              >
                PST Not Qualified Report Districtwise
              </button>
            </div>
          </div>
		  
          <div className="cand-pst">
            <span>Enter Roll No/Chest No</span>
            <input className="chest" id="chest"></input>
            <button className="btnpstsheet progress-bar-striped">
              Candidate PST Sheet
            </button>
          </div></div>
     <div style={{height:"400px"}} className="carousel-item">
	   <div className="details-card">
        <div className="select-detailed-batch">
          <span>Select Batch</span>
          <select id="det-report">
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
        <button className="btndet">
          Generate Detailed Report
        </button>
      </div>
	 </div>
  </div>
               
      
      </div>
      </div>
    </div>
  );
}

export default PstResults;
