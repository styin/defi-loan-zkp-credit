import React from "react";
import CustomCard from './CustomCard';

/*
TODO: get request list from backend
cardData is currently hardcoded for testing
*/
const cardData = [
    { title: 'Card 1', content: 'Content for Card 1' },
    { title: 'Card 2', content: 'Content for Card 2' },
    { title: 'Card 3', content: 'Content for Card 3' },
    { title: 'Card 4', content: 'Content for Card 4' },
    { title: 'Card 5', content: 'Content for Card 5' }
];

const RequestList: React.FC = () => {
    return (
        <div>
            <h1>Request List</h1>
            <div style={{ height: '400px', overflow: 'auto' }}>
                {cardData.map((card, index) => (
                    <CustomCard key={index} title={card.title} content={card.content} />
                ))}
            </div>
        </div>
    );
};

export default RequestList;