import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'
import { csrfMiddleware } from '@/lib/csrf'

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
  return csrfMiddleware(request, async () => {
    try {
      if (!supabaseAdmin) {
        return NextResponse.json(
          { error: 'Supabase admin client not initialized. Check environment variables.' },
          { status: 500 }
        )
      }

      // Get the user session
      const { data: { session }, error: authError } = await supabaseAnon!.auth.getSession()
      if (authError || !session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      // Check user role
      const { data: roleData, error: roleError } = await supabaseAnon!
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single()

      if (roleError || !roleData) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }

      if (!['admin', 'editor'].includes(roleData.role)) {
        return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
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

      // Enhanced validation
      if (!name?.trim() || !description?.trim() || !slug?.trim()) {
        return NextResponse.json({ 
          error: 'Missing required program fields: name, description, and slug are required' 
        }, { status: 400 })
      }

      if (!type || !['english', 'chinese', 'ielts'].includes(type)) {
        return NextResponse.json({ 
          error: 'Invalid program type. Must be one of: english, chinese, ielts' 
        }, { status: 400 })
      }

      // Insert the program
      const { data: program, error: insertError } = await supabaseAdmin
        .from('programs')
        .insert({
          name,
          description,
          theme,
          slug,
          type
        })
        .select()
        .single()

      if (insertError) {
        console.error('Error inserting program:', insertError)
        return NextResponse.json(
          { error: 'Failed to create program' },
          { status: 500 }
        )
      }

      // Insert related data
      const promises = []

      if (introduction) {
        promises.push(
          supabaseAdmin
            .from('program_content')
            .insert([{ 
              program_id: program.id,
              section: 'introduction',
              content: introduction
            }])
        )
      }

      if (features?.length > 0) {
        promises.push(
          supabaseAdmin
            .from('program_features')
            .insert(features.map((feature, index) => ({
              ...feature,
              program_id: program.id,
              sort_order: index
            })))
        )
      }

      if (levels?.length > 0) {
        promises.push(
          supabaseAdmin
            .from('program_levels')
            .insert(levels.map((level, index) => ({
              ...level,
              program_id: program.id,
              sort_order: index
            })))
        )
      }

      if (schedule) {
        promises.push(
          supabaseAdmin
            .from('program_schedule')
            .insert([{ ...schedule, program_id: program.id }])
        )
      }

      if (course_materials?.length > 0) {
        promises.push(
          supabaseAdmin
            .from('course_materials')
            .insert(course_materials.map((material, index) => ({
              ...material,
              program_id: program.id,
              sort_order: index
            })))
        )
      }

      // Wait for all related data to be inserted
      const results = await Promise.allSettled(promises)
      const errors = results
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .map(result => result.reason)

      if (errors.length > 0) {
        console.error('Errors inserting related data:', errors)
        // Program was created but some related data failed
        return NextResponse.json({ 
          warning: 'Program created but some related data failed to insert',
          programId: program.id,
          errors 
        }, { status: 207 })
      }

      return NextResponse.json({ 
        message: "Program created successfully",
        programId: program.id 
      })

    } catch (err: any) {
      console.error('Error in programs POST route:', err)
      return NextResponse.json(
        { error: err.message || 'Internal server error' },
        { status: 500 }
      )
    }
  })
}