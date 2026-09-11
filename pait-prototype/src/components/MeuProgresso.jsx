import { CheckCircle2, Circle, Clock, Lightbulb, ArrowRight } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { EXTERNAL_TRAINING_CATALOG, TRAINING_IDS } from '../data/externalTrainings'

function Donut({ percent, label, color }) {
  const data = [
    { name: 'done', value: Math.max(percent, 0) },
    { name: 'rest', value: Math.max(100 - percent, 0.01) },
  ]
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={58}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="#E4E7EC" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-sora text-xl font-800 text-ink">{percent}%</span>
        </div>
      </div>
      <p className="mt-1 text-sm font-semibold text-ink">{label}</p>
    </div>
  )
}

function statusMeta(status) {
  if (status === 'done') {
    return { label: 'Concluído', className: 'bg-[#ECFDF3] text-success', Icon: CheckCircle2 }
  }
  if (status === 'progress') {
    return { label: 'Em andamento', className: 'bg-[#EFF6FF] text-accent-blue', Icon: Circle }
  }
  return { label: 'Pendente', className: 'bg-[#F2F4F7] text-ink-muted', Icon: Circle }
}

export default function MeuProgresso({
  trainingProgress,
  trainingStats,
  nextTraining,
  onNavigate,
}) {
  const { percent = 0, done = 0, inProgress = 0, total = 3, remaining = 3 } = trainingStats || {}

  const courseRows = TRAINING_IDS.map((id) => {
    const def = EXTERNAL_TRAINING_CATALOG[id]
    const entry = trainingProgress?.[id] || { status: 'pending', timesCompleted: 0 }
    return {
      id,
      title: def.title,
      system: def.system,
      duration: def.duration,
      status: entry.status,
      timesCompleted: entry.timesCompleted || 0,
      completedAt: entry.completedAt,
      bar:
        entry.status === 'done' ? 100 : entry.status === 'progress' ? 50 : 0,
    }
  })

  const pendingCourses = courseRows.filter((c) => c.status !== 'done')

  return (
    <div className="space-y-6 px-8 py-6">
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          label="Trilha prática"
          value={`${percent}%`}
          hint={`${done} de ${total} treinamentos concluídos`}
          hintClass={done === total ? 'text-success' : 'text-ink-muted'}
        />
        <MetricCard
          label="Em andamento"
          value={String(inProgress)}
          hint={inProgress === 1 ? 'treinamento ativo' : 'treinamentos ativos'}
          hintClass="text-accent-blue"
        />
        <MetricCard
          label="Restantes"
          value={String(remaining)}
          hint={remaining === 0 ? 'tudo concluído' : 'ainda na fila'}
          hintClass={remaining === 0 ? 'text-success' : 'text-ink-muted'}
        />
      </div>

      <div className="rounded-2xl border border-border bg-white px-6 py-5 shadow-sm">
        <h2 className="font-sora text-base font-700 text-ink">Evolução da trilha prática</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Progresso real nos 3 treinamentos: Gmail, GitHub e Jira Service Management
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
          <Donut percent={percent} label="Geral" color="#3B82F6" />
          <Donut
            percent={Math.round((done / total) * 100)}
            label="Concluídos"
            color="#22B8CF"
          />
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-sm font-semibold text-ink">Status por treinamento</p>
          {courseRows.map((course) => {
            const meta = statusMeta(course.status)
            const Icon = meta.Icon
            return (
              <div key={course.id}>
                <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-ink">{course.title}</span>
                    <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold text-white">
                      {course.system}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta.className}`}>
                      <span className="inline-flex items-center gap-1">
                        <Icon size={10} />
                        {meta.label}
                      </span>
                    </span>
                  </div>
                  <span className="text-xs text-ink-muted">
                    {course.status === 'done' && course.completedAt
                      ? `Em ${course.completedAt}`
                      : course.duration}
                    {course.timesCompleted > 1 ? ` · ${course.timesCompleted}x` : ''}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#E4E7EC]">
                  <div
                    className="bg-gradient-accent h-full rounded-full transition-all"
                    style={{ width: `${course.bar}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white px-6 py-5 shadow-sm">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
          <Lightbulb size={16} className="text-accent-blue" />
          Próximos passos recomendados
        </p>

        {pendingCourses.length === 0 ? (
          <div className="rounded-xl border border-[#A6F4C5] bg-[#ECFDF3] px-4 py-3 text-sm text-ink">
            <p className="font-semibold text-success">Trilha prática 100% concluída</p>
            <p className="mt-1 text-ink-muted">
              Você pode refazer qualquer treinamento na Trilha de Aprendizado.
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.('trilha')}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan hover:underline"
            >
              Ir para a trilha <ArrowRight size={12} />
            </button>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {pendingCourses.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => onNavigate?.('trilha')}
                className="flex items-center gap-4 rounded-xl border border-border bg-[#ECFEFF]/50 px-4 py-3 text-left transition-colors hover:border-accent-cyan"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy text-[10px] font-bold text-white">
                  {course.system.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                    {course.status === 'progress' ? 'Continuar' : 'Iniciar'}
                  </p>
                  <p className="truncate text-sm font-semibold text-ink">{course.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-muted">
                    <Clock size={11} />
                    {course.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {nextTraining && pendingCourses.length > 0 && (
          <p className="mt-4 text-xs text-ink-muted">
            Sugestão imediata: <strong className="text-ink">{nextTraining.title}</strong>
          </p>
        )}
      </div>
    </div>
  )
}

function MetricCard({ label, value, hint, hintClass }) {
  return (
    <div className="rounded-2xl border border-border bg-white px-5 py-5 shadow-sm">
      <p className="text-sm font-medium text-ink-muted">{label}</p>
      <p className="mt-2 font-sora text-3xl font-800 text-ink">{value}</p>
      <p className={`mt-1.5 text-xs font-medium ${hintClass}`}>{hint}</p>
    </div>
  )
}
