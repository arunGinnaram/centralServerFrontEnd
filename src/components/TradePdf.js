import React from "react";
import "./DayEndReport.css";
import axios from "axios";
import { useLogin } from "../context/LoginDetailsContext";

function DayEndReport() {
  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;

  
  const trades =
    "http://192.168.1.96:8088/excelDataTrade";

  let [trade, setTrade] = React.useState([]);
 
  let [categoryVal, setcategoryVal] = React.useState([]);

  React.useEffect(() => {
    const headers = {
      "Access-Control-Allow-Origin": "*"
      
    };
    axios
      .get(trades, { headers })
      .then((response) => {
        setTrade(response.data);
		
      });
  }, []);

 
 

 
  const category = (event)=>{
	 setcategoryVal(event.target.value);
 }
 
 const submit = ()=>{
		  axios({
        url: "http://localhost:8088/printDayEndReportR_trade?trade=DFG&resultType=All", 
        method: "GET",
        responseType: "blob", 
        headers: {
          "Access-Control-Allow-Origin": "*"
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
 }
  return (<div>
     <h3 className="text-center">Day end reports</h3>
	 	
	
 
 <div class="form-group mt-3 row">
    <label for="category" class="col-sm-4  text-right col-form-label">Category :</label>
    <div class="col-sm-5 w-25">
      <select onChange={category} class="form-control" id="category">
	  <option selected value="">Select</option>
	  {trade.map((elem)=><option>{elem}</option>)}
	  </select>
    </div>
  </div>
	<button onClick={submit} class="btn btn-primary">Download</button>
	 		   
    </div>);
}

export default DayEndReport;
