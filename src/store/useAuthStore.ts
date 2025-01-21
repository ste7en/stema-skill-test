import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { JobSeeker } from '@/types/jobseeker'

interface AuthState {
  user: JobSeeker | null
  isAuthenticated: boolean
  login: (user: JobSeeker) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
) 