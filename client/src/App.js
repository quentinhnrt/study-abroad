import { Route, Link, Routes } from "react-router-dom";
import Home from "./home/Home";
import Articles from "./articles/Articles";
import "./App.css";
import NewArticle from "./articles/NewArticle";
import DeleteArticle from "./articles/DeleteArticle";
import Register from "./user/Register";
import { Login } from "./user/Login";


function App() {
    return (
       
        <>
        <img src="//server/media/logo_ready.png"></img>
        <nav>
        <Link to="/">Home</Link>
        <Link to="/articles">News</Link>
        <Link to="/articles/new">New Article</Link>
        <Link to="/user/register">Register</Link>
        <Link to="/user/login">Login</Link>

          </nav>
          
          <div class="dropdown">
              <button class="dropdown" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Menu
              </button>
              <div class="dropdown-content">
                  <a href="/articles" > Articles </a>
                  <a href="/articles/new" > New Article </a>
              </div>
          </div>

      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route exact={true} path="/articles" element={<Articles />} />
        <Route
          exact={true}
          path="/articles/delete/:id"
          element={<DeleteArticle />}
        />
        <Route exact={true} path="/articles/new" element={<NewArticle />} />
        <Route exact={true} path="/user/register" element={<Register />} />
        <Route exact={true} path="/user/login" element={<Login />} />
        <Route path="*" element={() => <p>Page Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
