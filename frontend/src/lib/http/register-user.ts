import { api } from './api'

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

type RegisterUserResponse = {
  message: string
}

export default async function registerUser({
  name,
  email,
  password,
}: RegisterUserRequest): Promise<RegisterUserResponse> {
  const data = await api.post<RegisterUserRequest, RegisterUserResponse>(
    '/register/',
    {
      name,
      email,
      password,
    },
    { withCredentials: false },
  )
  return data
}
