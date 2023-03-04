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
  //   setData(jsonData['doctors']);
  // }, []);

  useEffect( () => {
    fetch('http://'+server_addr+'/doctor/'+did)
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
    fetch('http://'+server_addr+'/doctor/'+did+'?query='+qno+'&patient='+pid)
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
          <h1 className='doc_head'>Doctor Dashboard</h1>
          <div>
            {patients ? <Table data={patients} /> : <br />}
          </div>
          <form className="doc_form">
            {/* <h3 className='doc_head2'>Enter Patient ID</h3> */}
            <div className='doc_details'>
              <h3 className='doc_head2'>Get Details:</h3>
              <input type="text" placeholder="Enter Patient ID...." required value={pid} onChange={(e) => setPid(e.target.value)} />
              <button onClick={(e) => handleQuery(e, 1)}>Treatment</button>
              <button onClick={(e) => handleQuery(e, 2)}>Medicine Prescribed</button>
              <button onClick={(e) => handleQuery(e, 3)}>Appointment History</button>
            </div>
          </form>
          {result ? <Table data={result} /> : <br />}
        </div>
      </header >
    </div >
  );
}

export default DoctorDashboard;