import React, { useState } from "react";
import "./Dashboard.css";
// import DoughnutChart from "./DoughnutChart";
// import DoughnutChart2 from "./DoughnutChart2";
import { UserData, Dough, Assessments, VacStatus } from "./Data";
import axios from "axios";
import { useLogin } from "../../context/LoginDetailsContext";
import SideNav from "../SideNav";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Bar, Radar, Doughnut, PolarArea, Scatter } from "react-chartjs-2";
// import images from "../assets/images.jpg";
// import longjump from "../assets/longjump.png";

function Dashboard() {
  const currentSessionURL = "http://192.168.1.96:8081/getCurrentSession";
  const petURL = "http://192.168.1.96:8081/updateBatchForRun?batch=";
  const pmtURL = "http://192.168.1.96:8081/updateBatchForPMT?batch=";
  const deleteTimesURL = "http://192.168.1.96:8081/deleteTimes(delete)";
  const dayCompleteURL = "http://192.168.1.96:8081/dayCompleted";
  const batchURL =
    // "http://192.168.1.96:8081/welcome";
    "http://192.168.1.96:8081/updateBatchForRun?batch=";
  // "http://192.168.1.96:8081/updateBatchForRun?batch=2&maxCount=100";
  const batchListURL =
    // "http://192.168.1.96:8081/welcome";
    "http://192.168.1.96:8081/updateBatchForRun";
  const serverConnectionURL = "http://192.168.1.96:8085/actuator/health/db";

  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;
  console.log(Authorization, STATUS);
  const [venue, setVenue] = useState("Select");

  const trades = "http://192.168.1.96:8088/excelDataTrade";

  const [locations, setLocations] = useState([]);

  let [batchNo, setBatchNo] = React.useState(0);
  let [mySqlStatus, setMySqlStatus] = React.useState("");
  let [sqlStatus, setSqlStatus] = React.useState("");
  let [bgc1, setBgc1] = React.useState("");
  let [bgc2, setBgc2] = React.useState("");

  const [userData, setUserData] = React.useState({
    labels: ["Qualified", "Not Qualified", "Not Participated"],
    alignToPixels: "true",
    datasets: [
      {
        label: "Statistics",
        data: [],
        backgroundColor: ["#0537fc", "#e6e7e8"],
        borderWidth: 3,
      },
    ],
    options: {
      scales: {
        x: {
          grid: {
            offset: true,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });



  const [gender, setGender] = React.useState({
    labels: ["Male", "Female"],
    alignToPixels: "true",
    datasets: [
      {
        label: "Gender Statistics",
        data: [],
        backgroundColor: ["#0537fc", "#e6e7e8"],
        borderWidth: 3,
      },
    ],
    options: {
      scales: {
        x: {
          grid: {
            offset: true,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });


  const [batch, setBatch] = React.useState({
    labels: ["Batch"],
    datasets: [
      {
        label: "Registered Candidates",
        data: [],
        backgroundColor: ["#0537fc", "#e6e7e8"],
        borderWidth: 3,
      },
    ],
    options: {
      scales: {
        x: {
          grid: {
            offset: true,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  const [pst, setPst] = React.useState({
    labels: ["Qualified", "Not Qualified", "Not Participated"],
    datasets: [
      {
        label: "Pst Statistics",
        data: [],
        backgroundColor: ["#0537fc", "#e6e7e8"],
        borderWidth: 3,
      },
    ],

    options: {
      scales: {
        x: {
          grid: {
            offset: true,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
  React.useEffect(() => {
    console.log("Sending Authorization token: " + Authorization); //ag
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
    };
    axios.post(batchListURL, {}, { headers }).then((response) => {
      setBatchNo(response.data.batchList.length);
      console.log(batchNo);
    });
  }, []);

  React.useEffect(() => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    axios({
      url: "http://localhost:8088/getVenuesFromLocalForImageSync",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      setLocations(response.data);
    });
    console.log("db " + Authorization);
    axios.get(serverConnectionURL, {}, { headers }).then((response) => {
      console.log(response.data.components.mysqldataSource.status);
      console.log(response.data.components.sqldataSource.status);
      setMySqlStatus(response.data.components.mysqldataSource.status);
      setSqlStatus(response.data.components.mysqldataSource.status);
    });
  }, []);

  let items = [];
  for (let i = 1; i <= batchNo; i++) {
    items.push(<option>{i}</option>);
    //here I will be creating my options dynamically based on
    //what props are currently passed to the parent component
  }
  console.log(items);

  let [petBatch, setPetBatch] = React.useState(0);
  const pet = () => {
    let val = document.getElementById("pet").value;
    console.log(val);
    setPetBatch(val);
  };
  console.log(petBatch);

  const petUpdate = () => {
    let petMax = document.getElementById("petMax").value;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
    };
    if (petMax) {
      axios
        .post(petURL + petBatch + "&maxCount=" + petMax, { headers })
        .then((response) => {
          console.log(response);
        });
    }
  };

  let [pmtBatch, setPmtBatch] = React.useState(0);
  const pmt = () => {
    let val = document.getElementById("pmt").value;
    console.log(val);
    setPmtBatch(val);
  };
  console.log(pmtBatch);

  const pmtUpdate = () => {
    let pmtMax = document.getElementById("pmtMax").value;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
    };
    if (pmtMax) {
      axios
        .post(pmtURL + pmtBatch + "&maxCount=" + pmtMax, { headers })
        .then((response) => {
          console.log(response);
        });
    }
  };

  const dayCompleted = () => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      Authorization: Authorization,
    };
    axios.post(dayCompleteURL, { headers }).then((response) => {
      console.log(response);
    });
  };

  const [stats, setStats] = useState({
    qualified: "",
    notQualified: "",
    notParticipated: ""
  });

  const [reg, setReg] = useState("");

  const [pstStats, setpstStats] = useState({
    qualified: "",
    notQualified: "",
    notParticipate: ""
  });


  const [mF, setmF] = useState({
    male: "",
    female: ""
  });

  const getResults = (event) => {
    document.getElementById("userData1").style.boxShadow =
      "-5px -5px 9px rgba(255,255,255,0.45), 3px 3px 5px #20B2AA";
    document.getElementById("userData1").style.transition =
      "box-shadow 0.7s ease-in-out";
    document.getElementById("gender1").style.boxShadow =
      "-5px -5px 9px rgba(255,255,255,0.45), 3px 3px 5px #4B0082";
    document.getElementById("gender1").style.transition =
      "box-shadow 0.7s ease-in-out";
    document.getElementById("batch1").style.boxShadow =
      "-5px -5px 9px rgba(255,255,255,0.45), 3px 3px 5px #B22222";
    document.getElementById("batch1").style.transition =
      "box-shadow 0.7s ease-in-out";
    document.getElementById("pst1").style.boxShadow =
      "-5px -5px 9px rgba(255,255,255,0.45), 3px 3px 5px #F29F05";
    document.getElementById("pst1").style.transition =
      "box-shadow 0.7s ease-in-out";

    axios({
      url:
        "http://localhost:8088/getCurrentResults?batch=" + event.target.value,
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      console.log(
        response.data
      );
      setUserData({
        labels: ["Qualified", "Not Qualified", "Not Participated"],
        datasets: [
          {
            label: "Statistics",
            data: [
              response.data.qualified,
              response.data.notQualified,
              response.data.notParticipated,
            ],
            backgroundColor: "#20B2AA",
            borderWidth: 3,
          },
        ],
        options: {
          scales: {
            x: {
              grid: {
                offset: true,
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },

        plugins: {
          datalabels: {
            anchor: "end",
            align: "end",
            font: {
              size: 14,
            },
          },
        },
      });
      setStats(prev => ({
        ...prev,
        qualified: response.data.qualified,
        notQualified: response.data.notQualified,
        notParticipated: response.data.notParticipated
      }))



      setGender({
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Gender Statistics",
            data: [response.data.male, response.data.feMale],
            backgroundColor: "#4B0082",
            borderWidth: 3,
          },
        ],
        options: {
          scales: {
            x: {
              grid: {
                offset: true,
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },

        plugins: {
          datalabels: {
            anchor: "end",
            align: "end",
            font: {
              size: 14,
            },
          },
        },
      });
      setmF(prev => ({
        ...prev,
        male: response.data.male,
        female: response.data.feMale
      }))

      setReg(response.data.batch);
      setBatch({
        labels: ["Batch: " + event.target.value],
        datasets: [
          {
            label: "Registered Candidates",
            data: [response.data.batch],
            backgroundColor: "#B22222",
            borderWidth: 3,
          },
        ],
        options: {
          scales: {
            x: {
              grid: {
                offset: true,
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      setPst({
        labels: ["Qualified", "Not Qualified", "Not Participated"],
        datasets: [
          {
            label: "Pst Statistics",
            data: [
              response.data.pstQualified,
              response.data.pstNotQualified,
              response.data.pstNotParticipated,
            ],
            backgroundColor: "#F29F05",
            borderWidth: 3,
          },
        ],
        options: {
          scales: {
            x: {
              grid: {
                offset: true,
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      setPst(prev => ({
        ...prev,
        qualified: response.data.pstQualified,
        notQualified: response.data.pstNotQualified,
        notParticipated: response.data.pstNotParticipated
      }))
    });
  };

  return (
    <div style={{ maxWidth: "85.1%", marginLeft: "7.4%", marginTop: "-7%" }}>
      <div
        style={{
          backgroundColor: "#63A15F",
          display: "flex",
          padding: "0.63%",
          color: "white",
          letterSpacing: "0.8px",
        }}
      >
        <strong for="batch" class="col-sm-1  text-left col-form-label">
          Batch :
        </strong>
        <div class="col-sm-2">
          <select
            onChange={getResults}
            style={{ marginLeft: "-2rem", width: "75%", scale: "0.85" }}
            className="form-control"

            id="gender"
          >
            <option selected value="" disable hidden>
              Select
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </div>
      </div>

      <div
        className="dashboard_firstRow mt-2 "
        style={{
          display: "flex", justifyContent: "flex-start" 
        }}
      >
        <div
          id="userData1"
          style={{
            width: "40%",
            borderRadius: "5px",
            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
            backgroundColor: "#f5f5f5",
            height: "38%"
          }}
        >
          <Bar data={userData} />
        </div>

        <div
          style={{
            marginLeft: "2%",
            marginRight: "2%",
            width: "18.2%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            color: "white", height: "38%"
          }}
        >
          <div id="statisticsData" style={{
            backgroundColor: "#f5f5f5", marginBottom: "5%", fontWeight: "500", fontSize: "18px", letterSpacing: "1px",
            height: "108px"
            , overFlow: "hidden",
            transition: "height 0.5s ease-out"
          }}>

            <div style={{ backgroundColor: "#20B2AA", padding: "2% 0", }}>
              <p style={{ marginBottom: "0" }}>Statistics</p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                fontSize: "16px",
                // boxShadow: "0px 15px 10px -15px #111",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-around", color: "#808080" }}>
                <p>Q</p>
                <p>NQ</p>
                <p>NP</p>
              </div>

              <div style={{
                display: "flex", justifyContent: "space-around", flex: 1, color: "#3C3737", fontSize: "21px"
                , fontFamily: "sans"
              }}>
                <p  ><strong>{stats.qualified}</strong></p>
                <p  ><strong>{stats.notQualified}</strong></p>
                <p  ><strong>{stats.notParticipated}</strong></p>
              </div>

            </div>

          </div>


          <div id="statisticsData" style={{
            backgroundColor: "#f5f5f5", marginBottom: "5%", fontWeight: "500", fontSize: "17px", letterSpacing: "1px",
            height: "108px"
            , overFlow: "hidden",
            transition: "height 0.5s ease-out",
          }}>
            <div style={{ backgroundColor: "#B22222", padding: "2% 0" }}>
              <p style={{ marginBottom: "0" }}>Registered Candidates</p>
            </div>
            <div
              style={{
                display: "flex", justifyContent: "space-around", flex: 1, color: "#3C3737", fontSize: "21px"
                , fontFamily: "sans"
              }}>
              <p><strong style={{ fontFamily: "sans" }}>{reg}</strong></p>

            </div>
          </div>


        </div>

        <div
          id="batch1"
          style={{

            width: "40%",
            borderRadius: "5px",
            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
            backgroundColor: "#f5f5f5", height: "38%"
          }}
        >
          <Bar data={batch} />
        </div>

      </div>

      <div
        className="dashboard mt-3"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <div
          id="pst1"
          style={{
            width: "40%",
            borderRadius: "5px",
            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",

            backgroundColor: "#f5f5f5", height: "38%"

          }}
        >
          <Bar data={pst} />
        </div>

        {/* <div
          style={{
            marginLeft: "2%",
            marginRight: "2%",
            width: "18.2%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            color: "white", height: "38%"
          }}
        >
          <div id="statisticsData" style={{
            backgroundColor: "#f5f5f5", marginBottom: "5%", fontWeight: "500", fontSize: "18px", letterSpacing: "1px",
            height: "108px"
            , overFlow: "hidden",
            transition: "height 0.5s ease-out",
          }}>

            <div style={{ backgroundColor: "#F29F05", padding: "2% 0" }}>
              <p style={{ marginBottom: "0" }}>Pst Statistics</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                // backgroundColor: "#DCDCDC",
                height: "64%",
                fontSize: "16px",
                // boxShadow: "0px 15px 10px -15px #111", 
                color: "black"

              }}
            >
              <div style={{ display: "flex", justifyContent: "space-around", color: "#808080" }}>
                <p>Q</p>
                <p>NQ</p>
                <p>NP</p>
              </div>

              <div style={{
                display: "flex", marginTop: "-6.5px",
                justifyContent: "space-around",
                color: "#3C3737", fontSize: "21px",
                fontFamily: "sans",

              }}>
                <p><strong >{pst.qualified}</strong></p>
                <p><strong >{pst.notQualified}</strong></p>
                <p><strong>{pst.notParticipated}</strong></p>
              </div>
            </div>
          </div>

          <div id="statisticsData" style={{
            backgroundColor: "#f5f5f5", marginBottom: "5%", fontWeight: "500", fontSize: "18px", letterSpacing: "1px",
            height: "108px"
            , overFlow: "hidden",
            transition: "height 0.5s ease-out",
          }}>

            <div style={{ backgroundColor: "#4B0082", padding: "2% 0" }}>
              <p style={{ marginBottom: "0" }}>Gender Statistics</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                // backgroundColor: "#DCDCDC",
                height: "64%",
                fontSize: "16px",
                // boxShadow: "0px 15px 10px -15px #111",
                 color: "black"
              }}
            > <div style={{ display: "flex", justifyContent: "space-around", color: "#808080" }}>
                <p>M</p>
                <p>F</p>
              </div>

              <div style={{
                display: "flex", marginTop: "-9.5px",
                justifyContent: "space-around",
                color: "#3C3737", fontSize: "21px",
                fontFamily: "sans",
                alignText: "center"
              }}>
                <p><strong>{mF.male}</strong></p>
                <p><strong>{mF.female}</strong></p>

              </div>

            </div>
          </div>


        </div> */}

        <div
          style={{
            marginLeft: "2%",
            marginRight: "2%",
            width: "18.2%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            color: "white", height: "38%"
          }}
        >
          <div id="statisticsData" style={{
            backgroundColor: "#f5f5f5", marginBottom: "5%", fontWeight: "500", fontSize: "18px", letterSpacing: "1px",
            height: "105px"
            , overFlow: "hidden",
            transition: "height 0.5s ease-out",
          }}>


            <div style={{ backgroundColor: "#F29F05", padding: "2% 0", }}>
              <p style={{ marginBottom: "0" }}>Pst Statistics</p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                fontSize: "16px",
                // boxShadow: "0px 15px 10px -15px #111",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-around", color: "#808080" }}>
                <p>Q</p>
                <p>NQ</p>
                <p>NP</p>
              </div>

              <div style={{
                display: "flex", justifyContent: "space-around", flex: 1, color: "#3C3737", fontSize: "21px"
                , fontFamily: "sans"
              }}>
                <p><strong >{pst.qualified}</strong></p>
                <p><strong >{pst.notQualified}</strong></p>
                <p><strong>{pst.notParticipated}</strong></p>
              </div>

            </div>

          </div>


          <div id="statisticsData" style={{
            backgroundColor: "#f5f5f5", marginBottom: "5%", fontWeight: "500", fontSize: "18px", letterSpacing: "1px",
            height: "105px"
            , overFlow: "hidden",
            transition: "height 0.5s ease-out",
          }}>


            <div style={{ backgroundColor: "#4B0082", padding: "2% 0", }}>
              <p style={{ marginBottom: "0" }}>Gender Statistics</p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                fontSize: "16px",
                // boxShadow: "0px 15px 10px -15px #111",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-around", color: "#808080" }}>
                <p>M</p>
                <p>F</p>
              </div>

              <div style={{
                display: "flex", justifyContent: "space-around", flex: 1, color: "#3C3737", fontSize: "21px"
                , fontFamily: "sans"
              }}>
                <p><strong>{mF.male}</strong></p>
                <p><strong>{mF.female}</strong></p>
              </div>

            </div>

          </div>


        </div>





        <div
          id="gender1"
          style={{
            width: "40%",
            borderRadius: "5px",
            boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.3)",
            backgroundColor: "#f5f5f5", height: "38%"
          }}
        >
          <Bar data={gender} />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
