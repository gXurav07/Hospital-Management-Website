import React, { useState, useEffect } from 'react';
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
            setTests(data['tests']);
        });
    }, []);

    useEffect(() => {
        console.log(['testId:', testId]);
        if (testId !== '') {
            setShowForm(true);
        }
        else {
            setShowForm(true);
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
       <></>
    );
}

export default TestResult;