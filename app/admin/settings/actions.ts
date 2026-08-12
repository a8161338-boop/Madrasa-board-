'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSettings(formData: FormData) {
  const supabase = createClient();
  const payload = {
    id: 1,
    name: String(formData.get('name') || ''),
    subname: String(formData.get('subname') || ''),
    tagline: String(formData.get('tagline') || ''),
    principal_name: String(formData.get('principal_name') || ''),
    principal_msg: String(formData.get('principal_msg') || ''),
    address: String(formData.get('address') || ''),
    phone: String(formData.get('phone') || ''),
    email: String(formData.get('email') || ''),
    students: String(formData.get('students') || ''),
    faculty_count: String(formData.get('faculty_count') || ''),
    courses_count: String(formData.get('courses_count') || ''),
    years: String(formData.get('years') || ''),
  };
  await supabase.from('settings').upsert(payload);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
}
