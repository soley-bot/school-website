import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/database';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import BasicInfoEditor from '@/components/admin/editors/BasicInfoEditor';
import LevelsEditor from '@/components/admin/editors/LevelsEditor';
import FeaturesEditor from '@/components/admin/editors/FeaturesEditor';
import MaterialsEditor from '@/components/admin/editors/MaterialsEditor';
import TuitionEditor from '@/components/admin/editors/TuitionEditor';
import { revalidatePath } from 'next/cache';
import React from 'react';
import ProgramEditor from '@/components/admin/ProgramEditor';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProgramPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  );

  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      redirect('/admin/login');
    }

    // Check if the program exists in program_pages table
    const { data: program, error: programError } = await supabase
      .from('program_pages')
      .select('*')
      .eq('id', params.id)
      .single();

    if (programError || !program) {
      console.error('Program error:', programError);
      redirect('/admin/academics');
    }

    const { data: tuition } = await supabase
      .from('program_tuition')
      .select('*')
      .eq('program_id', params.id)
      .order('sort_order', { ascending: true });

    const handleTuitionUpdate = async () => {
      'use server';
      // Revalidate the page when tuition is updated
      revalidatePath(`/admin/academics/programs/${params.id}`);
    };

    return (
      <div className="min-h-screen bg-gray-100">
        <ProgramEditor programId={params.id} />
        <TuitionEditor tuition={tuition || []} programId={program.id} onUpdate={handleTuitionUpdate} />
      </div>
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    redirect('/admin/academics');
  }
} 