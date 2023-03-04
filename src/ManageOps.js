import { useState } from "react";

function ManageOps() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const op = { name, role };

    fetch('http://localhost:8000/operator', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(op)
    }).then(() => console.log("Added Operator!", op));
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="managedocs">
          <h1>Add an Operator</h1>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" placeholder="Enter name...." required value={name} onChange={(e) => setName(e.target.value)} />
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="front">Front Desk Operator</option>
              <option value="data">Data Entry Operator</option>
            </select>
            <button>Add Operator</button>
          </form>
        </div>
      </header>
    </div>
  );
}
export default ManageOps;