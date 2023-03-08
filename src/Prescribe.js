import React, { useState, useEffect } from 'react';
import Table from './Table';
import jsonData from './prescribe_list.json';

function Prescribe(props) {
  const server_addr = props.server_addr;
  const did = props.did;
  const pid = props.pid;

  const [selectedType, setSelectedType] = useState('');
  const [listItems, setListItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [prescription, setPrescription] = useState([]);
  const [remarks, setRemarks] = useState("");

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
    const type = selectedType;
    const id = selectedItem;
    list.push({type, id, remarks, did, pid});
    setPrescription(list);
    // setSelectedType('');
    console.log("updated prescription ",prescription);
  };

  const sendPrescription = (e) => {
    e.preventDefault();
    console.log("Final Prescription", JSON.stringify(prescription));
    // const sent_prescription = {did, pid, prescription};

    // fetch('http://' + server_addr + '/doctor/' + did + '/prescribes/',{
    //     method: 'POST',
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(sent_prescription)
    // }).then(() => console.log("Added Operator!", sent_prescription) );
    setPrescription([]);
  };

  useEffect(() => {
    setListItems(jsonData);
    // fetch('http://' + server_addr + '/doctor/' + did + '/prescribes/')
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log("query result :", data);
    //     setListItems(data);
    //   });
    }, [])

  function ListItems(props){
    const type = props.type; 
    return (
        <div className="doctor_dashboard">
          <div className='form_wrapper'>
            <form>
              <label>Prescribe a {type}</label>
              <select value={selectedItem} onChange={handleItemChange}>
                <option value="">Select {type}</option>
                {listItems[type].map((item, index) => (
                <option key={index} value={index}>
                    {item['name']}
                </option>
                ))}
            </select>
            <label>Remarks:</label>
            <input type="text" placeholder="Enter Remarks..." value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            <button onClick={(e) => appendPrescription(e)}>Add to Prescription</button>
            {prescription===[] ? <hr/> : <button onClick={(e) => sendPrescription(e)}>Prescribe</button>}
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
        </div>
        {(selectedType==='Medication' ? <ListItems type="medication"/> : <br></br>)}
        {(selectedType==='Test' ? <ListItems type="test"/> : <br></br>)}
        {(selectedType==='Treatment' ? <ListItems type="treatment"/> : <br></br>)}
        {prescription ? <Table data={prescription}/> : console.log('no entry found')}
      </header>
    </div >
  );
}
export default Prescribe;