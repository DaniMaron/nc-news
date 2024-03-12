import axios from "axios";
import { useEffect } from "react";

function Home(props) {
  const { setArticlesList } = props;
  useEffect(() => {
    axios
      .get("https://be-nc-news-p9rm.onrender.com/api/articles")
      .then((articles) => {
        setArticlesList(articles.data.articles);
      });
  }, []);

  return (
    <>
      <h2>All articles</h2>
      {props.children}
    </>
  );
}

export default Home;
