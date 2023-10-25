import * as React from 'react';
import { useState } from 'react';
import styles from './Signup.module.css';

export default function NewsletterForm() {
  const [emailAddress, setEmailAddress] = useState('');

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   console.log(setEmailAddress)
  //   event.preventDefault();
  //   // alert('Email address: ${setEmailAddress')
  // }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // submitToApi(formData)
    console.log("submitted")

    try {
      const response = await fetch('http://localhost:5000/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailAddress }),
      });

      if (!response.ok) {
        console.error('Failed to send email');
        return;
      }

      const data = await response.json();
      console.log('Successfully sent email:', data);
    } catch (error) {
      console.error('Error while sending email:', error);
    }
  }

  return (
    <div className={styles['form-container']}>
    <form className={styles['form']} onSubmit={handleSubmit}>
      <input
          type="email"
          placeholder="Email Address"
          className={styles['form-input']}
          value={emailAddress}
          name="email"
          required
          onChange={(e) => setEmailAddress(e.target.value) }>
        </input>
      <button className={styles['form-submit']}>Submit</button>
    </form>
    </div>
  )
}