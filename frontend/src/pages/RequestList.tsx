import React, { useEffect, useState }  from "react";
//import CustomCard from '../components/CustomCard';
import LoanRequestCard from "../components/LoanRequestCard";
import ScrollableDiv from "../components/ScrollableDiv";
import backendURL from "../backendURL";
import LoanRequestInterface from "../interfaces/loanRequestInterface";

/*
TODO: get request list from backend
cardData is currently hardcoded for testing
*/

const RequestList: React.FC = () => {
    const [messages, setMessages] = useState<LoanRequestInterface[]>([]);
        
    useEffect(() => {
      // fetch data from the backend
    fetch(backendURL + '/api/get_requests')
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

  
  