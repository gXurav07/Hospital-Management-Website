import React from "react";
import { Link } from "react-router-dom";

function FDOps() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Front Desk Operator Dashboard</h1>
        <hr />
      </header>
      <div className="App-body">
      </div>
      <div className="container_home">
        <Link to="addpatient" className="box"><button>Add Patient</button></Link>
        <Link to="admitpatient" className="box"><button>Admit Patient</button></Link>
        <Link to="dischargepatient" className="box"><button>Discharge Patient</button></Link>
        <Link to="appointment" className="box"><button>Schedule an Appointment</button></Link>
      </div>
    </div>
  );
}
export default FDOps;