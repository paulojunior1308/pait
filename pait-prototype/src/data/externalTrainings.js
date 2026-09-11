/** Treinamentos práticos externos — sincronizados com o chat e a trilha */

export const EXTERNAL_TRAINING_CATALOG = {
  gmail: {
    id: 'gmail',
    howtoId: 'gmail',
    title: 'Criar pastas (marcadores) no Gmail',
    duration: '8 min',
    system: 'Gmail',
    badge: 'prático',
    summary:
      'Tutorial guiado: criar o marcador “Mercado Livre”, pesquisar e-mails e mover conversas para a pasta.',
    activities: [
      { label: 'Abrir a caixa de entrada e localizar Marcadores' },
      { label: 'Criar o marcador Mercado Livre' },
      { label: 'Pesquisar e filtrar e-mails' },
      { label: 'Mover conversas para a pasta' },
    ],
    takeaways: [
      'No Gmail, pasta = marcador',
      'Dá para organizar a caixa sem apagar e-mails',
      'Filtros ajudam a achar mensagens antes de mover',
    ],
  },
  github: {
    id: 'github',
    howtoId: 'github',
    title: 'Criar repositório no GitHub',
    duration: '10 min',
    system: 'GitHub',
    badge: 'prático',
    summary:
      'Tutorial guiado: criar um repositório público (webview), descrição, README e visão do repo criado.',
    activities: [
      { label: 'Acessar o dashboard do GitHub' },
      { label: 'Abrir New repository' },
      { label: 'Definir nome, descrição e visibilidade' },
      { label: 'Criar o repositório com README' },
    ],
    takeaways: [
      'Public vs Private para portfólio',
      'README documenta o projeto desde o início',
      'Depois: git remote add origin + git push',
    ],
  },
  jira: {
    id: 'jira',
    howtoId: 'jira',
    title: 'Abrir chamado no Jira Service Management',
    duration: '7 min',
    system: 'Jira SM',
    badge: 'prático',
    summary:
      'Tutorial guiado no portal do cliente: categoria, solicitação, formulário, notificações e autonomia no fluxo.',
    activities: [
      { label: 'Entrar no portal do cliente' },
      { label: 'Escolher categoria e tipo Solicitação' },
      { label: 'Preencher e enviar o chamado' },
      { label: 'Ver notificações e ações do cliente' },
    ],
    takeaways: [
      'Cliente abre chamado sem ser agente Jira',
      'Admin define campos obrigatórios',
      'Notificação na central + e-mail',
    ],
  },
}

export const TRAINING_IDS = Object.keys(EXTERNAL_TRAINING_CATALOG)

export function createEmptyTrainingProgress() {
  return {
    gmail: { unlocked: false, status: 'pending', completedAt: null, timesCompleted: 0 },
    github: { unlocked: false, status: 'pending', completedAt: null, timesCompleted: 0 },
    jira: { unlocked: false, status: 'pending', completedAt: null, timesCompleted: 0 },
  }
}

/** Progresso real: cada curso concluído = 1/3 (~33%). Em andamento conta metade. */
export function getTrainingStats(progress) {
  const total = TRAINING_IDS.length
  let units = 0
  let done = 0
  let inProgress = 0

  TRAINING_IDS.forEach((id) => {
    const entry = progress[id]
    if (entry?.status === 'done') {
      units += 1
      done += 1
    } else if (entry?.status === 'progress') {
      units += 0.5
      inProgress += 1
    }
  })

  const percent = Math.round((units / total) * 100)
  return { total, done, inProgress, percent, remaining: total - done }
}

export function unlockTraining(progress, id) {
  if (!progress[id]) return progress
  const current = progress[id]
  if (current.status === 'done') {
    return {
      ...progress,
      [id]: { ...current, unlocked: true, status: 'progress' },
    }
  }
  return {
    ...progress,
    [id]: {
      ...current,
      unlocked: true,
      status: 'progress',
    },
  }
}

export function completeTraining(progress, id) {
  if (!progress[id]) return progress
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  return {
    ...progress,
    [id]: {
      unlocked: true,
      status: 'done',
      completedAt: today,
      timesCompleted: (progress[id].timesCompleted || 0) + 1,
    },
  }
}

export function toTrailModule(id, progressEntry) {
  const def = EXTERNAL_TRAINING_CATALOG[id]
  if (!def) return null

  const entry = progressEntry || {
    unlocked: false,
    status: 'pending',
    completedAt: null,
    timesCompleted: 0,
  }
  const status = entry.status || 'pending'
  const activities = def.activities.map((a) => ({
    label: a.label,
    done: status === 'done',
  }))

  return {
    id: `ext-${id}`,
    howtoId: def.howtoId,
    external: true,
    system: def.system,
    title: def.title,
    status,
    duration: def.duration,
    badge:
      status === 'progress'
        ? 'recommended'
        : status === 'done'
          ? 'prático'
          : 'prático',
    progress: status === 'progress' ? 50 : status === 'done' ? 100 : 0,
    completedAt: entry.completedAt,
    score: status === 'done' ? '100%' : null,
    timesCompleted: entry.timesCompleted,
    summary: def.summary,
    activities,
    takeaways: def.takeaways,
  }
}

export function getNextTraining(progress) {
  for (const id of TRAINING_IDS) {
    const s = progress[id]?.status
    if (s === 'progress') return EXTERNAL_TRAINING_CATALOG[id]
  }
  for (const id of TRAINING_IDS) {
    const s = progress[id]?.status
    if (s !== 'done') return EXTERNAL_TRAINING_CATALOG[id]
  }
  return null
}
