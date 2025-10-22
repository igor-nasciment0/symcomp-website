export type Palestra = {
  horario: string
  data: 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX'
  titulo: string | null
  descricao: string | null
  palestrante: string | null
  sobre: string | null
  foto: string | null
  contato: string | null
  status: string | null
  linkCalendar: string
  keyWord: string
  linkLive?: string
  sponsorName?: string
  sponsorTier?: string
}
