import React from 'react';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import styles from './Layout.module.css';
import Link from 'next/link';

// export default function Social() {
//     return (
//         <div className="flex flex-row space-x-4">
//             <Link
//                 href="https://www.linkedin.com/in/nickmackowski"
//                 className={styles[linkedin-button]}
//                 legacyBehavior>
//                 <SiLinkedin />
//             </Link>
//             <Link
//                 href="https://github.com/nmack41"
//                 className={styles[github-button]}
//                 legacyBehavior>
//                 <SiGithub />
//             </Link>
//         </div>
//     );
// };

export default function Social() {
    return (
        <div className="flex flex-row space-x-4">
            <Link
                href="https://www.linkedin.com/in/nickmackowski"
                className={styles['linkedin-button']}>
                <SiLinkedin />
            </Link>
            <Link
                href="https://github.com/nmack41"
                className={styles['github-button']}>
                <SiGithub />
            </Link>
        </div>
    );
};