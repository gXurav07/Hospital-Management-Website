import React, {useState, useEffect} from "react";
import table from "./Table";
// import { Link } from "react-router-dom";

function ImplementPrescription(props) {
    const [Prescriptions, setPrescriptions] = useState();


    return (
        <div className="App">
            <header className="App-header">
                <div className="heading">
                    <h1>Pending Prescriptions</h1>
                </div>
                <div className="container_home">
                    {/* <Link to="implementPrescription" className="box"><button>Prescriptions</button></Link> */}
                </div>
            </header>
        </div>
    );
}

export default ImplementPrescription;