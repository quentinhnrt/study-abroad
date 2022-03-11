import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../header/Header";
import "./Article.css";

export default  function Article () {
    const [data, setData] = useState(undefined);
    const [tags, setTags] = useState([]);
  
    let params = useParams()

    useEffect(() => {
        getArticle();
        //getTags();
      }, []);


      
  async function getArticle() {
    const data = (await axios.get("http://localhost:8000/article/"+params.id)).data;
    setData(data);
    const data2 = (await axios.get("http://localhost:8000/articletag/"+params.id)).data;
    setTags(data2);


  }

if(data== undefined)
 return <p>Loading</p>

 if(data.length == 0 )
  return <p>Unknown article</p>
  let d= data[0]

    return (
        <>
        <Header/>
        <h1 className="articleTitle">{d.title}</h1>
        <ul className="tagsName">
        {tags.map((t)  => <>{<li>{t.name}</li>}</>)}
        </ul>
        
        <p className="container" dangerouslySetInnerHTML={{ __html: d.content }}></p>
        
        </>
  )
}
