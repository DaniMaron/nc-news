import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";
import { fetchArticle, updateArticleVotes } from "../../api";

function SingleArticle(props) {
  const [article, setArticle] = useState({ created_at: "" });
  const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(false);
  const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(false);
  const { article_id } = useParams();
  const { message, setMessage } = useContext(MessageContext);
  const { isLoading, setIsLoading } = props;
  useEffect(() => {
    fetchArticle(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch(() => {
        setMessage("Article does not exist");
      });
  }, [article]);

  function incrementArticleVote(event) {
    const reqBody = {inc_votes: event.target.value}
    updateArticleVotes(article_id, reqBody)
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

  if (isLoading) return <div>Loading...</div>;

  if (message === "Article does not exist") {
    return (
      <>
        <h2>{message}</h2>
        <Link to={"/"}>
          <h3>Back to all articles</h3>
        </Link>
      </>
    );
  } else {
    return (
      <div className="content">
        <h2>{article.title}</h2>
        <h4>
          <div>
            written by{" "}
            <Link to={"/authors/" + article.author}>{article.author}</Link>
          </div>
          {article.created_at.slice(0, 10) +
            " at " +
            article.created_at.slice(11, 16)}
          <div>
            topic: <Link to={"/topics/" + article.topic}>{article.topic}</Link>
          </div>
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
            {" " + article.comment_count + " comments "}
          </Link>{" "}
        </div>
        <p>{message}</p>
      </div>
    );
  }
}

export default SingleArticle;
