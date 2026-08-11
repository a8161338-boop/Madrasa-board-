'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: FormData) {
  const supabase = createClient();
  const name = String(formData.get('name') || '');
  const phone = String(formData.get('phone') || '');
  const message = String(formData.get('message') || '');

  await supabase.from('messages').insert({ name, phone, message });
  revalidatePath('/contact');
  return { success: true };
}
