import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import Table from './TableContainer';
import { SelectColumnFilter } from './Filter';
import jsonData from './db.json';

function Appointment(props) {
    const [patients, setPatients] = useState();
    const [doctors, setDoctors] = useState([]);
    const [did, setDid] = useState('');
    const [pid, setPid] = useState('');

    const server_addr = props.server_addr;

    useEffect(() => {
        setPatients(jsonData['doctors']);
    }, []);

    const patientColumns = [
        {
            Header: 'Patient ID',
            accessor: 'id',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Department',
            accessor: 'dep',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
        },
        {
            Header: 'Specialization',
            accessor: 'trainedIn',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
        },
        {
            Header: 'Position',
            accessor: 'position',
            Cell: ({ cell: { value } }) => value || "-",
            // disableFilters: true,
        }
    ];
    
    const doctorColumns = [
        {
            Header: 'Patient ID',
            accessor: 'id',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Department',
            accessor: 'dep',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
        },
        {
            Header: 'Specialization',
            accessor: 'trainedIn',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
        },
        {
            Header: 'Position',
            accessor: 'position',
            Cell: ({ cell: { value } }) => value || "-",
            // disableFilters: true,
        }
    ];

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

    return (
        <div className="App">
            <header className="App-header">
                <div className="doctor_dashboard">
                    <h1>Schedule an Appointment</h1>
                    <Col sm={{offset: 3, size: 6}}> Select{(pid!=='')?"ed":""} Patient ID: {pid}</Col>
                    {patients ? <Table columns={patientColumns} data={patients} selectedRow={pid} setSelectedRow={setPid} TableName="Patients"/> : <br />}
                    <br/><br/>
                    <Col sm={{offset: 3, size: 6}}> Select{(pid!=='')?"ed":""} Doctor ID: {did}</Col>
                    {patients ? <Table columns={patientColumns} data={patients} selectedRow={did} setSelectedRow={setDid} TableName="Patients"/> : <br />}
                    <div className='form_wrapper'>
                        <form>
                            {/* <input type="text" placeholder="Enter Patient ID...." required controlled="true" value={pid} onChange={(e) => setPid(e.target.value)} />
                            <input type="text" placeholder="Enter Doctor ID...." required value={did} onChange={(e) => setDid(e.target.value)} /> */}
                            <input type="datetime-local" id="app_time"></input>
                            <button className='but_'>Schedule</button>
                        </form>
                    </div>
                </div>
            </header>
        </div >
    );
}
export default Appointment;