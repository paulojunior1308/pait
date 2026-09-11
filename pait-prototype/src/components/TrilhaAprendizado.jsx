import { useState, useEffect } from 'react'
import {
  CheckCircle2,
  Circle,
  Clock,
  X,
  Calendar,
  Award,
  BookOpen,
  PlayCircle,
  ChevronRight,
  RotateCcw,
} from 'lucide-react'

function StatusIcon({ status }) {
  if (status === 'done') {
    return <CheckCircle2 className="h-6 w-6 text-success" />
  }
  return <Circle className="h-6 w-6 text-accent-blue" strokeWidth={2.5} />
}

function statusLabel(status) {
  if (status === 'done') return 'Concluído'
  if (status === 'progress') return 'Em andamento'
  return 'Pendente'
}

export default function TrilhaAprendizado({
  externalModules = [],
  onStartHowTo,
  progressPercent = 0,
  completedCount = 0,
  totalCount = 3,
}) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-6 px-8 py-6">
      <div
        data-tour="howto-trilha-banner"
        className="flex items-center justify-between gap-8 rounded-2xl bg-gradient-to-r from-navy to-navy-secondary px-7 py-6 text-white shadow-sm"
      >
        <div>
          <h2 className="font-sora text-xl font-700">
            Trilha prática — Sistemas do dia a dia
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-white/70">
            3 treinamentos guiados: Gmail, GitHub e Jira Service Management. Peça ajuda no Tutor ou
            inicie por aqui — depois você pode refazer.
          </p>
          <p className="mt-3 text-xs text-white/55">
            {completedCount} de {totalCount} cursos concluídos
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-sora text-4xl font-800 tracking-tight">{progressPercent}%</p>
          <p className="mt-0.5 text-sm text-white/60">concluído</p>
        </div>
      </div>

      <section className="space-y-3">
        {externalModules.map((mod) => (
          <ModuleCard
            key={mod.id}
            mod={mod}
            selected={selected?.id === mod.id}
            onClick={() => setSelected(mod)}
          />
        ))}
      </section>

      {selected && (
        <ModuleDetail
          mod={selected}
          onClose={() => setSelected(null)}
          onStartHowTo={onStartHowTo}
        />
      )}
    </div>
  )
}

function ModuleCard({ mod, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border border-border border-l-4 border-l-accent-cyan bg-white px-5 py-4 text-left shadow-sm transition-all hover:border-accent-cyan/40 hover:shadow-md ${
        selected ? 'ring-2 ring-accent-cyan/30' : ''
      }`}
    >
      <StatusIcon status={mod.status} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-sora text-sm font-600 text-ink">{mod.title}</h3>
          <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold text-white">
            {mod.system}
          </span>
          {mod.status === 'progress' && (
            <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-semibold text-accent-blue">
              Em andamento
            </span>
          )}
          {mod.status === 'pending' && (
            <span className="rounded-full bg-[#ECFEFF] px-2.5 py-0.5 text-[11px] font-semibold text-accent-cyan">
              Pendente
            </span>
          )}
          {mod.status === 'done' && (
            <span className="rounded-full bg-[#ECFDF3] px-2.5 py-0.5 text-[11px] font-semibold text-success">
              Refazer treinamento
            </span>
          )}
        </div>

        {mod.status === 'progress' && (
          <div className="mt-2.5 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E4E7EC]">
              <div
                className="bg-gradient-accent h-full rounded-full transition-all"
                style={{ width: `${mod.progress || 50}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-ink-muted">{mod.progress || 50}%</span>
          </div>
        )}

        {mod.timesCompleted > 1 && (
          <p className="mt-1 text-xs text-ink-muted">Concluído {mod.timesCompleted}x</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3 text-xs text-ink-muted">
        <span className="flex items-center gap-1.5">
          <Clock size={14} />
          {mod.duration}
        </span>
        <ChevronRight size={16} />
      </div>
    </button>
  )
}

function ModuleDetail({ mod, onClose, onStartHowTo }) {
  useEffect(() => {}, [mod.id])

  const launchExternal = () => {
    if (!mod.howtoId || !onStartHowTo) return
    onClose()
    onStartHowTo(mod.howtoId)
  }

  const doneCount = mod.activities.filter((a) => a.done).length

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-navy/40"
        aria-label="Fechar"
        onClick={onClose}
      />
      <aside className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-[bubble-rise_0.35s_ease-out]">
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div className="pr-4">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <StatusIcon status={mod.status} />
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  mod.status === 'done'
                    ? 'bg-[#ECFDF3] text-success'
                    : 'bg-[#EFF6FF] text-accent-blue'
                }`}
              >
                {statusLabel(mod.status)}
              </span>
              <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold text-white">
                {mod.system}
              </span>
            </div>
            <h2 className="font-sora text-lg font-700 text-ink">{mod.title}</h2>
            <p className="mt-1 text-sm text-ink-muted">{mod.summary}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-ink-muted hover:bg-surface hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {mod.status === 'done' && (
            <div className="grid grid-cols-2 gap-3">
              <MetaCard icon={Calendar} label="Concluído em" value={mod.completedAt} />
              <MetaCard icon={Award} label="Aproveitamento" value={mod.score} />
            </div>
          )}

          {mod.status === 'progress' && (
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">Progresso do treinamento</span>
                <span className="font-semibold text-accent-blue">{mod.progress}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#E4E7EC]">
                <div
                  className="bg-gradient-accent h-full rounded-full"
                  style={{ width: `${mod.progress}%` }}
                />
              </div>
            </div>
          )}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-sora text-sm font-700 text-ink">
                <BookOpen size={16} className="text-accent-blue" />
                {mod.status === 'done' ? 'O que você fez' : 'Passos do treinamento'}
              </h3>
              <span className="text-xs text-ink-muted">
                {doneCount}/{mod.activities.length}
              </span>
            </div>
            <ul className="space-y-2">
              {mod.activities.map((act) => (
                <li
                  key={act.label}
                  className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 text-sm ${
                    act.done
                      ? 'border-[#A6F4C5] bg-[#ECFDF3] text-ink'
                      : 'border-border bg-white text-ink-muted'
                  }`}
                >
                  {act.done ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-[#D0D5DD]" />
                  )}
                  <span>{act.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-sora text-sm font-700 text-ink">
              {mod.status === 'done' ? 'Principais aprendizados' : 'O que você vai aprender'}
            </h3>
            <ul className="space-y-2">
              {mod.takeaways.map((t) => (
                <li
                  key={t}
                  className="flex gap-2 rounded-lg bg-surface px-3 py-2 text-sm text-ink"
                >
                  <span className="text-accent-cyan">•</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border px-6 py-4">
          {mod.status === 'pending' && (
            <button
              type="button"
              onClick={launchExternal}
              className="bg-gradient-accent flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              <PlayCircle size={16} />
              Iniciar treinamento guiado
            </button>
          )}

          {mod.status === 'progress' && (
            <button
              type="button"
              onClick={launchExternal}
              className="bg-gradient-accent flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              <PlayCircle size={16} />
              Continuar tutorial guiado
            </button>
          )}

          {mod.status === 'done' && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-ink hover:bg-surface"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={launchExternal}
                className="bg-gradient-accent flex flex-[1.4] items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-sm"
              >
                <RotateCcw size={16} />
                Refazer treinamento
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

function MetaCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-3">
      <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink-muted">
        <Icon size={12} />
        {label}
      </p>
      <p className="mt-1 font-sora text-sm font-700 text-ink">{value}</p>
    </div>
  )
}
