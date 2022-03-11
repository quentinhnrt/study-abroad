import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../header/Header";

export default function Tags() {
  const [allTags, setAllTags] = useState([]);

  async function fetchTags() {
    await axios.get("http://localhost:8000/tags").then((res) => {
      setAllTags(res.data);
    });
  }

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAddTag = (e) => {
    let tagObj = {};
    tagObj.name = document.getElementById("newTag").value;
    axios.post(`http://localhost:8000/tags`, tagObj);
    window.location.reload(false);
  };

  return (
    <><Header /><div className="card shadow m-3">
      <h1 className="card-header text-center">Manage Tags</h1>
      <div className="input-group p-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter tag name..."
          id="newTag" />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleAddTag}
        >
          Add tag
        </button>
      </div>
      <table className="table">
        <caption>All tags</caption>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {allTags
            ? allTags.map((tag) => (
              <tr key={tag.id}>
                <td>{tag.id}</td>
                <td>{tag.name}</td>
              </tr>
            ))
            : null}
        </tbody>
      </table>
    </div></>
  );
}
