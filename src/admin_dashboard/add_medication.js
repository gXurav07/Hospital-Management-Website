import { useState } from "react";

function AddMedication(props) {
    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [desc, setDesc] = useState('');

    const server_addr = props.server_addr;

    const handleSubmit = (e) => {
        e.preventDefault();
        const med = { medicationid : id, name, brand, description : desc, type:'medication' };

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
                <div className="managedocs">
                    <h1>Add Medication</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" placeholder="Enter name of medication....." required value={name} onChange={(e) => setName(e.target.value)} />
                        <label>ID:</label>
                        <input type="text" placeholder="Enter medication id...." required value={id} onChange={(e) => setID(e.target.value)} />
                        <label>Brand:</label>
                        <input type="text" placeholder="Enter brand name...." required value={brand} onChange={(e) => setBrand(e.target.value)} />
                        <label>Description:</label>
                        <input type="text" placeholder="Enter description....." required value={desc} onChange={(e) => setDesc(e.target.value)} />
                        <button>Add Medication</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default AddMedication;