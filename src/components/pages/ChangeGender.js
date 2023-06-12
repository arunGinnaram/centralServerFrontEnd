import { useState } from "react";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import axios from "axios";

const ChangeGender = () => {
  const [showDivGender, setShowDivGender] = useState(false);
  const [respData, setRespData] = useState({});
  const [RegistrationNo, setRegistrationNo] = useState("");

    const handleRegNo = (e) => {
        setRegistrationNo(e.target.value);
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
  
   const handleGetDetails = async () => {
        if (
            RegistrationNo == null ||
            RegistrationNo == undefined ||
            RegistrationNo === ""
        ) {
			showAlert("Please Enter a valid Roll No","red");
        } else {
            const details = await axios.get(
                `http://localhost:8088/getDetailsToChangeGender?rollNo=${RegistrationNo}`
            );
            if (details.data.message == "NODATA") {				
				showAlert("No candidate exist with specified Roll Number","red")
            } else {
                if(showDivGender==false)
                setShowDivGender(!showDivGender);
               setRespData(details.data);
                
            }
        }
    };
    
    const [newGender, setNewGender] = useState("");
    const onChangeNewGender = (e) => {
        setNewGender(e.target.value); 
    }

    const updateGender = async (e) => {
         
            if (newGender == null || newGender == "") 
			{
				showAlert("Please enter a gender","red");
            }

         else {
			 const  headers = {
        "Access-Control-Allow-Origin": "*"
      };
            const redoM = await axios.post(
                `http://localhost:8088/changeGender`,{
					rollNo:RegistrationNo,
		  category:document.getElementById("category").value,
		  criteriaType:document.getElementById("criteriaType").value,
		  post:document.getElementById("post").value,
		  gender:document.getElementById("gender").value,
		  selectedGender:newGender
				},headers
            );
            if(redoM.data.message=="fail"){
				showAlert("Gender is not updated check once","red");
				 setNewGender("");
				 document.getElementById("selectedGender").value="";
			}
			else{
				showAlert("Gender is updated successfully","green");
             setShowDivGender(!showDivGender);
             setRegistrationNo("");
			 setNewGender("");
			}
        }



    }

  return (
    <div >

      <form className="text-left mx-2 hiddenform" style={{ scale: "0.95",overflowX:"hidden",overflowY:"hidden" }}>

        <div class="form-group row" >
          <label class="col-sm-5 col-form-label"><strong style={{ fontSize: "16.5px" }}> Change gender of Candidate </strong> </label>
        </div>


        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Enter Registration No:</label>
          <div class="col-sm-5">
            <input  value={RegistrationNo}
                            onChange={handleRegNo} placeholder="Registration number" class="form-control" type="text" id="chest"/>
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
        {showDivGender && (
          <div  className="hiddenform" >
            <div class="form-group row" >
              <label class="col-sm-4 col-form-label">
                Registration Number:
              </label>
              <div class="col-sm-5">
                <input readOnly id="roll" class="form-control" value={respData.message.rollNumber}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Name:</label>
              <div class="col-sm-5">
                <input readOnly class="form-control" value={respData.message.Name}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">PET Date:</label>
              <div class="col-sm-5">
                <input readOnly class="form-control" value={respData.message.petDate}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">PST Batch:</label>
              <div class="col-sm-5">
                <input readOnly class="form-control" value={respData.message.pstBatch}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Gender:</label>
              <div class="col-sm-5">
                <input id="gender" readOnly class="form-control" value={respData.message.gender}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Chest Number:</label>
              <div class="col-sm-5">
                <input readOnly class="form-control" value={respData.message.Bib}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Post:</label>
              <div class="col-sm-5">
                <input id="post" readOnly class="form-control" value={respData.message.post}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Category:</label>
              <div class="col-sm-5">
                <input id="category" readOnly class="form-control" value={respData.message.category}/>
              </div>
            </div>
			<input id="criteriaType" type="hidden" value={respData.message.criteriaType} />
         <hr />
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Select Gender:</label>
              <div class="col-sm-5">
                <select onChange={onChangeNewGender} id="selectedGender" class="form-control"> 
				<option value="" >SELECT</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				
				</select>
              </div>
              <div class="col-sm-3 col-form">
                <button onClick={updateGender}
                  type="button"
                  className="btn btn-outline-success "
                  style={{ width: "70%" }}
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

export default ChangeGender;
