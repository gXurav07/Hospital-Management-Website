import { useState } from "react";

export default function Login(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [empid, setEmpid] = useState('');
  const [password, setPassword] = useState('');

  const type = props.type;
  const server_addr = props.server_addr;

  const signup = {name, email, empid, password, type};
  const login = {email, password, type};

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Sent signup details!", login)
    fetch('http://'+server_addr+'/login',{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(signup)
  }).then(() => console.log("Sent signup details!", signup) );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Sent login details!", login)
    fetch('http://'+server_addr+'/login/?type='+type+'&empid='+empid+'&pass='+password)
    .then(() => console.log("Sent login details!", login) );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{props.name}</h1>
        <br/>
        <div className="main">
          <input type="checkbox" id="chk" area-hidden="true"/>

          <div className="signup">
            <form onSubmit={(e) => handleSignup(e)}>
					    <label htmlFor="chk" aria-hidden="true">Sign up</label>
					    <input type="text" 
              name="name"
              required 
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
              <input type="email" 
              name="email"
              required 
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
					    <input type="text" 
              name="empid"
              required 
              placeholder="Employee ID"
              value={empid}
              onChange={(e) => setEmpid(e.target.value)}
              />
					    <input type="password" 
              name="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
					    <button>Sign up</button>
				    </form>
          </div>

          <div className="login">
				    <form onSubmit={(e) => handleLogin(e)}>
					    <label htmlFor="chk" aria-hidden="true">Login</label>
					    <input type="text" 
              name="empid"
              required 
              placeholder="Employee ID"
              value={empid}
              onChange={(e) => setEmpid(e.target.value)}
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
      </header>
    </div>
  );
}
