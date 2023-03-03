import style from './css/login.module.css';

export default function Login(props) {
    return (
        <div className="App">
            <header className="App-header">
                <h1>{props.name}</h1>
                <br/>
                <div className={style.main}>
                    <input className={style.inp} type="checkbox" id={style.chk} area-hidden="true" />

                    <div className={style.signup}>
                        <form>
                            <label className={style.lab} for={style.chk} aria-hidden="true">Sign up</label>
                            <input className={style.inp} type="text" name="txt" placeholder="Name" required="" />
                            <input className={style.inp} type="email" name="email" placeholder="Email" required="" />
                            <input className={style.inp} type="password" name="pswd" placeholder="Password" required="" />
                            <button className={style.but}>Sign up</button>
                        </form>
                    </div>

                    <div className={style.login}>
                        <form>
                            <label className={style.lab} for={style.chk} aria-hidden="true">Login</label>
                            <input className={style.inp} type="email" name="email" placeholder="Email" required="" />
                            <input className={style.inp} type="password" name="pswd" placeholder="Password" required="" />
                            <button className={style.but}>Login</button>
                        </form>
                    </div>

                </div>
            </header>
        </div>
    );
}