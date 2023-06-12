import { useEffect, useState } from "react";
import axios from "axios";
// import swal from "sweetalert";
import Swal from "sweetalert2";
import "./Enterrollnopstredo.css";
import "animate.css/animate.min.css";

const Enterrollnopstredo = () => {
  const [RollNumber, setRollNumber] = useState("");
  const handlerollno = (e) => {
    setRollNumber(e.target.value);
  };

  const [data, setData] = useState({
    rollno: "",
    name: "",
    height: "",
    weight: "",
    chestNormal: "",
    chestExpanded: "",
  });
  const { rollno, name, height, weight, chestNormal, chestExpanded } = data;

  const [showRedoUpdateDiv, setShowRedoUpdateDiv] = useState(false);
  function showAlert(message,color){
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
  const handleGetDetails = async () => 
  {
    if (RollNumber == null || RollNumber == undefined || RollNumber === "") 
	{
      showAlert("Please Enter a valid Roll No","red");
    } 
	else
		{
              const details = await axios.get(
                            `http://localhost:8088/pstDetails?rollNo=${RollNumber}`
                                 );
       
	   if(details.data.message=="notexist"){
		    showAlert("No candidate exist with the roll number you entered","red");
	   }
	   else if(details.data.message=="nopst"){
		   showAlert("Candidate PST Not Yet Done.","red");
	   }
	  
      else {
          if(showRedoUpdateDiv==false)
             setShowRedoUpdateDiv(!showRedoUpdateDiv);
         setData(details.data.message);
        
          }
      
      }
    
  };

  const [redoType, setRedoType] = useState("");

  const onChangeRedo = (e) => {
    setRedoType(e.target.value);
  };

  const updateRedo = async (e) => {
    if (redoType == "") {
      showAlert("Please select a valid option","red");
    } else {
             const redoM = await axios.get(
                            `http://localhost:8088/pstRedo?rollNo=${RollNumber}&&redoType=${redoType}`
                            );
				if(redoM.data.message=="fail"){
					 showAlert(" PST Data not Cleared check once","red");
					  setRedoType("");
					  document.getElementById("redo").value="";
				}			
         else{
		  showAlert("Candidate PST Data Cleared successfully","green");
		   setShowRedoUpdateDiv(!showRedoUpdateDiv);
          setRollNumber("");
		  setRedoType("");
	    }
     
    }
  };

  return (
    <div>
      <form className="text-left mx-2 hiddenform" style={{ scale: "0.95" }}>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">
            <strong style={{ fontSize: "16.5px", color: "#8f6203" }}>
              {" "}
              PST Redo
            </strong>{" "}
          </label>
        </div>

        <div class="form-group row">
          <label class="col-sm-3 col-form-label">Enter RollNo:</label>
          <div class="col-sm-5">
            <input
              type={"text"}
              placeholder="Roll Number"
              value={RollNumber}
              onChange={handlerollno}
              class="form-control custom-input"
            />
          </div>
          <div class="col-sm-3 col-form">
            <button
              type="button"
              onClick={handleGetDetails}
              className="btn btn-outline-info "
            >
              Get Details
            </button>
          </div>
        </div>
        <hr />
        {showRedoUpdateDiv && (
          <div className="hiddenform">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Roll Number:</label>
              <div class="col-sm-5">
                <input value={rollno} readOnly class="form-control" />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Name:</label>
              <div class="col-sm-5">
                <input value={name} readOnly class="form-control" />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Height:</label>
              <div class="col-sm-5">
                <input value={height} readOnly class="form-control" />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Weight:</label>
              <div class="col-sm-5">
                <input value={weight} readOnly class="form-control" />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Chest Normal:</label>
              <div class="col-sm-5">
                <input value={chestNormal} readOnly class="form-control" />
              </div>
            </div>

            <div className="form-group row" style={{ marginBottom: "2%" }}>
              <label className="col-sm-3 col-form-label">Chest Expanded:</label>
              <div class="col-sm-5">
                <input value={chestExpanded} readOnly class="form-control" />
              </div>
            </div>

            <hr></hr>
            <div class="form-group row" style={{ marginBottom: "0" }}>
              <label class="col-sm-3 col-form-label">Redo Reason:</label>
              <div class="col-sm-5" >
                <select id="redo" class="form-control" onChange={onChangeRedo}>
                  <option value="">Select</option>
                  <option value="claim"> Claim </option>
                  <option value="others"> Others </option>
                </select>
              </div>
              <div class="col-sm-3 col-form">
                <button
                  type="button"
                  className="btn btn-outline-success "
                  style={{ width: "70%" }}
                  onClick={updateRedo}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Enterrollnopstredo;
