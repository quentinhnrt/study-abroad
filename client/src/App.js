import { Route, Link, Routes } from "react-router-dom";
import Home from "./home/Home";
import Articles from "./articles/Articles";
import "./App.css";
import NewArticle from "./articles/NewArticle";
import DeleteArticle from "./articles/DeleteArticle";
import EditArticle from "./articles/EditArticle";
import Tags from "./tags/Tags";
import AddTagToArticle from "./tags/AddTagToArticle";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/articles">News</Link>
        <Link to="/articles/new">New Article</Link>
        <Link to="/tags">Tags</Link>
      </nav>

      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route exact={true} path="/articles" element={<Articles />} />
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
        <Route exact={true} path="/articles/new" element={<NewArticle />} />
        <Route exact={true} path="/tags" element={<Tags />} />
        <Route
          exact={true}
          path="/addarticletag/:id"
          element={<AddTagToArticle />}
        />
        <Route path="*" element={() => <p>Page Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
