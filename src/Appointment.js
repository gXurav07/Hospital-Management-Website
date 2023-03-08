import React, { useState, useEffect } from 'react';
import { Col, Label, Row, Input, Button } from 'reactstrap';
import TableContainer from './TableContainer';
import { SelectColumnFilter } from './Filter';
import jsonData from './db.json';

function Appointment(props) {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [slots, setSlots] = useState([]);
    const [docId, setDocId] = useState('');
    const [patientId, setPatientId] = useState('');
    const [date, setDate] = useState('');
    const [slotId, setSlotId] = useState('');
    const [showSlots, setShowSlots] = useState(false);

    const server_addr = props.server_addr;

    useEffect(() => {
        // get all patients and doctors from db
        fetch('http://'+server_addr+'/front-desk/appointment', {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("Patient and Doctor data: ", data);
            setDoctors(data['doctors']);
            setPatients(data['patients']);
        });
    }, []);
    
    useEffect(() => {
        console.log(['docId:', docId, 'patientId:', patientId, 'date:', date]);
        if (docId !== '' && patientId !== '' && date !== '') {
            // get slots matching docId from db
            fetch('http://'+server_addr+'/front-desk/appointment/slots?docId='+docId+'&date='+date)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log("Slot data: ", data);
                if(data.hasOwnProperty('slots')) {
                    setSlots(data['slots']);
                    setShowSlots(true);
                    setSlotId('');
                }
            });
        }
        else {
            setShowSlots(false);
        }
    }, [docId, patientId, date]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit clicked:", ['docId:', docId, 'patientId:', patientId, 'date:', date, 'slotId:', slotId]);
        if (docId !== '' && patientId !== '' && date !== '' && slotId !== '') {
            // post to db
            fetch('http://'+server_addr+'/front-desk/appointment/slots', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    docID: docId,
                    patientSSN: patientId,
                    date: date,
                    slotID: slotId
                })
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log("Appointment data: ", data);
                if(data['message']=='OK') {
                    alert("Appointment created successfully");
                }
                else {
                    alert("Appointment creation failed");
                }
            });
            setDate('');
            setDocId('');
            setPatientId('');
            setSlotId('');
            setShowSlots(false);
        }
        else {
            alert("Please fill all the fields");
        }
    }

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
    
    const doctorColumns = [
        {
            Header: 'Physician ID',
            accessor: 'id',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Name',
            accessor: 'Name',
            Cell: ({ cell: { value } }) => value || "-",
        },
        // {
        //     Header: 'Department',
        //     accessor: 'dep',
        //     Cell: ({ cell: { value } }) => value || "-",
        //     Filter: SelectColumnFilter,
        // },
        // {
        //     Header: 'Specialization',
        //     accessor: 'trainedIn',
        //     Cell: ({ cell: { value } }) => value || "-",
        //     Filter: SelectColumnFilter,
        // },
        {
            Header: 'Position',
            accessor: 'Position',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
            // disableFilters: true,
        }
    ];

    const slotColumns = [
        {
            Header: 'Slot ID',
            accessor: 'SlotID',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
        },
        {
            Header: 'Start time',
            accessor: 'Start',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
        },
        {
            Header: 'End time',
            accessor: 'End',
            Cell: ({ cell: { value } }) => value || "-",
            Filter: SelectColumnFilter,
        }
    ];

    return ( 
        <div className="App">
            <header className="App-header">
                <form className="doctor_dashboard">
                    <div className='form_wrapper'> 
                        <h1>Schedule an Appointment</h1>
                        <hr/>
                        <Col sm={{offset: 3, size: 6}}> Select{(patientId!=='')?"ed":""} Patient ID: {patientId}</Col>
                        {(patients.length >0) ? <TableContainer columns={patientColumns} data={patients} selectedRow={patientId} setSelectedRow={(row) => setPatientId(row.values['id'])} TableName="Patients" identifierColumn={'id'}/> : <><p>Sorry! Unable to fetch Patient data from server.</p><br/></>}
                        <br/>
                        <hr/>
                        <Col sm={{offset: 3, size: 6}}> Select{(patientId!=='')?"ed":""} Doctor ID: {docId}</Col>
                        {(doctors.length > 0) ? <TableContainer columns={doctorColumns} data={doctors} selectedRow={docId} setSelectedRow={(row) => setDocId(row.values['id'])} TableName="Doctors" identifierColumn={'id'}/> : <><p>Sorry! Unable to fetch Doctor data from server.</p><br/></>}
                        <br/>
                        <hr/>
                        <Row className='align-items-center'>
                            <Col sm={{offset: 2, size: 3}} className="justify-content-end"><Label for="app_date"> Select Date: </Label></Col>
                            <Col sm={4}><Input type="date" id="app_date" sm="8" value={date} onChange={(e) => setDate(e.target.value)}></Input></Col>
                        </Row>
                        {
                            showSlots && (
                            <>
                                <br/>
                                <hr/>
                                <Col sm={{offset: 3, size: 6}}> Select{(slotId!=='')?"ed":""} Slot ID: {slotId}</Col>
                                {(slots.length > 0) ? <TableContainer columns={slotColumns} data={slots} selectedRow={slotId} setSelectedRow={(row) => setSlotId(row.values['SlotID'])} TableName="Slots" identifierColumn={'SlotID'}/> : <><p>Sorry! No matching slots found.</p><br/></>}
                                <br/>
                                {(slotId !== '') ? <button type='submit' className='but_' onClick={(e) => handleSubmit(e)}>Schedule</button> : ''}
                            </>
                            )
                        }
                    </div>
                </form>
            </header>
        </div >
    );
}
export default Appointment;