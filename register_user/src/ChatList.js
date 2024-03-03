import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ChatList = () => {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loggedInUserName, setLoggedInUserName] = useState('');


  useEffect(() => {
    const storedMessages = localStorage.getItem("groupchat");
    if (storedMessages) {
      // Parse the stored data
      const parsedData = JSON.parse(storedMessages)? JSON.parse(storedMessages): [] ;
      setMessages(parsedData);
    }
  }, []);

  useEffect(() => {
    const loggedInUserna = JSON.parse(localStorage.getItem('loggedInUser'));
// console.log(loggedInUserna.name);
    // if (loggedInUserna) {
      // For simplicity, let's assume there's only one user logged in
      // const loggedInUser = loggedInUserna[0];
      setLoggedInUserName(loggedInUserna.name);
    // }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('groupchat', JSON.stringify(messages));
  // }, [messages]);

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const date = currentDateTime.toLocaleDateString();
    const time = currentDateTime.toLocaleTimeString();
    return `${date} ${time}`;
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMessageObj = {
      id: messages.length + 1,
      text: newMessage,
      sender: loggedInUserName, // Assuming user is logged in
      time: getCurrentDateTime()
    };
    messages.push(newMessageObj);
    localStorage.setItem('groupchat', JSON.stringify(messages));
    // setMessages([...messages, newMessageObj]);

    setNewMessage('');
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <div>
        <h2 style={{ textAlign: "center" }}>Group Chat</h2>
      </div>
      <div className='groupSpace'>
        <div style={{ marginBottom: '20px' }}>
          {messages.map(message => (
            <div key={message.id}>
              {message.time}: <strong>{message.sender}: </strong> {message.text}
            </div>
          ))}
        </div>
      </div>
      <div>
        <form onSubmit={handleMessageSubmit}>
          <div className='row'>
            <div className='col-2' style={{ marginTop: "40px", paddingLeft: "43px" }}>
              <strong> {loggedInUserName}:</strong>
            </div>
            <div className='col-7'>
              <input className="inp" style={{ width: "99%" }} type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." />
            </div>
            <div className='col-3' style={{ marginTop: "37px" }}>
              <button className='bbtn' type="submit">Send</button>
              <button className='bbtn' type="refresh">Refresh</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatList