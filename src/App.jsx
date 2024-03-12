import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import axios from "axios";
import "./App.css";
import ArticlesList from "./components/ArticlesList";
import CommentsList from "./components/CommentsList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SingleArticle from "./components/SingleArticle";
import UserContext from "./contexts/UserContext";

function App() {
  const [articlesList, setArticlesList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
    const [currentUser, setCurrentUser] = useState({
      username: "Morty_C-137",
      name: "Morty Smith",
      avatar_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfeaHt6bgx8b0OIR48Lpt5caksPWrpb8VvfQ&usqp=CAU'
    });


  useEffect(() => {
    axios
      .get("https://be-nc-news-p9rm.onrender.com/api/topics")
      .then((topics) => {
        setTopicsList(topics.data.topics);
      });
  }, []);

  return (
    
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home setArticlesList={setArticlesList}>
              <SearchBar topicsList={topicsList} />
              <ArticlesList articlesList={articlesList}></ArticlesList>
            </Home>
          }
        />
        <Route path="/articles/:article_id"
          element={<SingleArticle />} />
        <Route
          path="/articles/:article_id/comments"
          element={<CommentsList />}
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
