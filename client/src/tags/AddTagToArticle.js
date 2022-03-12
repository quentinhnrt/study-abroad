import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, Navigate } from "react-router-dom";
import { Header } from "../header/Header";

export default function AddTagToArticle() {
  const [allTags, setAllTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [article, setArticle] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [navigate, setNavigate] = useState(false);

  const { id } = useParams();

  async function fetchTags() {
    const data = (await axios.get("http://localhost:8000/tags")).data;
    setAllTags(data);
  }

  async function fetchArticle() {
    const data = (await axios.get(`http://localhost:8000/article/${id}`)).data;
    setArticle(data);
  }

  useEffect(() => {
    fetchTags();
    fetchArticle();
  }, []);

  let handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  let addTag = (e) => {
    if (selectedTag !== "" && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
    }
  };

  let removeTag = (e) => {
    setTags(tags.filter((g) => g !== e.currentTarget.dataset.id));
  };

  const handleSubmit = (e) => {
    let tagObj = {};
    tagObj.articleId = parseInt(id);
    tagObj.tags = tags;
    setNavigate(true);
    axios.post(`http://localhost:8000/articletags/${parseInt(id)}`, tagObj);
    
  };

  return (
    <>
      {navigate ? <Navigate to="/articles" /> : null}
      <Header />
      <div className="card shadow m-3">
        <h1 className="card-header text-center">
          {article.length ? article[0].title : null}
        </h1>
        <form className="p-3">
          <div className="form-group">
            <label>Add tags to article</label>
            <div className="input-group">
              <select className="form-control" onChange={handleTagChange}>
                <option selected disabled>
                  Choose tag
                </option>
                {allTags
                  .filter((g) => !tags.includes(g.name))
                  .map((g) => (
                    <option value={g.name}>{g.name}</option>
                  ))}
              </select>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={addTag}
              >
                Add tag
              </button>
            </div>
            {tags.map((g) => (
              <span className="badge badge-secondary p-1 mt-2 mr-2" key={g}>
                {g}
                <span data-id={g} className="ml-1" onClick={removeTag}>
                  &nbsp;&times;
                </span>
              </span>
            ))}
          </div>
          <button
            className="btn btn-block btn-outline-success mt-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <Link to="/articles">
            <button className="btn btn-block btn-outline-danger mt-3">
              Cancel
            </button>
          </Link>
        </form>
      </div></>
  );
}
