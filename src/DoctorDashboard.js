import React, { useState, useEffect } from 'react';
import Table from './Table';
import jsonData from './db.json';

function DoctorDashboard(props) {
  const [patients, setPatients] = useState();
  const [result, setResult] = useState([]);
  const [did, setDid] = useState(1);
  const [pid, setPid] = useState();

  const server_addr = props.server_addr;

  // useEffect(() => {
  //   setPatients(jsonData['doctors']);
  // }, []);

  useEffect(() => {
    fetch('http://' + server_addr + '/doctor/' + did)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("doctor's patients", data['Patients']);
        setPatients(data['Patients']);
      });
  }, [])

  const handleQuery = (e, qno) => {
    e.preventDefault();
    fetch('http://' + server_addr + '/doctor/' + did + '?query=' + qno + '&patient=' + pid)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("query result", data);
        setResult(data);
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
                <button className='but_' onClick={(e) => handleQuery(e, 1)}>Treatment</button>
                <button className='but_' onClick={(e) => handleQuery(e, 2)}>Medicine Prescribed</button>
                <button className='but_' onClick={(e) => handleQuery(e, 3)}>Appointment History</button>
              </div>
            </form>
          </div>
          {result ? <Table data={result} /> : <br />}
        </div>
      </header>
    </div >
  );
}
export default DoctorDashboard;