import { useState } from "react";

function AddTest(props) {
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const server_addr = props.server_addr;

    const handleSubmit = (e) => {
        e.preventDefault();
        const test = { testid : id, name, cost, type:'test' };

        fetch('http://' + server_addr + '/admin', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(test)
        })
        .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(test);
            alert(data['message']);
          });
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="managedocs">
                    <h1>Add Test</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" placeholder="Enter name of test....." required value={name} onChange={(e) => setName(e.target.value)} />
                        <label>ID:</label>
                        <input type="text" placeholder="Enter test id...." required value={id} onChange={(e) => setID(e.target.value)} />
                        <label>Cost:</label>
                        <input type="text" placeholder="Enter cost ...." required value={cost} onChange={(e) => setCost(e.target.value)} />
                        <button>Add Test</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default AddTest;