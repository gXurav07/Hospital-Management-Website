import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Link } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/* <Route index element={<Home />} /> */}
            <Route path="user1" element={<Login name="Front Desk Operator"/>} />
            <Route path="user2" element={<Login name="Data Entry Operator"/>} />
            <Route path="user3" element={<Login name="Doctor"/>} />
            <Route path="user4" element={<Login name="Database Administrator  "/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;