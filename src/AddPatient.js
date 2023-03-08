import { useState } from "react";

function AddPatient(props) {
    const [patient_ssn, setSSN] = useState('');
    const [patient_name, setName] = useState('');
    const [address, setAddr] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [insuranceid, setInsuranceID] = useState('');
    // const [pcp, setPCP] = useState('');

    const server_addr = props.server_addr;

    const handleSubmit = (e) => {
        e.preventDefault();
        const status = 'not admitted';
        const patient = { patient_ssn, patient_name, address, gender, age, phone, email, status, insuranceid};

        fetch('http://' + server_addr + '/front-desk/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patient)
        }).then((data) => console.log("Added Patient! ", data));
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="managedocs">
                    <h1>Add a Patient</h1>
                    <form onSubmit={handleSubmit}>
                        <label>SSN:</label>
                        <input type="text" placeholder="Enter patient SSN....." required value={patient_ssn} onChange={(e) => setSSN(e.target.value)} />
                        <label>Name:</label>
                        <input type="text" placeholder="Enter name of patient....." required value={patient_name} onChange={(e) => setName(e.target.value)} />
                        <label>Address:</label>
                        <input type="text" placeholder="Enter address of patient...." required value={address} onChange={(e) => setAddr(e.target.value)} />
                        <label>Age:</label>
                        <input type="text" placeholder="Enter age of patient...." required value={age} onChange={(e) => setAge(e.target.value)} />
                        <label>Gender:</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label>Phone:</label>
                        <input type="text" placeholder="Enter phone number of patient....." required value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <label>Email:</label>
                        <input type="email" placeholder="Enter email-id of patient....." required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>InsuranceID:</label>
                        <input type="text" placeholder="Enter insurance-id of patient...." required value={insuranceid} onChange={(e) => setInsuranceID(e.target.value)} />
                        {/* <label>PCP:</label>
                        <input type="text" placeholder="Enter PCP of patient...." required value={pcp} onChange={(e) => setPCP(e.target.value)} /> */}
                        <button>Add Patient</button>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default AddPatient;