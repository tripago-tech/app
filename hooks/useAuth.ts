import { useAuthStore } from '@/store/useAuthStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/utils/api'
import { User } from '@/types'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData extends LoginCredentials {
  name: string
}

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post('/auth/login', credentials)
      return response.data
    },
    onSuccess: (data) => {
      login(data.user, data.token)
    },
    onError: () => {
      setLoading(false)
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post('/auth/register', data)
      return response.data
    },
    onSuccess: (data) => {
      login(data.user, data.token)
    },
  })

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/auth/profile')
      return response.data
    },
    enabled: isAuthenticated,
  })

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    profile,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  }
}
