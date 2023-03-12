import React, { useState, useEffect } from 'react';
import Table from './Table';
import { Col, Label, Row, Input, Button } from 'reactstrap';
import TableContainer from './TableContainer';
import { SelectColumnFilter } from './Filter';
import jsonData from './db.json';

function AdmitPatient(props) {
    const [patients, setPatients] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [patientId, setPatientId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [result, setResult] = useState('');

    const server_addr = props.server_addr;

    // useEffect(() => {
    //   setPatients(jsonData['patients']);
    //   setRooms(jsonData['rooms']);
    // }, []);

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

    const roomColumns = [
        {
            Header: 'Room ID',
            accessor: 'id',
            Cell: ({ cell: { value } }) => value || "-",
        }
    ]

    useEffect(() => {
        fetch('http://' + server_addr + '/front-desk/admit')
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log("fetched data", data);
                setPatients(data['patients']);
                setRooms(data['rooms']);
            });
    }, [])

    const handleAdmit = (e) => {
        e.preventDefault();
        const admit_patient = { patient: patientId, room: roomId };
        console.log(admit_patient);
        fetch('http://' + server_addr + '/front-desk/admit', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admit_patient)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(admit_patient);
                setResult(data);
                alert(result);
            });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Admit a Patient</h1>
                <hr />
            </header>
            <div className="App-body">
                <div className="doctor_dashboard">
                    {/* {patients ? <Table data={patients} /> : <br />} */}
                    <div className='form_wrapper'>
                        <form>
                            {/* <label>ID:</label> */}
                            {/* <input type="text" placeholder="Enter Patient ID...." required value={pid} onChange={(e) => setPid(e.target.value)} /> */}
                            <Col sm={{ offset: 3, size: 6 }}> Select{(patientId !== '') ? "ed" : ""} Patient ID: {patientId}</Col>
                            {(patients.length > 0) ? <TableContainer columns={patientColumns} data={patients} selectedRow={patientId} setSelectedRow={(row) => setPatientId(row.values['id'])} TableName="Patients" identifierColumn={'id'} /> : <><p>Sorry! Unable to fetch Patient data from server.</p><br /></>}
                            <br />
                            <Col sm={{ offset: 3, size: 6 }}> Select{(roomId !== '') ? "ed" : ""} Room ID: {roomId}</Col>
                            {(rooms.length > 0) ? <TableContainer columns={roomColumns} data={rooms} selectedRow={roomId} setSelectedRow={(row) => setRoomId(row.values['id'])} TableName="Rooms" identifierColumn={'id'} /> : <><p>Sorry! Unable to fetch Room data from server.</p><br /></>}
                            <br />
                            <button className='box' onSubmit={(e) => handleAdmit(e)}>Admit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default AdmitPatient;