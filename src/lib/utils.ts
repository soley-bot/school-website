import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-hot-toast'

/**
 * Combines class names using clsx and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Centralized error handling for UI components
 */
export function handleUIError(error: Error | unknown, context?: string): void {
  const errorMessage = error instanceof Error ? error.message : String(error)
  const contextMessage = context ? `Error in ${context}: ` : 'Error: '
  
  console.error(`${contextMessage}${errorMessage}`, error)
  toast.error(`${contextMessage}${errorMessage}`)
}

/**
 * Standard error handling with fallback value
 */
export function handleErrorWithFallback<T>(error: Error | unknown, fallback: T, context?: string): T {
  handleUIError(error, context)
  return fallback
}

/**
 * Format date string to locale format
 */
export function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (error) {
    handleUIError(error, 'formatDate')
    return dateString
  }
}

/**
 * Sleep function for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Truncate a string to a specified length with ellipsis
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength - 3)}...`
}

/**
 * Check if the code is running on the client
 */
export const isClient = typeof window !== 'undefined'

/**
 * Check if the code is running on the server
 */
export const isServer = typeof window === 'undefined'

interface FetchOptions extends RequestInit {
  csrfToken?: string;
}

export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
  const { csrfToken, ...fetchOptions } = options;
  
  const headers = new Headers(fetchOptions.headers);
  
  // Add CSRF token for mutation requests
  if (csrfToken && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(fetchOptions.method || 'GET')) {
    headers.set('X-CSRF-Token', csrfToken);
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    credentials: 'include', // Include cookies for auth
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Request failed');
  }

  return response;
}
