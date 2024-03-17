import { Link } from "react-router-dom";
import { fetchTopics } from "../../api";

function TopicsList(props) {
  const { topicsList , setTopicsList } = props;
  
  fetchTopics().then((topics) => {
        setTopicsList(topics);
      });

  return (
    <div className="content">
      <h2>Topics</h2>
      
        {topicsList.map((topic) => {
          return (
            <div className="topicCard" key={topic.slug}>
              <Link to={"/topics/" + topic.slug} key={topic.slug}>
                <h3>{topic.slug}</h3>
              </Link>
            </div>
          );
        })}
      </div>
  );
}

export default TopicsList;
