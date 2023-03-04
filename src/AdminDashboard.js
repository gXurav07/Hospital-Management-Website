import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="heading">
          <h1>Admin Dashboard</h1>
          <hr/>
          <br/>
        </div>
        <div className="container_home">
          <Link to="managedocs" className="box"><button>Manage Doctors</button></Link>
          <Link to="manageops" className="box"><button>Manage Data Operators</button></Link>
        </div>
      </header>
    </div>
  );
}
export default AdminDashboard;