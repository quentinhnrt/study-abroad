import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddTagToArticle() {
  const [allTags, setAllTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const { id } = useParams();

  async function fetchTags() {
    const data = (await axios.get("http://localhost:8000/tags")).data;
    setAllTags(data);
  }

  useEffect(() => {
    fetchTags();
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
    axios.post(`http://localhost:8000/articletags/${parseInt(id)}`, tagObj);
  };

  return (
    <form>
      <div className="input-group">
        <select className="form-select" onChange={handleTagChange}>
          <option selected disabled>
            Choose tag...
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
        {tags.map((g) => (
          <span className="badge badge-secondary p-1 mt-2 mr-2" key={g}>
            {g}
            <span data-id={g} className="ml-1" onClick={removeTag}>
              &nbsp;&times;
            </span>
          </span>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
}
