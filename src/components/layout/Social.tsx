import React from 'react';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import './social_style.css';
import Link from 'next/link';

export default function Social() {
// const Social: React.FC = () => {
    return (
        <div className="social-buttons flex flex-row space-x-4">
            <Link href="https://www.linkedin.com/in/nickmackowski" className="linkedin-button">
                <SiLinkedin />
            </Link>
            <Link href="https://github.com/nmack41" className="github-button">
                <SiGithub />
            </Link>
        </div>
    );
};
