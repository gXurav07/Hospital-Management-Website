import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Doctor from './Doctor';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="user1" element={<Login name="Front Desk Operator"/>}/>
            <Route path="user2" element={<Login name="Data Entry Operator"/>}/>
            <Route path="user3" element={<Login name="Doctor"/>}/>
            <Route path="user4" element={<Login name="Database Administrator"/>}/>
            <Route path="doctor_dashboard" element={<Doctor name="Doctor Dashboard"/>}/>
            <Route path="/" element={<Home/>}>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
export default App;