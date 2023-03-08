import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import TableContainer from './TableContainer';

function ScheduleTest(props) {
    const [tests, setTests] = useState([]);
    const [testId, setTestId] = useState('');
    const [slots, setSlots] = useState([]);
    const [slotId, setSlotId] = useState('');
    const [showSlots, setShowSlots] = useState(false);

    const server_addr = props.server_addr;

    useEffect(() => {
        // get all pending tests from db
        fetch('http://'+server_addr+'/front-desk/test', {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("Test data: ", data);
            setTests(data['tests']);
            setSlots(data['slots']);
        });
    }, []);

    useEffect(() => {
        console.log(['testId:', testId, 'slotId:', slotId]);
        if (testId !== '') {
            setShowSlots(true);
        }
        else {
            setShowSlots(false);
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

    const slotColumns = [
        {
            Header: 'Slot ID',
            accessor: 'id',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'Start Time',
            accessor: 'start_time',
            Cell: ({ cell: { value } }) => value || "-",
        },
        {
            Header: 'End Time',
            accessor: 'end_time',
            Cell: ({ cell: { value } }) => value || "-",
        }
    ];

    return (
        <div className='App'>
            <header className='App-header'>
                <form className='doctor-dashboard'>
                    <div className='form_wrapper'>
                        <h1>Schedule Test</h1>
                        <hr/>
                        <Col sm={{offset: 3, size: 6}}> Select{(testId!=='') ? 'ed' : ''} {testId} </Col>
                        {(tests.length > 0) ? <TableContainer columns={testColumns} data={tests} setTestId={setTestId} /> : <div>No tests to schedule</div> }
                        {
                            showSlots && (
                                <>
                                    <br/>
                                    <hr/>
                                    <Col sm={{offset: 3, size: 6}}> Select{(slotId!=='') ? 'ed' : ''} {slotId} </Col>
                                    {(slots.length > 0) ? <TableContainer columns={slotColumns} data={slots} setSlotId={setSlotId} /> : <div>Sorry! No matching slots found.</div> }
                                    <br/>
                                    <button type='submit' className='but_'>Schedule</button>
                                </>
                            )
                        }
                    </div>
                </form>
            </header>
        </div>
    );
}

export default ScheduleTest;