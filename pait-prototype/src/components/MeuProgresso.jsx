import { AlertTriangle, Play, Lightbulb } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const metrics = [
  {
    label: 'Dia de onboarding',
    value: '3',
    hint: 'de ~21 dias estimados',
    hintClass: 'text-ink-muted',
    tourId: 'howto-metric-day',
  },
  {
    label: 'Trilha concluída',
    value: '68%',
    hint: 'acima da média da squad (52%)',
    hintClass: 'text-success',
    tourId: 'howto-metric-trilha',
  },
  {
    label: 'Tempo de ramp-up projetado',
    value: '21 dias',
    hint: 'média histórica: 34 dias',
    hintClass: 'text-success',
  },
]

const gaps = [
  { topic: 'Arquitetura de microsserviços', count: 4 },
  { topic: 'Processo de deploy (CI/CD)', count: 2 },
  { topic: 'Padrões de nomenclatura de PR', count: 1 },
]

const maxCount = Math.max(...gaps.map((g) => g.count))

const technicalData = [
  { name: 'done', value: 72 },
  { name: 'rest', value: 28 },
]
const culturalData = [
  { name: 'done', value: 58 },
  { name: 'rest', value: 42 },
]

const skills = ['TEC', 'SKA', 'PRG', 'RH', 'CI']

const nextSteps = [
  {
    title: 'Cenário Prático: Gestão de Incidentes',
    type: 'Cenário',
    accent: 'bg-[#EFF6FF]',
  },
  {
    title: 'Vídeo: Ciclo de Deploy',
    type: 'Vídeo',
    accent: 'bg-[#ECFEFF]',
    play: true,
  },
]

function Donut({ data, label, percent, color }) {
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

export default function MeuProgresso() {
  return (
    <div className="space-y-6 px-8 py-6">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            data-tour={m.tourId}
            className="rounded-2xl border border-border bg-white px-5 py-5 shadow-sm"
          >
            <p className="text-sm font-medium text-ink-muted">{m.label}</p>
            <p className="mt-2 font-sora text-3xl font-800 text-ink">{m.value}</p>
            <p className={`mt-1.5 text-xs font-medium ${m.hintClass}`}>{m.hint}</p>
          </div>
        ))}
      </div>

      {/* Analytics from mobile prototype */}
      <div className="rounded-2xl border border-border bg-white px-6 py-5 shadow-sm">
        <h2 className="font-sora text-base font-700 text-ink">Evolução de competências</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Visão técnica e cultural do seu onboarding — adaptada do protótipo mobile
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-12">
          <Donut data={technicalData} label="Technical" percent={72} color="#3B82F6" />
          <Donut data={culturalData} label="Cultural" percent={58} color="#22B8CF" />
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold text-ink">Skills adquiridas</p>
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <div
                key={s}
                className="bg-gradient-accent flex h-14 w-14 items-center justify-center rounded-xl font-sora text-xs font-800 text-white shadow-sm"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
            <Lightbulb size={16} className="text-accent-blue" />
            Próximos passos recomendados pela IA
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {nextSteps.map((step) => (
              <div
                key={step.title}
                className={`flex items-center gap-4 rounded-xl border border-border ${step.accent} px-4 py-3`}
              >
                <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-navy/80 text-white">
                  {step.play ? <Play size={22} fill="white" /> : <span className="text-[10px] font-bold">CASE</span>}
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                    {step.type}
                  </p>
                  <p className="text-sm font-semibold text-ink">{step.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        data-tour="howto-gaps"
        className="rounded-2xl border border-border bg-white px-6 py-5 shadow-sm"
      >
        <div className="mb-1 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h2 className="font-sora text-base font-700 text-ink">
            Lacunas de conhecimento identificadas pela IA
          </h2>
        </div>
        <p className="mb-5 text-sm text-ink-muted">
          Baseado nos temas mais recorrentes nas suas perguntas nos últimos 7 dias
        </p>

        <div className="space-y-4">
          {gaps.map((gap) => (
            <div key={gap.topic}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{gap.topic}</span>
                <span className="text-ink-muted">
                  {gap.count} {gap.count === 1 ? 'pergunta' : 'perguntas'}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#FEF0C7]">
                <div
                  className="h-full rounded-full bg-warning transition-all"
                  style={{ width: `${(gap.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
