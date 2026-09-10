import {
  Shield,
  MessageCircleQuestion,
  Users,
  Network,
  Clock,
  BookOpen,
  ArrowRight,
} from 'lucide-react'

const pillars = [
  {
    id: 'compliance',
    label: 'Compliance',
    desc: 'Políticas, LGPD e segurança',
    icon: Shield,
    color: 'bg-[#EFF6FF] text-accent-blue',
  },
  {
    id: 'clarification',
    label: 'Clarification',
    desc: 'Tire dúvidas com o Tutor IA',
    icon: MessageCircleQuestion,
    color: 'bg-[#ECFEFF] text-accent-cyan',
  },
  {
    id: 'culture',
    label: 'Culture',
    desc: 'Valores e rituais da squad',
    icon: Users,
    color: 'bg-[#F5F3FF] text-[#7C3AED]',
  },
  {
    id: 'connection',
    label: 'Connection',
    desc: 'Buddy, canais e rede interna',
    icon: Network,
    color: 'bg-[#ECFDF3] text-success',
  },
]

export default function InicioDashboard({ onNavigate }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div className="space-y-6 px-8 py-6">
      <div>
        <p className="text-sm text-ink-muted">{greeting}, Lucas</p>
        <h2 className="mt-1 font-sora text-xl font-700 text-ink">Dashboard de Aprendizado</h2>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-border bg-white px-6 py-5 shadow-sm">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="font-sora text-base font-700 text-ink">Onboarding em andamento</p>
            <p className="mt-0.5 text-sm text-ink-muted">45% do onboarding concluído</p>
          </div>
          <span className="font-sora text-3xl font-800 text-accent-blue">45%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-[#E4E7EC]">
          <div className="bg-gradient-accent h-full w-[45%] rounded-full" />
        </div>
      </div>

      {/* Continue reading */}
      <button
        type="button"
        onClick={() => onNavigate?.('trilha')}
        className="group relative flex w-full items-center overflow-hidden rounded-2xl bg-gradient-to-r from-navy to-navy-secondary px-6 py-5 text-left text-white shadow-sm"
      >
        <div className="relative z-10 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-white/60">Continue lendo</p>
          <p className="mt-1 font-sora text-lg font-700">Manual de Ambientes</p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
            <Clock size={12} />
            2 min de leitura
          </p>
        </div>
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-white/20">
          <BookOpen size={22} />
        </div>
      </button>

      {/* 4Cs */}
      <div>
        <p className="mb-3 text-sm font-semibold text-ink">Pilares do onboarding</p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {pillars.map(({ id, label, desc, icon: Icon, color }) => (
            <button
              key={id}
              type="button"
              onClick={() =>
                onNavigate?.(id === 'clarification' ? 'tutor' : id === 'compliance' ? 'trilha' : 'trilha')
              }
              className="rounded-2xl border border-border bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                <Icon size={22} />
              </div>
              <p className="font-sora text-sm font-700 text-ink">{label}</p>
              <p className="mt-1 text-xs text-ink-muted">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-3">
        <QuickLink label="Abrir Tutor IA" onClick={() => onNavigate?.('tutor')} />
        <QuickLink label="Ver minha trilha" onClick={() => onNavigate?.('trilha')} />
        <QuickLink label="Analytics de evolução" onClick={() => onNavigate?.('progresso')} />
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
