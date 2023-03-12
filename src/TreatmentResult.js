import React, { useState, useEffect } from 'react';
import TableContainer from './TableContainer';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function TreatmentResult(props) {
    const [treatments, setTreatments] = useState([]);
    const [treatmentId, setTreatmentId] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [success, setSuccess] = useState(true);

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
                if (data.hasOwnProperty('treatments')) setTreatments(data['treatments']);
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
                <h1>Upload Treatment results</h1>
                <hr />
            </header>
            <div className='App-body'>
                <Col sm={{ offset: 3, size: 6 }}> Select{(treatmentId !== '') ? 'ed' : ''} Treatment: {treatmentId} </Col>
                {(treatments.length > 0) ? <TableContainer columns={treatmentColumns} data={treatments} selectedRow={treatmentId} setSelectedRow={(row) => setTreatmentId(row.values['id'])} identifierColumn={'id'} /> : <div>No new treatments scheduled</div>}
                <hr />
                {
                    showForm && (
                        <Form>
                            <FormGroup row>
                                <Label for="remarks" sm={3}>Remarks:</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="text" id="remarks" style={{ maxHeight: '20vh' }} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="status" sm={3}>Status:</Label>
                                <Col sm={9}>
                                    <Label check >
                                        <Input type="checkbox" id="status" checked={success} onClick={() => setSuccess(!success)} style={{ backgroundColor: 'green' }} />
                                        {' '} Successfull?
                                    </Label>
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 3 }}>
                                    <Button sm={3}>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    )
                }
            </div>
        </div>
    );
}

export default TreatmentResult;