import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../header/Header";
import "./Article.css";
import { useCookies, withCookies } from 'react-cookie';




export default function Article() {
  const [data, setData] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['login']);
  let guest = true;
  if (cookies.login) {
    guest = false
  } else {
    guest = true
  }
  let params = useParams()

  useEffect(() => {
    getArticle();
  }, []);

  async function getArticle() {
    const data = (await axios.get("http://localhost:8000/article/" + params.id))
      .data;
    setData(data);
    const data2 = (
      await axios.get("http://localhost:8000/articletag/" + params.id)
    ).data;
    setTags(data2);
  }

  function displayThumbnail(url) {
    return (
      <img className="w-100" src={"http://localhost:8000/thumbnail/" + url} />
    );
  }

  function displayMedia(type, url) {
    let fileType = type.split("/")[0];
    if (fileType === "image") {
      return (
        <img className="w-100" src={"http://localhost:8000/media/" + url} />
      );
    } else if (fileType === "video") {
      return (
        <video controls className="w-100">
          <source
            src={"http://localhost:8000/media/" + url}
            type={type}
          ></source>
        </video>
      );
    } else if (fileType === "audio") {
      return (
        <div className="m-4">
          <audio controls autoPlay className="w-100">
            <source src={"http://localhost:8000/media/" + url} type={type} />
          </audio>
        </div>
      );
    }
  }

  if (data === undefined)
    return <p>Loading</p>

  if (data.length === 0)
    return <p>Unknown article</p>
  let d = data[0]

  return (
    <>
      <Header />
      <h1 className="articleTitle">{d.title}</h1>
      <ul className="tagsName">
        {tags.map((t) => <>{<li>{t.name}</li>}</>)}
      </ul>

      <p className="container" dangerouslySetInnerHTML={{ __html: d.content }}></p>
      {guest ? (
        <div className="guest">
          <div className="guestMessage">
            <h1> You need to be logged to see this content</h1>
            <Link to={'/user/login'}><button className="btnLogin">Login</button></Link>
          </div>
        </div>
      ) : null}
    </>
  );
}

