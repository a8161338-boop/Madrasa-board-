'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addGalleryImage(formData: FormData) {
  const supabase = createClient();
  await supabase.from('gallery').insert({
    url: String(formData.get('url') || ''),
    title: String(formData.get('title') || ''),
  });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/gallery');
}

export async function deleteGalleryImage(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get('id'));
  await supabase.from('gallery').delete().eq('id', id);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/gallery');
}
