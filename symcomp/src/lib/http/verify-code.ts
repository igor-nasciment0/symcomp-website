import { api } from './api'

interface VerifyCodeRequest {
  email: string
  code: string
}

export default async function VerifyCode({ email, code }: VerifyCodeRequest) {
  const response = await api.post('/validate-code/', { email, code })
  return response
}
