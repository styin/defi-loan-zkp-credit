import React, { useEffect, useState }  from "react";
import LoanRequestCard from "../components/LoanRequestCard";
import LoanRequestInterface from "../interfaces/loanRequestInterface";
import ScrollableDiv from "../components/ScrollableDiv";

/*
TODO: get request list from backend
cardData is currently hardcoded for testing
*/

const RequestList: React.FC = () => {
    const [messages, setMessages] = useState<LoanRequestInterface[]>([]);
        
    useEffect(() => {
      // fetch data from the backend
    fetch(import.meta.env.VITE_BACKEND_HOST + '/api/get_requests')
        .then(response => response.json())
        .then(data => {
            const loanRequests: LoanRequestInterface[] = data as LoanRequestInterface[];
            setMessages(loanRequests);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);
      
        return (
          <div>
            <h1>Request List</h1>
            <ScrollableDiv>
                  {messages.map((message, index) => (
                      <LoanRequestCard key={index} loanRequest={message} />
                  ))}
              </ScrollableDiv>
          </div>
          );
      };

export default RequestList;

  
  