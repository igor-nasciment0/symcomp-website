export type User = {
  id: string
  email: string
  name: string
  username: string
  eh_verificado: boolean
  eh_organizador: boolean
  eh_presidente: boolean
}

export type Perfil = {
  papel: 'participante' | 'presidente' | 'organizador'
  data_registro: string
}

export type Desafio = {
  title: string
}

export type Jogador = {
  user: User
  email: string
  desafio: Desafio
  pontos: BigInteger
  username: string
}
