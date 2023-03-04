export default function Login(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{props.name}</h1>
        <br/>
        <div className="main">
          <input type="checkbox" id="chk" area-hidden="true"/>

          <div className="signup">
            <form>
					    <label for="chk" aria-hidden="true">Sign up</label>
					    <input type="text" name="txt" placeholder="Name" required=""/>
					    <input type="email" name="email" placeholder="Email" required=""/>
					    <input type="password" name="pswd" placeholder="Password" required=""/>
					    <button>Sign up</button>
				    </form>
          </div>

          <div class="login">
				    <form>
					    <label for="chk" aria-hidden="true">Login</label>
					    <input type="email" name="email" placeholder="Email" required=""/>
					    <input type="password" name="pswd" placeholder="Password" required=""/>
					    <button>Login</button>
				    </form>
			    </div>

        </div>
      </header>
    </div>
  );
}
