import { useState } from "react";

function AddUser(props) {
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUserType] = useState(1);
    const [password, setPassword] = useState('');

    const server_addr = props.server_addr;

    const handleSubmit = (e) => {
        e.preventDefault();
        const med = { employeeid : id, name, email, password, user_type, type:'user' };

        fetch('http://' + server_addr + '/admin', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(med)
        })
        .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(med);
            alert(data['message']);
          });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Add User</h1>
                <hr />
            </header>
            <div className="App-body">
                <div className="managedocs">
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" placeholder="Enter name of user....." required value={name} onChange={(e) => setName(e.target.value)} />
                        <label>ID:</label>
                        <input type="text" placeholder="Enter user id...." required value={id} onChange={(e) => setID(e.target.value)} />
                        <select value={user_type} onChange={(e) => setUserType(e.target.value)}>
                            <option value={1}>Doctor</option>
                            <option value={2}>Front-Desk Operator</option>
                            <option value={3}>Data-Entry Operator</option>
                            <option value={4}>Administrator</option>
                        </select>
                        <label>Email ID:</label>
                        <input type="text" placeholder="Set Email-ID" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Password:</label>
                        <input type="password" placeholder="Set Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button>Add User</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddUser;