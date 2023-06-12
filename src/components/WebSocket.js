import React, { useState,useEffect } from "react";
import SockJsClient from "react-stomp";
import axios from "axios";
import $ from "jquery";



const WebSocket = () => {


  const connect = () => {
    axios.get("http://localhost:8088/webscoketConnection").then((resp) => {
      console.log("response: " + resp.data);
    });

  };
  
  useEffect(()=>{
	   $("#disconnect").prop("disabled", true);
  },[]);

  //listen to clients
  const cclient = () => {
    
    axios.get("http://localhost:8088/cclient");
	 $("#disconnect").prop("disabled", false);
     $('#cclient').prop("disabled", true);
   
  };

  //disconnect the port opened
  const disconnect = () => {
   
    axios.get("http://localhost:8088/disconnect")
	 $("#disconnect").prop("disabled", true);
     $('#cclient').prop("disabled", false);
     

  };

  return (
    <div>
      <div
        style={{ maxWidth: "30%", width: "auto !important" }}
        className="modal-dialog"
      >
        <div className="modal-content">
          <div style={{ backgroundColor:"#63A15F",color:"white",padding:"1%" }}>        
          <span  className="text-left mx-2" style={{ marginTop: "1%", marginBottom: "1%", fontSize: "18px", fontWeight: "bolder",letterSpacing:"0.8px" }}>
          Store
        </span>
        </div>

          <div className="modal-body">

            <br></br>

            <div style={{ marginLeft: "33%" }}>

              <div class="form-group row">
                <button
                  type="button"
                  onClick={cclient}
                  id="cclient"
                  className="btn btn-outline-warning "
                  style={{ width: "50%" }}>
                  Start
                </button>
              </div>

             
            </div>
          </div>


          <div className="modal-footer">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSocket;