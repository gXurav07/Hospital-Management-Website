import React from "react";
import { Link } from "react-router-dom";
import useToken from "./useToken";
import Login from "./Login";
import { useEffect, useState } from 'react';
import { checkAuth } from './useToken';

function AdminDashboard(props) {
  const server_addr = props.server_addr;
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')));
  // useEffect(() => {
  //   checkAuth();
  // }, [])
  // if(!token)
  //   return <Login name="Database Administrator" type={4} server_addr={server_addr} setToken={setToken}/>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Admin Dashboard</h1>
        <hr />
      </header>
      <div className="App-body">
        <div className="container_home">
          <Link to="managedocs" className="box"><button>Add Doctor</button></Link>
          <Link to="managedocsd" className="box"><button>Delete Doctor</button></Link>
          <Link to="manageops" className="box"><button>Add Data Operators</button></Link>
          <Link to="manageopsd" className="box"><button>Delete Data Operators</button></Link>
          {/* <Link to="managedocs" className="box"><button>Add Doctor</button></Link>
          <Link to="managedocsd" className="box"><button>Delete Doctor</button></Link>
          <Link to="manageops" className="box"><button>Add Data Operators</button></Link>
          <Link to="manageopsd" className="box"><button>Delete Data Operators</button></Link> */}
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;