import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import ArticlesByAuthor from "./components/ArticlesByAuthor";
import ArticlesByTopic from "./components/ArticlesByTopic";
import ArticlesList from "./components/ArticlesList";
import AuthorsList from "./components/AuthorsList";
import CommentsList from "./components/CommentsList";
import Home from "./components/Home";
import InvalidPath from "./components/InvalidPath";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SingleArticle from "./components/SingleArticle";
import MessageContext from "./contexts/MessageContext";
import UserContext from "./contexts/UserContext";
import TopicsList from "./components/TopicsList";
import UsersList from "./components/Users";

function App() {
  const [articlesList, setArticlesList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    username: "Guest",
    name: "",
    avatar_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfeaHt6bgx8b0OIR48Lpt5caksPWrpb8VvfQ&usqp=CAU",
  });
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMessage("");
    setIsLoading(true)
  }, [location]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <MessageContext.Provider value={{ message, setMessage }}>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                setArticlesList={setArticlesList}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              >
                <SearchBar
                  setArticlesList={setArticlesList}
                />
                <ArticlesList articlesList={articlesList} />
              </Home>
            }
          />
          <Route
            path="/articles/:article_id"
            element={
              <SingleArticle
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/articles/:article_id/comments"
            element={
              <CommentsList
                usersList={usersList}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/users"
            element={<UsersList usersList={usersList} setUsersList={setUsersList} />}
          ></Route>

          <Route
            path="/authors"
            element={<AuthorsList />}
          ></Route>

          <Route
            path="/authors/:author"
            element={
              <ArticlesByAuthor
                articlesList={articlesList}
                usersList={usersList}
              >
                <SearchBar
                  usersList={usersList}
                  setArticlesList={setArticlesList}
                />{" "}
                <ArticlesList articlesList={articlesList} />
              </ArticlesByAuthor>
            }
          ></Route>

          <Route
            path="/topics"
            element={<TopicsList topicsList={topicsList} setTopicsList={setTopicsList} />}
          ></Route>

          <Route
            path="/topics/:topic"
            element={
              <ArticlesByTopic
                articlesList={articlesList}
                topicsList={topicsList}
              >
                <SearchBar
                  topicsList={topicsList}
                  setArticlesList={setArticlesList}
                />{" "}
                <ArticlesList articlesList={articlesList} />
              </ArticlesByTopic>
            }
          ></Route>

          <Route path="*" element={<InvalidPath />} />
        </Routes>
      </MessageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
