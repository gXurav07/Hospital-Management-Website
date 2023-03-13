import { useState } from "react";
import { FormGroup, Label, Col, Input, Form, Button } from "reactstrap";

function ManageDocs(props) {
  const [name, setName] = useState('');
  const [employeeid, setEmpid] = useState('');
  const [departmentId, setDep] = useState('1');
  const [position, setPosition] = useState('hod');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const server_addr = props.server_addr;

  const handleSubmit = (e) => {
    e.preventDefault();
    const type = 'doctor';
    const doc = { name, physicianid: employeeid, position, department : departmentId, type : 'doctor'};

    fetch('http://' + server_addr + '/admin', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        alert(data['message'])
        // console.log("operation status: ", data['message']);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Add a Doctor</h1>
        <hr />
      </header>
      <div className="App-body">
        <div className="managedocs">
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="name" sm={3}>Name:</Label>
              <Col sm={9}>
                <Input type="text" name="name" id="name" placeholder="Enter name of doctor....." required value={name} onChange={(e) => setName(e.target.value)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="employeeid" sm={3}>Employee ID:</Label>
              <Col sm={9}>
                <Input type="text" name="employeeid" id="employeeid" placeholder="Enter employee ID of doctor....." required value={employeeid} onChange={(e) => setEmpid(e.target.value)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="department" sm={3}>Department:</Label>
              <Col sm={9}>
                <Input type="select" name="department" id="department" value={departmentId} onChange={(e) => setDep(e.target.value)}>
                  <option value={1}>Cardiology</option>
                  <option value={2}>Neurology</option>
                  <option value={3}>Surgery</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="position" sm={3}>Position:</Label>
              <Col sm={9}>
                <Input type="select" name="position" id="position" value={position} onChange={(e) => setPosition(e.target.value)}>
                  <option value="hod">Head of Department</option>
                  <option value="senior">Senior Doctor</option>
                  <option value="resident">Resident Doctor</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={3}>Email ID:</Label>
              <Col sm={9}>
                <Input type="text" name="email" id="email" placeholder="Enter email ID of doctor....." required value={email} onChange={(e) => setEmail(e.target.value)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={3}>Password:</Label>
              <Col sm={9}>
                <Input type="text" name="password" id="password" placeholder="Set password....." required value={password} onChange={(e) => setPassword(e.target.value)} />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 9, offset: 4 }}>
                <Button>Add Doctor</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ManageDocs;