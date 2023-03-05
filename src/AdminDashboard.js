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
          <Link to="managedocs" className="box"><button>Add Doctor</button></Link>
          <Link to="managedocsd" className="box"><button>Delete Doctor</button></Link>
          <Link to="manageops" className="box"><button>Add Data Operators</button></Link>
          <Link to="manageopsd" className="box"><button>Delete Data Operators</button></Link>
        </div>
      </header>
    </div>
  );
}
export default AdminDashboard;