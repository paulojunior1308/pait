import { Clock, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function InicioDashboard({
  onNavigate,
  progressPercent = 0,
  completedCount = 0,
  totalCount = 3,
  nextTraining = null,
}) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  const allDone = completedCount >= totalCount

  return (
    <div className="space-y-6 px-8 py-6">
      <div>
        <p className="text-sm text-ink-muted">{greeting}, Lucas</p>
        <h2 className="mt-1 font-sora text-xl font-700 text-ink">Dashboard de Aprendizado</h2>
      </div>

      <div className="rounded-2xl border border-border bg-white px-6 py-5 shadow-sm">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="font-sora text-base font-700 text-ink">
              {allDone ? 'Trilha prática concluída' : 'Trilha prática em andamento'}
            </p>
            <p className="mt-0.5 text-sm text-ink-muted">
              {completedCount} de {totalCount} treinamentos concluídos (Gmail, GitHub e Jira)
            </p>
          </div>
          <span className="font-sora text-3xl font-800 text-accent-blue">{progressPercent}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-[#E4E7EC]">
          <div
            className="bg-gradient-accent h-full rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate?.('trilha')}
        className="group relative flex w-full items-center overflow-hidden rounded-2xl bg-gradient-to-r from-navy to-navy-secondary px-6 py-5 text-left text-white shadow-sm"
      >
        <div className="relative z-10 flex-1">
          {allDone ? (
            <>
              <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                Parabéns
              </p>
              <p className="mt-1 font-sora text-lg font-700">Todos os treinamentos concluídos</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                <CheckCircle2 size={12} />
                Você pode refazer qualquer um na Trilha
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-medium uppercase tracking-wide text-white/60">
                Próximo treinamento
              </p>
              <p className="mt-1 font-sora text-lg font-700">
                {nextTraining?.title || 'Abrir trilha prática'}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                <Clock size={12} />
                {nextTraining?.duration || '—'} · {nextTraining?.system || 'Trilha'}
              </p>
            </>
          )}
        </div>
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-white/20">
          <BookOpen size={22} />
        </div>
      </button>

      <div className="flex flex-wrap gap-3">
        <QuickLink label="Ver trilha prática" onClick={() => onNavigate?.('trilha')} />
        <QuickLink label="Abrir Tutor IA" onClick={() => onNavigate?.('tutor')} />
      </div>
    </div>
  )
}

function QuickLink({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-accent-cyan hover:text-accent-cyan"
    >
      {label}
      <ArrowRight size={12} />
    </button>
  )
}
