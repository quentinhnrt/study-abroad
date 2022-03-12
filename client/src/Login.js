import React from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCookies, withCookies } from "react-cookie";
import "./user/Login.css";
import { Header } from "./header/Header";
function FormLogin(props) {
    return (
        <>
            <Header />
            <div className="container2 ">
                <article className="card-body">
                    <a
                        href="/user/register"
                        className="float-right btn btn-outline-primary"
                    >
                        Sign up
                    </a>
                    <h4 className="card-title mb-4 mt-1">Sign in</h4>
                    <form onSubmit={props.onSignin}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                ref={props.usernameRef}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                ref={props.passwordRef}
                            />
                        </div>
                        <div className="form-group">
                            <div className="checkbox">
                                <label>
                                    {" "}
                                    <input type="checkbox" /> Save password
                                </label>
                            </div>
                        </div>
                        <button className="btn-block rounded" type="submit" name="login">
                            Login
                        </button>
                    </form>
                </article>
            </div>
        </>
    );
}

function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(["login"]);
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();
    let navigate = useNavigate();

    async function onSignup() {
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            const p = await axios.post("http://localhost:8000/signup", user);
            if (p.status === 200) {
                user.token = p.data.token;

                setCookie("login", user, "/");
            }
        } catch (err) {
            console.error(err);
        }
    }

    async function onSignin(e) {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        try {
            const p = await axios.post("http://localhost:8000/signin", user);
            if (p.status === 200) {
                user.token = p.data.token;
                setCookie("login", user, "/");
                setCookie("admin", p.data.admin, "/");
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (cookies.login && cookies.login.token) {
        navigate("/");
    }
    return (
        <FormLogin
            onSignin={onSignin}
            onSignup={onSignup}
            usernameRef={usernameRef}
            passwordRef={passwordRef}
        />
    );
}

function LocalProtectedRoute({ children, ...rest }) {
    if (
        rest.allCookies &&
        rest.allCookies.login &&
        rest.allCookies.login.username &&
        rest.allCookies.login.token
    ) {
        return React.cloneElement(children, {
            username: rest.allCookies.login.username,
            token: rest.allCookies.login.token,
        });
    }
    return <></>;
}

/**
 * @return {null}
 */
function LocalProtectedLink({ ...rest }) {
    if (
        rest.allCookies &&
        rest.allCookies.login &&
        rest.allCookies.login.username &&
        rest.allCookies.login.token
    ) {
        return (
            <Link className={rest.className} to={rest.to} onClick={rest.onClick}>
                {rest.children}
            </Link>
        );
    } else {
        return null;
    }
}

function LocalAdmin({ ...rest }) {
    const [cookies, setCookie, removeCookie] = useCookies(["admin"]);
    if (cookies.admin == 1) {
        return rest.children
    }else{
        return null
    }
}

function LocalNotProtectedLink({ ...rest }) {
    if (
        !(
            rest.allCookies &&
            rest.allCookies.login &&
            rest.allCookies.login.username &&
            rest.allCookies.login.token
        )
    ) {
        return (
            <Link className={rest.className} to={rest.to}>
                {rest.children}
            </Link>
        );
    } else {
        return null;
    }
}

const ProtectedRoute = withCookies(LocalProtectedRoute);
const ProtectedLink = withCookies(LocalProtectedLink);
const NotProtectedLink = withCookies(LocalNotProtectedLink);
const Admin = withCookies(LocalAdmin);

export { ProtectedRoute, ProtectedLink, NotProtectedLink, Admin };
export default Login;
