import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function DeleteArticle() {
  const [redirectToHome, setRedirectToHome] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const MySwal = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-2",
        cancelButton: "btn btn-danger ml-2",
      },
      buttonsStyling: false,
    });

    MySwal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5cb85c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setRedirectToHome(true);
        axios.delete(`http://localhost:8000/articles/delete/${id}`);
      } else {
        setRedirectToHome(true);
      }
    });
  }, []);

  return redirectToHome ? <Navigate to="/articles" /> : null;
}
