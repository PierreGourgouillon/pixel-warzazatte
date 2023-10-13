import { useState } from "react";
import ChatModel from "../models/ChatModel";
import DataResponse from "../models/DataResponse";
import WebSocketManager from "../WebSocketManager";
import uuid from 'react-uuid'

const Chat = () => {
    const [messages, setMessages] = useState<ChatModel[]>([]);
    const [userMessage, setUserMessage] = useState("");

    function onClickAddMessage(event: React.MouseEvent<HTMLElement>) {
        const newMessage: ChatModel = { id: uuid(), message: userMessage, date: "" }
        const body: DataResponse<ChatModel> = { action: "chat", data: newMessage }
        WebSocketManager.shared.send(body)
        setUserMessage("")
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
        <div style={{ border: "1px solid red", width: "100%" }}>
            <div>
                {messages.map((message, index) => {
                    return (
                        <div>{message.date}: {message.message}</div>
                    )
                })
                }
            </div>
            <div>
                <input value={userMessage} onChange={onUserMessageChange}></input>
            <button onClick={onClickAddMessage}>Add message</button>
            </div>
        </div>
    )
}

export default Chat