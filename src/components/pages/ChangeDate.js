import { useState } from "react";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import axios from "axios";

const ChangeDate = () => {
  const [showDivDate, setshowDivDate] = useState(false);
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
    if (RegistrationNo == null || RegistrationNo == "" ) {
     showAlert("Please Enter a valid Roll No","red");
    } else {
      const details = await axios.post(
        `http://localhost:8088/getDetailsToChangePetDate?rollNo=${RegistrationNo}&batch=petDate`
      );
      
      if (details.data.message == "NODATA") {
		showAlert("No candidate exists with specified Roll Number","red");
      } 
	  else if(details.data.message == "already")
	     {
			showAlert("Result Already Generated for this candidate, you can not change petdate","red");
	  }
	  else {
          	 if (showDivDate == false) 
         setshowDivDate(!showDivDate);
         setRespData(details.data.message);
        
      }
    }
  };
    
    const [newDate, setNewDate] = useState(null);
    const onChangeNewDate = (e) => {
        setNewDate(e.target.value); 
    }

    const updateDate = async (e) => {
         
            if (newDate == null || newDate == "") 
			{
				showAlert("Please enter Date","red");
            }

         else {
			 const  headers = {
        "Access-Control-Allow-Origin": "*"
      };
            const redoM = await axios.post(
                `http://localhost:8088/changePetDate`,{
					rollNo:RegistrationNo,
		          oldDate:document.getElementById("oldDate").value,
		          newDate:document.getElementById("petDate").value,
				},headers
            );
           if(redoM.data.message=="fail"){
				showAlert("PET Date is not updated check once","red");
				 setNewDate("");
				 document.getElementById("petDate").value="";
			}
            else{
				showAlert("PET Date is updated successfully","green");
             setshowDivDate(!showDivDate);
             setRegistrationNo("");
			 setNewDate("");
			}
        }



    }

  return (
    <div >

      <form className="text-left mx-2 hiddenform" style={{ scale: "0.95",overflowX:"hidden",overflowY:"hidden" }}>

        <div class="form-group row" >
          <label class="col-sm-5 col-form-label"><strong style={{ fontSize: "16.5px" }}> Change PET Date </strong> </label>
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
        {showDivDate && (
          <div  className="hiddenform" >
            <div class="form-group row" >
              <label class="col-sm-4 col-form-label">
                Registration Number:
              </label>
              <div class="col-sm-5">
                <input readOnly id="roll" class="form-control" value={respData.RollNumber}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Name:</label>
              <div class="col-sm-5">
                <input readOnly class="form-control" value={respData.Name}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">PET Date:</label>
              <div class="col-sm-5">
                <input readOnly class="form-control" id="oldDate" value={respData.PETDate}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Location:</label>
              <div class="col-sm-5">
                <input readOnly class="form-control" value={respData.PETLocation}/>
              </div>
            </div>

         
         <hr />
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Select PET Date:</label>
              <div class="col-sm-5">
               	  <input id="petDate" onChange={onChangeNewDate} className="form-control" type="date" name="petDate" />
              </div>
              <div class="col-sm-3 col-form">
                <button onClick={updateDate}
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

export default ChangeDate;
