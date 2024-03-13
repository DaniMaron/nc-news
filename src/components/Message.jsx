import { useContext } from "react";
import MessageContext from "../contexts/Message";

function Message() {
  const { message } = useContext(MessageContext);
  return <p>{message}</p>;
}

export default Message;
