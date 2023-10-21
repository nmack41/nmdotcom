import * as React from 'react';
import { useState } from 'react';

export default function Page() {
    return <h1>Hello, Next.js!</h1>
  }

// export default function NewsletterForm() {
//   const [emailAddress, setEmailAddress] = useState('');

//   const submitForm = async () => {
//     const response = await fetch('http://localhost:5000/api/email', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: emailAddress })
//     });

//     const data = await response.json();
//     console.log(data.message);
//   };

//   return (
//     <div className="newsletter-form">
//       <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="form-padding">
//         <label>
//           Email Address
//           <input 
//             type="email" 
//             name="email" 
//             required 
//             className="input-border border border-gray-700"
//             value={emailAddress}
//             onChange={(e) => setEmailAddress(e.target.value)}
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       {/* You can add success and error messages here */}
//     </div>
//   );
// }

