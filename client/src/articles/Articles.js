import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";
import { Link } from "react-router-dom";
import { Header } from "../header/Header";

export default function Articles() {
  const [data, setData] = useState([]);

  async function search(e) {
    let req = e.target.value;
    if (e.target.value != "") {
      const request = (await axios.get(`http://localhost:8000/search/${req}`))
        .data;
      setData(request);
    } else {
      getArticles();
    }
  }

  async function getArticles() {
    const data = (await axios.get("http://localhost:8000/articles")).data;
    setData(data);
  }

  useEffect(() => {
    getArticles();
  }, []);

  function displayThumbnail(url) {
    return <img src={"http://localhost:8000/thumbnail/" + url} />;
  }

  function displayMedia(type, url) {
    let fileType = type.split("/")[0];
    if (fileType === "image") {
      return <img src={"http://localhost:8000/media/" + url} />;
    } else if (fileType === "video") {
      return (
        <video controls>
          <source
            src={"http://localhost:8000/media/" + url}
            type={type}
          ></source>
        </video>
      );
    } else if (fileType === "audio") {
      <audio controls>
        <source src={"http://localhost:8000/media/" + url} type={type}></source>
      </audio>;
    }
  }

  return (
    <>

 <Header/>
 <h1>Articles !!</h1>
      {console.log(data)}
      <ul>
      <li>
      <div className="searchbar">
      <input id="search" type="search"  placeholder="Search for an article" onKeyUp={(e) => search(e)} />
      </div></li>
      <li className="dropdown">
    <a href="javascript:void(0)" className="dropbtn">Tags</a>
    <div className="dropdown-content">
      <a href="#">tag 1</a>
      <a href="#">tag 2</a>
      <a href="#">tag 3</a>
    </div>
    </li>
    </ul>
      {data.length ? (
        data.map((x) => (
          <article key={x.id}>
            <div className="article">
            <div className="article-info">
            <h1 className="Article_title">{x.title}</h1>

            <section className="article-content" dangerouslySetInnerHTML={{ __html: x.content }}></section>
            </div>
            <div className="media article-thumbnail">{displayThumbnail(x.thumbnailURL)}</div>
            </div>
            {/* <div className="article-img">
            <div className="media">{displayMedia(x.mediaType, x.mediaURL)}</div>
            </div> */}
            <button>Add Tag</button>
            <button>Modify</button>


            <Link to={`/articles/delete/${x.id}`}>
              <button>Delete</button>
            </Link>
          </article>
        ))
      ) : (
        <p>no articles</p>
      )}
    </>
  );
}
