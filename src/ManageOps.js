import { useState } from "react";

function ManageOps(props) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const server_addr = props.server_addr;

  const handleSubmit = (e) => {
    e.preventDefault();
    const op = { name, role };

    fetch('http://' + server_addr + '/operator', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(op)
    }).then(data => {
      console.log(test);
      alert(data['message']);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Add an Operator</h1>
        <hr />
      </header>
      <div className="App-body">
        <div className="managedocs">
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
      </div>
    </div>
  );
}
export default ManageOps;