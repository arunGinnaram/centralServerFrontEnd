import React from "react";
import "./DayEndReport.css";
import axios from "axios";
import { useLogin } from "../context/LoginDetailsContext";

function DayEndReport() {
  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;

  const dayEndReportsURL = "http://localhost:8088/dayEndReports?";
  

  const consolidated = () => {
    axios({
      url: dayEndReportsURL+"resultType=DayConsolidated", //your url
      method: "GET",
      responseType: "blob", // important
      data: {
        
         
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
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
  };

  const qualified = () => {
    axios({
      url: dayEndReportsURL+"resultType=DayQ", //your url
      method: "GET",
      responseType: "blob", // important
      data: {
       
         
      },
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
  };

  const notQualified = () => {
    axios({
      url: dayEndReportsURL+"resultType=DayNQ", //your url
      method: "GET",
      responseType: "blob", // important
      data: {
        
        
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
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
  };


  return (<div>
  
     <h4 className="">Day end reports</h4>
	 
	 <div className="nav justify-content-center mt-4">
	 	<a onClick={consolidated} style={{color:"black"}} className="nav-link  ml-5" href="#"> <i
                  className="fa fa-download ml-4"
                  style={{ color: "black", fontSize: "1.5rem" }}
                ></i><br /><span>Consolidated</span></a>
		
        <a onClick={qualified} style={{color:"black"}} className="nav-link  ml-5" href="#"> <i
                  className="fa fa-download ml-3"
                  style={{ color: "black", fontSize: "1.5rem" }}
                ></i><br />Qaulified</a>

        <a onClick={notQualified} style={{color:"black"}} className="nav-link  ml-5" href="#"> <i
                  className="fa fa-download ml-4"
                  style={{ color: "black", fontSize: "1.5rem" }}
                ></i><br />Not qualified</a>				
      </div>
	 		   
    </div>);
}

export default DayEndReport;
