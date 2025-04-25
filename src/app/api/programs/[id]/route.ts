import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching program:', error)
      return NextResponse.json(
        { error: 'Failed to fetch program' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Program not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Error in program GET route:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()

    const { data, error } = await supabase
      .from('programs')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating program:', error)
      return NextResponse.json(
        { error: 'Failed to update program' },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Error in program PATCH route:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting program:', error)
      return NextResponse.json(
        { error: 'Failed to delete program' },
        { status: 500 }
      )
    }

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('Error in program DELETE route:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 