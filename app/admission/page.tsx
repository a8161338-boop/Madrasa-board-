'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://urkpnfduowkwgtjodihv.supabase.co';
const supabaseAnonKey = 'sb_publishable_TE7AcfL_XGazEZWsaucoCQ_GfZTVOomya';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdmissionPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const full_name = (document.getElementById('full_name') as HTMLInputElement).value;
    const father_name = (document.getElementById('father_name') as HTMLInputElement).value;
    const date_of_birth = (document.getElementById('date_of_birth') as HTMLInputElement).value;
    const gender = (document.getElementById('gender') as HTMLSelectElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone_number = (document.getElementById('phone_number') as HTMLInputElement).value;
    const address = (document.getElementById('admission_address') as HTMLTextAreaElement).value;
    const course_enrolled = (document.getElementById('course_enrolled') as HTMLInputElement).value;

    const { error } = await supabase
      .from('admissions')
      .insert([
        {
          full_name,
          father_name,
          date_of_birth,
          gender,
          email,
          phone_number,
          address,
          course_enrolled,
          fee_status: 'Pending'
        }
      ]);

    setLoading(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('مبارک ہو! آپ کا داخلہ فارم کامیابی کے ساتھ جمع ہو گیا ہے۔');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <main style={{ padding: '30px', direction: 'rtl', textAlign: 'right', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>یونیورسٹی آن لائن داخلہ فارم</h2>
      
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>پورا نام:</label>
          <input type="text" id="full_name" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>والد کا نام:</label>
          <input type="text" id="father_name" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>تاریخ پیدائش:</label>
          <input type="date" id="date_of_birth" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>جنس (Gender):</label>
          <select id="gender" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}>
            <option value="">منتخب کریں</option>
            <option value="Male">مرد (Male)</option>
            <option value="Female">عورت (Female)</option>
            <option value="Other">دیگر (Other)</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ای میل ایڈریس:</label>
          <input type="email" id="email" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>موبایل نمبر:</label>
          <input type="text" id="phone_number" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>مکمل پتہ:</label>
          <textarea id="admission_address" rows={3} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}></textarea>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>کورس کا نام:</label>
          <input type="text" id="course_enrolled" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>

        <button type="submit" disabled={loading} style={{ background: '#007bff', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '16px' }}>
          {loading ? 'جمع ہو رہا ہے...' : 'فارم جمع کروائیں (Submit)'}
        </button>

      </form>
    </main>
  );
            }
