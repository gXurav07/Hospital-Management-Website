import React, { useState, useEffect } from 'react';
import Table from './Table';
import jsonData from './db.json';

function ManageDocsD(props) {
  const [patients, setPatients] = useState();
  const [result, setResult] = useState([]);
  const [did, setDid] = useState(1);
  const [pid, setPid] = useState();

  const server_addr = props.server_addr;

  useEffect(() => {
    setPatients(jsonData['doctors']);
  }, []);

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
        <h1>Delete Doctor</h1>
        <hr />
      </header>
      <div className="App-body">
        <div className="doctor_dashboard">
          {patients ? <Table data={patients} /> : <br />}
          <div className='form_wrapper'>
            <form>
              <label>Get Details:</label>
              <input type="text" placeholder="Enter Doctor ID...." required value={pid} onChange={(e) => setPid(e.target.value)} />
              <button className='but_'>Delete Doctor</button>
            </form>
          </div>
          {result ? <Table data={result} /> : <br />}
        </div>
      </div>
    </div >
  );
}
export default ManageDocsD;