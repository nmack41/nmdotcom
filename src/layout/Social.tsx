// import React from 'react';
// import { IconType } from 'react-icons/lib';
// import { SiGithub, SiLinkedin, SiTwitter, SiInstagram} from 'react-icons/si';

// function SocialLinks() {
//     return (
//       <div className='mt-2 flex space-x-4'>
//         {socials.map((social) => (
//           key={social.href}
//         ))}

//       </div>
//     );
//   }
  
//   const footerLinks: { href: string; text: string; tooltip: React.ReactNode }[] =
//     [
//       {
//         href: 'https://github.com/theodorusclarence/theodorusclarence.com',
//         text: 'Source Code',
//         tooltip: (
//           <>
//             This website is <strong>open source</strong>!
//           </>
//         ),
//       },
//       {
//         href: 'https://clarence.link/booknotes',
//         text: 'Book Notes',
//         tooltip: 'Note collection of books that I read',
//       },
//       {
//         href: '/subscribe',
//         text: 'Subscribe',
//         tooltip: 'Get an email whenever I post, no spam',
//       },
//     ];
  
//   type Social = {
//     href: string;
//     icon: IconType;
//     id: string;
//     text: React.ReactNode;
//   };
//   const socials: Social[] = [
//     {
//       href: 'https://clarence.link/github',
//       icon: SiGithub,
//       id: 'Github',
//       text: (
//         <>
//           See my projects on Github
//           </>
//       ),
//     },
//     {
//       href: 'https://clarence.link/linkedin',
//       icon: SiLinkedin,
//       id: 'Linkedin',
//       text: (
//         <>
//           Find me on Linkedin
//         </>
//       ),
//     },
//     {
//       href: 'https://clarence.link/twt',
//       icon: SiTwitter,
//       id: 'Twitter',
//       text: (
//         <>
//           I post updates, tips, insight, and sometimes do some talk. Follow me on Twitter
//         </>
//       ),
//     },
//   ];
  