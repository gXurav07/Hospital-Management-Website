import React, { useState, useEffect } from 'react';
import Table from './Table';
import { Col, Label, Row, Input, Button } from 'reactstrap';
import TableContainer from './TableContainer';
import { SelectColumnFilter } from './Filter';
import jsonData from './db.json';

function AdmitPatient(props) {
    const [patients, setPatients] = useState([]);
    const [result, setResult] = useState();
    const [patientId, setPatientId] = useState();

    const server_addr = props.server_addr;

    useEffect(() => {
        setPatients(jsonData['patients']);
    }, []);

    // useEffect(() => {
    //     fetch('http://' + server_addr + '/doctor/' + did)
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log("doctor's patients", data['Patients']);
    //             setPatients(data['Patients']);
    //         });
    // }, [])

    // const handleQuery = (e, qno) => {
    //     e.preventDefault();
    //     fetch('http://' + server_addr + '/doctor/' + did + '?query=' + qno + '&patient=' + pid)
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log("query result", data);
    //             setResult(data);
    //         });
    // }

    const patientColumns = [
        {
            Header: 'Patient SSN',
            accessor: 'id',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Name',
            accessor: 'Patient_Name',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Age',
            accessor: 'Age',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
        },
        {
            Header: 'Gender',
            accessor: 'Gender',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
        }
    ];

    return (
        <div className="App">
            <header className="App-header">
                <h1>Discharge a Patient</h1>
                <hr />
            </header>
            <div className="App-body">
                <div className="doctor_dashboard">
                    <Col sm={{ offset: 3, size: 6 }}> Select{(patientId !== '') ? "ed" : ""} Patient ID: {patientId}</Col>
                    {(patients.length > 0) ? <TableContainer columns={patientColumns} data={patients} selectedRow={patientId} setSelectedRow={(row) => setPatientId(row.values['id'])} TableName="Patients" identifierColumn={'id'} /> : <><p>Sorry! Unable to fetch Patient data from server.</p><br /></>}
                    <br />
                    <div className='form_wrapper'>
                        <form>
                            {/* <label>ID:</label> */}
                            {/* <input type="text" placeholder="Enter Patient ID...." required value={pid} onChange={(e) => setPid(e.target.value)} /> */}
                            <button className='but_'>Discharge</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default AdmitPatient;