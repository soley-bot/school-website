import { ReactNode } from 'react'
import { useAuth } from '@/context/AuthContext'

type Role = 'admin' | 'editor' | 'viewer'

interface RoleProtectedProps {
  children: ReactNode
  requiredRole: Role | Role[]
  fallback?: ReactNode
}

export default function RoleProtected({
  children,
  requiredRole,
  fallback = null
}: RoleProtectedProps) {
  const { checkPermission } = useAuth()

  if (!checkPermission(requiredRole)) {
    return fallback
  }

  return <>{children}</>
}