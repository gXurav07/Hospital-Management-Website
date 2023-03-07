import React from "react";
import { Link } from "react-router-dom";

function DEOps() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="heading">
                    <h1>Data Entry Operator Dashboard</h1>
                    <hr />
                    <br />
                </div>
                <div className="container_home">
                    <Link to="appointment" className="box"><button>Schedule an Appointment</button></Link>
                    <Link to="implementPrescription" className="box"><button>Prescriptions</button></Link>
                    <Link to="testResult" className="box"><button>Test Results</button></Link>
                    <Link to="treatmentResult" className="box"><button>Treatment Results</button></Link>
                </div>
            </header>
        </div>
    );
}
export default DEOps;