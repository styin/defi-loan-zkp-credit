import React from 'react';
import '../styles/CustomCard.css';

/*TODO: possibly modify the interface structure to match with request form's stored data*/
interface CustomCardProps {
    title: string;
    content: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, content }) => {
    return (
        <div className="custom-card">
            <div className="card-content">
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default CustomCard;
