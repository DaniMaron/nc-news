import React from "react";
import { Link, useParams } from "react-router-dom";

const ArticlesByTopic = (props) => {
  const { articlesList } = props;
  const { topic } = useParams();
  if (articlesList.length === 0) {
    return (
      <>
        <h2>Topic does not exist!</h2>
        <Link to={"/"}>
          <h3>Back to all articles</h3>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <h2>All articles about {topic}</h2>
        {props.children}
      </>
    );
  }
};

export default ArticlesByTopic;
