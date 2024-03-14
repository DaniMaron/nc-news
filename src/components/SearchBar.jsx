import axios from "axios";
let sortBy = 'created_at'
let order = 'desc'
function SearchBar(props) {
  const { topicsList } = props;
  const { setArticlesList } = props;

  function sortArticlesBy(event) {
    event.preventDefault();
    
    if (event.target.value === 'asc' || event.target.value === 'desc')
    order = event.target.value;
  else
      sortBy = event.target.value;


    axios
      .get(
        `https://be-nc-news-p9rm.onrender.com/api/articles/?sort_by=${sortBy}&order=${order}`
      )
      .then(({data: {articles}}) => {
        setArticlesList(() => { return articles });
      });
    }
    

  return (
    <form onSubmit={sortArticlesBy} className="search">
      <div>
        <input type="text" />
        <select name="Topics" id="">
          <option value="Topics">Topics</option>
          {topicsList.map(({ slug }) => {
            return (
              <option key={slug} value={slug}>
                {slug}
              </option>
            );
          })}
        </select>
        <button type="submit">Search</button>
      </div>
      <br />
      <div>
        <label htmlFor="Sort By">Sort by </label>
        <select name="Sort By" id="a" onChange={sortArticlesBy}>
          <option value="created_at">Latest</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Most liked</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        <select name="Order by" id="" onChange={sortArticlesBy}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </form>
  );
}

export default SearchBar;
