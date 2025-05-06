import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  
  // Check for secret to prevent unauthorized revalidations
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
  
  const path = request.nextUrl.searchParams.get('path') || '/'
  
  try {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, message: `Path "${path}" revalidated` })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
} 