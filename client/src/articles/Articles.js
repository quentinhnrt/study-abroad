import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";
import { Link } from "react-router-dom";
import { Header } from "../header/Header";

export default function Articles() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([])


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

  async function filter(e) {
    let tag = e.target.value;
    const request = (await axios.get(`http://localhost:8000/filterTag/${tag}`)).data
    setData(request);
  }
  async function getTags() {
    const tagsList = (await axios.get('http://localhost:8000/tags')).data
    setTags(tagsList);
  }

  async function getArticles() {
    const data = (await axios.get("http://localhost:8000/articles")).data;
    setData(data);
  }

  useEffect(() => {
    getArticles();
    getTags();
  }, []);

  function displayThumbnail(url) {
    return <img src={"http://localhost:8000/media/" + url} />;
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
      <Header />
      <h1>News</h1>
      <div className="searchbar">
        <input id="search" type="search" placeholder="Search for an article" onKeyUp={(e) => search(e)} />
        <select onChange={(e) => filter(e)}>
          {tags.length ? (tags.map((x) => (
            <option value={x.name}>{x.name}</option>
          ))) : null}
        </select>
      </div>
      <div className="articleList">
        {data.length ? (
          data.map((x) => (
            <article key={x.id} className={'container'}>
              <div className="article">
                <div className="media article-thumbnail">
                  {displayThumbnail(x.thumbnailURL)}
                </div>
                <div className="article-info">
                  <h1 className="Article_title">{x.title}</h1>
                  <div className="buttons">
                    <button>Add Tag</button>
                    <button>Modify</button>
                    <Link to={`/articles/delete/${x.id}`}>
                      <button>Delete</button>
                    </Link>
                  </div>
                </div>

              </div>
              {/* <div className="article-img">
            <div className="media">{displayMedia(x.mediaType, x.mediaURL)}</div>
            </div> */}
            </article>
          ))
        ) : (
          <p>no articles</p>
        )}
      </div>

    </>
  );
}
