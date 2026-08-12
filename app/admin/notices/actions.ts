'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addNotice(formData: FormData) {
  const supabase = createClient();
  await supabase.from('notices').insert({
    title: String(formData.get('title') || ''),
    notice_date: String(formData.get('notice_date') || new Date().toISOString().slice(0, 10)),
    important: formData.get('important') === 'on',
    description: String(formData.get('description') || ''),
  });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/notices');
}

export async function updateNotice(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get('id'));
  await supabase.from('notices').update({
    title: String(formData.get('title') || ''),
    notice_date: String(formData.get('notice_date') || ''),
    important: formData.get('important') === 'on',
    description: String(formData.get('description') || ''),
  }).eq('id', id);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/notices');
}

export async function deleteNotice(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get('id'));
  await supabase.from('notices').delete().eq('id', id);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/notices');
}
