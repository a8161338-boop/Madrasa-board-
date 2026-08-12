import { createClient } from '@/lib/supabase/server';

export async function getSettings() {
  const supabase = createClient();
  const { data } = await supabase.from('settings').select('*').eq('id', 1).single();
  return (
    data || {
      name: 'معہد الرشد',
      subname: 'مرکز تحفیظ القرآن و الدعوۃ و التعلیم',
      tagline: '',
      principal_name: '',
      principal_msg: '',
      address: '',
      phone: '',
      email: '',
      students: '',
      faculty_count: '',
      courses_count: '',
      years: '',
    }
  );
}

export async function getCourses() {
  const supabase = createClient();
  const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function getNotices() {
  const supabase = createClient();
  const { data } = await supabase.from('notices').select('*').order('notice_date', { ascending: false });
  return data || [];
}

export async function getFaculty() {
  const supabase = createClient();
  const { data } = await supabase.from('faculty').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function getGallery() {
  const supabase = createClient();
  const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function getMessages() {
  const supabase = createClient();
  const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  return data || [];
}
