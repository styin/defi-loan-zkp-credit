import React, { useState } from 'react';
import EncryptedMessageCard from '../components/EncryptedMessageCard';
import EncryptedMessageInterface from '../interfaces/encryptedMessageInterface';
import ScrollableDiv from '../components/ScrollableDiv';

const FetchMessage: React.FC = () => {
  const [messages, setMessages] = useState<EncryptedMessageInterface[]>([]);
  const handleFetch = () => {
    const public_key = prompt("Input your public key:");
    fetch(import.meta.env.VITE_BACKEND_HOST + '/api/get_messages?public_key=' + public_key)
      .then(response => response.json())
      .then(data => {
          const encryptedMessages: EncryptedMessageInterface[] = data as EncryptedMessageInterface[];
          setMessages(encryptedMessages);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  };
      
    
      return (
        <div>
          <h1>Request List</h1>
          <button onClick={handleFetch}>Fetch</button>
          <ScrollableDiv>
                {messages.map((message, index) => (
                    <EncryptedMessageCard key={index} encryptedMessage={message} />
                ))}
            </ScrollableDiv>
        </div>
        );
    };

export default FetchMessage;

