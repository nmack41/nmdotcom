"use client";

import * as React from 'react';
import { useState } from 'react';
import NewsletterForm from '@/app/newsletter/SignupForm';
import '../globals.css'

export default function Page() {
    return (
      <div className="p-8">
      <NewsletterForm />
      </div>
    )
  }
