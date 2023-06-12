import { useState } from "react";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import axios from "axios";

const Changecategory = () => {
  const [showDivCategory, setShowDivCategory] = useState(false);
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
                `http://localhost:8088/getDetailsToChangeCategory?rollNo=${RegistrationNo}`
            );
            if (details.data.message == "NODATA") {
				 showAlert("No candidate exist with specified Roll Number","red")
            } else {
                if(showDivCategory==false)
                setShowDivCategory(!showDivCategory);
               setRespData(details.data);
                
            }
        }
    };

  
    const [newCategory, setNewCategory] = useState("");

    const onChangeNewCategoy = (e) => {
        setNewCategory(e.target.value); 
    }

    const updateCategory = async (e) => {
         
            if (newCategory == null || newCategory == "") 
			{
                showAlert("Please enter a Category","red");
            }

         else {
			 const  headers = {
        "Access-Control-Allow-Origin": "*"
      };
            const redoM = await axios.post(
                `http://localhost:8088/changeCategory`,{
					rollNo:RegistrationNo,
		  category:document.getElementById("category").value,
		  criteriaType:document.getElementById("criteriaType").value,
		  post:document.getElementById("post").value,
		  gender:document.getElementById("gender").value,
		  selectedCategory:newCategory
				},headers
            );
           if(redoM.data.message=="fail"){
				showAlert("Category is not updated check once","red");
				 setNewCategory("");
				 document.getElementById("selectedCategory").value="";
			}
            else{
				showAlert("Category is updated successfully","green");
             setShowDivCategory(!showDivCategory);
             setRegistrationNo("");
			 setNewCategory("");
			}
        }



    }

  return (
    <div >

      <form className="text-left mx-2 hiddenform" style={{ scale: "0.95",overflowX:"hidden",overflowY:"hidden" }}>

        <div class="form-group row" >
          <label class="col-sm-5 col-form-label"><strong style={{ fontSize: "16.5px" }}> Change Category of Candidate </strong> </label>
        </div>


        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Enter Registration No:</label>
          <div class="col-sm-5">
            <input   value={RegistrationNo} placeholder="Registration number"
                            onChange={handleRegNo} class="form-control" type="text" id="chest"/>
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
        {showDivCategory && (
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
              <label class="col-sm-4 col-form-label">Select Category:</label>
              <div class="col-sm-5">
                <select onChange={onChangeNewCategoy} id="selectedCategory" class="form-control"> 
				<option value="" >SELECT</option>
				<option value="UR">UR</option>
				<option value="OBC">OBC</option>
				<option value="SC">SC</option>
				<option value="ST">ST</option>
				</select>
              </div>
              <div class="col-sm-3 col-form">
                <button onClick={updateCategory}
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

export default Changecategory;
