import { signup } from './api'

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

export default async function RegisterUser({
  name,
  email,
  password,
}: RegisterUserRequest) {
  const response = await signup.post('register/', { name, email, password })
  return response.data
}
