import React, { useEffect, useRef, FunctionComponent} from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dummyDiv = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    dummyDiv.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messagesEndRef) {
      messagesEndRef.current?.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event ;
        if (target){
          (target as HTMLDivElement).scroll({ top: (target as HTMLDivElement).scrollHeight, behavior: "smooth" });
        }
      });
    }
    scrollToBottom();
  }, []);

  function handleChange(e:React.ChangeEvent<HTMLTextAreaElement>): void {
    setMsg((previous) => ({
      ...previous,
      name: userData.firstname,
      message: e.currentTarget.value,

    }));
  }

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>):Promise<void> {
    e.preventDefault();
    if(jam._id) await apiService.postMessage(msg, jam._id);
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
};

export default Social;
