import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import ArticlesList from "./components/ArticlesList";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";
import axios from "axios";

function App() {
  const [articlesList, setArticlesList] = useState([]);
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    axios
      .get("https://be-nc-news-p9rm.onrender.com/api/topics")
      .then((topics) => {
        setTopicsList(topics.data.topics);
      });
  }, []);

  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <Home setArticlesList={setArticlesList}>
              <SearchBar topicsList={topicsList} />
              <ArticlesList articlesList={articlesList} />
            </Home>
          }
        />
        
      </Routes>
    </>
  );
}

export default App;
