import { useState } from "react";
import { FormGroup, Label, Col, Input, Form, Button } from "reactstrap";

function AddPatient(props) {
    const [ssn, setSSN] = useState('');
    const [name, setName] = useState('');
    const [addr, setAddr] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [insuranceID, setInsuranceID] = useState('');
    const [pcp, setPCP] = useState('');

    const server_addr = props.server_addr;

    const handleSubmit = (e) => {
        e.preventDefault();
        const doc = { ssn, name, addr, gender, age, phone, insuranceID, pcp };

        fetch('http://' + server_addr + '/doctors', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(doc)
        }).then(() => console.log("Added doctor!", doc));
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Add a Patient</h1>
                <hr />
            </header>
            <div className="App-body">
                <div className="managedocs">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup row>
                            <Label for="ssn" sm={3}>SSN</Label>
                            <Col sm={9}>
                                <Input type="text" name="ssn" id="ssn" placeholder="Enter patient SSN....." required value={ssn} onChange={(e) => setSSN(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" sm={3}>Name</Label>
                            <Col sm={9}>
                                <Input type="text" name="name" id="name" placeholder="Enter name of patient....." required value={name} onChange={(e) => setName(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="addr" sm={3}>Address</Label>
                            <Col sm={9}>
                                <Input type="text" name="addr" id="addr" placeholder="Enter address of patient...." required value={addr} onChange={(e) => setAddr(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="age" sm={3}>Age</Label>
                            <Col sm={9}>
                                <Input type="text" name="age" id="age" placeholder="Enter age of patient...." required value={age} onChange={(e) => setAge(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="phone" sm={3}>Phone</Label>
                            <Col sm={9}>
                                <Input type="text" name="phone" id="phone" placeholder="Enter phone number of patient...." required value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="insuranceID" sm={3}>Insurance ID</Label>
                            <Col sm={9}>
                                <Input type="text" name="insuranceID" id="insuranceID" placeholder="Enter insurance ID of patient...." required value={insuranceID} onChange={(e) => setInsuranceID(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="pcp" sm={3}>PCP</Label>
                            <Col sm={9}>
                                <Input type="text" name="pcp" id="pcp" placeholder="Enter PCP of patient...." required value={pcp} onChange={(e) => setPCP(e.target.value)} />
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ size: 9, offset: 3 }}>
                                <Button sm={3}>Add Patient</Button>
                            </Col>
                        </FormGroup>
                    </Form>

                    {/* <form onSubmit={handleSubmit}>
                        <label>SSN:</label>
                        <input type="text" placeholder="Enter patient SSN....." required value={ssn} onChange={(e) => setSSN(e.target.value)} />
                        <label>Name:</label>
                        <input type="text" placeholder="Enter name of patient....." required value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Address:</label>
                        <input type="text" placeholder="Enter address of patient...." required value={addr} onChange={(e) => setAddr(e.target.value)} />
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
                        <label>InsuranceID:</label>
                        <input type="text" placeholder="Enter Insurance ID of patient...." required value={insuranceID} onChange={(e) => setInsuranceID(e.target.value)} />
                        <label>PCP:</label>
                        <input type="text" placeholder="Enter PCP of patient...." required value={pcp} onChange={(e) => setPCP(e.target.value)} />
                        <button>Add Patient</button>
                    </form> */}
                </div>
            </div>
        </div>
    );
}

export default AddPatient;