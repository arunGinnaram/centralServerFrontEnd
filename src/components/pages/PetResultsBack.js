import React from "react";
import "./PetResults.css";
import axios from "axios";
import { useLogin } from "../../context/LoginDetailsContext";
import SideNav from "../SideNav";

function PetResults() {
  const resultsURL =
    "http://192.168.1.96:8081/runResults?batch=1&resultType=All";
  const processResultsURL =
    "http://192.168.1.96:8081/processResults?batch=1&resultType=All";
  const redoURL =
    "http://192.168.1.96:8081/pstRedo?rollNo=123456&redoType=Others";
  const pstDet = "http://192.168.1.96:8081/pstDetails?rollNo=1234555668";
  const detailsToChangePMT =
    "http://192.168.1.96:8081/getDetailsToChangePmtBatch?rollNo=";
  const detailsToChangeBibBatch =
    "http://192.168.1.96:8081/getDetailsToChangeBibORBatch?rollNo=";
  const changeBibandBatch =
    "http://192.168.1.96:8081/changeBatchAndBib?rollNo=1234567&bib=123&bibNew=1111&batch=1&batchNew=2";
  const changePetDate =
    "http://192.168.1.96:8081/getDetailsToChangePetDate?rollNo=1234567";
  const changeCategory =
    "http://192.168.1.96:8081/getDetailsToChangeCategory?rollNo=";
  const clearRegistration =
    "http://192.168.1.96:8081/getDetailsToClearRegistration?rollNo=1234575";
  const detToChangeGender =
    "http://192.168.1.96:8081/getDetailsToChangeGender?rollNo=";
  const changeGender = "http://192.168.1.96:8081/changeGender";
  const changePMTBatch = "http://192.168.1.96:8081/changePmtBatch?rollNo=";
  const getResultsURL = "http://192.168.1.96:8081/getResults?batch=1";
  const detailedReportURL =
    "http://192.168.1.96:8081/detailedReport?batch=3&bib=123";
  const pstReportURL =
    "http://192.168.1.96:8081/pstReport?batch=3&resultType=PSTReportQ";
  const districtWiseURL =
    "http://192.168.1.96:8081/pstReportDistrictwise?batch=3&resultType=PSTReportDistrict";
  const pstSheetURL = "http://192.168.1.96:8081/pstSheet?rollNo=1234567";
  const changeCategoryURL = "http://192.168.1.96:8081/changeCategory";
  const clearRegistrationURL = "http://192.168.1.96:8081/clearRegistration";
  const batchwiseStatsURL =
    "http://192.168.1.96:8081/batchwiseStatistics?petDate=11/01/2023";
  const dayEndReportsDistrictURL =
    "http://192.168.1.96:8081/dayEndReportsGetDistricts";
  const dayEndReportsURL = "http://192.168.1.96:8081/dayEndReports";
  const { state, dispatch } = useLogin();
  let { Authorization, STATUS } = state;
  console.log(Authorization, STATUS);

  // const download100m = () => {
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(resultsURL, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const download100m = async (e) => {
    if (petBatch !== "Select") {
      axios({
        url: "http://192.168.1.96:8081/runResults?batch=1&resultType=All", //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
        },
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  let [petBatch, setPetBatch] = React.useState("Select");
  const pet = () => {
    let val = document.getElementById("pet").value;
    console.log(val);
    setPetBatch(val);
  };
  console.log(petBatch);

  const download100mQ = async (e) => {
    if (petBatch !== "Select") {
      axios({
        url:
          "http://192.168.1.96:8081/runResults?batch=" +
          petBatch +
          "&resultType=Q", //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
        },
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  const download100mNQ = async (e) => {
    if (petBatch !== "Select") {
      axios({
        url:
          "http://192.168.1.96:8081/runResults?batch=" +
          petBatch +
          "&resultType=NQ", //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
        },
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  const processResults = async (e) => {
    if (petBatch !== "Select") {
      axios({
        url: processResultsURL, //your url
        method: "POST",
        responseType: "blob", // important
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: Authorization,
        },
      }).then((response) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
    } else {
      alert("Please select batch number");
    }
  };

  // const redo = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(redoURL, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const redo = () => {
    axios({
      url: redoURL, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  // const pstDetails = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(pstDet, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const pstDetails = () => {
    axios({
      url: pstDet, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  // const detailsToChange = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(detailsToChangePMT, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const detailsToChange = () => {
    let chest = document.getElementById("chest").value;
    axios({
      url: detailsToChangePMT + chest, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response.data.data);
      setRespData(response.data.data);
      setProp("PMTChange");
    });
  };

  // const detailsToChangeBibOrBatch = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(detailsToChangeBibBatch, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const detailsToChangeBibOrBatch = () => {
    let chest = document.getElementById("chest").value;
    axios({
      url: detailsToChangeBibBatch + chest + "&batch=batch", //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response.data.message);
      setRespData(response.data.message);
      setProp("BibOrBatch");
    });
  };

  // const ChangeBibAndBatch = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(changeBibandBatch, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const ChangeBibAndBatch = () => {
    axios({
      url: changeBibandBatch, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  // const detailsToChangePetDate = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(changePetDate, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const detailsToChangePetDate = () => {
    axios({
      url: changePetDate, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  // const detailsToChangeCategory = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(changeCategory, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const detailsToChangeCategory = () => {
    let chest = document.getElementById("chest").value;
    axios({
      url: changeCategory + chest, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response.data.message);
      setRespData(response.data.message);
      setProp("category");
    });
  };

  // const detailsToClearRegistration = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(clearRegistration, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const detailsToClearRegistration = () => {
    axios({
      url: clearRegistration, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  // const changegender = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(changeGender, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  let [genderChange, setGenderChange] = React.useState("Select");
  const genChan = () => {
    let val = document.getElementById("genChan").value;
    console.log(val);
    setGenderChange(val);
  };
  console.log(genderChange);

  const changegender = () => {
    axios({
      url: changeGender, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
      data: {
        selectedGender: genderChange,
        gender: propertyValues[7],
        post: propertyValues[3],
        criteriaType: propertyValues[5],
        category: propertyValues[2],
        rollNo: propertyValues[0],
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  const changecategory = () => {
    axios({
      url: changeCategoryURL, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
      data: {
        selectedCategory: genderChange,
        gender: propertyValues[7],
        post: propertyValues[3],
        criteriaType: propertyValues[5],
        category: propertyValues[2],
        rollNo: propertyValues[0],
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  const changepmtbatch = () => {
    axios({
      url:
        changePMTBatch +
        propertyValues[0] +
        "&oldBatch=" +
        propertyValues[2] +
        "&newBatch=" +
        genderChange, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  // const getResults = () => {
  //   console.log("redoAuth" + Authorization);
  //   const headers = {
  //     "Access-Control-Allow-Origin": "*",
  //     Authorization: Authorization,
  //   };
  //   axios.get(getResultsURL, { headers }).then((response) => {
  //     console.log(response);
  //   });
  // };

  const getResults = () => {
    axios({
      url: getResultsURL, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  const detailedReport = () => {
    axios({
      url: detailedReportURL, //your url
      method: "POST",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const pstReport = () => {
    axios({
      url: pstReportURL, //your url
      method: "POST",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const districtWise = () => {
    axios({
      url: districtWiseURL, //your url
      method: "POST",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  const pstSheet = () => {
    axios({
      url: pstSheetURL, //your url
      method: "POST",
      responseType: "blob", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "EmployeeList.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  let table = [];
  let [prop, setProp] = React.useState("");
  let categ = [];
  let [respData, setRespData] = React.useState({});
  const getDetToChangeGender = () => {
    let chest = document.getElementById("chest").value;
    axios({
      url: detToChangeGender + chest, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response.data.message);
      setRespData(response.data.message);
      setProp("gender");
      // let t = document.getElementById("resp");
      // let tr = document.createElement("tr");
      // let td1 = document.createElement("td");
      // let td2 = document.createElement("td");
      // let text = document.createTextNode("Bib");
      // let textBib = document.createTextNode(response.data.message.Bib);
      // td1.appendChild(text);
      // td2.appendChild(textBib);
      // tr.appendChild(td1);
      // tr.appendChild(td2);
      // t.append(tr);
    });
  };

  console.log(respData);
  console.log("prop" + prop);
  const propertyNames = Object.keys(respData);
  console.log(propertyNames);
  const propertyValues = Object.values(respData);
  console.log(propertyValues);
  for (let i = 0; i < propertyNames.length; i++) {
    table.push(
      <tr>
        <td>{propertyNames[i]}</td>
        <td>{propertyValues[i]}</td>
      </tr>
    );
  }

  let options = [];
  for (let i = 1; i < 21; i++) {
    options.push(<option>{i}</option>);
  }

  if (prop === "gender") {
    categ.push(
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <div>
          <span>Select Gender</span>
          <select id="genChan" onChange={genChan}>
            <option selected>Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <button style={{ marginTop: "1rem" }} onClick={changegender}>
          Update
        </button>
      </div>
    );
  } else if (prop === "category") {
    categ.push(
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <div>
          <span>Select Category</span>
          <select id="genChan" onChange={genChan}>
            <option defaultValue>Select</option>
            <option>OC</option>
            <option>BC</option>
            <option>SC</option>
            <option>ST</option>
          </select>
        </div>
        <button style={{ marginTop: "1rem" }} onClick={changecategory}>
          Update
        </button>
      </div>
    );
  } else if (prop === "PMTChange") {
    categ.push(
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <div>
          <span>Select Category</span>
          <select id="genChan" onChange={genChan}>
            <option selected>Select</option>
            {options}
          </select>
        </div>
        <button style={{ marginTop: "1rem" }} onClick={changepmtbatch}>
          Update
        </button>
      </div>
    );
  } else if (prop === "BibOrBatch") {
    categ.push(
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <div>
          <span>Select Batch</span>
          <select id="genChan" onChange={genChan}>
            <option selected>Select</option>
            {options}
          </select>
          <div>
            <span style={{ marginRight: "1rem" }}>Bib</span>
            <input value={propertyValues[6]}></input>
          </div>
        </div>
        <button style={{ marginTop: "1rem" }} onClick={changepmtbatch}>
          Update
        </button>
      </div>
    );
  }

  const clearReg = () => {
    axios({
      url: clearRegistrationURL, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
      data: {
        rollNo: 1234575,
        bib: "",
        batch: "",
        chip1: "",
        chip2: "",
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  const batchwiseStats = () => {
    axios({
      url: batchwiseStatsURL, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  const dayEndReportsDistricts = () => {
    axios({
      url: dayEndReportsDistrictURL, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  const dayEndReports = () => {
    axios({
      url: dayEndReportsURL, //your url
      method: "POST", // important
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: Authorization,
      },
    }).then((response) => {
      // create file link in browser's memory
      console.log(response);
    });
  };

  return (
    <div>
      {/* <div className="sidenav">
        <a href="#">
          <i className="fa fa-home"></i>&nbsp;&nbsp;Home
        </a>
        <a href="#">
          <i className="fa fa-edit"></i>&nbsp;&nbsp;PET and PST Results
        </a>
        <a href="#">
          <i className="fa fa-desktop"></i>&nbsp;&nbsp;Data Changes and PST Redo
        </a>
        <a href="#">
          <i className="fa fa-calendar"></i>&nbsp;&nbsp;Statistics
        </a>
        <a href="#">
          <i className="fa fa-desktop"></i>&nbsp;&nbsp;Sync Data
        </a>
        <a href="#">
          <i className="fa fa-desktop"></i>&nbsp;&nbsp;Download Data
        </a>
      </div> */}
      <div className="cont">
        <div className="petcard">
          <div>
            <span>Select Batch</span>
            <select id="pet" onChange={pet}>
              <option selected>Select</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <button className="btnpet" onClick={processResults}>
            Process/Generate 100 Meter Results
          </button>
          <button className="btnpet">
            Analysis Report check any discrepancies
          </button>
          <button className="btnpet" onClick={download100m}>
            Download 100M Results
          </button>
          <button className="btnpet" onClick={download100mQ}>
            Download 100M Qualified Results
          </button>
          <button className="btnpet" onClick={download100mNQ}>
            Download 100M Not Qualified Results
          </button>
        </div>
        {/* <div className="petcard">
          <span>Select Batch</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div> */}
        {/* <div className="petcard">
            <span>Select Batch</span>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <button className="btnpet">
              Process/Generate 1600M/800M Results
            </button>
            <button className="btnpet">Attendance Report</button>
            <button className="btnpet">Download 1K Results</button>
            <button className="btnpet">Download 1K Qualified Results</button>
            <button className="btnpet">Download 1K Not Qualified Results</button>
          </div> */}
        {/* <div className="petcard">
          <span>Select Batch</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <button className="btnpet">
            Download Qualified Notice Board Results
          </button>
          <button className="btnpet">
            Download Not Qualified Notice Board Results
          </button>
          <button className="btnpet">
            Download Combined(100M & 1K) Results
          </button>
          <button className="btnpet">
            Download Combined (100M & 1K) Qualified Results
          </button>
          <button className="btnpet">
            Download Combined (100M & 1K) Not Qualified Results
          </button>
        </div> */}
        <div className="petcard">
          <span>Select Batch</span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <p>Enter Chest No</p>
          <input className="chest" id="chest"></input>
          <button className="btnpet" onClick={redo}>
            Generate Detailed Report
          </button>
          <button className="btnpet" onClick={pstDetails}>
            PST Details
          </button>
          <button className="btnpet" onClick={detailsToChange}>
            Details to Change PMT
          </button>
          <button className="btnpet" onClick={detailsToChangeBibOrBatch}>
            Get Details to Change Bib or Batch
          </button>
          <button className="btnpet" onClick={ChangeBibAndBatch}>
            Change Batch and Bib
          </button>
          <button className="btnpet" onClick={detailsToChangePetDate}>
            Details to Change Pet Date
          </button>
          <button className="btnpet" onClick={detailsToChangeCategory}>
            Details to Change Category
          </button>
          <button className="btnpet" onClick={detailsToClearRegistration}>
            Details to Clear Registration
          </button>
          <button className="btnpet" onClick={changegender}>
            Change Gender
          </button>
          <button className="btnpet" onClick={getResults}>
            Get Results
          </button>
          <button className="btnpet" onClick={detailedReport}>
            Detailed Report
          </button>
          <button className="btnpet" onClick={pstReport}>
            PST Report
          </button>
          <button className="btnpet" onClick={districtWise}>
            Districtwise Results
          </button>
          <button className="btnpet" onClick={pstSheet}>
            PST Sheet
          </button>
          <button className="btnpet" onClick={changecategory}>
            Change Category
          </button>
          <button className="btnpet" onClick={getDetToChangeGender}>
            Get Details to Change Gender
          </button>
          <button className="btnpet" onClick={clearReg}>
            Clear Registration
          </button>
          <button className="btnpet" onClick={batchwiseStats}>
            Batchwise Statistics
          </button>
          <button className="btnpet" onClick={dayEndReportsDistricts}>
            Day End Reports District
          </button>
          <button className="btnpet" onClick={dayEndReports}>
            Day End Reports
          </button>
        </div>
        <div className="petcard">
          <table className="tab">
            <tbody className="tbod">{table}</tbody>
          </table>
          {categ}
        </div>
      </div>
    </div>
  );
}

export default PetResults;
