import { Link, useParams } from "react-router-dom";

function ArticlesList(props) {
  const { articlesList } = props;
  const { topic } = useParams();
  const { author } = useParams();


  if (articlesList.length === 0)
    return (
      <>
        <h2>No articles were found!</h2>
        <Link to={"/"}>
          <h3>Back to all articles</h3>
        </Link>
      </>
    );
  else {
    return articlesList.map((article) => {
      if (topic === undefined && author === undefined) {
        return (
          <div className="articleCard" key={article.article_id}>
            <Link to={"/articles/" + article.article_id}>
              <h2>{article.title}</h2>
              <img src={article.article_img_url} alt="" />
            </Link>
            <div className="interactions">
              <h3>
                <div>
                  {"written by "}{" "}
                  <Link to={"/authors/" + article.author}>
                    {article.author}
                  </Link>
                </div>

                {" " + article.votes + " votes || "}
                <Link to={"/articles/" + article.article_id + "/comments"}>
                  {article.comment_count + " comments "}
                </Link>
                <div>{" " + article.created_at.slice(0, 10)}</div>
              </h3>
            </div>
          </div>
        );
      } else if (topic !== undefined) {
        if (article.topic === topic) {
          return (
            <div className="articleCard" key={article.article_id}>
              <Link to={"/articles/" + article.article_id}>
                <h2>{article.title}</h2>
                <img src={article.article_img_url} alt="" />
              </Link>
              <div className="interactions">
                <h3>
                  <div>
                    {"written by "}{" "}
                    <Link to={"/authors/" + article.author}>
                      {article.author}
                    </Link>
                  </div>

                  {" " + article.votes + " votes || "}
                  <Link to={"/articles/" + article.article_id + "/comments"}>
                    {article.comment_count + " comments "}
                  </Link>
                  <div>{" " + article.created_at.slice(0, 10)}</div>
                </h3>
              </div>
            </div>
          );
        }
      } else if (author !== undefined) {
        if (article.author === author) {
          return (
            <div className="articleCard" key={article.article_id}>
              <Link to={"/articles/" + article.article_id}>
                <h2>{article.title}</h2>
                <img src={article.article_img_url} alt="" />
              </Link>
              <div>
                <h3>
                  {"written by "}{" "}
                  <Link to={"/authors/" + article.author}>
                    {article.author}
                  </Link>{" "}
                  ||
                  {" " + article.votes + " votes || "}
                  <Link to={"/articles/" + article.article_id + "/comments"}>
                    {article.comment_count + " comments "}
                  </Link>{" "}
                  ||
                  {" " + article.created_at.slice(0, 10)}
                </h3>
              </div>
            </div>
          );
        }
      }
    });
  }

}

export default ArticlesList;
