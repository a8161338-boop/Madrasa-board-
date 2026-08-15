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

    // ایک سے زیادہ فائلیں (Multiple Files) اپ لوڈ کرنے کا لوپ
    const aadharInput = document.getElementById('aadhar_card') as HTMLInputElement;
    let uploadedFileNames: string[] = [];

    if (aadharInput && aadharInput.files && aadharInput.files.length > 0) {
      for (let i = 0; i < aadharInput.files.length; i++) {
        const file = aadharInput.files[i];
        const fileName = `${Date.now()}_${file.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(fileName, file);

        if (uploadError) {
          alert('فائل اپ لوڈ کرنے میں خرابی: ' + uploadError.message);
          setLoading(false);
          return;
        }
        uploadedFileNames.push(fileName);
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
          total_fee,
          paid_fee,
          hostel_required,
          transport_route,
          aadhar_card: uploadedFileNames.join(', ') // تمام منتخب کردہ فائیلوں کے نام کما کے ساتھ محفوظ ہوں گے
        }
      ]);

    if (error) {
      alert('ڈیٹا محفوظ کرنے میں خرابی: ' + error.message);
      setLoading(false);
    } else {
      alert('فارم کامیابی کے ساتھ جمع ہو گیا ہے!');
      setLoading(false);
    }
  };

  // باقی فارم کا JSX ڈیزائن یہاں موجود ہوگا
                            }
