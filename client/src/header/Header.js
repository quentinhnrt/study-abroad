import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Route, Link, Routes, Navigate, useNavigate } from "react-router-dom";
import Login, {
  ProtectedRoute,
  ProtectedLink,
  NotProtectedLink,
  Admin,
} from "../Login";
import { useCookies, withCookies } from "react-cookie";

export const Header = () => {
  const [show, setShow] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["login"]);
  const [admin, setAdmin, removeAdmin] = useCookies(['admin'])
  let navigate = useNavigate()

  function disconnect(e) {
    e.preventDefault();
    removeCookie("login");
    removeAdmin('admin');
    navigate('/');
  }

  function showMenu() {
    setShow(true);
  }

  function hideMenu() {
    setShow(false);
  }

  return (
    <>
      <div className={"header"}>
        <div className="container">
          <Link to={"/"} className="logo">
            <img src="/logo.png" alt="logo" className="logo" />
          </Link>
          <FontAwesomeIcon
            icon={faBars}
            className="fa-bars"
            onClick={showMenu}
          />
        </div>
      </div>
      <div className={"menu " + (show ? "show" : null)}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/articles">News</Link>
          <Admin ><Link to="/articles/new">New Article</Link></Admin>
          <Admin ><Link to="/tags">New Tag</Link></Admin>
          <NotProtectedLink to="/user/register">Register</NotProtectedLink>
          <NotProtectedLink to="/user/login">Login</NotProtectedLink>
          <ProtectedLink to="/" onClick={(e) => disconnect(e)}>
            Logout
          </ProtectedLink>
          <FontAwesomeIcon
            icon={faTimes}
            className="fa-times"
            onClick={hideMenu}
          />
        </nav>
      </div>
    </>
  );
};
