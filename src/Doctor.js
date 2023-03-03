import style from "./css/doctor.module.css";

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div className={style.container}>
          <h1>Doctor Dashboard</h1>
          <div className={style.patient_list}>
            <h2>Patient List</h2>
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>35</td>
                  <td>Male</td>
                  <td>555-1234</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>42</td>
                  <td>Female</td>
                  <td>555-5678</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Mike Johnson</td>
                  <td>26</td>
                  <td>Male</td>
                  <td>555-2468</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <select id="query-dropdown">
              <option value="">Select Query Type</option>
              <option value="query1">Query 1</option>
              <option value="query2">Query 2</option>
              <option value="query3">Query 3</option>
            </select>
            <input type="text" placeholder="Enter Patient ID..." />
            <button className={style.but}>Submit</button>
          </div>
        </div>
      </header>
    </div>
  );
}