import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";

function Home(props) {
  const { isLoading, setIsLoading } = props;
  const { setArticlesList } = props;
  useEffect(() => {
    fetchArticles().then((articles) => {
      console.log("hello");
      setArticlesList(articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="content">
      <h2>All articles</h2>
      {props.children}
    </div>
  );
}

export default Home;
