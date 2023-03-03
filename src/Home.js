import React from "react";
import { Link } from "react-router-dom";
import style from './css/home.module.css';

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
        <div className={style.container}>
          <Link to="user1" className={style.box}><button className={style.but}>Front Desk Operator</button></Link>
          <Link to="user2" className={style.box}><button className={style.but}>Data Entry Operator</button></Link>
          <Link to="user3" className={style.box}><button className={style.but}>Doctor</button></Link>
          <Link to="user4" className={style.box}><button className={style.but}>Database Administrator</button></Link>
        </div>
      </header>
    </div>
  );
}