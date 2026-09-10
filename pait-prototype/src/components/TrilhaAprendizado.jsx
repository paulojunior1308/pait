import { useState } from 'react'
import {
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  X,
  Calendar,
  Award,
  BookOpen,
  PlayCircle,
  ChevronRight,
} from 'lucide-react'

const modules = [
  {
    id: 1,
    title: 'Onboarding Cultural & Compliance',
    status: 'done',
    duration: '45 min',
    tourId: 'howto-mod-done',
    completedAt: '01 set 2026',
    score: '100%',
    summary:
      'Você concluiu a introdução à cultura da empresa, código de conduta e políticas básicas de compliance.',
    activities: [
      { label: 'Vídeo: Cultura e valores PAIT Corp', done: true },
      { label: 'Leitura: Código de Conduta v2.1', done: true },
      { label: 'Quiz de compliance (8/8)', done: true },
      { label: 'Aceite digital das políticas', done: true },
    ],
    takeaways: [
      'Canal confidencial para denúncias',
      'Regras de uso de dados e dispositivos',
      'Expectativas de comunicação na squad',
    ],
  },
  {
    id: 2,
    title: 'Setup do Ambiente de Desenvolvimento',
    status: 'done',
    duration: '1h30',
    completedAt: '02 set 2026',
    score: '100%',
    summary:
      'Ambiente local configurado com as ferramentas padrão da squad de Pagamentos.',
    activities: [
      { label: 'Instalação do Git e Node LTS', done: true },
      { label: 'Clone do repositório payments-core', done: true },
      { label: 'Configuração de .env e VPN', done: true },
      { label: 'Primeiro run local validado pelo buddy', done: true },
    ],
    takeaways: [
      'Checklist de setup no Confluence',
      'Credenciais via cofre interno',
      'Padrão de branches da squad',
    ],
  },
  {
    id: 3,
    title: 'Ferramentas do Time (Jira, Slack, Git)',
    status: 'done',
    duration: '40 min',
    completedAt: '02 set 2026',
    score: '95%',
    summary:
      'Você aprendeu o fluxo diário de comunicação, cards e versionamento usados pela squad.',
    activities: [
      { label: 'Canais Slack da squad e do capítulo', done: true },
      { label: 'Criar e mover cards no Jira', done: true },
      { label: 'Convenção de commits e PRs', done: true },
      { label: 'Exercício: abrir PR de exemplo', done: true },
    ],
    takeaways: [
      'Prefixo de branch: feature/PAY-xxx',
      'Revisor obrigatório antes do merge',
      'Stand-up e docs no #squad-pagamentos',
    ],
  },
  {
    id: 4,
    title: 'Arquitetura de Sistemas Internos',
    status: 'progress',
    progress: 60,
    duration: '2h',
    badge: 'recommended',
    tourId: 'howto-mod-arch',
    summary:
      'Visão dos microsserviços de pagamentos, filas e contratos entre APIs.',
    activities: [
      { label: 'Mapa de serviços (diagrama C4)', done: true },
      { label: 'Fluxo de autorização e cobrança', done: true },
      { label: 'Contratos de API e versionamento', done: true },
      { label: 'Laboratório: rastrear uma transação', done: false },
      { label: 'Quiz de arquitetura', done: false },
    ],
    takeaways: [
      'Próximo: lab de rastreamento end-to-end',
      'Documentação no Manual de Arquitetura v4',
    ],
  },
  {
    id: 5,
    title: 'Processo de Deploy (CI/CD)',
    status: 'progress',
    progress: 40,
    duration: '1h15',
    tourId: 'howto-mod-deploy',
    summary:
      'Pipeline de PR → CI → homologação automática → validação em staging.',
    activities: [
      { label: 'Visão geral do pipeline', done: true },
      { label: 'Checks de lint e testes', done: true },
      { label: 'Deploy para homologação', done: false },
      { label: 'Checklist pré-produção', done: false },
    ],
    takeaways: [
      'Merge em develop dispara staging',
      'Validar URL de homolog antes de prod',
    ],
  },
  {
    id: 6,
    title: 'LGPD e Proteção de Dados para Devs',
    status: 'pending',
    duration: '50 min',
    badge: 'priority',
    tourId: 'howto-mod-lgpd',
    summary:
      'Boas práticas de privacidade no código, logs e migrations — prioridade alta para a squad.',
    activities: [
      { label: 'Princípios da LGPD para engenharia', done: false },
      { label: 'PII em logs e mascaramento', done: false },
      { label: 'Review de Compliance em migrations', done: false },
    ],
    takeaways: ['Ainda não iniciado — estimado em 50 min'],
  },
  {
    id: 7,
    title: 'Boas Práticas de Código & Segurança',
    status: 'locked',
    duration: '1h45',
    requires: 'Arquitetura de Sistemas Internos',
    tourId: 'howto-mod-locked',
    summary:
      'Padrões de código seguro, secrets e revisão de vulnerabilidades.',
    activities: [
      { label: 'OWASP top risks no contexto interno', done: false },
      { label: 'Gestão de secrets e least privilege', done: false },
      { label: 'Code review com checklist de segurança', done: false },
    ],
    takeaways: ['Desbloqueia ao concluir Arquitetura de Sistemas Internos'],
  },
]

