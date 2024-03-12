import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from "react-router-dom";


function SingleArticle() {
    const[article, setArticle]= useState({created_at: ''})
    const param = useParams()

    useEffect(() => {
        axios.get("https://be-nc-news-p9rm.onrender.com/api/articles/" + param.article_id)
            .then((article) => {
                setArticle(article.data.article[0])
        })
    },[])


    return (
      <div>
        <h1>{article.title}</h1>
        <h3>
          written by <Link>{article.author}</Link>
          {" | " + article.created_at.slice(0, 10) + " | "}
          topic: <Link>{article.topic}</Link>
        </h3>
        <img src={article.article_img_url} alt="" />
        <h2>{article.body}</h2>
        <div>
          {" " + article.votes + " votes | "}
          <Link>{article.comment_count + " comments "}</Link>
        </div>
      </div>
    );
}

export default SingleArticle