import axios from "axios"
import { Link } from "react-router-dom"


function Topics(props) {
    const {topicsList, setTopicsList} = props
    axios.get("https://be-nc-news-p9rm.onrender.com/api/topics")
        .then(({ data: { topics } }) => {
            setTopicsList(topics)
            // console.log(topicsList);
        })
    
    return (
        <>
            <h2>Topics</h2>
            <div>
               { topicsList.map(topic=>{
                   return (
                     <Link to={'/topics/'+topic.slug} key={topic.slug}>
                       <h3>{topic.slug}</h3>
                     </Link>
                   );
                })}
            </div>
        </>
    )
}

export default Topics