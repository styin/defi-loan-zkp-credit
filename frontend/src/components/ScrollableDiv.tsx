import { ReactNode } from 'react';
import '../styles/ScrollableDiv.css';

const ScrollableDiv = ({ children }: { children: ReactNode }) => {
    return (
        <div className="scrollable-div">
            {children}
        </div>
    );
}

export default ScrollableDiv;