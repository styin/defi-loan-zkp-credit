import React, { useState } from 'react';
import CustomCard from '../components/CustomCard';
import ScrollableDiv from '../components/ScrollableDiv';

interface EncryptedMessage {
  sender_pk: string;
  enc_msg: string;
}

const FetchMessage: React.FC = () => {
  const [messages, setMessages] = useState<EncryptedMessage[]>([]);

  const handleFetch = () => {
    // fetch data from the backend, which get the data by calling smart contract functions
    // Simulate fetching encrypted messages
    const fetchedMessages: EncryptedMessage[] = [
      { sender_pk: 'pk1', enc_msg: 'encrypted message 1' },
      { sender_pk: 'pk2', enc_msg: 'encrypted message 2' },
      { sender_pk: 'pk3', enc_msg: 'encrypted message 3' },
    ];
    setMessages(fetchedMessages);
  };

  return (
    <div>
      <h1>Fetch Page</h1>
      <button onClick={handleFetch}>Fetch</button>
      <ScrollableDiv>
            {messages.map((message, index) => (
                <CustomCard key={index} title={message.sender_pk} content={message.enc_msg} />
            ))}
        </ScrollableDiv>
    </div>
    );
};

export default FetchMessage;
