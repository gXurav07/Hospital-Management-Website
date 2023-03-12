import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Col, Input, Button, FormText } from 'reactstrap';
import TableContainer from './TableContainer';

function TestResult(props) {
    const [tests, setTests] = useState([]);
    const [testId, setTestId] = useState('');
    const [showForm, setShowForm] = useState(false);

    const server_addr = props.server_addr;

    useEffect(() => {
        // get all scheduled tests from db
        fetch('http://' + server_addr + '/front-desk/test-result', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("Test data: ", data);
            if(data.hasOwnProperty('tests')) setTests(data['tests']);
        });
    }, []);

    useEffect(() => {
        console.log(['testId:', testId]);
        if (testId !== '') {
            setShowForm(true);
        }
        else {
            setShowForm(false);
        }
    }, [testId]);

    const testColumns = [
        {
            Header: 'Test ID',
            accessor: 'id',
            Cell: ({ cell: { value } }) => value || "-",
                    },
        {
            Header: 'Name',
            accessor: 'Test_Name',
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
            <div className='App-header'>
                <h1>Upload Test results</h1>
                <hr />
                <Col sm={{ offset: 3, size: 6 }}> Select{(testId !== '') ? 'ed' : ''} Test: {testId} </Col>
                {(tests.length > 0) ? <TableContainer columns={testColumns} data={tests} setRowId={setTestId} /> : <div>No tests scheduled</div>}
                <hr />
                {
                    showForm && (
                        <Form>
                            <FormGroup row>
                                <Label for="remarks" sm={3}>Remarks</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="text" id="remarks" style={{maxHeight: '20vh'}}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="fileUpload" sm={3}>Upload File</Label>
                                <Col sm={9}>
                                    <Input type="file" name="file" id="fileUpload" />
                                    <FormText color="muted">
                                        max allowed file size is 10MB
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 9, offset: 3 }}>
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

export default TestResult;