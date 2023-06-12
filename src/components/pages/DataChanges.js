import React from "react";

import { useState } from "react";
import "./DataChanges.css";
import Enterrollno from "./Enterrollno";
import Enterrollnopstredo from "./Enterrollnopstredo";
import Pstbatchupdate from "./Pstbatchupdate";
import Changecategory from "./Changecategory";
import ChangeGender from "./ChangeGender";
import ChangeDate from "./ChangeDate";
import ClearRegistration from "./ClearRegistration";

const DataChanges = () => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  const dockItems = [
    { name: "", icon: "✍️" },
    { name: "", icon: "🛠️" },
    { name: "", icon: "🎽" },
    { name: " ", icon: "👫" },
    { name: " ", icon: "🌴" },
    { name: " ", icon: "📅" },
    { name: " ", icon: "🗑️" },
  ];

  const item0 = dockItems[0];
  const item1 = dockItems[1];
  const item2 = dockItems[2];
  const item3 = dockItems[3];
  const item4 = dockItems[4];
  const item5 = dockItems[5];
  const item6 = dockItems[6];

  //PSTRedo
  const [showPSTRedoDiv, setShowPSTRedoDiv] = useState(false);

  const handlePstRedo = () => {
    if (showDiv == true) {
      setShowDiv(!showDiv);
    } else if (showPSTUpdate == true) {
      setShowPSTUpdate(!showPSTUpdate);
    } else if (showDivCategory == true) {
      setShowDivCategory(!showDivCategory);
    } else if (showDivGender == true) {
      setShowDivGender(!showDivGender);
    } else if (showDivClear == true) {
      setShowDivClear(!showDivClear);
    } else if (showDivDate == true) {
      setShowDivDate(!showDivDate);
    }

    setShowPSTRedoDiv(!showPSTRedoDiv);
  };

  //PST batch update 
  const [showPSTUpdate, setShowPSTUpdate] = useState(false);

  const handlePstUpdate = () => {
    if (showDiv == true) {
      setShowDiv(!showDiv);
    } else if (showPSTRedoDiv == true) {
      setShowPSTRedoDiv(!showPSTRedoDiv);
    } else if (showDivCategory == true) {
      setShowDivCategory(!showDivCategory);
    } else if (showDivGender == true) {
      setShowDivGender(!showDivGender);
    } else if (showDivClear == true) {
      setShowDivClear(!showDivClear);
    } else if (showDivDate == true) {
      setShowDivDate(!showDivDate);
    }

    setShowPSTUpdate(!showPSTUpdate);
  };

  //Petbatch and bib update
  const [showDiv, setShowDiv] = useState(false);

  const handleClickDivShow = () => {
    if (showPSTRedoDiv == true) {
      setShowPSTRedoDiv(!showPSTRedoDiv);
    } else if (showPSTUpdate == true) {
      setShowPSTUpdate(!showPSTUpdate);
    } else if (showDivCategory == true) {
      setShowDivCategory(!showDivCategory);
    } else if (showDivGender == true) {
      setShowDivGender(!showDivGender);
    } else if (showDivClear == true) {
      setShowDivClear(!showDivClear);
    } else if (showDivDate == true) {
      setShowDivDate(!showDivDate);
    }

    setShowDiv(!showDiv);
  };

  
  //Div Category
  const [showDivCategory, setShowDivCategory] = useState(false);

  const handleClickShowDivCategory = () => {
    if (showPSTRedoDiv == true) {
      setShowPSTRedoDiv(!showPSTRedoDiv);
    } else if (showPSTUpdate == true) {
      setShowPSTUpdate(!showPSTUpdate);
    }  else if (showDiv == true) {
      setShowDiv(!showDiv);
    }  else if (showDivGender == true) {
      setShowDivGender(!showDivGender);
    } else if (showDivClear == true) {
      setShowDivClear(!showDivClear);
    } else if (showDivDate == true) {
      setShowDivDate(!showDivDate);
    }

    setShowDivCategory(!showDivCategory);
  };

