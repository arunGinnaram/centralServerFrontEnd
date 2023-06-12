import React,{useEffect,useState} from "react";
import "./BatchwiseRunStats.css";
import axios from "axios";
import { useLogin } from "../context/LoginDetailsContext";

function BatchwiseRunStats() {
	var curr = new Date();
curr.setDate(curr.getDate());
var date1 = curr.toISOString().substring(0,10);
  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;
  const[locations, setLocations] = useState([]);
  const[venue, setVenue] = useState("Select");
  const[date, setDate] = useState(date1);
  const[statsTable, setStatsTable] = useState([]);
  let statsTables = [];
 
     const venueMet = (event)=>{
	     setVenue(event.target.value);
     }
	 
	 const dateSet = (event)=>{
	     setDate(event.target.value);
     }
	 	 
	 const submit = ()=>{
		  axios({
        url: "http://localhost:8088/batchWiseStatistics?petDate="+date, 
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
		  
		   for (let i = 0; i < response.data.list.length; i++) {
            statsTables.push(
      <tr>
        <td>
          <strong>Batch</strong>
        </td>
        <td>
          <strong>Registered</strong>
        </td>
        <td>
          <strong>Qualified</strong>
        </td>
        <td>
          <strong>Not Qualified</strong>
        </td>
      </tr>
    );
	
	for (let j = 0; j < response.data.list[i].list.length; j++) 
	{
      statsTables.push(
        <tr>
          <td>{response.data.list[i].list[j].batch}</td>
          <td>{response.data.list[i].list[j].batchCount}</td>
          <td>{response.data.list[i].list[j].batchQualifiedCount}</td>
          <td>{response.data.list[i].list[j].batchNotQualifiedCount}</td>
        </tr>
      );
    }
	
	
	setStatsTable( 
	<>
	 <h4>Statistics of venue:&nbsp;{response.data.list[i].location}</h4>
	<table className="tabl">
        <tbody>{statsTables}</tbody>
      </table></>);
    statsTables = [];
	
		   }
      });
	 }

  return (
    <div className="stats">
	 
	   <h3 className="text-center">Batchwise statistics</h3>
       <div className="form-group mt-2">
	      <span className="text-uppercase pull-center">Select Date</span>	
        <input id="petDate" onChange={dateSet} defaultValue={date1} className="form-control w-25 mx-auto" type="date" name="petDate"></input>
		</div>
	     <button onClick={submit} className="btn btn-primary mx-auto w-25">Get Stats</button>  
        		   
		   <div className="tbl mx-auto mt-3">{statsTable}</div>
		  
    </div>
  );
}

export default BatchwiseRunStats;
