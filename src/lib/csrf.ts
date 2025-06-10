import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const CSRF_SECRET = process.env.CSRF_SECRET || crypto.randomBytes(32).toString('hex')
const CSRF_SALT_LENGTH = 8
const CSRF_TOKEN_LENGTH = 32

export function generateToken(): { token: string; hash: string } {
  const salt = crypto.randomBytes(CSRF_SALT_LENGTH).toString('hex')
  const hash = crypto
    .createHash('sha256')
    .update(salt + CSRF_SECRET)
    .digest('hex')
  
  return {
    token: salt + hash,
    hash: hash
  }
}

export function validateToken(token: string): boolean {
  if (token.length !== CSRF_SALT_LENGTH * 2 + CSRF_TOKEN_LENGTH * 2) {
    return false
  }

  const salt = token.slice(0, CSRF_SALT_LENGTH * 2)
  const hash = token.slice(CSRF_SALT_LENGTH * 2)
  
  const expectedHash = crypto
    .createHash('sha256')
    .update(salt + CSRF_SECRET)
    .digest('hex')
  
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(expectedHash)
  )
}

export async function csrfMiddleware(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  // Skip CSRF check for non-mutation methods and non-API routes
  if (
    request.method === 'GET' ||
    request.method === 'HEAD' ||
    request.method === 'OPTIONS' ||
    !request.url.includes('/api/')
  ) {
    return handler()
  }

  const csrfToken = request.headers.get('X-CSRF-Token')
  
  if (!csrfToken || !validateToken(csrfToken)) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    )
  }

  return handler()
}