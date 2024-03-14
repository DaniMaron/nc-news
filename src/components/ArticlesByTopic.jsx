import React from "react";
import { Link, useParams } from "react-router-dom";

const ArticlesByTopic = (props) => {
  const { articlesList } = props;
  const { topic } = useParams();

  return (
    <>
      <h2>All articles about {topic}</h2>
      {props.children}
      {articlesList.map((article) => {
        if (article.topic === topic) {
          return (
            <div className="articleCard" key={article.article_id}>
              <Link to={"/articles/" + article.article_id}>
                <h2>{article.title}</h2>
                <img src={article.article_img_url} alt="" />
              </Link>
              <div>
                <h3>
                  {"written by "} <Link>{article.author}</Link> ||
                  {" " + article.votes + " votes || "}
                  <Link to={"/articles/" + article.article_id + "/comments"}>
                    {article.comment_count + " comments "}
                  </Link>{" "}
                  ||
                  {" " + article.created_at.slice(0, 10)}
                </h3>
              </div>
            </div>
          );
        }
      })}
    </>
  );
    
    
    
};

export default ArticlesByTopic;
