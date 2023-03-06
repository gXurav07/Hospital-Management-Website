import React, { useState, useEffect } from 'react';
import Table from './Table';
import jsonData from './db.json';

function Appointment(props) {
    const [patients, setPatients] = useState();
    // const [result, setResult] = useState([]);
    const [did, setDid] = useState();
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
                    <h1>Schedule an Appointment</h1>
                    {patients ? <Table data={patients} /> : <br />}
                    {patients ? <Table data={patients} /> : <br />}
                    <div className='form_wrapper'>
                        <form>
                            <input type="text" placeholder="Enter Patient ID...." required value={pid} onChange={(e) => setPid(e.target.value)} />
                            <input type="text" placeholder="Enter Doctor ID...." required value={did} onChange={(e) => setDid(e.target.value)} />
                            <input type="datetime-local" id="app_time"></input>
                            <button className='but_'>Schedule</button>
                        </form>
                    </div>
                </div>
            </header>
        </div >
    );
}
export default Appointment;