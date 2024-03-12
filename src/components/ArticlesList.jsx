
import { Link } from "react-router-dom";


function ArticlesList(props) {
  const { articlesList } = props;

  return articlesList.map((article) => {
    return (
      <div className="articleCard" key={article.article_id}>
        <Link to={"/articles/" + article.article_id}>
          <h2>{article.title}</h2>
          <img src={article.article_img_url} alt="" />
        </Link>
        <div>
          <h3>
            {'written by '} <Link>{article.author}</Link> | 
            {' '+ article.votes + " votes | "}
            <Link>{article.comment_count + " comments "}</Link> | 
            {' '+article.created_at.slice(0, 10) + " | "}
          </h3>
        </div>
      </div>
    );
  });
}

export default ArticlesList;
