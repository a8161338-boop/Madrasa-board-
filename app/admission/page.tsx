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
    
    // گارڈین کی معلومات
    const guardian_name = (document.getElementById('guardian_name') as HTMLInputElement).value;
    const guardian_relation = (document.getElementById('guardian_relation') as HTMLInputElement).value;
    const guardian_phone = (document.getElementById('guardian_phone') as HTMLInputElement).value;
    
    // فیس کی تفصیلات
    const total_fee = (document.getElementById('total_fee') as HTMLInputElement).value;
    const paid_fee = (document.getElementById('paid_fee') as HTMLInputElement).value;
    
    // ہاسٹل اور ٹرانسپورٹ
    const hostel_required = (document.getElementById('hostel_required') as HTMLSelectElement).value;
    const transport_route = (document.getElementById('transport_route') as HTMLInputElement).value;

    // فائل ان پٹ (آدھار کارڈ)
    const aadharInput = document.getElementById('aadhar_card') as HTMLInputElement;
    let aadharFileName = '';

    if (aadharInput && aadharInput.files && aadharInput.files[0]) {
      const file = aadharInput.files[0];
      aadharFileName = `${Date.now()}_${file.name}`;
      
      // فائل کو Supabase Storage میں اپ لوڈ کرنے کا کوڈ (اگر آپ نے Bucket بنا رکھی ہو)
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(aadharFileName, file);

      if (uploadError) {
        alert('فائل اپ لوڈ کرنے میں خرابی: ' + uploadError.message);
        setLoading(false);
        return;
      }
    }

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
          guardian_name,
          guardian_relation,
          guardian_phone,
          total_fee: total_fee ? Number(total_fee) : 0,
          paid_fee: paid_fee ? Number(paid_fee) : 0,
          fee_status: 'Pending',
          hostel_required,
          transport_route,
          aadhar_document: aadharFileName // فائل کا نام یا پاتھ ڈیٹا بیس میں محفوظ ہوگا
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
    <main style={{ padding: '30px', direction: 'rtl', textAlign: 'right', fontFamily: 'Arial, sans-serif', maxWidth: '700px', margin: 'auto', background: '#fdfbf7', minHeight: '100vh' }}>
      
      {/* یونیورسٹی ہیڈر */}
      <div style={{ textAlign: 'center', marginBottom: '30px', background: '#134e38', color: '#fff', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#f3e5ab' }}>معہد الرشد — آن لائن داخلہ فارم</h2>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>برائے تعلیمی سال 2026ء - جامعہ و تعلیمی مرکز</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e0dcd0' }}>
        
        {/* 1. طالب علم کی بنیادی معلومات */}
        <h3 style={{ color: '#134e38', borderBottom: '2px solid #d4af37', paddingBottom: '8px', marginBottom: '20px', fontSize: '18px' }}>
          📋 1. طالب علم کی بنیادی معلومات
        </h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>طالب علم کا پورا نام:</label>
          <input type="text" id="full_name" required placeholder="पूरा नाम दर्ज करें" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>والد کا نام:</label>
          <input type="text" id="father_name" required placeholder="पिता کا نام" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>تاریخ پیدائش:</label>
          <input type="date" id="date_of_birth" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>جنس (Gender):</label>
          <select id="gender" required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="">منتخب کریں</option>
            <option value="Male">مرد (Male)</option>
            <option value="Female">عورت (Female)</option>
            <option value="Other">دیگر (Other)</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ای میل ایڈریس:</label>
          <input type="email" id="email" required placeholder="example@email.com" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>موبائل نمبر (WhatsApp):</label>
          <input type="text" id="phone_number" required placeholder="03XXXXXXXXX یا 10 ڈیجٹ نمبر" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>مستقل پتہ (Address):</label>
          <textarea id="admission_address" rows={3} required placeholder="مکان نمبر، محله، شہر اور پن کوڈ..." style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }}></textarea>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>منتخب کردہ کورس یا شعبہ:</label>
          <input type="text" id="course_enrolled" required placeholder="مثلاً: حفظ القرآن، درس نظامی، کمپیوٹر کورس" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>


        {/* ================= 2. گارڈین یا سرپرست کی معلومات ================= */}
        <h3 style={{ color: '#134e38', borderBottom: '2px solid #d4af37', paddingBottom: '8px', marginBottom: '20px', fontSize: '18px' }}>
          👨‍👧‍👦 2. سرپرست کی معلومات (Guardian Info)
        </h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>سرپرست کا نام:</label>
          <input type="text" id="guardian_name" placeholder="والد کے علاوہ کسی دوسرے سرپرست کا نام" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>طالب علم سے رشتہ:</label>
          <input type="text" id="guardian_relation" placeholder="مثلاً: چچا، ماموں، بھائی" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>سرپرست کا رابطہ نمبر:</label>
          <input type="text" id="guardian_phone" placeholder="رابطہ نمبر" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>


        {/* ================= 3. دستاویزات اپ لوڈ (Aadhaar Card Upload) ================= */}
        <h3 style={{ color: '#134e38', borderBottom: '2px solid #d4af37', paddingBottom: '8px', marginBottom: '20px', fontSize: '18px' }}>
          📁 3. ضروری دستاویزات (Documents Upload)
        </h3>

        <div style={{ marginBottom: '25px', background: '#f9f6ef', padding: '15px', borderRadius: '8px', border: '1px dashed #d4af37' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#134e38' }}>آدھار کارڈ یا شناختی کارڈ کی کاپی اپ لوڈ کریں (Aadhaar Card):</label>
          <p style={{ fontSize: '12px', color: '#666', margin: '0 0 10px 0' }}>صرف PDF، JPG یا PNG فارمیٹ میں فائل منتخب کریں (سائز زیادہ بڑا نہ ہو)</p>
          <input type="file" id="aadhar_card" accept=".jpg, .jpeg, .png, .pdf" style={{ width: '100%', padding: '8px', boxSizing: 'border-box', background: '#fff', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>


        {/* ================= 4. فیس اور مالیاتی نظام ================= */}
        <h3 style={{ color: '#134e38', borderBottom: '2px solid #d4af37', paddingBottom: '8px', marginBottom: '20px', fontSize: '18px' }}>
          💳 4. فیس کی تفصیلات (Fee Management)
        </h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>کل واجب الادا فیس (Total Fee):</label>
          <input type="number" id="total_fee" placeholder="رقم ہندسوں میں (مثلاً 5000)" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>جمع شدہ فیس (Paid Fee):</label>
          <input type="number" id="paid_fee" placeholder="اگر کوئی ایڈوانس فیس جمع کی ہو" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>


        {/* ================= 5. ہاسٹل اور ٹرانسپورٹ کی سہولت ================= */}
        <h3 style={{ color: '#134e38', borderBottom: '2px solid #d4af37', paddingBottom: '8px', marginBottom: '20px', fontSize: '18px' }}>
          🚌 5. ہاسٹل اور ٹرانسپورٹ (Facilities)
        </h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>کیا ہاسٹل (رہائش) درکار ہے؟</label>
          <select id="hostel_required" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="No">نہیں (No)</option>
            <option value="Yes">ہاں (Yes)</option>
          </select>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ٹرانسپورٹ روٹ (اگر بس کی ضرورت ہو):</label>
          <input type="text" id="transport_route" placeholder="مثلاً: روٹ نمبر 3 یا علاقہ کا نام" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>

        {/* سبمٹ بٹن */}
        <button type="submit" disabled={loading} style={{ background: '#134e38', color: 'white', padding: '14px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', fontSize: '17px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
          {loading ? 'فارم اپ لوڈ ہو رہا ہے...' : 'داخلہ فارم جمع کروائیں (Submit Form)'}
        </button>

      </form>
    </main>
  );
          }
          
