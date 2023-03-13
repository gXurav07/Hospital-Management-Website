import { useState } from "react";

function ManageDocs(props) {
  const [name, setName] = useState('');
  const [employeeid, setEmpid] = useState('');
  const [departmentId, setDep] = useState('1');
  const [position, setPosition] = useState('hod');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const server_addr = props.server_addr;

  const handleSubmit = (e) => {
    e.preventDefault();
    const type = 'doctor';
    const doc = { name, physicianid: employeeid, position, department : departmentId, type : 'doctor'};

    fetch('http://' + server_addr + '/admin', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        alert(data['message'])
        // console.log("operation status: ", data['message']);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Add a Doctor</h1>
        <hr />
      </header>
      <div className="App-body">
        <div className="managedocs">
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" placeholder="Enter Name of Doctor" required value={name} onChange={(e) => setName(e.target.value)} />
            <label>Employee ID:</label>
            <input type="text" placeholder="Enter Physician ID" required value={employeeid} onChange={e => setEmpid(e.target.value)} />
            <label>Department ID:</label>
            <input type="text" placeholder="Enter Department ID" required value={departmentId} onChange={e => setDep(e.target.value)} />
            <label>Position:</label>
            <select value={position} onChange={(e) => setPosition(e.target.value)}>
              <option value="hod">Head of Department</option>
              <option value="senior">Senior Doctor</option>
              <option value="resident">Resident Doctor</option>
            </select>
            <button>Add Doctor</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageDocs;