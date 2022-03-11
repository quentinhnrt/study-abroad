import './Home.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Route, Link, Routes } from "react-router-dom";
import Login, { ProtectedRoute, ProtectedLink, NotProtectedLink } from "../Login";
import { useCookies, withCookies } from 'react-cookie';

export default function Home() {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const [path, setPath] = useState('');

    function showMenu() {
        setShow(true);
    }

    function hideMenu() {
        setShow(false);
    }


    function disconnect(e) {
        e.preventDefault()
        removeCookie('login');
    }

    if (path == "/") {
        document.getElementsByClassName('')
    }

    async function getData() {
        let lead = (await axios.get("http://localhost:8000/articles/lead")).data;
        setData(lead)
    }

    function displayThumbnail(url) {
        return <img src={"http://localhost:8000/thumbnail/" + url} />;
    }

    useEffect(() => {
        getData();
    })

    return (
        <>
            <div className="homeHeader" >
                <img src="logo.png" alt="logoLanding" className='homeLogo' />
                <FontAwesomeIcon icon={faBars} className="fa-barsHome" onClick={showMenu} />
            </div>
            <div className={"menu " + (show ? "show" : null)}>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/articles">News</Link>
                    <ProtectedLink to="/articles/new">New Article</ProtectedLink>
                    <NotProtectedLink to="/user/register">Register</NotProtectedLink>
                    <NotProtectedLink to="/user/login">Login</NotProtectedLink>
                    <ProtectedLink to="/" onClick={(e) => disconnect(e)}>Logout</ProtectedLink>
                    <FontAwesomeIcon icon={faTimes} className="fa-times" onClick={hideMenu} />

                </nav>

            </div>
            <div>
                {data ? (data.map((x) => (
                    <div>
                        {displayThumbnail(x.thumbnailURL)}
                        <h1>{x.title}</h1>
                        <p dangerouslySetInnerHTML={{ __html: x.content }}></p>

                    </div>
                ))
                ) : (
                    <h1>No articles</h1>
                )}
            </div>
        </>
    );
}