const [showDivGender, setShowDivGender] = useState(false);
 const handleClickShowDivGender = () => {
	 if (showPSTRedoDiv == true) {
      setShowPSTRedoDiv(!showPSTRedoDiv);
    } else if (showPSTUpdate == true) {
      setShowPSTUpdate(!showPSTUpdate);
    } else if (showDiv == true) {
      setShowDiv(!showDiv);
	} else if (showDivCategory == true) {
      setShowDivCategory(!showDivCategory);
    } else if (showDivClear == true) {
      setShowDivClear(!showDivClear);
    } else if (showDivDate == true) {
      setShowDivDate(!showDivDate);
    }
    setShowDivGender(!showDivGender);
  };
  
  
  const [showDivDate, setShowDivDate] = useState(false);
 const handleClickShowDate = () => {
	 if (showPSTRedoDiv == true) {
      setShowPSTRedoDiv(!showPSTRedoDiv);
    } else if (showPSTUpdate == true) {
      setShowPSTUpdate(!showPSTUpdate);
    } else if (showDiv == true) {
      setShowDiv(!showDiv);
	} else if (showDivCategory == true) {
      setShowDivCategory(!showDivCategory);
    } else if (showDivGender == true) {
      setShowDivGender(!showDivGender);
    }else if (showDivClear == true) {
      setShowDivClear(!showDivClear);
    }
    setShowDivDate(!showDivDate);
  };
  
  const [showDivClear, setShowDivClear] = useState(false);
 const handleClickClear = () => {
	 if (showPSTRedoDiv == true) {
      setShowPSTRedoDiv(!showPSTRedoDiv);
    } else if (showPSTUpdate == true) {
      setShowPSTUpdate(!showPSTUpdate);
    } else if (showDiv == true) {
      setShowDiv(!showDiv);
	} else if (showDivCategory == true) {
      setShowDivCategory(!showDivCategory);
    } else if (showDivGender == true) {
      setShowDivGender(!showDivGender);
    } else if (showDivDate == true) {
      setShowDivDate(!showDivDate);
    }
    setShowDivClear(!showDivClear);
  };



  return (
    <div
      style={{ maxWidth: "52%", width: "auto !important" }}
      className="modal-dialog"
      
    >
      <div className="modal-content">
	  
      <div style={{ backgroundColor:"#63A15F",color:"white",padding:"1%" }}>        
          <span className="text-left mx-3" style={{ marginTop: "1%", marginBottom: "1%", fontSize: "18px", fontWeight: "bolder" }}>
          Data changes
        </span>
        </div>

        <div className="data" style={{ backgroundColor: "white" }}>
          <div
            className={`data-item ${hoverIndex === 0 ? "hover" : ""}`}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
          >
            <a onClick={handlePstRedo}>
              <div className="data-icon">{item0.icon}</div>
              <span className="data-text">{item0.name}</span>
            </a>
          </div>
          <div
            className={`data-item ${hoverIndex === 1 ? "hover" : ""}`}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            <a onClick={handlePstUpdate}>
              <div className="data-icon">{item1.icon}</div>
              <span className="data-text">{item1.name}</span>
            </a>
          </div>
          <div
            className={`data-item ${hoverIndex === 2 ? "hover" : ""}`}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            <a onClick={handleClickDivShow}>
              <div className="data-icon">{item2.icon}</div>
              <span className="data-text">{item2.name}</span>
            </a>
          </div>
          <div
            className={`data-item ${hoverIndex === 3 ? "hover" : ""}`}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
          >
		   <a onClick={handleClickShowDivGender}>
            <div className="data-icon">{item3.icon}</div>
            <span className="data-text">{item3.name}</span>
			</a>
          </div>
          <div
            className={`data-item ${hoverIndex === 4 ? "hover" : ""}`}
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={handleMouseLeave}
          >
            <a onClick={handleClickShowDivCategory}>
            <div className="data-icon">{item4.icon}</div>
            <span className="data-text">{item4.name}</span>
            </a>
          </div>
          <div
            className={`data-item ${hoverIndex === 5 ? "hover" : ""}`}
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={handleMouseLeave}
          >
		    <a onClick={handleClickShowDate}>
            <div className="data-icon">{item5.icon}</div>
            <span className="data-text">{item5.name}</span>
			</a>
          </div>
          <div
            className={`data-item ${hoverIndex === 6 ? "hover" : ""}`}
            onMouseEnter={() => handleMouseEnter(6)}
            onMouseLeave={handleMouseLeave}
          >
		  <a onClick={handleClickClear}>
            <div className="data-icon">{item6.icon}</div>
            <span className="data-text">{item6.name}</span>
			</a>
          </div>
        </div>


        <div>
          {showPSTRedoDiv &&
            <div>
              <Enterrollnopstredo />
            </div>}
        </div>

        <div>
          {showPSTUpdate &&
            <div>
              <Pstbatchupdate />
            </div>}
        </div>

        <div>
          {showDiv && (
            <div>
              <Enterrollno />
            </div>
          )}
        </div>

        <div>
          {showDivCategory && (
            <div>
              <Changecategory />
            </div>
          )}
        </div>
		
		<div>
          {showDivGender && (
            <div>
              <ChangeGender />
            </div>
          )}
        </div>
		
		<div>
          {showDivDate && (
            <div>
              <ChangeDate />
            </div>
          )}
        </div>
		
		<div>
          {showDivClear && (
            <div>
              <ClearRegistration />
            </div>
          )}
        </div>
		
      </div>
    </div>
  );
};

export default DataChanges;
