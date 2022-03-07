import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Articles.css";


export default function Articles() {

  const [data, setData] = useState( [] );

  async function getArticles() {
    const data = (await axios.get('http://localhost:8000/articles')).data;
    setData(data);
  }



   useEffect(() => {
    getArticles()
   }, []);

   function displayMedia(type, url) {
     return <img src={"http://localhost:8000/media/" +url} />
   }


    return (
       <>
        <h1>
            Articles !!
        </h1>
          {data.map( x =>  <article key={x.id}>
                              <h1 className="Article_title">{x.title}</h1>
                              <section dangerouslySetInnerHTML={{__html: x.content}}></section>
                              {displayMedia(x.mediaType,x.mediaURL)}
                           </article>
           )}
      </>
    );
}
