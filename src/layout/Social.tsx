import React from 'react';
import { SiLinkedin, SiGithub } from 'react-icons/si';

const Social: React.FC = () => {
    return (
        <div className="social-buttons flex flex-row space-x-4">
            <a href="https://www.linkedin.com/in/nickmackowski" target="_blank" rel="noopener noreferrer" className="linkedin-button">
                <SiLinkedin />
            </a>
            <a href="https://github.com/nmack41" target="_blank" rel="noopener noreferrer" className="github-button">
                <SiGithub />
            </a>
        </div>
    );
};

export default Social;
