import React, {useState, useEffect} from "react";
import Table from "./TableContainer";
import {SelectColumnFilter} from "./Filter";
import jsonData from "./db.json";
// import { Link } from "react-router-dom";

function ImplementPrescription(props) {
    const [Prescriptions, setPrescriptions] = useState([]);
    
    const server_addr = props.server_addr;

    useEffect(() => {
        // get all pending prescriptions (yet to be processed) from db
        fetch('http://'+server_addr+'/FDOs/prescription', {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("Prescription data: ", data);
            setPrescriptions(data['prescriptions']);
        });
    }, []);

    const prescriptionColumns = [
        {
            Header: 'Prescription ID',
            accessor: 'id',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Patient SSN',
            accessor: 'Patient_SSN',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Doctor ID',
            accessor: 'Doctor_ID',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Medicine Name',
            accessor: 'Medicine_Name',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Dosage',
            accessor: 'Dosage',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Quantity',
            accessor: 'Quantity',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Status',
            accessor: 'Status',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Test ID',
            accessor: 'Test_ID',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Treatment ID',
            accessor: 'Treatment_ID',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Date',
            accessor: 'Date',
            Cell: ({ cell: { value } }) => value || "-",
        }
    ];


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