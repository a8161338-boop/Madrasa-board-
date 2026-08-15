'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://urkpnfduowkwgtjodihv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVya3BuZmR1b3drd2d0am9kaWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MjIyMjEsImV4cCI6MjEwMTk5ODIyMX0.hM8jOg9q6d0j--sFugwAE57DiuvVWOW-fCguKY7LxAE';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdmissionPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // فارم کی ویلیوز حاصل کرنا
    const full_name = (document.getElementById('full_name') as HTMLInputElement).value;
    const father_name = (document.getElementById('father_name') as HTMLInputElement).value;
    const date_of_birth = (document.getElementById('date_of_birth') as HTMLInputElement).value;
    const gender = (document.getElementById('gender') as HTMLSelectElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone_number = (document.getElementById('phone_number') as HTMLInputElement).value;
    const address = (document.getElementById('admission_address') as HTMLTextAreaElement).value;
    const course_enrolled = (document.getElementById('course_enrolled') as HTMLInputElement).value;
    const guardian_name = (document.getElementById('guardian_name') as HTMLInputElement).value;
    const guardian_relation = (document.getElementById('guardian_relation') as HTMLInputElement).value;
    const guardian_phone = (document.getElementById('guardian_phone') as HTMLInputElement).value;
    const total_fee = (document.getElementById('total_fee') as HTMLInputElement).value;
    const paid_fee = (document.getElementById('paid_fee') as HTMLInputElement).value;
    const hostel_required = (document.getElementById('hostel_required') as HTMLSelectElement).value;
    const transport_route = (document.getElementById('transport_route') as HTMLInputElement).value;

    // ایک سے زیادہ فائلیں اپ لوڈ کرنے کا منطقی عمل
    const aadharInput = document.getElementById('aadhar_card') as HTMLInputElement;
    let uploadedFileNames: string[] = [];

    if (aadharInput && aadharInput.files && aadharInput.files.length > 0) {
      for (let i = 0; i < aadharInput.files.length; i++) {
        const file = aadharInput.files[i];
        const fileName = `${Date.now()}_${file.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('documents') // یقینی بنائیں کہ آپ کا بکٹ نام 'documents' ہے
          .upload(fileName, file);

        if (uploadError) {
          alert('فائل اپ لوڈ کرنے میں خرابی: ' + uploadError.message);
          setLoading(false);
          return;
        }
        uploadedFileNames.push(fileName);
      }
    }

    // ڈیٹا بیس میں داخلہ
    const { error } = await supabase
      .from('admissions')
      .insert([
        {
          full_name, father_name, date_of_birth, gender, email, phone_number,
          address, course_enrolled, guardian_name, guardian_relation, 
          guardian_phone, total_fee, paid_fee, hostel_required, 
          transport_route,
          aadhar_card: uploadedFileNames.join(', ') // تمام فائلیں کما کے ساتھ سیو ہوں گی
        }
      ]);

    if (error) {
      alert('ڈیٹا محفوظ کرنے میں خرابی: ' + error.message);
    } else {
      alert('فارم کامیابی کے ساتھ جمع ہو گیا ہے!');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>داخلہ فارم</h1>
      <form onSubmit={handleSubmit}>
        <input id="full_name" placeholder="طالب علم کا نام" required /><br />
        <input id="father_name" placeholder="والد کا نام" /><br />
        <input id="date_of_birth" type="date" /><br />
        <select id="gender"><option value="Male">میل</option><option value="Female">فی میل</option></select><br />
        <input id="email" type="email" placeholder="ای میل" /><br />
        <input id="phone_number" placeholder="فون نمبر" /><br />
        <textarea id="admission_address" placeholder="ایڈریس"></textarea><br />
        <input id="course_enrolled" placeholder="کورس" /><br />
        <input id="guardian_name" placeholder="سرپرست کا نام" /><br />
        <input id="guardian_relation" placeholder="سرپرست کا رشتہ" /><br />
        <input id="guardian_phone" placeholder="سرپرست کا فون" /><br />
        <input id="total_fee" placeholder="کل فیس" /><br />
        <input id="paid_fee" placeholder="ادا شدہ فیس" /><br />
        <select id="hostel_required"><option value="No">ہاسٹل نہیں</option><option value="Yes">ہاسٹل چاہیے</option></select><br />
        <input id="transport_route" placeholder="ٹرانسپورٹ روٹ" /><br />
        
        {/* یہاں دیکھیں: multiple کا مطلب ایک ساتھ کئی فائلیں */}
        <label>دستاویزات منتخب کریں:</label>
        <input type="file" id="aadhar_card" multiple /> 
        <br /><br />
        
        <button type="submit" disabled={loading}>
          {loading ? 'اپ لوڈ ہو رہا ہے...' : 'جمع کریں'}
        </button>
      </form>
    </div>
  );
        }
