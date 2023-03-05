import { useState } from "react";

function ManageDocs(props) {
  const [name, setName] = useState('');
  const [dep, setDep] = useState('');
  const [position, setPosition] = useState('hod');
  const [trainedIn, setTrainedIn] = useState('bypass');

  const server_addr = props.server_addr;

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {name, dep, position, trainedIn};

    fetch('http://'+server_addr+'/doctors',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(doc)
    }).then(() => console.log("Added doctor!", doc) );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="managedocs">
          <h1>Add a Doctor</h1>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" placeholder="Enter name of doctor....." required value={name} onChange={(e) => setName(e.target.value)} />
            <label>Department:</label>
            <input type="text" placeholder="Enter department of doctor...." required value={dep} onChange={(e) => setDep(e.target.value)} />
            <label>Position:</label>
            <select value={position} onChange={(e) => setPosition(e.target.value)}>
              <option value="hod">Head of Department</option>
              <option value="senior">Senior Doctor</option>
              <option value="resident">Resident Doctor</option>
            </select>
            <label>Trained in:</label>
            <select value={trainedIn} onChange={(e) => setTrainedIn(e.target.value)}>
              <option value="bypass">Bypass Surgery</option>
              <option value="vascular">Vascular Surgery</option>
              <option value="general">General Surgery</option>
            </select>
            <button>Add Doctor</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default ManageDocs;