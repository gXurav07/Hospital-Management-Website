import { useState } from "react";

function AddTreatment(props) {
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const server_addr = props.server_addr;

    const handleSubmit = (e) => {
        e.preventDefault();
        const treatment = { treatmentid: id, name: name, cost: cost, type:'treatment'};

        fetch('http://' + server_addr + '/admin', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(treatment)
        })
        .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(treatment);
            alert(data['message']);
          });
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="managedocs">
                    <h1>Add Treatment</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" placeholder="Enter name of treatment....." required value={name} onChange={(e) => setName(e.target.value)} />
                        <label>ID:</label>
                        <input type="text" placeholder="Enter treatment id...." required value={id} onChange={(e) => setID(e.target.value)} />
                        <label>Cost:</label>
                        <input type="text" placeholder="Enter cost ...." required value={cost} onChange={(e) => setCost(e.target.value)} />
                        <button>Add Treatment</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default AddTreatment;