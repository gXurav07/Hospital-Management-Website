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
import ScheduleTest from "./ScheduleTest";
import ScheduleTreatment from "./ScheduleTreatment";
import TestResult from "./TestResult";
import TreatmentResult from "./TreatmentResult";
import DischargePatient from "./DischargePatient";
import Appointment from "./Appointment";
import AdmitPatient from "./AdmitPatient";
import useToken, { checkAuth } from "./useToken";

import AddMedication from "./admin_dashboard/add_medication";
import AddTreatment from "./admin_dashboard/add_treatment";
import AddTest from "./admin_dashboard/add_test";
import AddDepartment from "./admin_dashboard/add_department";

function App() {
  const server_addr = "10.147.167.202:3000";
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
            <Route path="user1/addpatient" element={<AddPatient server_addr={server_addr}/>} />
            <Route path="user1/admitpatient" element={<AdmitPatient server_addr={server_addr}/>} />
            <Route path="user1/dischargepatient" element={<DischargePatient server_addr={server_addr}/>} />
            <Route path="user1/appointment" element={<Appointment server_addr={server_addr}/>} />
            <Route path="user1/scheduleTest" element={<ScheduleTest server_addr={server_addr}/>} />
            <Route path="user1/scheduleTreatment" element={<ScheduleTreatment server_addr={server_addr}/>} />
            <Route path="user2/testResult" element={<TestResult server_addr={server_addr}/>} />
            <Route path="user2/treatmentResult" element={<TreatmentResult server_addr={server_addr}/>} />
            {/* <Route path="user2/appointment" element={<Appointment server_addr={server_addr}/>} /> */}
            {/* <Route path="user1/admitpatient" element={<AdmitPatient server_addr={server_addr}/>} /> */}
            {/* <Route path="user1/dischargepatient" element={<DischargePatient server_addr={server_addr}/>} /> */}
            {/* <Route path="user1/appointment" element={<Appointment server_addr={server_addr}/>} /> */}

            {/* Admin Dashboard */}
          <Route exact path="user4/managedocs" element={<ManageDocs server_addr={server_addr}/>} render={()=>console.log('checking...')} />
          <Route path="user4/managedocsd" element={<ManageDocsD server_addr={server_addr}/>} />
          <Route path="user4/manageops" element={<ManageOps server_addr={server_addr}/>} />
          <Route path="user4/manageopsd" element={<ManageOpsD server_addr={server_addr}/>} />

          <Route path="user4/treatment" element={<AddTreatment server_addr={server_addr}/>} />
          <Route path="user4/test" element={<AddTest server_addr={server_addr}/>} />
          <Route path="user4/medication" element={<AddMedication server_addr={server_addr}/>} />
          <Route path="user4/department" element={<AddDepartment server_addr={server_addr}/>} />

          {/* <Route path="*" element={<NoPage />} /> */}
          <Route path="/" element={<Home server_addr={server_addr}/>}>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
export default App;