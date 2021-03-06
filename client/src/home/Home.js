import "./Home.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Route, Link, Routes, useNavigate } from "react-router-dom";
import Login, {
    ProtectedRoute,
    ProtectedLink,
    NotProtectedLink,
    Admin
} from "../Login";
import { useCookies, withCookies } from "react-cookie";

export default function Home() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["login"]);
    const [admin, setAdmin, removeAdmin] = useCookies(["admin"]);
    let navigate = useNavigate();

    let adminValue = parseInt(cookies.admin);

    function showMenu() {
        setShow(true);
    }

    function hideMenu() {
        setShow(false);
    }

    function disconnect(e) {
        e.preventDefault();
        removeCookie("login");
        removeAdmin('admin');
        window.location.reload(false);
        navigate('/');
    }



    async function getData() {
        let lead = (await axios.get("http://localhost:8000/articles/lead")).data;
        setData(lead);
    }

    function displayThumbnail(url) {
        return <img src={"http://localhost:8000/thumbnail/" + url} />;
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="homeHeader">
                <img src="logo.png" alt="logoLanding" className="homeLogo" />
                <FontAwesomeIcon
                    icon={faBars}
                    className="fa-barsHome"
                    onClick={showMenu}
                />
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
            <div className="articleList">
                <h1>Home</h1>
                {data.length ? (
                    data.map((x) => (
                        <article key={x.id} className={"container"}>
                            <div className="article">
                                <div className="media article-thumbnail">
                                    {displayThumbnail(x.thumbnailURL)}
                                </div>
                                <div className="article-info">
                                    <Link to={`/article/${x.id}`}>
                                        <h1 className="Article_title">{x.title}</h1>
                                    </Link>
                                    {adminValue === 1 ? (
                                        <div className="buttons">
                                            <Link to={`/addarticletag/${x.id}`}>
                                                <button>Add Tag</button>
                                            </Link>
                                            <Link to={`/articles/edit/${x.id}`}>
                                                <button>Modify</button>
                                            </Link>
                                            <Link to={`/articles/delete/${x.id}`}>
                                                <button>Delete</button>
                                            </Link>
                                        </div>
                                    ) : null}



                                </div>
                            </div>
                            {/* <div className="article-img">
            <div className="media">{displayMedia(x.mediaType, x.mediaURL)}</div>
            </div> */}
                        </article>
                    ))
                ) : (
                    <p>No articles</p>
                )}
                <Link to="/articles">
                    <p className="text-center text-secondary mt-3">More Articles...</p>
                </Link>
            </div>
        </>
    );
}
