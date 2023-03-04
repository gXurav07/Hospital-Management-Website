import React, { useState, useEffect } from 'react';
import Table from './Table';
import jsonData from './db.json';

function DoctorDashboard() {
  const [patients, setPatients] = useState();
  const [result, setResult] = useState([]);
  const [did, setDid] = useState(1);
  const [pid, setPid] = useState();

//   useEffect(() => {
//     setData(jsonData['doctors']);
//   }, []);

  useEffect( () => {
    fetch('http://10.147.235.193:3000/doctor/'+did)
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
    fetch('http://10.147.235.193:3000/doctor/'+did+'?query='+qno+'&patient='+pid)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log("query result", data);
        setResult(data);
    });
  }

  return (
    <div className="doctor_dashboard">
    <div>
      {patients ? <Table data={patients}/> : <br/>}
    </div>
      <div className="query_patients">
      <h3>Enter Patient ID</h3>
      <form>
        <label>ID:</label>
        <input 
          type="text" 
          required 
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
        <h3>Get Details</h3>
        <button onClick={(e) => handleQuery(e,1)}>Treatment</button>
        <button onClick={(e) => handleQuery(e,2)}>Medicine Prescribed</button>
        <button onClick={(e) => handleQuery(e,3)}>Appointment History</button>
        </form>
        <div>
            {result ? <Table data={result}/> : <br/>}
        </div>
    </div>
    </div>
  );
}

export default DoctorDashboard;