import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Link } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import DoctorDashboard from "./DoctorDashboard";
import ManageDocs from "./ManageDocs";
import ManageOps from "./ManageOps";

function App() {
  const server_addr = "10.147.143.201:5001";
  return (
    <BrowserRouter>
        <Routes>
            {/* <Route index element={<Home />} /> */}
            <Route path="user1" element={<Login name="Front End Operator"  type={1} server_addr={server_addr}/>} />
            <Route path="user2" element={<Login name="Data Entry Operator" type={2} server_addr={server_addr}/>} />
            {/* <Route path="user3" element={<Login name="Doctor"/>} /> */}
            {/* <Route path="user4" element={<Login name="Database Administrator"/>} /> */}

            <Route path="user4" element={<AdminDashboard/>} />
            <Route path="user4/managedocs" element={<ManageDocs server_addr={server_addr}/>} />
            <Route path="user4/manageops" element={<ManageOps server_addr={server_addr}/>} />
            <Route path="user3" element={<DoctorDashboard server_addr={server_addr}/>} />

          {/* <Route path="*" element={<NoPage />} /> */}
          <Route path="/" element={<Home server_addr={server_addr}/>}>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;