import React, { useState, useEffect } from 'react';
import Table from './Table';
import { Link } from "react-router-dom";
import TableContainer from './TableContainer';
import { SelectColumnFilter } from './Filter';
import { Col, Row } from 'reactstrap';
import Prescribe from './Prescribe';
import jsonData from './db.json';

function DoctorDashboard(props) {
  const [patients, setPatients] = useState();
  const [upcoming, setUpcoming] = useState();
  const [result, setResult] = useState([]);
  const [did, setDid] = useState(1);
  const [pid, setPid] = useState();
  const [appointmentid, setAppointmentid] = useState();
  const [date, setDate] = useState();

  const server_addr = props.server_addr;

  // useEffect(() => {
  //   setPatients(jsonData['doctors']);
  //   setUpcoming(jsonData['doctors']);
  // }, []);

  useEffect(() => {
    console.log("requesting all patient data");
    fetch('http://' + server_addr + '/doctor/' + did)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("doctor's patients", data['past_appointments']);
        setPatients(data['past_appointments']);
        setUpcoming(data['upcoming_appointments']);
      });
  }, [])

  const handleQuery = (e, qno) => {
    e.preventDefault();
    fetch('http://' + server_addr + '/doctor/' + did + '?type=' + qno + '&patient=' + pid)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("query result", data['rows']);
        setResult(data['rows']);
      });
  }

  const handleTableSelect = (row) => {
    setPid(row.values['Patient_SSN']);
    setAppointmentid(row.values['id']);
    setDate(row.values['Date']);
  }

  const patient_columns = [
    {
      Header: 'Appointment ID',
      accessor: 'id',
      Cell: ({ cell: { value } }) => value || "-",
      // Filter: SelectColumnFilter
    },
    {
      Header: 'Patient ID',
      accessor: 'Patient_SSN',
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
    },
    {
      Header: 'Date',
      accessor: 'Date',
      Cell: ({ cell: { value } }) => value || "-",
      Filter: SelectColumnFilter
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Doctor Dashboard</h1>
        <hr />
      </header>
      <div className="App-body">
        <div className="doctor_dashboard">

          {/* {patients ? <Table data={patients} /> : <br />} */}
          <h1>Your Patients' Appointment History</h1>
          <Col sm={{ offset: 3, size: 6 }}> Select{(pid !== '') ? "ed" : ""} Patient ID: {pid}</Col>
          {patients ? <TableContainer columns={patient_columns} data={patients} selectedRow={pid} setSelectedRow={handleTableSelect} identifierColumn="id" TableName="Patients" /> : <br />}

          <div className='form_wrapper'>
            <form>
              <label>Get Patient Details:</label>
              <input type="text" placeholder="Enter Patient ID...." required value={pid} onChange={(e) => setPid(e.target.value)} />
              <div className='button_row'>
                <button onClick={(e) => handleQuery(e, 'treatment')}>Treatment</button>
                <button onClick={(e) => handleQuery(e, 'medication')}>Medicine Prescribed</button>
                <button onClick={(e) => handleQuery(e, 'appointment')}>Appointment History</button>
                <button onClick={(e) => handleQuery(e, 'test')}>Test Result</button>
              </div>
            </form>
            {result ? <Table data={result} /> : console.log('no entry found')}
            {pid ? <Prescribe server_addr={server_addr} pid={pid} did={did} appointmentid={appointmentid} date={date} /> : console.log('no patient selected')}
            {/* <Link to="prescribe"><button align='center'>Prescribe</button></Link> */}
          </div>
          <h1>Future Appointments</h1>
          {upcoming ? <Table data={upcoming} /> : console.log('no entry found')}
        </div>
      </div>
    </div >
  );
}
export default DoctorDashboard;