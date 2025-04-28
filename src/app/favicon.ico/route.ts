import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'favicon.ico')
    const fileBuffer = readFileSync(filePath)
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (e) {
    return new NextResponse('Favicon not found', { status: 404 })
  }
} 