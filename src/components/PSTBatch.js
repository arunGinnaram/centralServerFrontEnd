import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import axios from "axios";

const PSTBatch = (props) => {
  const batchListURL = "http://localhost:8088/updateBatchForPMT?";
  let [batchNo, setBatchNo] = React.useState([]);
  const [batch, setBatch] = useState("");
  const [maxcount, setMaxcount] = useState("");
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  useEffect(() => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    axios.post(batchListURL, {}, { headers }).then((response) => {
      setBatchNo(response.data.batchList);
    });
  }, []);

 const batchUpdate = () => {
	  if(batch=="" || batch==null){
		  showAlert("Please select a batch","red");
		 }
	  else if(maxcount=="" || maxcount==null){
		  showAlert("Please enter count for a batch","red");			
	  }
			else{
				 axios.post(batchListURL + "batch=" + batch + "&maxCount=" + maxcount,{}, headers)
              .then((response) => {
				             if(response.data.status=="success")
                                  showAlert("PST Batch updated successfully","green");
							  else
								  showAlert("PST Batch not updated","red");
							  
                                  setBatchNo(response.data.batchList);
                                  document.getElementById("sel").selected = true;
                                  document.getElementById("count").value = "";
                                });
	                          setBatch("");
	                          setMaxcount("");
							  
							  
			}
	  
   
  };
  
  function showAlert( message ,  color){
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

  return (
    <div
      style={{ maxWidth: "40%", width: "auto !important" }}
      className="modal-dialog"
    >
      <div className="modal-content">
       
        <div style={{ backgroundColor:"#63A15F",color:"white",padding:"1%" }}>        
          <span  className="text-left mx-2" style={{ marginTop: "1%", marginBottom: "1%", fontSize: "18px", fontWeight: "bolder",letterSpacing:"0.8px" }}>
          PST Batch
        </span>
        </div>

        <div className="modal-body">
          <form>
            <div className="form-group row">
              <label for="colFormLabel"  className="col-sm-3 mt-2" >
                Select batch:
              </label>
              <div className="col-sm-5 ">
                <select
                  onChange={(e) => setBatch(e.target.value)}
                  className="form-control"
                  name="batch"
                  id="batchNo"
                >
                  <option id="sel" value="">
                    Batch
                  </option>
                  {batchNo.map((elem) => (
                    <option>{elem}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label for="colFormLabel" className="col-sm-3 mt-2">
                Enter Count:
              </label>
              <div className="col-sm-5">
                <input
                  onChange={(e) => setMaxcount(e.target.value)}
                  id="count"
                  className="form-control "
                  type="text"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer" style={{maxHeight:"55px"}} >
          <button
            onClick={batchUpdate}
            type="button"
            class="btn btn-outline-success btn-sm"
          >
            Update
          </button>
          <button
            type="button"
            onClick={props.name}
            class="btn btn-outline-danger btn-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PSTBatch;