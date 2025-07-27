import { User } from "@/auth/interfaces/login.interface";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  jwt: string | null
  isAuthenticated: boolean
  login: (data: { user: User; jwt: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      jwt: null,
      isAuthenticated: false,

      login: ({ user, jwt }) =>
        set({
          user,
          jwt,
          isAuthenticated: true,
        }),

      logout: () => {

        set({
          user: null,
          jwt: null,
          isAuthenticated: false,
        })
        localStorage.removeItem("state");
      },
      
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        jwt: state.jwt,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)