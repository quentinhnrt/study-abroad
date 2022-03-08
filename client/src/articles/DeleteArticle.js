import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function DeleteArticle() {
  const [redirectToHome, setRedirectToHome] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    setRedirectToHome(true);
    axios.delete(`http://localhost:8000/articles/delete/${id}`);
  }, []);

  return redirectToHome ? <Navigate to="/articles" /> : null;
}
