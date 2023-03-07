import React from 'react';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import "./chatApp.css"

let socket = io("ws://localhost:3000");

function ChatApp() {
    const [userName, setuserName] = useState('')
    const [messageList, setMessageList] = useState([]);
    const sendMessage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(userName);
        socket.emit("newMessage", userName)
    }
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });
        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
        socket.on('receive', (msg) => {
            console.log(messageList, msg, 'received');
            setMessageList(oldArray => [...oldArray, msg.message]);
        })
    }, [socket]);

    return (
        <>
            <div className='container-fluid'>
                <div className='container fluid message-container '>
                    {messageList.map((msg, i) => (<div className='text-light bg-secondary m-2' key={i}>{msg}</div>))}
                </div>
                <span className='text-light' >
                    Enter Text
                </span>
                <div className='d-flex'>
                    <input type="text" className='form-control mr-3' onChange={(e) => setuserName(e.target.value)}></input>
                    <button type="button" className='btn btn-primary' onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    )
}

export default ChatApp