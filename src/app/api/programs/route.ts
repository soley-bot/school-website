import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const { data, error } = await supabase
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
    const program = await request.json()

    const { data, error } = await supabase
      .from('programs')
      .insert([program])
      .select()
      .single()

    if (error) {
      console.error('Error creating program:', error)
      return NextResponse.json(
        { error: 'Failed to create program' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Error in programs POST route:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 