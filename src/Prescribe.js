import React, { useState, useEffect } from 'react';
import Table from './Table';
import jsonData from './db.json';

function Prescribe(props) {
  const server_addr = props.server_addr;
  const did = props.did;
  const pid = props.pid;

  const [selectedType, setSelectedType] = useState('');
  const [listItems, setListItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [prescription, setPrescription] = useState([]);
  const [remarks, setRemarks] = useState('');

  const types = ['Medication', 'Test', 'Treatment'];
  const items = ['item1', 'item2', 'item3'];

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const appendPrescription = (e) => {
    e.preventDefault();
    let list = prescription;
    list.push({selectedType, selectedItem, remarks});
    setPrescription(list);
  };

  const sendPrescription = (e) => {
    e.preventDefault();
    console.log("Final Prescription", JSON.stringify(prescription));
    setPrescription([]);
  };

  useEffect(() => {
    fetch('http://' + server_addr + '/doctor/' + did + '/prescribes/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("query result :", data);
        setListItems(data);
      });
    }, [])

  // useEffect(() => {
  //   setPatients(jsonData['doctors']);
  // }, []);

//   useEffect(() => {
//     console.log("requesting all patient data");
//     fetch('http://' + server_addr + '/doctor/' + did)
//       .then(res => {
//         return res.json();
//       })
//       .then(data => {
//         console.log("doctor's patients", data['data']);
//         setPatients(data['data']);
//       });
//   }, [])

//   const handleQuery = (e, qno) => {
//     e.preventDefault();
//     fetch('http://' + server_addr + '/doctor/' + did + '?type=' + qno + '&patient=' + pid)
//       .then(res => {
//         return res.json();
//       })
//       .then(data => {
//         console.log("query result", data['data']);
//         setResult(data['data']);
//       });
//   }

  function ListItems(props){
    const type = props.type; 
    return (
        <div className="doctor_dashboard">
          <div className='form_wrapper'>
            <form>
              <label>{type}</label>
              <select value={selectedType} onChange={handleItemChange}>
                <option value="">Select {type}</option>
                {listItems[type].map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
                ))}
            </select>
            <label>Remarks:</label>
            <input type="text" placeholder="Enter Remarks..." value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            <button onClick={(e) => appendPrescription(e)}>Add to Prescription</button>
            <button onClick={(e) => sendPrescription(e)}>Prescribe</button>
            </form>
          </div>
        </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="doctor_dashboard">
          <h1>Prescribe to a Patient</h1>
          <div className='form_wrapper'>
            <form>
              <label>Type</label>
              <select value={selectedType} onChange={handleTypeChange}>
                <option value="">Select a type</option>
                {types.map((type, index) => (
                <option key={index} value={type}>
                    {type}
                </option>
                ))}
            </select>
            </form>
          </div>
          {/* {result ? <Table data={result}/> : console.log('no entry found')} */}
        </div>
        {(selectedType==='Medication' ? <ListItems type="medication"/> : <br></br>)}
        {(selectedType==='Test' ? <ListItems type="test"/> : <br></br>)}
        {(selectedType==='Treatment' ? <ListItems type="treatment"/> : <br></br>)}
      </header>
    </div >
  );
}
export default Prescribe;