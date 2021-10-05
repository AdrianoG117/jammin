import { useEffect, useRef, FunctionComponent } from "react";
import "./social.css";
import apiService from "../../apiService/ApiService";
import {Message, Jam, User} from "../../apiService/APIResponseTypes";

interface IProps {
  userData: User 
  setUserData: React.Dispatch<React.SetStateAction< User>>
  isSignedUp: boolean
  jam: Jam
  msg: Message
  setMsg: React.Dispatch<React.SetStateAction<Message>>
  initialState: Message

}

const  Social:FunctionComponent<IProps> = ({ jam, msg, setMsg, initialState, isSignedUp, userData }:IProps) => {
  const messagesEndRef = useRef(null);
  const dummyDiv = useRef();

  const scrollToBottom = () => {
    dummyDiv.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messagesEndRef) {
      messagesEndRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
    scrollToBottom();
  }, []);

  function handleChange(e) {
    setMsg((previous) => ({
      name: userData.firstname,
      message: e.target.value,

    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await apiService.postMessage(msg, jam._id);
    setMsg(initialState);
  }

  return (
    <div className="social-container">
      <div className="msg-container" ref={messagesEndRef}>
        {jam.messages.map((msg) => (
          <div className="msg-indiv">
            <p className="msg-name">{msg.name}</p>
            <p className="msg-message">{msg.message}</p>
          </div>
        ))}
        <div ref={dummyDiv}></div>
      </div>
      <div className="form-container">
        {isSignedUp ? (
          <form className="social-form" onSubmit={handleSubmit}>
            <div className="left-form">
              <textarea
                required
                type="text"
                placeholder="MESSAGE"
                name="message"
                value={msg.message}
                onChange={handleChange}
                className="social-input"
                id="message-input"
              ></textarea>
            </div>
            <div className="right-form">
              <button id="post-msg">POST</button>
            </div>
          </form>
        ) : (
          <div className="social-err">
            <h2>Log in to use the chat !</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Social;
