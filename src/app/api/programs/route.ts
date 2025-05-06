import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check for required environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required Supabase environment variables')
}

// Only create clients if environment variables are available
const supabaseAnon = supabaseUrl && supabaseKey 
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null

const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient<Database>(supabaseUrl, supabaseServiceKey)
  : null

export async function GET() {
  try {
    if (!supabaseAnon) {
      return NextResponse.json(
        { error: 'Supabase client not initialized. Check environment variables.' },
        { status: 500 }
      )
    }

    const { data, error } = await supabaseAnon
      .from('programs')
      .select(`
        *,
        features:program_features(id, title, description, icon, sort_order),
        levels:program_levels(id, title, badge, duration, weekly_hours, prerequisites, description, learning_outcomes, sort_order),
        schedule:program_schedule(id, times, duration),
        tuition:program_tuition(id, price, applicable_levels, levels, sort_order)
      `)
      .order('name')

    if (error) {
      console.error('Error fetching programs:', error)
      return NextResponse.json(
        { error: 'Failed to fetch programs' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Error in programs GET route:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase admin client not initialized. Check environment variables.' },
        { status: 500 }
      )
    }

    const payload = await request.json()
    const {
      name,
      description,
      theme,
      slug,
      type,
      introduction,
      schedule,
      levels,
      features,
      course_materials
    } = payload

    if (!name || !description || !slug) {
      return NextResponse.json({ error: 'Missing required program fields' }, { status: 400 })
    }

    const programInsertData = {
      name,
    };
    console.log('--- Inserting into programs table (without select): ---', programInsertData);

    const { error: programError } = await supabaseAdmin
      .from('programs')
      .insert([programInsertData])

    if (programError) {
      console.error('Error creating program (insert only):', programError)
      console.error('Supabase error details:', JSON.stringify(programError, null, 2));
      return NextResponse.json(
        { error: `Failed to create program (insert only): ${programError.message}` },
        { status: 500 }
      )
    }

    console.log(`--- Successfully inserted program (basic insert)! ---`);

    console.log('--- Skipping related inserts for debugging ---');

    return NextResponse.json({ message: "Program created successfully (basic insert)" })

  } catch (err: any) {
    console.error('Error in programs POST route:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 