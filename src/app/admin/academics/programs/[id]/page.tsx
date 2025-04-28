import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/database';
import { cookies } from 'next/headers';
import ProgramEditor from '@/components/admin/ProgramEditor';

export const dynamic = 'force-dynamic';

export default async function ProgramPage({ params }: { params: { id: string } }) {
  console.log('Rendering program page with ID:', params.id);
  
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    console.log('Auth error or no user:', authError);
    redirect('/admin/login');
  }

  console.log('User authenticated:', user.id);

  try {
    // Check if the program exists
    const { data: program, error: programError } = await supabase
      .from('program_pages')
      .select(`
        id,
        name,
        description,
        slug,
        theme,
        created_at,
        updated_at
      `)
      .eq('id', params.id)
      .single();

    console.log('Program query result:', { program, error: programError });

    if (programError) {
      console.error('Program error:', programError);
      if (programError.code === 'PGRST116') {
        console.log('Program not found');
        redirect('/admin/academics');
      }
      throw programError;
    }

    if (!program) {
      console.log('Program not found');
      redirect('/admin/academics');
    }

    console.log('Program found:', program.name);

    return (
      <div className="min-h-screen bg-gray-100">
        <ProgramEditor programId={params.id} />
      </div>
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    redirect('/admin/academics');
  }
} 