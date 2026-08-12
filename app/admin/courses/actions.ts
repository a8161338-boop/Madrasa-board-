'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addCourse(formData: FormData) {
  const supabase = createClient();
  await supabase.from('courses').insert({
    name: String(formData.get('name') || ''),
    duration: String(formData.get('duration') || ''),
    eligibility: String(formData.get('eligibility') || ''),
    fee: String(formData.get('fee') || ''),
    description: String(formData.get('description') || ''),
  });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/courses');
}

export async function updateCourse(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get('id'));
  await supabase.from('courses').update({
    name: String(formData.get('name') || ''),
    duration: String(formData.get('duration') || ''),
    eligibility: String(formData.get('eligibility') || ''),
    fee: String(formData.get('fee') || ''),
    description: String(formData.get('description') || ''),
  }).eq('id', id);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/courses');
}

export async function deleteCourse(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get('id'));
  await supabase.from('courses').delete().eq('id', id);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/courses');
}
