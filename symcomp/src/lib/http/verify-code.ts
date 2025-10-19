import { api } from './api'

interface VerifyCodeRequest {
  code: string
}

interface VerifyCodeResponse {
  message: string
}

export default async function VerifyCode({ code }: VerifyCodeRequest) {
  const response = await api.post<VerifyCodeRequest, VerifyCodeResponse>(
    '/validate-code/',
    { code },
  )
  return response
}
