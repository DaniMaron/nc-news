import React from "react";
import { Link, useParams } from "react-router-dom";

const ArticlesByAuthor = (props) => {
  const { articlesList } = props;
  const { author } = useParams();
  if (articlesList.length === 0) {
    return (
      <>
        <h2>Author does not exist!</h2>
        <Link to={"/"}>
          <h3>Back to all articles</h3>
        </Link>
      </>
    );
  } else {
    return (
      <div className="content">
        <h2>All articles from "{author}"</h2>
        {props.children}
      </div>
    );
  }
};

export default ArticlesByAuthor;
