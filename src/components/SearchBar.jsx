import { fetchSortedArticles } from "../../api";
let sortBy = "created_at";
let order = "desc";
function SearchBar(props) {

  const { setArticlesList } = props;

  function sortArticlesBy(event) {
    event.preventDefault();

    if (event.target.value === "asc" || event.target.value === "desc")
      order = event.target.value;
    else sortBy = event.target.value;

    fetchSortedArticles(sortBy, order)
      .then(articles => {
        setArticlesList(() => {
          return articles;
        });
      });
  }

  return (
      <div>
        <select name="Sort By" id="a" onChange={sortArticlesBy}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <select name="Order by" id="" onChange={sortArticlesBy}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
  );
}

export default SearchBar;
