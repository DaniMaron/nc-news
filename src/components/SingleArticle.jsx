import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from "react-router-dom";


function SingleArticle() {
    const[article, setArticle]= useState({created_at: ''})
    const {article_id} = useParams()

    useEffect(() => {
        axios.get("https://be-nc-news-p9rm.onrender.com/api/articles/" + article_id)
            .then((article) => {
                setArticle(article.data.article[0])
        })
    },[])


    return (
      <div>
        <h2>{article.title}</h2>
        <h4>
          written by <Link>{article.author}</Link>
          {" || " + article.created_at.slice(0, 10) + ' at ' +article.created_at.slice(11,16) + " || "}
          topic: <Link>{article.topic}</Link>
        </h4>
        <img src={article.article_img_url} alt="" />
        <h3>{article.body}</h3>
        <div>
          {" " + article.votes + " votes || "}
          <Link to={"/articles/" + article.article_id + "/comments"}>
            {article.comment_count + " comments "}
          </Link>{" "}
        </div>
      </div>
    );
}

export default SingleArticle