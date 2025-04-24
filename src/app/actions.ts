'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      first_name: formData.get('first-name') as string,
      last_name: formData.get('last-name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      status: 'pending' as const,
    }

    const { error } = await supabase
      .from('contact_submissions')
      .insert([data])

    if (error) {
      throw new Error('Failed to submit form')
    }

    revalidatePath('/contact')
  } catch {
    throw new Error('Failed to submit form. Please try again.')
  }
} 