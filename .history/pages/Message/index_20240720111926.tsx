import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss'; // Import SCSS module styles
import Navbar from '../../Components/Navbar/index';

// Initialize the socket
// const socket = io('https://www.referback.trollsufficient.com');

const Message = () => {
  const [content, setContent] = useState<any>('');
  const [messages, setMessages] = useState<any>([]);
  const [userName, setUserName] = useState<any>('');
  const messageEndRef = useRef<any>(null);

  useEffect(() => {
    // Fetch the user's name from local storage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://www.referback.trollsufficient.com/messages/121');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for incoming messages
    // socket.on('message', (newMessage:any) => {
    //   setMessages((prevMessage:any) => [...prevMessage, newMessage]);
    // });

    // Cleanup on unmount
    return () => {
      // socket.off('message');
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Setup interval to fetch messages every second
    const interval = setInterval(() => {
      fetchMessages();
    }, 600);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://www.referback.trollsufficient.com/messages/121');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!content) return;

    try {
      const response = await axios.post('https://www.referback.trollsufficient.com/messages', {
        group_id: '121',
        sender: userName,
        content: content
      });

      // Emit the new message to all connected clients
      // socket.emit('message', response.data);

      setMessages((prevMessages:any) => [...prevMessages, response.data]);
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <div className={styles['message-form']}>
        <h2>Send a Message</h2>
        
        <div className={styles['message-container']}>
          {messages.map((message:any, index:any) => (
            <div
              key={index}
              className={`${styles['message']} ${message.sender === userName ? styles['sent'] : styles['received']}`}
            >
              <strong>{message.sender}:</strong> {message.content}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor="content">Message:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              required
              onKeyPress={handleKeyPress}
            />
          </div>
          <button type="submit" className={styles['send-button']}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Message;
