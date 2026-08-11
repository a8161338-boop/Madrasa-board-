'use client';

import { useState, useRef } from 'react';
import { submitContactForm } from './actions';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await submitContactForm(formData);
    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <form className="contact-form" ref={formRef} action={handleSubmit}>
      <input required name="name" placeholder="آپ کا نام" />
      <input required name="phone" placeholder="فون نمبر" className="en" />
      <textarea required name="message" placeholder="پیغام لکھیں"></textarea>
      <button type="submit" className="btn btn-gold">پیغام بھیجیں</button>
      {sent && <p style={{ color: 'var(--primary)', fontSize: 13 }}>آپ کا پیغام موصول ہو گیا، جزاک اللہ خیر</p>}
    </form>
  );
}
