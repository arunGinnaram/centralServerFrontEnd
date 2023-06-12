import { useState } from "react";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import axios from "axios";

const Pstbatchupdate = () => {
    const [RegistrationNo, setRegistrationNo] = useState("");

    const handleRegNo = (e) => {
        setRegistrationNo(e.target.value);
    };

    const [data, setData] = useState({
        Name: "",
        PMTDate: "",
        PMTSession: "",
        RollNumber: "",
    });

    const { Name, PMTDate, PMTSession, RollNumber } = data;
    const [showPstbatchupdateDiv, setPstbatchupdateDiv] = useState(false);
     
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
  };

    const handleGetDetails = async () => {
        if (
            RegistrationNo == null ||
            RegistrationNo == undefined ||
            RegistrationNo === ""
        ) {
            showAlert("Please Enter a valid Roll No","red");
        } 
		else
			{
            
                          const details = await axios.get(
                                            `http://localhost:8088/getDetailsToChangePmtBatch?rollNo=${RegistrationNo}`
                                        );
           
            if (details.data.message == "notexist") {
				showAlert("No candidate exists with specified Roll number","red")
				 setPstbatchupdateDiv(false);
            } else {
                if(showPstbatchupdateDiv==false)
                setPstbatchupdateDiv(!showPstbatchupdateDiv);
                setData(details.data);
                
            }
        }
    };
 
    const [newPMTSession, setNewPMTSession] = useState("");

    const onChangeNewPmt = (e) => {
        setNewPMTSession(e.target.value); 
    }

    const updatePst = async (e) => {
         
            if (newPMTSession == null || newPMTSession == "") 
			{
				showAlert("Please enter a valid no","red")
            }

         else {
            const redoM = await axios.get(
                `http://localhost:8088/changePmtBatch?rollNo=${RegistrationNo}&&oldBatch=${data.PMTSession}&&newBatch=${newPMTSession}`
            );
            if(redoM.data.message=="fail"){
				showAlert("PST batch is not updated check once","red");
				setNewPMTSession("");
				document.getElementById("pmtSession").value="";
			}
			else{
				showAlert("PST batch is updated successfully","green");
            setPstbatchupdateDiv(!showPstbatchupdateDiv);
            setRegistrationNo("");
			setNewPMTSession("");
			}
        }



    }

    return (
        <div>
            <form className="text-left mx-2 hiddenform" style={{ scale: "0.95" }}>
                <div class="form-group row">
                    <label class="col-sm-4 col-form-label">
                        <strong style={{ fontSize: "16.5px" }}> PST Batch Update</strong>{" "}
                    </label>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Enter Registration No:</label>
                    <div class="col-sm-5 ">
                        <input
                            type={"text"}
                            value={RegistrationNo}
                            onChange={handleRegNo}
                            placeholder="Registration number"
                            class="form-control"
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
                

                {showPstbatchupdateDiv && (
                    <div className="hiddenform">
                        <hr style={{ marginTop: "-1%", marginBottom: "2%" }}></hr>
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Registration No:</label>
                            <div class="col-sm-5">
                                <input value={RollNumber} readOnly class="form-control" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Name:</label>
                            <div class="col-sm-5">
                                <input value={Name} readOnly class="form-control" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">PST Date:</label>
                            <div class="col-sm-5">
                                <input value={PMTDate} readOnly class="form-control" />
                            </div>
                        </div>

                        

                        <div class="form-group row" style={{ marginTop: "2%" }}>
                            <label class="col-sm-3 col-form-label">PST Old Batch:</label>
                            <div class="col-sm-5">
                                <input type="text" value={PMTSession} readOnly class="form-control" />
                            </div>

                        </div>
                        <hr />

                        <div class="form-group row" style={{ marginTop: "2%" }}>
                            <label class="col-sm-3 col-form-label">PST New Batch:</label>
                            <div class="col-sm-5">
                                <input id="pmtSession" type="text" name="newPMTSession" onChange={onChangeNewPmt} class="form-control" />
                            </div>
                            <div class="col-sm-3 col-form">
                                <button
                                    type="button"
                                    onClick={updatePst}
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

export default Pstbatchupdate;
