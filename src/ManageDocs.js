import { useState } from "react";

function ManageDocs() {
  const [name, setName] = useState('');
  const [dep, setDep] = useState('');
  const [position, setPosition] = useState('hod');
  const [trainedIn, setTrainedIn] = useState('bypass');

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {name, dep, position, trainedIn};

    fetch('http://localhost:8000/doctors',{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(doc)
    }).then(() => console.log("Added doctor!", doc) );
  }

  return (
    <div className="managedocs">
      <h2>Add a Doctor</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Department:</label>
        <input 
          type="text" 
          required 
          value={dep}
          onChange={(e) => setDep(e.target.value)}
        />
        <label>Position:</label>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option value="hod">Head of Department</option>
          <option value="senior">Senior Doctor</option>
          <option value="resident">Resident Doctor</option>
        </select>
        <label>Trained in:</label>
        <select
          value={trainedIn}
          onChange={(e) => setTrainedIn(e.target.value)}
        >
          <option value="bypass">Bypass Surgery</option>
          <option value="vascular">Vascular Surgery</option>
          <option value="general">General Surgery</option>
        </select>
        <button>Add Doctor</button>
      </form>
    </div>
  );
}

export default ManageDocs;