import React from 'react';
import axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCookies, withCookies } from 'react-cookie';

function FormLogin(props) {
    return (
        <form onSubmit={props.onSignin}>
            <div>
                <label>Username:</label>
                <input type="text" id="username" autoComplete="off" ref={props.usernameRef} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" autoComplete="off" ref={props.passwordRef} />
            </div>
            <div>
                <button type="submit" name="login">Login</button>
            </div>
            
        </form>
    );
}

function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();
    let navigate = useNavigate();

    async function onSignup() {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        try {
            const p = (await axios.post('http://localhost:8000/signup', user));
            if (p.status === 200) {
                user.token = p.data.token;
                setCookie('login', user, '/');
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function onSignin(e) {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        try {
            const p = (await axios.post('http://localhost:8000/signin', user));
            if (p.status === 200) {
                user.token = p.data.token;
                setCookie('login', user, '/');
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (cookies.login && cookies.login.token) {
        navigate('/');
    }
    return <FormLogin onSignin={onSignin} onSignup={onSignup} usernameRef={usernameRef} passwordRef={passwordRef} />
}

function LocalProtectedRoute({ children, ...rest }) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return (
            React.cloneElement(children, { username: rest.allCookies.login.username, token: rest.allCookies.login.token })
        )
    }
    return <></>
}


/**
 * @return {null}
 */
function LocalProtectedLink({ ...rest }) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return <Link className={rest.className} to={rest.to} onClick={rest.onClick}>{rest.children}</Link>
    } else {
        return null;
    }
}

function LocalNotProtectedLink({ ...rest }) {
    if (!(rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token)) {
        return <Link className={rest.className} to={rest.to}>{rest.children}</Link>
    } else {
        return null;
    }
}

const ProtectedRoute = withCookies(LocalProtectedRoute);
const ProtectedLink = withCookies(LocalProtectedLink);
const NotProtectedLink = withCookies(LocalNotProtectedLink);

export { ProtectedRoute, ProtectedLink, NotProtectedLink };
export default Login;