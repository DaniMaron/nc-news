import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


function CommentsList(props) {
  const { article_id } = useParams();
    const [commentsList, setCommentsList] = useState([]);
    const { usersList } = props;
    let pic = ''


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
  }, [article_id]);

    if (commentsList.length > 0) {
        
        return <div><h2>Comments</h2>
        {commentsList.map((comment) => {
            for(const user of usersList){
                if(user.username === comment.author)
                 pic = user.avatar_url
            }
        return (
          <div className="commentCard" key={comment.comment_id}>
                <div>
              <img
                className="avatar"
                src={pic}
                alt=""
              />
            </div>
            <div>
              <h2>
                <Link>{comment.author}</Link>
              </h2>
            </div>
            <div>
                    <h4>{comment.body}</h4>{" "}
                    <h5>posted on: {comment.created_at.slice(0, 10)} at {comment.created_at.slice(11,16)} | votes: {comment.votes}</h5>
                    
            </div>
          </div>
        )
      })}</div>
    }
    else {
        return (
          <div>
            <h1>Comments</h1>
            <h2>There are no comments for this article</h2>{" "}
          </div>
        );
    }
    
    
    
    
    
    
}

export default CommentsList;
