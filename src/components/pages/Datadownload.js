import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";

const Datadownload = (props) => {
	var curr = new Date();
curr.setDate(curr.getDate());
var date1 = curr.toISOString().substring(0,10);
  const [date, setDate] = useState(date1);
  const [venue, setVenue] = useState("select");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(false);

  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  
   function showAlert(message, color){
	    Swal.fire({
                    position: "top-end",
                    width: "auto",
                    showConfirmButton: false,
                    background: color,
                    html: '<p style="color: white;letter-spacing: 1px;font-weight:bold;">'+message+'</p>',
                    showClass: {
                        popup: "animate__animated animate__fadeInLeft",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutLeft",
                    },
                    timer: 3000,
					
                });
   }
  

  const submit = () => {
	  if(venue=="select"){
		  showAlert("Please selsect Location","orange");
	  }
	  else{
       axios.get("http://localhost:8088/downloadVenueData?venueName=" +venue +"&eventDate=" +date,{},
        headers
      )
      .then((response) => {
        if (response.data.message == "nodata") {
		  showAlert("There is nodata with the specified location or date","red");
        } 
		else if(response.data.message == "already"){
		  showAlert("Data is already downloaded","red");
		}
		else {
          setData(response.data.message);
          setStatus(true);
        }
      });
	  }
  };

  const download = () => {
    axios
      .post("http://localhost:8088/addVenueDataToLocal", data, headers)
      .then((response) => {
        alert("Data downloaded successfully");
      });
  };

const close = ()=>{
	setStatus(false);
	setVenue("select");
	setDate(date1);
	document.getElementById("location").value="";
	document.getElementById("petDate").value=date1;
	props.name();
}
  return (
    <div
      style={{ maxWidth: "40%", width: "auto !important" }}
      className="modal-dialog"
    >
      <div className="modal-content">
        {/* <h5 style={{ marginTop: "2%", marginLeft: "2%" }}>Download data</h5>
        <hr style={{ marginTop: "-0.5%" }}></hr> */}
        <div style={{ backgroundColor:"#63A15F",color:"white",padding:"1%" }}>        
          <span  className="text-left mx-2" style={{ marginTop: "1%", marginBottom: "1%", fontSize: "18px", fontWeight: "bolder",letterSpacing:"0.8px" }}>
          Download data
        </span>
        </div>

        <div className="modal-body">
          
            <div className="form-group row">
              <label for="colFormLabel" className="col-sm-4 mt-2">
                Select Date:
              </label>
              <div className="col-sm-5" style={{ marginLeft: "-8%" }}>
                <input
                  onChange={(event) => setDate(event.target.value)}
                  type="date"
                  defaultValue={date1}
                  className="form-control"
                  name="petDate"
                  id="petDate"
                />
              </div>
            </div>

            <div className="form-group row">
                        <label for="colFormLabel" className="col-sm-4 mt-2">
                             Select Location:
                       </label>
              <div className="col-sm-5" style={{ marginLeft: "-8%" }}>
                <select
                  onChange={(event) => setVenue(event.target.value)}
                  className="form-control"
                  name="location"
                  id="location"
                >
                  <option value="select">Select</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
              <div className="col-sm-4 col-form" style={{ marginLeft: "-3%" }}>
                <button
                  type="button"
                  className="btn btn-outline-success "
                  style={{ width: "70%" }}
                  onClick={submit}
                >
                  Get Stats
                </button>
              </div>
               </div>
			   
              {status && (
                <div className="animate__animated animate__fadeInLeft">
				<h6>Details :</h6>
                  <table className="mt-2 table table-bordered">
                    <thead>
                      <tr>
                        <th>PET Date</th>
                        <th>PET Location</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{data.runDate}</td>
                        <td>{data.petlocationName}</td>
                        <td>{data.totalCount}</td>
                      </tr>
                    </tbody>
                  </table>
				  <div className="text-center">
                  <button
                    onClick={download}
                    className="btn btn-primary mt-4">
                    Download data
                  </button>
				  </div>
                </div>
              )}
           
         
        </div>
		<div className="modal-footer"><button onClick={close} className="btn btn-danger">Close</button></div>
      </div>
    </div>
  );
};

export default Datadownload;
