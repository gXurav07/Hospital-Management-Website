import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="heading">
          <h1>Hospital Management System</h1>
          <hr/>
          <br/>
          <h2>Login or Sign Up As.....</h2>
        </div>
        <div className="container_home">
          <Link to="user1" className="box"><button>Front Desk Operator</button></Link>
          <Link to="user2" className="box"><button>Data Entry Operator</button></Link>
          <Link to="user3" className="box"><button>Doctor</button></Link>
          <Link to="user4" className="box"><button>Database Administrator</button></Link>
        </div>
      </header>
    </div>
  );
}