import { useState } from "react";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import axios from "axios";

const ClearRegistration = () => {
  const [showDivClear, setShowDivClear] = useState(false);
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
                `http://localhost:8088/getDetailsToClearRegistration?rollNo=${RegistrationNo}`
            );
            if (details.data.message == "NODATA") {
				showAlert("No candidate with specified Roll number","red");
            }else if(details.data.message == "already"){
             showAlert("Result already generated","red");
			} else if(details.data.message == "not"){
			 showAlert("Not registered yet","red");
			}else {
				
                if(showDivClear==false)
                setShowDivClear(!showDivClear);
               setRespData(details.data);
                
            }
        }
    };
    
    const clearRegistration = async (e) => 
	{
                
			const  headers = { "Access-Control-Allow-Origin": "*" };
            const redoM = await axios.post(
                `http://localhost:8088/clearRegistration`,{
					rollNo:RegistrationNo,
		             bib:document.getElementById("bib").value,
		             batch:document.getElementById("batch").value,
		             chip1:document.getElementById("post").value,
		             chip2:document.getElementById("gender").value
				},headers
            );
             if(redoM.data.message=="not"){
				 showAlert("Candidate not registered Yet","red");
			 }
			 else if(redoM.data.message=="fail"){
				  showAlert("Candidate registration is not cleared check once","red");
			 }
			 else{
				   showAlert("Candidate registration cleared successfully","green");
				   setShowDivClear(!showDivClear);
                   setRegistrationNo("");
			 }

            
        
    }

  return (
    <div >

      <form className="text-left mx-2 hiddenform" style={{ scale: "0.95",overflowX:"hidden",overflowY:"hidden" }}>

        <div class="form-group row" >
          <label class="col-sm-5 col-form-label"><strong style={{ fontSize: "16.5px" }}> Clear candidate registration </strong> </label>
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
        {showDivClear && (
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
              <label class="col-sm-4 col-form-label">Bib:</label>
              <div class="col-sm-5">
                <input id="bib" readOnly class="form-control" value={respData.Bib}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Chip1:</label>
              <div class="col-sm-5">
                <input id="chip1" readOnly class="form-control" value={respData.Chip1}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Chip2:</label>
              <div class="col-sm-5">
                <input id="chip2" readOnly class="form-control" value={respData.Chip2}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">PETDate:</label>
              <div class="col-sm-5">
                <input readOnly class="form-control" value={respData.PETDate}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">PETLocation:</label>
              <div class="col-sm-5">
                <input id="post" readOnly class="form-control" value={respData.PETLocation}/>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Batch:</label>
              <div class="col-sm-5">
                <input id="batch" readOnly class="form-control" value={respData.Batch}/>
              </div>
            </div>
			
         <hr />
            <div class="form-group mx-auto w-25">
              
           
              <div class="col-form">
                <button onClick={clearRegistration}
                  type="button"
                  className="btn btn-outline-success "
                  style={{ width: "100%" }}>
                  Clear Registration
                </button>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};

export default ClearRegistration;
