import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Link } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import DoctorDashboard from "./DoctorDashboard";
import Prescribe from "./Prescribe";
import ManageDocs from "./ManageDocs";
import ManageOps from "./ManageOps";
import ManageDocsD from "./ManageDocsD";
import ManageOpsD from "./ManageOpsD";
import FDOps from "./FDOps";
import DEOps from "./DEOps";
import AddPatient from "./AddPatient";
import ImplementPrescription from "./ImplementPrescription";
// import TestResult from "./TestResult";
// import TreatmentResult from "./TreatmentResult";
import DischargePatient from "./DischargePatient";
import Appointment from "./Appointment";
import AdmitPatient from "./AdmitPatient";
import useToken, { checkAuth } from "./useToken";

function App() {
  const server_addr = "10.147.235.193:3000";
  const { token, setToken } = useToken();
  return (
    <BrowserRouter>
        <Routes>
            {/* Primary Routes */}
            <Route path="user1" element={<FDOps server_addr={server_addr}/>} />
            <Route path="user1" element={<Login name="Front End Operator"  type={1} server_addr={server_addr}/>} />
            <Route path="user2" element={<DEOps server_addr={server_addr}/>} />
            <Route path="user2" element={<Login name="Data Entry Operator" type={2} server_addr={server_addr}/>} />
            {/* <Route path="user3" element={<Login name="Doctor"/>} /> */}
            {/* <Route path="user4" element={<Login name="Database Administrator"/>} /> */}

            <Route path="user3" element={<DoctorDashboard type={3} server_addr={server_addr}/>} />
            <Route exact path="user4" element={<AdminDashboard type={4} server_addr={server_addr}/>} />

            {/* Secondary Routes */}
            <Route exact path="user3/prescribe" element={<Prescribe server_addr={server_addr}/>} />
            <Route exact path="user4/managedocs" element={<ManageDocs server_addr={server_addr}/>} render={()=>console.log('checking...')} />

            <Route path="user4/managedocsd" element={<ManageDocsD server_addr={server_addr}/>} />
            <Route path="user4/manageops" element={<ManageOps server_addr={server_addr}/>} />
            <Route path="user4/manageopsd" element={<ManageOpsD server_addr={server_addr}/>} />
            <Route path="user1/addpatient" element={<AddPatient server_addr={server_addr}/>} />
            <Route path="user1/admitpatient" element={<AdmitPatient server_addr={server_addr}/>} />
            <Route path="user1/dischargepatient" element={<DischargePatient server_addr={server_addr}/>} />
            <Route path="user1/appointment" element={<Appointment server_addr={server_addr}/>} />
            <Route path="user2/appointment" element={<Appointment server_addr={server_addr}/>} />
            <Route path="user2/implementprescription" element={<ImplementPrescription server_addr={server_addr}/>} />

          {/* <Route path="*" element={<NoPage />} /> */}
          <Route path="/" element={<Home server_addr={server_addr}/>}>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
export default App;