import { useState } from "react";

function AddDepartment(props) {
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [headid, setHeadID] = useState('');
    const [desc, setDesc] = useState('');

    const server_addr = props.server_addr;

    const handleSubmit = (e) => {
        e.preventDefault();
        const dep = { departmentid : id, name, head : headid, type:'department' };

        fetch('http://' + server_addr + '/admin', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dep)
        })
        .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(dep);
            alert(data['message']);
          });
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="managedocs">
                    <h1>Add Department</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" placeholder="Enter name of department....." required value={name} onChange={(e) => setName(e.target.value)} />
                        <label>ID:</label>
                        <input type="text" placeholder="Enter department id...." required value={id} onChange={(e) => setID(e.target.value)} />
                        <label>HeadID:</label>
                        <input type="text" placeholder="Enter ID of head ...." required value={headid} onChange={(e) => setHeadID(e.target.value)} />
                        <button>Add Department</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default AddDepartment;