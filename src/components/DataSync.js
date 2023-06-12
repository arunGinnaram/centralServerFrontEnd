import React,{useState,useEffect} from 'react'
import axios from "axios";


function DataSync(){

   const[batch, setBatch] = useState("select");
   const[data, setData] = useState(null);
   const[status, setStatus] = useState(false);
          const headers = {
          "Access-Control-Allow-Origin": "*"
        };
 const submit = ()=>{
	   axios.get("http://localhost:8088/getStatisticsForSync?batch="+batch,{},headers)
	   .then((response)=>{
		  
		   setData(response.data);
		   setStatus(true);
		   });
   };
    const sync = ()=>{
	    axios.post("http://localhost:8088/syncData",data,headers)
	   .then((response)=>{
		    alert("Data Synced successfully");
		   });
   };
   return(<div>
          <button onClick={submit}>Sync data</button>
		    <select onChange={(e)=>setBatch(e.target.value)} id="batch"  className="form-control w-25 mx-auto">
		<option value="">Select</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		</select>
		  <button>Sync Images</button>
		  
		   {status && <div><table className="mt-4 w-50 mx-auto">
		      
			  <tbody><tr><td>PET Date</td><td>{data.runDate}</td></tr>
			         <tr><td>PET Location</td><td>{data.petlocationName}</td></tr></tbody>
		 </table>
		  <button onClick={sync} className="btn btn-primary mx-auto mt-4 w-25">Sync data</button>  
		 </div>}
   </div>);
}

export default DataSync