function StatusIcon({ status }) {
  if (status === 'done') {
    return <CheckCircle2 className="h-6 w-6 text-success" />
  }
  if (status === 'progress' || status === 'pending') {
    return <Circle className="h-6 w-6 text-accent-blue" strokeWidth={2.5} />
  }
  return <Lock className="h-6 w-6 text-[#98A2B3]" />
}

function statusLabel(status) {
  if (status === 'done') return 'Concluído'
  if (status === 'progress') return 'Em andamento'
  if (status === 'pending') return 'Pendente'
  return 'Bloqueado'
}

export default function TrilhaAprendizado() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-6 px-8 py-6">
      <div
        data-tour="howto-trilha-banner"
        className="flex items-center justify-between gap-8 rounded-2xl bg-gradient-to-r from-navy to-navy-secondary px-7 py-6 text-white shadow-sm"
      >
        <div>
          <h2 className="font-sora text-xl font-700">
            Trilha personalizada — Desenvolvedor de Software
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-white/70">
            Adaptada por perfil, senioridade e squad. Clique em um módulo para ver o conteúdo e o
            que você já fez.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-sora text-4xl font-800 tracking-tight">68%</p>
          <p className="mt-0.5 text-sm text-white/60">concluído</p>
        </div>
      </div>

      <div className="space-y-3">
        {modules.map((mod) => (
          <button
            key={mod.id}
            type="button"
            data-tour={mod.tourId}
            onClick={() => setSelected(mod)}
            className={`flex w-full items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 text-left shadow-sm transition-all hover:border-accent-cyan/40 hover:shadow-md ${
              mod.status === 'locked' ? 'opacity-70' : ''
            } ${selected?.id === mod.id ? 'ring-2 ring-accent-cyan/30' : ''}`}
          >
            <StatusIcon status={mod.status} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-sora text-sm font-600 text-ink">{mod.title}</h3>
                {mod.badge === 'recommended' && (
                  <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-semibold text-accent-blue">
                    Recomendado agora
                  </span>
                )}
                {mod.badge === 'priority' && (
                  <span className="rounded-full bg-[#FFFAEB] px-2.5 py-0.5 text-[11px] font-semibold text-warning">
                    Prioridade alta
                  </span>
                )}
                {mod.status === 'done' && (
                  <span className="rounded-full bg-[#ECFDF3] px-2.5 py-0.5 text-[11px] font-semibold text-success">
                    Ver o que fiz
                  </span>
                )}
              </div>

              {mod.status === 'progress' && (
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E4E7EC]">
                    <div
                      className="bg-gradient-accent h-full rounded-full transition-all"
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-ink-muted">{mod.progress}%</span>
                </div>
              )}

              {mod.status === 'locked' && (
                <p className="mt-1 text-xs text-ink-muted">Requer: {mod.requires}</p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-3 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {mod.duration}
              </span>
              <ChevronRight size={16} className="text-ink-muted" />
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <ModuleDetail mod={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

function ModuleDetail({ mod, onClose }) {
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
                    : mod.status === 'locked'
                      ? 'bg-[#F2F4F7] text-ink-muted'
                      : 'bg-[#EFF6FF] text-accent-blue'
                }`}
              >
                {statusLabel(mod.status)}
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
                <span className="font-medium text-ink">Progresso do módulo</span>
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

          {mod.status === 'locked' && (
            <div className="rounded-xl border border-[#E4E7EC] bg-surface px-4 py-3 text-sm text-ink-muted">
              Este módulo está bloqueado. Conclua <strong className="text-ink">{mod.requires}</strong>{' '}
              para liberar o conteúdo.
            </div>
          )}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-sora text-sm font-700 text-ink">
                <BookOpen size={16} className="text-accent-blue" />
                {mod.status === 'done' ? 'O que você fez' : 'Atividades do módulo'}
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
              {mod.status === 'done' ? 'Principais aprendizados' : 'Destaques'}
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
          {mod.status === 'done' ? (
            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-ink hover:bg-surface"
            >
              Fechar revisão
            </button>
          ) : mod.status === 'locked' ? (
            <button
              type="button"
              disabled
              className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#F2F4F7] py-2.5 text-sm font-semibold text-ink-muted"
            >
              <Lock size={16} />
              Módulo bloqueado
            </button>
          ) : (
            <button
              type="button"
              className="bg-gradient-accent flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              <PlayCircle size={16} />
              {mod.status === 'pending' ? 'Iniciar módulo' : 'Continuar de onde parei'}
            </button>
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
