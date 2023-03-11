import React, { useState, useEffect } from 'react';
import TableContainer from './TableContainer';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function TreatmentResult(props) {
    const [treatments, setTreatments] = useState([]);
    const [treatmentId, setTreatmentId] = useState('');
    const [showForm, setShowForm] = useState(false);

    const server_addr = props.server_addr;

    useEffect(() => {
        // get all scheduled treatments from db
        fetch('http://' + server_addr + '/front-desk/treatment-result', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("Treatment data: ", data);
            setTreatments(data['treatments']);
        });
    }, []);

    useEffect(() => {
        console.log(['treatmentId:', treatmentId]);
        if (treatmentId !== '') {
            setShowForm(true);
        }
        else {
            setShowForm(true);
        }
    }, [treatmentId]);

    const treatmentColumns = [
        {
            Header: 'Treatment ID',
            accessor: 'id',
            Cell: ({ cell: { value } }) => value || "-",
                    },
        {
            Header: 'Name',
            accessor: 'Treatment_Name',
            Cell: ({ cell: { value } }) => value || "-",
                    },
        {
            Header: 'Patient',
            accessor: 'Patient_Name',
            Cell: ({ cell: { value } }) => value || "-",
                    }
    ];

    return (
        <div className='App'>
            <header className='App-header'>
                <div className=''>
                    <h1>Upload Treatment results</h1>
                    <hr />
                    <Col sm={{ offset: 3, size: 6 }}> Select{(treatmentId !== '') ? 'ed' : ''} {treatmentId} </Col>
                    {(treatments.length > 0) ? <TableContainer columns={treatmentColumns} data={treatments} selectedRow={treatmentId} setSelectedRow={(row) => setTreatmentId(row.values['id'])} identifierColumn={'id'} /> : <div>No new treatments scheduled</div>}
                    {
                        showForm && (
                            <Form>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="examplePassword" sm={2}>Password</Label>
                                    <Col sm={10}>
                                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelect" sm={2}>Select</Label>
                                    <Col sm={10}>
                                        <Input type="select" name="select" id="exampleSelect" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleSelectMulti" sm={2}>Select Multiple</Label>
                                    <Col sm={10}>
                                        <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleText" sm={2}>Text Area</Label>
                                    <Col sm={10}>
                                        <Input type="textarea" name="text" id="exampleText" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleFile" sm={2}>File</Label>
                                    <Col sm={10}>
                                        <Input type="file" name="file" id="exampleFile" />
                                        <FormText color="muted">
                                            This is some placeholder block-level help text for the above input.
                                            It's a bit lighter and easily wraps to a new line.
                                        </FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup tag="fieldset" row>
                                    <legend className="col-form-label col-sm-2">Radio Buttons</legend>
                                    <Col sm={10}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio2" />{' '}
                                                Option one is this and that—be sure to include why it's great
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="radio2" />{' '}
                                                Option two can be something else and selecting it will deselect option one
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check disabled>
                                            <Label check>
                                                <Input type="radio" name="radio2" disabled />{' '}
                                                Option three is disabled
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="checkbox2" sm={2}>Checkbox</Label>
                                    <Col sm={{ size: 10 }}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" id="checkbox2" />{' '}
                                                Check me out
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup check row>
                                    <Col sm={{ size: 10, offset: 2 }}>
                                        <Button>Submit</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        )
                    }
                </div>
            </header>
        </div>
    );
}

export default TreatmentResult;