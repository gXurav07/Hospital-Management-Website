import { useState } from "react";

function ManageDocs(props) {
  const [name, setName] = useState('');
  const [employeeid, setEmpid] = useState('');
  const [department, setDep] = useState('1');
  const [position, setPosition] = useState('hod');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const server_addr = props.server_addr;

  const handleSubmit = (e) => {
    e.preventDefault();
    const type = 'doctor';
    const doc = { name, employeeid, position, department, email, password, type };

    fetch('http://' + server_addr + '/admin', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("operation status: ", data['message']);
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
            <input type="text" placeholder="Enter Employee Number" required value={employeeid} onChange={e => setEmpid(e.target.value)} />
            <label>Department:</label>
            <select value={department} onChange={(e) => setDep(e.target.value)}>
              <option value={1}>Cardiology</option>
              <option value={2}>Neurology</option>
              <option value={3}>Surgery</option>
            </select>
            <label>Position:</label>
            <select value={position} onChange={(e) => setPosition(e.target.value)}>
              <option value="hod">Head of Department</option>
              <option value="senior">Senior Doctor</option>
              <option value="resident">Resident Doctor</option>
            </select>
            <label>Email ID:</label>
            <input type="text" placeholder="Set Email-ID" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="text" placeholder="Set Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Add Doctor</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageDocs;