import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";

function SingleArticle() {
  const [article, setArticle] = useState({ created_at: "" });
  const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(false);
  const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(false);
  const { article_id } = useParams();
  const { message, setMessage } = useContext(MessageContext);
  useEffect(() => {
    axios
      .get("https://be-nc-news-p9rm.onrender.com/api/articles/" + article_id)
      .then((article) => {
        setArticle(article.data.article[0]);
      });
  }, [article]);

  function incrementArticleVote(event) {
    axios
      .patch(
        `https://be-nc-news-p9rm.onrender.com/api/articles/${article_id}`,
        { inc_votes: event.target.value }
      )
      .then(() => {
        setMessage("");
        if (event.target.value === "1" && isDownvoteDisabled) {
          setIsUpvoteDisabled(false);
          setIsDownvoteDisabled(false);
        } else if (event.target.value === "1" && !isDownvoteDisabled) {
          setIsUpvoteDisabled(true);
        } else if (event.target.value === "-1" && isUpvoteDisabled) {
          setIsUpvoteDisabled(false);
          setIsDownvoteDisabled(false);
        } else if (event.target.value === "-1" && !isUpvoteDisabled) {
          setIsDownvoteDisabled(true);
        }
      })
      .catch(() => {
        setMessage("Your vote was NOT registered, please try again!");
      });
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <h4>
        written by <Link>{article.author}</Link>
        {" || " +
          article.created_at.slice(0, 10) +
          " at " +
          article.created_at.slice(11, 16) +
          " || "}
        topic: <Link>{article.topic}</Link>
      </h4>
      <img src={article.article_img_url} alt="" />
      <h3>{article.body}</h3>
      <div>
        <button
          onClick={incrementArticleVote}
          disabled={isUpvoteDisabled}
          value="1"
        >
          +
        </button>
        <button
          onClick={incrementArticleVote}
          disabled={isDownvoteDisabled}
          value="-1"
        >
          -
        </button>{" "}
        {" " + article.votes + " votes"} ||
        <Link to={"/articles/" + article.article_id + "/comments"}>
          {article.comment_count + " comments "}
        </Link>{" "}
      </div>
      <p>{message}</p>
    </div>
  );
}

export default SingleArticle;
