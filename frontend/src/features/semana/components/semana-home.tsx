import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function SemanaHome() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <Link className="font-semibold tracking-tight" href="/">
          SymComp
        </Link>
        <span className="text-sm text-muted-foreground">Semana da Computação</span>
      </header>

      <section className="mx-auto flex min-h-[calc(100svh-88px)] max-w-6xl flex-col justify-center gap-8 px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Próxima edição
        </p>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Semana da Computação
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Uma nova experiência da SymComp está em construção. Datas, programação e
            inscrições serão divulgadas em breve.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Conheça a SymComp</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="https://www.instagram.com/symcomp.imeusp/">Acompanhe no Instagram</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
