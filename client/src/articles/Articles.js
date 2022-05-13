import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { Header } from "../header/Header";
import { Admin } from "../Login";

export default function Articles() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);

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
    const request = (await axios.get(`http://localhost:8000/filterTag/${tag}`))
      .data;
    setData(request);
  }
  async function getTags() {
    const tagsList = (await axios.get("http://localhost:8000/tags")).data;
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
    return <img src={"http://localhost:8000/thumbnail/" + url} />;
  }

  return (
    <>
      <Header />
      <h1>News</h1>
      <div className="searchbar pt-3">
        <input
          id="search"
          type="search"
          placeholder="Search for an article"
          onKeyUp={(e) => search(e)}
        />
        <select onChange={(e) => filter(e)}>
          <option>All</option>
          {tags.length
            ? tags.map((x) => (
              <option value={x.name} key={x.id}>
                {x.name}
              </option>
            ))
            : null}
        </select>
      </div>
      <div className="articleList">
        {data.length ? (
          data.map((x) => (
            <article key={x.id} className={"container rounded"}>
              <div className="article">
                <div className="media article-thumbnail">
                  {displayThumbnail(x.thumbnailURL)}
                </div>
                <div className="article-info">
                  <Link to={`/article/${x.id}`}>
                    <h1 className="Article_title">{x.title}</h1>
                  </Link>
                  <Admin>
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
                  </Admin>
                </div>
              </div>
              {/* <div className="article-img">
            <div className="media">{displayMedia(x.mediaType, x.mediaURL)}</div>
            </div> */}
            </article>
          ))
        ) : (
          <div className="text-center">
            <FontAwesomeIcon icon={faSadTear} className="fa-sad-tear" />
            <h5 className="mt-2">No article found</h5>
          </div>
        )}
      </div>
    </>
  );
}
