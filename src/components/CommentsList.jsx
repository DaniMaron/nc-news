import { fetchCommentsByArticleId, addComment, deleteCommentById } from "../../api";

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
  const { isLoading, setIsLoading } = props;


  let pic = "";
  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then((comments) => {
        setCommentsList(comments);
        setIsLoading(false)
      });
    }, [article_id, commentsList]);
    
  

  function postComment(event) {
    event.preventDefault();
    setMessage("Posting comment...");    
    const reqBody = {
      username: currentUser.username,
      body: event.target[0].value,
    };
    event.target.reset()

    if (reqBody.body === '')
      setMessage("You CAN'T post an empty comment")
    else {
      addComment(article_id, reqBody)
        .then((comment) => {
          setMessage('')
        })
        .catch((err) => {
          setMessage(
            "Your comment was NOT posted, make sure you are logged in and try again!"
          );
        });
    }

  //   setCommentsList(() => {
  //     return [
  //       ...commentsList,
  //       {
  //         comment_id: 999,
  //         article_id: article_id,
  //         votes: 0,
  //         author: currentUser.username,
  //         body: event.target[0].value,
  //         created_at: new Date().toISOString(),
  //       },
  //     ]})
    //     console.log(commentsList);
    

  }

  function deleteComment(event) {
    setMessage('Deleting comment...')
    event.preventDefault()
    deleteCommentById(event.target.value)
      .then(() => {
        setMessage('')
      })
      .catch(() => {
      setMessage('Your comment was NOT deleted, please try again!')
    })
  }

  if (isLoading)
    return (<div>Loading...</div>)
  
  else {
    if (commentsList.length > 0) {
      return (
        <div className="content">
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
                    <img src={pic} alt="" />
                  </div>
                  <div className="username">
                    <h2>
                      <Link to={'/authors/' + comment.author}>{comment.author}</Link>
                    </h2>
                  </div>
                </div>
                <div className="commentBody">
                  <h4>{comment.body}</h4>{" "}
                  <h5>
                    {comment.created_at.slice(0, 10)} at{" "}
                    {comment.created_at.slice(11, 16)} | votes: {comment.votes}
                  </h5>
                </div>
                <div>
                  <button onClick={deleteComment} value={comment.comment_id}
                    style={{
                      display: comment.author === currentUser.username ? "block" : "none",
                    }}
                  >
                    Delete comment
                  </button>
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
          <h2>There are no comments for this article</h2>
        </div>
      );
    }
  }
}

export default CommentsList;
