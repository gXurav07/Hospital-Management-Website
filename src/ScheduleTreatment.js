import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import TableContainer from './TableContainer';

function ScheduleTreatment(props) {
    const [treatments, setTreatments] = useState([]);
    const [treatmentId, setTreatmentId] = useState('');
    const [slots, setSlots] = useState([]);
    const [slotId, setSlotId] = useState('');
    const [showSlots, setShowSlots] = useState(false);

    const server_addr = props.server_addr;

    useEffect(() => {
        // get all pending treatments from db
        fetch('http://'+server_addr+'/front-desk/schedule-treatment', {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("Treatment data: ", data);
            setTreatments(data['treatments']);
            setSlots(data['slots']);
        });
    }, []);

    useEffect(() => {
        console.log(['treatmentId:', treatmentId, 'slotId:', slotId]);
        if (treatmentId !== '') {
            setShowSlots(true);
        }
        else {
            setShowSlots(false);
        }
    }, [treatmentId]);

    const testColumns = [
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
                        <h1>Schedule Treatment</h1>
                        <hr/>
                        <Col sm={{offset: 3, size: 6}}> Select{(treatmentId!=='') ? 'ed' : ''} {treatmentId} </Col>
                        {(treatments.length > 0) ? <TableContainer columns={testColumns} data={treatments} selectedRow={treatmentId} setSelectedRow={(row) => setTreatmentId(row.values['id'])} identifierColumn={'id'}/> : <div>No treatments to schedule</div> }
                        {
                            showSlots && (
                                <>
                                    <br/>
                                    <hr/>
                                    <Col sm={{offset: 3, size: 6}}> Select{(slotId!=='') ? 'ed' : ''} {slotId} </Col>
                                    {(slots.length > 0) ? <TableContainer columns={slotColumns} data={slots} selectedRow={slotId} setSelectedRow={(row) => setSlotId(row.values['SlotID'])} TableName="Slots" identifierColumn={'SlotID'}/> : <div>Sorry! No matching slots found.</div> }
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

export default ScheduleTreatment;