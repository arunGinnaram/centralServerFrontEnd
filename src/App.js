import Login from "./components/Login";
import Dashboard from "./components/pages/Dashboard";
import PetResults from "./components/pages/PetResults";
import PstResults from "./components/pages/PstResults";
import DataChanges from "./components/pages/DataChanges";
import { Link, Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import DetailedReport from "./components/pages/DetailedReport";
import BatchwiseRunStats from "./components/BatchwiseRunStats";
import DayEndReport from "./components/DayEndReport";
import Table from "./components/Table";
import DataSync from "./components/DataSync";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';


function App() {
  return (
    <div>
      <div className="details">
        
        <Routes>
          {/* <Route path="/" element={<Login />}></Route> */}
          <Route path="/" element={<Login />}></Route>
		   
          <Route path="SideNav" element={<SideNav />}>
            <Route path="Dashboard" element={<Dashboard />}></Route>
            <Route path="Results" element={<PetResults />}></Route>
            <Route path="DataChanges" element={<DataChanges />}></Route>
            <Route path="BatchwiseRunStats"  element={<BatchwiseRunStats />}></Route>
            <Route path="DayEndReport" element={<DayEndReport />}></Route>
            <Route path="Table" element={<Table />}></Route>
			<Route path="DataSync" element={<DataSync />}></Route>
          </Route>
         
        </Routes>
      </div>
    </div>
  );
}

export default App;
