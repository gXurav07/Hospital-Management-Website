import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "./useToken";

export default function Login(props) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(1);

  const navigate = useNavigate();
  const server_addr = props.server_addr;
  const login = { id, password, type };

  const handleLogin = (e) => {
    let status;
    e.preventDefault();
    console.log("login details!", login);
    // fetch('http://'+server_addr+'/login/?type='+type+'&id='+id+'&pass='+password)
    // .then(res => {
    //   return res.json();
    // })
    // .then(data => {
    //   status = data;
    // });
    // if(status['success']=='successful')
    // {
    //   props.onLogin(id);
    //   sessionStorage.setItem('token', JSON.stringify({logged_in: true, type: type}));
    //   navigate("/user"+type);
    // }
    // else
    // {
    //   alert("Authentication Failed ", status['message']);
    // }
    props.onLogin();
    sessionStorage.setItem('token', JSON.stringify({logged_in: true, type: type}));
    navigate("/user"+type);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{props.name}</h1>
        <hr />
      </header>
      <div className="main">
        <div className="managedocs">
          <form onSubmit={(e) => handleLogin(e)}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value={1}>Front-End</option>
              <option value={2}>Data-Entry</option>
              <option value={3}>Doctor</option>
              <option value={4}>Administrator</option>
            </select>
            <input type="text"
              name="empid"
              required
              placeholder="Employee ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input type="password"
              name="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </div>

        </div>
      </div>
  );
}
