import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import MessageContext from "../contexts/MessageContext";

function CommentsList(props) {
  const { article_id } = useParams();
  const [commentsList, setCommentsList] = useState([]);
  const { usersList } = props;
  const { currentUser } = useContext(UserContext);
  const { message, setMessage } = useContext(MessageContext)

  let pic = "";
  useEffect(() => {
    axios
      .get(
        "https://be-nc-news-p9rm.onrender.com/api/articles/" +
          article_id +
          "/comments"
      )
      .then((comments) => {
        setCommentsList(comments.data);
      });
  }, [article_id, commentsList]);

  function postComment(event) {
    event.preventDefault();
    const reqBody = {
      username: currentUser.username,
      body: event.target[0].value,
    };

    axios
      .post(
        "https://be-nc-news-p9rm.onrender.com/api/articles/" +
          article_id +
          "/comments",
        reqBody
      )
      .then((comment) => {
        setMessage("");
      })
      .catch((err) => {
        setMessage(
          "Your comment was NOT posted, make sure you are logged in and try again!"
        );
      });

    // setCommentsList([{
    //   comment_id: 999,
    //   article_id: article_id,
    //   votes:0,
    //   author: currentUser.username,
    //   body: event.target[0].value,
    //   created_at: new Date().toISOString()
    // }])

    console.log(commentsList);
  }


  if (commentsList.length > 0) {
    return (
      <div>
        <h2>Comments</h2>
        <form className="commentForm" onSubmit={postComment}>
          <textarea placeholder="Write a comment"></textarea>
          <button type="submit">Post</button>
        </form>
        <p>{message}</p>
        {commentsList.map((comment) => {
          for (const user of usersList) {
            if (user.username === comment.author) pic = user.avatar_url;
          }
          return (
            <div className="commentCard" key={comment.comment_id}>
              <div className="commentUser">
                <div>
                  <img className="avatar" src={pic} alt="" />
                </div>
                <div className="username">
                  <h2>
                    <Link>{comment.author}</Link>
                  </h2>
                </div>
              </div>
              <div className="commentBody">
                <h4>{comment.body}</h4>{" "}
                <h5>
                  posted on: {comment.created_at.slice(0, 10)} at{" "}
                  {comment.created_at.slice(11, 16)} | votes: {comment.votes}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Comments</h1>
        <h2>There are no comments for this article</h2>{" "}
      </div>
    );
  }
}

export default CommentsList;
