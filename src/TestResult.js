import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Col, Input, Button, FormText } from 'reactstrap';
import TableContainer from './TableContainer';

function TestResult(props) {
    const [tests, setTests] = useState([]);
    const [testId, setTestId] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [file, setFile] = useState(null);

    const server_addr = props.server_addr;

    const handleRemarksChange = (event) => {
        const { value } = event.target;
        setRemarks(value);
    };

    useEffect(() => {
        // get all scheduled tests from db
        fetch('http://' + server_addr + '/data-entry/test-result', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log("Test data: ", data);
                if (data.hasOwnProperty('tests')) setTests(data['tests']);
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
            accessor: 'Test_instanceID',
            Cell: ({ cell: { value } }) => value || "-",
            invisible: true,
        },
        {
            Header: 'Test Name',
            accessor: 'Test_Name',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Patient',
            accessor: 'Patient_Name',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Date',
            accessor: 'Date',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Time',
            accessor: 'Start',
            Cell: ({ cell: { value } }) => value || "-",
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(['remarks:', remarks, 'file:', file]);
        if(testId !== '' && remarks !== '' && remarks !== null) {
            // create FormData object
            const formData = new FormData();
            formData.append('test_instanceid', testId);
            formData.append('test_result', remarks);
            formData.append('file', file);
            
            // post to db
            fetch('http://' + server_addr + '/data-entry/test-result', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log("Test result data: ", data);
                if (data['message'] == 'OK') {
                    alert('Test result added successfully');
                    const newTests = tests.filter((test) => test['Test_instanceID'] !== testId);
                    setTests(newTests);
                    setFile(null);
                    setTestId('');
                }
                else {
                    alert('Error adding treatment result');
                }
            })
            .catch(error => {
                console.log('Error adding test result: ', error);
                alert('Error adding test result');
            });
        }
        else {
            alert('Please enter remarks');
        }
    }
    

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Upload Test results</h1>
                <hr />
            </header>
            <div className='App-body'>
                <Col className='my-col' sm={{ offset: 3, size: 6 }}> Select{(testId !== '') ? 'ed' : ''} Test: {testId} </Col>
                {(tests.length > 0) ? <TableContainer columns={testColumns} data={tests} selectedRow={testId} setSelectedRow={(row) => setTestId(row.values['Test_instanceID'])} identifierColumn="Test_instanceID" /> : <div>No tests scheduled</div>}
                <br />
                <hr />
                <br />
                {
                    showForm && (
                        <div className='managedocs'>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Label for="remarks" sm={3}>Remarks</Label>
                                    <Col sm={9}>
                                    <Input type="textarea" name="text" id="remarks" style={{ maxHeight: '25vh' }} value={remarks} onChange={handleRemarksChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="fileUpload" sm={3}>Upload File</Label>
                                    <Col sm={9}>
                                        <Input type="file" onChange={(e)=>setFile(e.target.files[0])} name="file" id="fileUpload" />
                                        <FormText color="muted">
                                            max allowed file size is 2MB
                                        </FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup check row>
                                    <Col sm={{ size: 9, offset: 3 }}>
                                        <Button sm={3} type="submit">Submit</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default TestResult;