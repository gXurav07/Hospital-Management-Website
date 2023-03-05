import React, { useState, useEffect } from 'react';
import Table from './Table';
import jsonData from './db.json';

function AdmitPatient(props) {
    const [patients, setPatients] = useState();
    // const [result, setResult] = useState([]);
    // const [did, setDid] = useState(1);
    const [pid, setPid] = useState();

    const server_addr = props.server_addr;

    useEffect(() => {
      setPatients(jsonData['doctors']);
    }, []);

    // useEffect(() => {
    //     fetch('http://' + server_addr + '/doctor/' + did)
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log("doctor's patients", data['Patients']);
    //             setPatients(data['Patients']);
    //         });
    // }, [])

    // const handleQuery = (e, qno) => {
    //     e.preventDefault();
    //     fetch('http://' + server_addr + '/doctor/' + did + '?query=' + qno + '&patient=' + pid)
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log("query result", data);
    //             setResult(data);
    //         });
    // }

    return (
        <div className="App">
            <header className="App-header">
                <div className="doctor_dashboard">
                    <h1>Admit a Patient</h1>
                    {patients ? <Table data={patients} /> : <br />}
                    <div className='form_wrapper'>
                        <form>
                            {/* <label>ID:</label> */}
                            <input type="text" placeholder="Enter Patient ID...." required value={pid} onChange={(e) => setPid(e.target.value)} />
                            <button className='but_'>Admit</button>
                        </form>
                    </div>
                </div>
            </header>
        </div >
    );
}
export default AdmitPatient;