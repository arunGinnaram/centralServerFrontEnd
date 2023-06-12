import React, { useState } from "react";
import Swal from "sweetalert2";
import "animate.css/animate.min.css";
import {
  Link,
  Routes,
  Route,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./SideNav.css";
import "./Dock.css";
import axios from "axios";
import { useLogin } from "../context/LoginDetailsContext";
import Login from "./Login";
// import $ from 'jquery';
import Popper from 'popper.js';
import SockJsClient from "react-stomp";
import BatchwiseRunStats from "./BatchwiseRunStats";
import Tradewise from "./Tradewise";
import PSTBatch from "./PSTBatch";
import PETBatch from "./PETBatch";
import WebSocket from "./WebSocket";
import TradePdf from "./TradePdf";
import DayEndReport from "./DayEndReport";
import DataChanges from "./pages/DataChanges";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Datadownload from "./pages/Datadownload";

function SideNav() {
  const currentSessionURL = "http://localhost:8088/getCurrentSession";
  const pmtURL = "http://localhost:8088/updateBatchForPMT";
  const deleteTimesURL = "http://localhost:8088/deleteTimes(delete)";
  const dayCompleteURL = "http://localhost:8088/dayCompleted";

  const batchListURL = "http://localhost:8088/updateBatchForRun";
  const serverConnectionURL = "http://localhost:8085/actuator/health/db";

  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;

  const navigate = useNavigate();

  let [mySqlStatus, setMySqlStatus] = React.useState("");
  let [sqlStatus, setSqlStatus] = React.useState("");
  let [session, setSession] = React.useState({});
  let [stats, setStats] = React.useState("");

  const SOCKET_URL = 'http://localhost:8080/ws-message';

  const [message, setMessage] = useState(localStorage.getItem("value"));
    const [isClientStarted, setIsClientStarted] = useState(false);

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        localStorage.setItem("value", msg.message)
        setMessage(msg.message);
    }

    React.useEffect(() => {
        setIsClientStarted(localStorage.getItem('isClientStarted') === 'true');
    }, []);

    const toggleClient = () => {
        if (isClientStarted) {
            axios.get("http://localhost:8080/disconnect")
            setIsClientStarted(false);
            localStorage.setItem('isClientStarted', false);
            // setMessage('0');
        } else {
            axios.get("http://localhost:8080/cclient");
            setIsClientStarted(true);
            localStorage.setItem('isClientStarted', true);
            // alert("Started");
        }
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

  React.useEffect(() => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    axios.get(serverConnectionURL, {}, { headers }).then((response) => {
      setMySqlStatus(response.data.components.mysqldataSource.status);
      setSqlStatus(response.data.components.mysqldataSource.status);
    });
  }, []);
  
  
    React.useEffect(() => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    axios.get(currentSessionURL, {}, { headers }).then((response) => {
     setSession(response.data.batch);
    });
  }, [session]);
  


  const dayCompleted = () => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
    };
    axios.post(dayCompleteURL, { headers }).then((response) => {
		
     if(response.data.STATUS=="success"){
		 showAlert("Day completed", "green");
	 }
	 else{
		  showAlert("Day not completed", "red");
	 }
    });
  };

  const close = () => {
    setStats("");
    $("#modal").modal("hide");
    document.getElementById("first").style.display = "block";
    document.getElementById("first").style.position = "inherit";

    document.getElementById("second").style.display = "none";
    document.getElementById("second").style.position = "absolute";
  };
  
    const back = () => {
    setStats("");
  
    document.getElementById("first").style.display = "block";
    document.getElementById("first").style.position = "inherit";

    document.getElementById("second").style.display = "none";
    document.getElementById("second").style.position = "absolute";
	
	document.getElementById("back").style.visibility = "hidden";
  };

  const display = (event) => {
    const stats = event.currentTarget.getAttribute("id");
	document.getElementById("back").style.visibility = "visible";
    setStats(stats);
    document.getElementById("first").style.display = "none";
    document.getElementById("first").style.position = "absolute";

    document.getElementById("second").style.display = "block";
    document.getElementById("second").style.position = "inherit";
  };

  const reportMale = () => {
    axios({
      url: "http://localhost:8088/maleStats", //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const reportFeMale = () => {
    axios({
      url: "http://localhost:8088/feMaleStats", //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const total = () => {
    axios({
      url: "http://localhost:8088/dayStatistics", //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const sub = () => {
    axios({
      url: "http://localhost:8088/dayStatisticsSI", //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const dayEndExcel = () => {
    axios({
      url: "http://localhost:8088/dayEndExcel", //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const imageData = () => {
    axios({
      url: "http://localhost:8088/imageData", //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const dataExcel = () => {
    axios({
      url: "http://localhost:8088/dataExcel", //your url
      method: "GET",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  const dockItems = [
    { name: "Dashboard", icon: "📋" },
    { name: "Results", icon: "📊" },
    { name: "DataChanges", icon: "📝" },
    { name: "Statistics", icon: "📈" },
    { name: "Sync Data", icon: "📡" },
    { name: "Download", icon: "📥" },
    { name: "PET Batch", icon: "📦" },
    { name: "PST Batch", icon: "🗄️" },
    { name: "DayComplete", icon: "🌅" },
    { name: "Local", icon: "" }, //🏄‍♂️
    { name: "Server", icon: "" }, //🌐
    { name: "Live results", icon: "🎙️" },
    { name: "Store", icon: "🔲" },

    { name: "Logout", icon: "🚶‍♂️" },
  ];

  const item0 = dockItems[0];
  const item1 = dockItems[1];
  const item2 = dockItems[2];
  const item3 = dockItems[3];
  const item4 = dockItems[4];
  const item5 = dockItems[5];
  const item6 = dockItems[6];
  const item7 = dockItems[7];
  const item8 = dockItems[8];
  const item9 = dockItems[9];
  const item10 = dockItems[10];
  const item11 = dockItems[11];
  const item12 = dockItems[12];
  const item13 = dockItems[13];

  // const [pstmodal,setPstmodal] = useState(false);

  const closePSTmodal = () => {
    $("#modalPSTBatch").modal("hide");
  };

  const closePETmodal = () => {
    $("#modalPETBatch").modal("hide");
  };

  const closeDataChangesModal = () => {
    $("#dataChanges").modal("hide");
  };

  const closeDownloadModal = () => {
    $("#modalDownload").modal("hide");
  };

  $("#modal").on("hide.bs.modal", function () {
    setStats("");
    document.getElementById("first").style.display = "block";
    document.getElementById("first").style.position = "inherit";

    document.getElementById("second").style.display = "none";
    document.getElementById("second").style.position = "absolute";
  });
  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/message"]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />
      <div className="dock" style={{ scale: "0.85" }}>
        <div
          className={`dock-item ${hoverIndex === 0 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          <Link className="nav-link" to="/SideNav/Dashboard">
            <div className="dock-icon">{item0.icon}</div>
            <span className="dock-text">{item0.name}</span>
          </Link>
        </div>

        <div
          className={`dock-item ${hoverIndex === 2 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          <a
            data-toggle="modal"
            data-target="#modalDataChanges"
            aria-expanded="false"
            style={{ color: "white" }}
          >
            <div className="dock-icon">{item2.icon}</div>
            <span className="dock-text">{item2.name}</span>
          </a>
        </div>

        <div
          className={`dock-item ${hoverIndex === 3 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        >
          <a
            data-toggle="modal"
            data-target="#modal"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ color: "white" }}
          >
            <div className="dock-icon">{item3.icon}</div>
            <span className="dock-text">{item3.name}</span>
          </a>
        </div>

        <div
          className={`dock-item ${hoverIndex === 4 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave} >
           <a onClick={() => { navigate("dataSync") }}>
            <div className="dock-icon">{item4.icon}</div>
            <span className="dock-text">{item4.name}</span>
          </a>
        </div>

        <div
          className={`dock-item ${hoverIndex === 5 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={handleMouseLeave}
        >
          <a
            data-toggle="modal"
            data-target="#modalDownload"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ color: "white" }}
          >
            <div className="dock-icon">{item5.icon}</div>
            <span className="dock-text">{item5.name}</span>
          </a>
        </div>

        <div
          className={`dock-item ${hoverIndex === 7 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(7)}
          onMouseLeave={handleMouseLeave}
        >
          <a
            data-toggle="modal"
            data-target="#modalPSTBatch"
            aria-expanded="false"
            style={{ color: "white" }}
          >
           <div className="position-relative d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white" style={{width: "42px", height: "42px",top:"5px"}}>
  <span className="position-absolute font-weight-bold" style={{fontSize: "1.5rem", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>{session.batchPMT}</span>
</div><br />
            <span className="dock-text">{item7.name}</span>
          </a>
        </div>

        <div
          className={`dock-item ${hoverIndex === 6 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(6)}
          onMouseLeave={handleMouseLeave}
        >
		  
          <a
            data-toggle="modal"
            data-target="#modalPETBatch"
            aria-expanded="false"
            style={{ color: "white" }}
          >
		   
          <div className="position-relative d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white" style={{width: "42px", height: "42px",top:"5px"}}>
  <span className="position-absolute font-weight-bold" style={{fontSize: "1.5rem", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>{session.batchRun}</span>
</div><br />
            <span className="dock-text">{item6.name}
</span>
          </a>
        </div>

        <div
          className={`dock-item ${hoverIndex === 8 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(8)}
          onMouseLeave={handleMouseLeave}
        >
          <a  onClick={dayCompleted}
            aria-expanded="false"
            style={{ color: "white" }} >
          <div className="dock-icon"  style={{marginLeft:"20%"}}  >{item8.icon}</div>
          <span className="dock-text"  style={{marginLeft:"-3%"}}   >{item8.name}</span>
          </a>
        </div>

        <div
          className={`dock-item ${hoverIndex === 9 ? "hover" : ""} mt-2 mr-1  `}
          onMouseEnter={() => handleMouseEnter(9)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              
              width: "2.2rem",
              height: "2.2rem",
              borderRadius: "50%",
              backgroundColor: mySqlStatus === "UP" ? " #00e600" : "#ff0000",
            }}
          >  </div>
          <span className="dock-text"  style={{marginLeft:"3%"}} >{item9.name}</span>
        </div>

        <div
          className={`dock-item ${hoverIndex === 10 ? "hover" : ""} mt-2 ` }
          onMouseEnter={() => handleMouseEnter(10)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              width: "2.2rem",
              height: "2.2rem",
              borderRadius: "50%",
              backgroundColor: sqlStatus === "UP" ? " #00e600" : "#ff0000",
            }}
          ></div>
          <span className="dock-text">{item10.name}</span>
        </div>

        <div
          className={`dock-item ${hoverIndex === 11 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(11)}
          onMouseLeave={handleMouseLeave}
        >
          <a
            onClick={() => {
              navigate("Table");
            }}  
          >
            <div className="dock-icon">{item11.icon}</div>
            <span className="dock-text">{item11.name}</span>
          </a>
        </div>

        <div
          className={`dock-item ${hoverIndex === 12 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(12)}
          onMouseLeave={handleMouseLeave}
        >
          <a data-toggle="modal" data-target="#modalWebsocket">
            
		  <div className="dock-icon">{message}</div>}
            <span className="dock-text">{item12.name}</span>
          </a>
        </div>

        <div
          className={`dock-item ${hoverIndex === 13 ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(13)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="dock-icon">{item13.icon}</div>
          <span className="dock-text">{item13.name}</span>
        </div>
      </div>


      <div className="modal fade" id="modal">
        <div
          style={{ maxWidth: "80%", width: "auto !important" }}
          className="modal-dialog"
        >
          <div className="modal-content">
          <div style={{ backgroundColor:"#63A15F",color:"white",padding:"1%" }}>        
          <span  className="text-left mx-2" style={{ marginTop: "1%", marginBottom: "1%", fontSize: "18px", fontWeight: "bolder",letterSpacing:"0.8px" }}>
         Statistics
        </span>
        </div>
            <div className="modal-body" style={{ width: "97%" }}>
              <div id="first" className="card-columns">
                <div
                  id="batch"
                  onClick={display}
                  className="card bg-secondary p-1 fade-in-top"
                >
                  <div className="card-body text-center">
                    <p className="card-text">
                      <span style={{ color: "black" }}>
                        Batchwise Statistics
                      </span>
                    </p>
                  </div>
                </div>

                <div className="card bg-secondary p-1 fade-in-left">
                  <div className="card-body text-center">
                    <p className="card-text">
                      <span style={{ color: "black" }} onClick={reportMale}>
                        Day Statistics Report Male
                      </span>
                    </p>
                  </div>
                </div>

                <div className="card bg-secondary p-1 fade-in-right">
                  <div className="card-body text-center">
                    <p className="card-text">
                      <span style={{ color: "black" }} onClick={reportFeMale}>
                        Day Statistics Report FeMale
                      </span>
                    </p>
                  </div>
                </div>

                <div className="card bg-secondary p-1 fade-in-left">
                  <div className="card-body text-center">
                    <p className="card-text">
                      <span style={{ color: "black" }} onClick={total}>
                        Day Statistics Report Total
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  id="dayEnd"
                  onClick={display}
                  className="card bg-secondary p-1 fade-in-top"
                >
                  <div className="card-body text-center">
                    <p className="card-text">
                      <span style={{ color: "black" }}>Day end reports</span>
                    </p>
                  </div>
                </div>

                <div className="card bg-secondary p-1 fade-in-right">
                  <div className="card-body text-center">
                    <p className="card-text">
                      <span style={{ color: "black" }} onClick={sub}>
                        Day Statistics Report(Sub Inspector)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="card bg-secondary p-1 fade-in-left">
                  <div className="card-body text-center">
                    <span style={{ color: "black" }} onClick={dayEndExcel}>
                      Download day end excel
                    </span>
                  </div>
                </div>

                <div className="card bg-secondary p-1 fade-in-down">
                  <div className="card-body text-center">
                    <p className="card-text">
                      <span style={{ color: "black" }} onClick={imageData}>
                        Download image data
                      </span>
                    </p>
                  </div>
                </div>

                <div className="card bg-secondary p-1  fade-in-right ">
                  <div className="card-body text-center">
                    <p className="card-text">
                      <span style={{ color: "black" }} onClick={dataExcel}>
                        Download data in excel
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  id="trade"
                  onClick={display}
                  className="card bg-secondary p-1  fade-in-left "
                >
                  <div className="card-body text-center">
                    <p className="card-text">
                      <span style={{ color: "black" }}>
                        Download data in excel trade wise
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  id="tradepdf"
                  onClick={display}
                  className="card bg-secondary p-1 fade-in-right "
                >
                  <div className="card-body text-center">
                    <p className="card-text">
                      {" "}
                      <span style={{ color: "black" }}>
                        Download data in pdf trade wise
                      </span>
                    </p>
                  </div>
                </div>

               
              </div>
              <div id="second">
                {"batch" == stats && <BatchwiseRunStats id="batchwise" />}
                {"dayEnd" == stats && <DayEndReport id="dayEnd" />}
                {"trade" == stats && <Tradewise id="tradewise" />}
                {"tradepdf" == stats && <TradePdf id="tradepdf" />}
              </div>
            </div>
            <div className="modal-footer">
			<div className="navbar">
			 <div id="back" style={{visibility:"hidden"}}><button  type="button" onClick={back} className="btn btn-primary">Back</button></div>
			 <div><button type="button" onClick={close} className="btn btn-primary">Close</button></div>
			</div>
            </div>
          </div>
        </div>
      </div>


      <div id="modalPSTBatch" className="modal fade">
        <PSTBatch name={closePSTmodal} />
      </div>


      <div id="modalPETBatch" className="modal fade">
        <PETBatch name={closePETmodal} />
      </div>

      <div id="modalWebsocket" className="modal fade">
        {/* <WebSocket name={closePETmodal} />
         */}
          <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />

            <div
                style={{ maxWidth: "30%", width: "auto !important" }}
                className="modal-dialog"
            >
                <div className="modal-content">
                    <div style={{ backgroundColor: "#63A15F", color: "white", padding: "1%" }}>
                        <span className="text-left mx-2" style={{ marginTop: "1%", marginBottom: "1%", fontSize: "18px", fontWeight: "bolder", letterSpacing: "0.8px" }}>
                            Store
                        </span>
                    </div>

                    <div className="modal-body">

                        <br></br>

                        <div style={{ marginLeft: "33%" }}>

                            <div class="form-group row">
                                <button
                                    type="button"
                                    onClick={toggleClient}
                                    id="cclient"
                                    className={`btn btn-outline-${isClientStarted ? "danger" : "success"} `}
                                    style={{ width: "50%" }}
                                >
                                    {isClientStarted ? "Stop" : "Start"}
                                </button>
                                 
                            </div>

                             
                        </div>
                    </div>


                    <div className="modal-footer">

                    </div>
                </div>
            </div>
      </div>

      <div className="modal fade" id="modalDataChanges" >
        <DataChanges name={closeDataChangesModal} />
      </div>

      <div className="modal fade" id="modalDownload">
        <Datadownload name={closeDownloadModal} />
      </div>

      <div class="container">
        <div class="bird-container bird-container--one">
          <div class="bird bird--one"></div>

        </div>

        <div class="bird-container bird-container--two">
          <div class="bird bird--two"></div>

        </div>

        <div class="bird-container bird-container--three">
          <div class="bird bird--three"></div>

        </div>

        <div class="bird-container bird-container--four">
          <div class="bird bird--four"></div>

        </div>

        <div class="bird-container bird-container--five">
          <div class="bird bird--five"></div>

        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default SideNav;
