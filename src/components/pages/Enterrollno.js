import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Enterrollno = () => {
  const [showDivC, setShowDivC] = useState(false);

  const [rollNo, setrollNo] = useState("");
  

  const handleChangeDetails = (e) => {
    setrollNo(e.target.value);    
  };

  const [data, setData] = useState({
    Batch: "",
    Bib: "",
    Chip1: "",
    Chip2: "",
    Name: "",
    PETDate: "",
    PETLocation: "",
    RollNumber: "",
  });
  const { Batch, Bib, Chip1, Chip2, Name, PETDate,PETLocation,RollNumber} = data;
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

  const handleGetDetails = async () => {
    if (rollNo == null || rollNo == "" ) {
	  showAlert("Please enter Roll No","red");
    } else {
      const details = await axios.get(
        `http://localhost:8088/getDetailsToChangeBibORBatch?rollNo=${rollNo}&batch=batch`
      );
      
      if (details.data.message == "NODATA") {
		showAlert("No candidate exists with specified Roll number","red");
		 if (showDivC == true) 
			  setShowDivC(false);
      } 
	  else if(details.data.message == "already")
	     {
		showAlert("Candidate result is already generated","red");
		 if (showDivC == true) 
			  setShowDivC(false);
	   }
	  else {
          	 if (showDivC == false) 
         setShowDivC(!showDivC);
         setData(details.data.message);
        
      }
    }
  };
  
  
   const [newBib, setNewBib] = useState("");
   const [newBatch, setNewBatch] = useState("");

    const onChangeNewBib = (e) => {
        setNewBib(e.target.value); 
    }
	
	 const onChangeNewBatch = (e) => {
        setNewBatch(e.target.value); 
    }

    const updateBatch = async (e) => {
        
            if (newBib == "" && newBatch == "") 
			{
				showAlert("Please enter Bib or batch","red")
            }

         else {
			 const headers= {
                      "Access-Control-Allow-Origin": "*"
                     };
            const redoM = await axios.post("http://localhost:8088/changeBatchAndBib",{
				rollNo:rollNo,
				bib:Bib,
				bibNew:newBib,
				batch:Batch,
				batchNew:newBatch
			},headers);
              
          if(redoM.data.message=="fail"){
			  showAlert("Bib is not updated either in PET or in PST or batch in Results","red");
			  setNewBib("");
			 setNewBatch("");
			 document.getElementById("batch1").value="";
			 document.getElementById("chest1").value="";
		  }
		  else{
			   showAlert("Updated successfully","green");
           setShowDivC(!showDivC);
            setrollNo("");
			setNewBib("");
			setNewBatch("");
			 document.getElementById("batch1").value="";
			 document.getElementById("chest1").value="";
          }
        }



    }

  return (
    <div>
      <form className="text-left mx-2 hiddenform" style={{ scale: "0.95" }}>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">
            <strong style={{ fontSize: "16.5px" }}>
              {" "}
              PET Batch and Bib Update
            </strong>{" "}
          </label>
        </div>

        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Enter RollNo:</label>
          <div class="col-sm-5">
            <input onChange={handleChangeDetails} placeholder="Registration number" value={rollNo} class="form-control" />
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
        {showDivC && (
          <div className="hiddenform">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">
                Registration Number:
              </label>
              <div class="col-sm-5">
                <input  value={RollNumber} readOnly class="form-control" />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Name:</label>
              <div class="col-sm-5">
                <input value={Name} readOnly class="form-control" />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">PET Date:</label>
              <div class="col-sm-5">
                <input value={PETDate} readOnly class="form-control" />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Chip1:</label>
              <div class="col-sm-5">
                <input value={Chip1} readOnly class="form-control" />
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Chip2:</label>
              <div class="col-sm-5">
                <input value={Chip2} readOnly class="form-control" />
              </div>
            </div>
			
			<div class="form-group row">
              <label class="col-sm-4 col-form-label">Batch:</label>
              <div class="col-sm-5">
                <input type="text" readOnly value={Batch} class="form-control" />
              </div>
            </div> 
            
			 <div class="form-group row">
            <label class="col-sm-4 col-form-label">Chest Number:</label>
              <div class="col-sm-5">
                <input type="text" readOnly value={Bib} class="form-control" />
              </div>
            </div>
            <hr />
            
         <div class="form-group row">
              <label class="col-sm-4 col-form-label">Batch:</label>
              <div class="col-sm-5">
                <input id="batch1" type="text" onChange={onChangeNewBatch} class="form-control" />
              </div>
			  
            </div> 
            
			 <div class="form-group row">
            <label class="col-sm-4 col-form-label">Chest Number:</label>
              <div class="col-sm-5">
                <input id="chest1" type="text" onChange={onChangeNewBib} class="form-control" />
              </div>
			   <div className="col-sm-3 col-form">
			 <button
			      onClick={updateBatch}
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

export default Enterrollno;
