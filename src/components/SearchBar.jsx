

function SearchBar(props) {
  const { topicsList } = props;

  function filterSearch(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={filterSearch} className="search">
      <div>
        <input type="text" />
        <select name="Topics" id="">
          <option value="Topics">Topics</option>
          {topicsList.map(({ slug }) => {
            return <option key={slug} value={slug}>{slug}</option>;
          })}
        </select>
        <button type="submit">Search</button>
      </div>
      <br />
      <div>
        <select name="Sort By" id="">
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
        </select>
        <select name="Order by" id="">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
}

export default SearchBar;
