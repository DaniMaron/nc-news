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
import Topics from "./components/TopicsList";
import Users from "./components/Users";
import MessageContext from "./contexts/MessageContext";
import UserContext from "./contexts/UserContext";
import ArticlesByTopic from "./components/ArticlesByTopic";

function App() {
  const [articlesList, setArticlesList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "Morty_C-137",
    name: "Morty Smith",
    avatar_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfeaHt6bgx8b0OIR48Lpt5caksPWrpb8VvfQ&usqp=CAU",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://be-nc-news-p9rm.onrender.com/api/topics")
      .then((topics) => {
        setTopicsList(topics.data.topics);
      });
    axios
      .get("https://be-nc-news-p9rm.onrender.com/api/users")
      .then((users) => {
        setUsersList(users.data.users);
      });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <MessageContext.Provider value={{ message, setMessage }}>
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
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route
            path="/articles/:article_id/comments"
            element={<CommentsList usersList={usersList} />}
          />
          <Route
            path="/users"
            element={<Users usersList={usersList} />}
          ></Route>
          <Route path="/topics" element={<Topics setTopicsList={setTopicsList} topicsList={topicsList} />}></Route>
          <Route path="/topics/:topic" element={<ArticlesByTopic articlesList={articlesList}></ArticlesByTopic>}></Route>
        </Routes>
      </MessageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
