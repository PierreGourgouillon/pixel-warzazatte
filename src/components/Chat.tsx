import { useState } from "react";
import ChatModel from "../models/ChatModel";
import DataResponse from "../models/DataResponse";
import WebSocketManager from "../WebSocketManager";
import uuid from 'react-uuid'

const Chat = ({userName}: {userName: string}) => {
    const [messages, setMessages] = useState<ChatModel[]>([]);
    const [userMessage, setUserMessage] = useState("");

    function onClickAddMessage(event: React.MouseEvent<HTMLElement>) {
        if (userMessage !== "") {
          const newMessage: ChatModel = { id: uuid(), message: userMessage, date: "", username: userName }
          const body: DataResponse<ChatModel> = { action: "chat", data: newMessage }
          WebSocketManager.shared.send(body)
          setUserMessage("")
        }
    }

    const onUserMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(event.target.value);
    };

    WebSocketManager.shared.addListener<DataResponse<ChatModel>>('chat', (response) => {
        setMessages([...messages, response.data])
    })

    WebSocketManager.shared.addListener<DataResponse<ChatModel[]>>('init-chat', (response) => {
        console.log(response.data)
        setMessages(response.data)
    })

    return (
        <div className="relative w-full">
          <div className="w-1/3 absolute bottom-0 right-0">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              {messages.map((message, index) => {
                return (
                  <div className="w-max overflow-hidden flex-row">
                    <span className="text-black text-sm">{message.date} </span>
                    <span className="text-red-600 font-bold">{message.username}</span>
                    <span>: {message.message}</span>
                  </div>
                )
              })}
            </div>
      
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <input value={userMessage} onChange={onUserMessageChange} className="w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" placeholder="Entrer message"></input>
      
              <div id="send-button-div" className="ml-4">
                <button onClick={onClickAddMessage} className="flex cursor-pointer items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                  <span>Envoyer</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Chat