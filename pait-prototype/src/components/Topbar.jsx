const screenMeta = {
  inicio: {
    title: 'Início',
    subtitle: 'Dashboard de aprendizado e pilares do seu onboarding',
  },
  tutor: {
    title: 'Tutor IA',
    subtitle: 'Seu assistente de onboarding com respostas baseadas na documentação interna',
  },
  trilha: {
    title: 'Trilha de Aprendizado',
    subtitle: 'Módulos adaptados ao seu perfil, squad e ritmo de aprendizado',
  },
  progresso: {
    title: 'Meu Progresso',
    subtitle: 'Acompanhe a evolução real nos treinamentos Gmail, GitHub e Jira',
  },
  rh: {
    title: 'Painel RH',
    subtitle: 'Visão consolidada de onboarding, ramp-up e uso do PAIT na organização',
  },
  gmail: {
    title: 'Tutorial externo — Gmail',
    subtitle: 'Simulação guiada: criar marcadores (pastas) e organizar e-mails',
  },
  github: {
    title: 'Tutorial externo — GitHub',
    subtitle: 'Simulação guiada: criar um repositório público com README',
  },
  jira: {
    title: 'Tutorial externo — Jira Service Management',
    subtitle: 'Simulação guiada: abrir solicitação no portal do cliente',
  },
}

export default function Topbar({ activeScreen }) {
  const meta = screenMeta[activeScreen]

  return (
    <header className="flex items-start justify-between gap-6 border-b border-border bg-white px-8 py-5">
      <div>
        <h1 className="font-sora text-2xl font-700 text-ink">{meta.title}</h1>
        <p className="mt-1 text-sm text-ink-muted">{meta.subtitle}</p>
      </div>
      <span
        data-tour="tour-badge"
        className="shrink-0 rounded-full bg-[#EFF6FF] px-3.5 py-1.5 text-xs font-semibold text-accent-blue"
      >
        {activeScreen === 'gmail' || activeScreen === 'github' || activeScreen === 'jira'
          ? 'Tutorial externo com mascote PAIT'
          : 'Respostas com rastreabilidade de fonte'}
      </span>
    </header>
  )
}
