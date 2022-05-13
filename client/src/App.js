import { Route, Link, Routes } from "react-router-dom";
import Home from "./home/Home";
import Articles from "./articles/Articles";
import Article from "./article/Article";
import "./App.css";
import NewArticle from "./articles/NewArticle";
import DeleteArticle from "./articles/DeleteArticle";

import EditArticle from "./articles/EditArticle";
import Tags from "./tags/Tags";
import AddTagToArticle from "./tags/AddTagToArticle";
import Swal from "sweetalert2";
import Register from "./user/Register";
import Login, { ProtectedRoute, ProtectedLink, NotProtectedLink } from "./Login";
import { useCookies, withCookies } from 'react-cookie';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function App() {

  useEffect(() => {
    const MySwal = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-2",
        cancelButton: "btn btn-danger ml-2",
      },
      buttonsStyling: false,
    });

    MySwal.fire({
      text: "Cette application a été codé en priorité pour les smartphones, il est fortement recommandé de l'utiliser sur un smartphone ou avec la vue mobile du navigateur",
      icon: "warning",
      confirmButtonColor: "#5cb85c",
      confirmButtonText: "J'ai compris :)",
    });
  }, []);

  return (
    <>

      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route exact={true} path="/articles" element={<Articles />} />
        <Route exact={true} path="/article/:id" element={<Article />} />
        <Route
          exact={true}
          path="/articles/delete/:id"
          element={<DeleteArticle />}
        />

        <Route
          exact={true}
          path="/articles/edit/:id"
          element={<EditArticle />}
        />
        <Route exact={true} path="/tags" element={<Tags />} />
        <Route
          exact={true}
          path="/addarticletag/:id"
          element={<AddTagToArticle />}
        />

        <Route
          exact={true}
          path="/articles/new"
          element={
            <ProtectedRoute>
              <NewArticle />
            </ProtectedRoute>
          }
        />
        <Route exact={true} path="/user/register" element={<Register />} />
        <Route exact={true} path="/user/login" element={<Login />} />

        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>

      <footer className="footer"></footer>
    </>
  );
}

export default App;
