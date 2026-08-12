'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addFaculty(formData: FormData) {
  const supabase = createClient();
  await supabase.from('faculty').insert({
    name: String(formData.get('name') || ''),
    designation: String(formData.get('designation') || ''),
    qualification: String(formData.get('qualification') || ''),
  });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/faculty');
}

export async function updateFaculty(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get('id'));
  await supabase.from('faculty').update({
    name: String(formData.get('name') || ''),
    designation: String(formData.get('designation') || ''),
    qualification: String(formData.get('qualification') || ''),
  }).eq('id', id);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/faculty');
}

export async function deleteFaculty(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get('id'));
  await supabase.from('faculty').delete().eq('id', id);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/faculty');
}
