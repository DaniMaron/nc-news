import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


function CommentsList() {
  const { article_id } = useParams();
  const [commentsList, setCommentsList] = useState([]);

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
        
        return <div><h1>Comments</h1>
        {commentsList.map((comment) => {
        console.log(comment);
        return (
          <div className="commentCard">
            <div>
              <img
                className="avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfeaHt6bgx8b0OIR48Lpt5caksPWrpb8VvfQ&usqp=CAU"
                alt=""
              />
            </div>
            <div>
              <h2>
                <Link>{comment.author}</Link>
              </h2>
            </div>
            <div>
              <h3>{comment.body}</h3>{" "}
            </div>
          </div>
        )
      })}</div>
    }
    else {
        return (
          <div>
            {" "}
            <h1>Comments</h1>
            <h2>There are no comments for this article</h2>{" "}
          </div>
        );
    }
    
    
    
    
    
    
}

export default CommentsList;
