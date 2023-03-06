import React, { useState, useEffect } from 'react';
import Table from './Table';
import jsonData from './db.json';

function DoctorDashboard(props) {
  const [patients, setPatients] = useState();
  const [result, setResult] = useState([]);
  const [did, setDid] = useState(2);
  const [pid, setPid] = useState();

  const server_addr = props.server_addr;

  // useEffect(() => {
  //   setPatients(jsonData['doctors']);
  // }, []);

  useEffect(() => {
    console.log("requesting all patient data");
    fetch('http://' + server_addr + '/doctor/' + did)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("doctor's patients", data['data']);
        setPatients(data['data']);
      });
  }, [])

  const handleQuery = (e, qno) => {
    e.preventDefault();
    fetch('http://' + server_addr + '/doctor/' + did + '?type=' + qno + '&patient=' + pid)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("query result", data['data']);
        setResult(data['data']);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="doctor_dashboard">
          <h1>Doctor Dashboard</h1>
          {patients ? <Table data={patients} /> : <br />}
          <div className='form_wrapper'>
            <form>
              <label>Get Details:</label>
              <input type="text" placeholder="Enter Patient ID...." required value={pid} onChange={(e) => setPid(e.target.value)} />
              <div className='button_row'>
                <button onClick={(e) => handleQuery(e, 'treatment')}>Treatment</button>
                <button onClick={(e) => handleQuery(e, 'medication')}>Medicine Prescribed</button>
                <button onClick={(e) => handleQuery(e, 'appointment')}>Appointment History</button>
              </div>
            </form>
          </div>
          {result ? <Table data={result}/> : console.log('no entry found')}
        </div>
      </header>
    </div >
  );
}
export default DoctorDashboard;