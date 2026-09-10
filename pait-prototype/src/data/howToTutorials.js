/** Tutoriais guiados disparados pelo chat do Tutor IA */

export const HOW_TO_TUTORIALS = {
  deploy: {
    id: 'deploy',
    label: 'Deploy para homologação',
    chatReply:
      'Boa pergunta! Vou te mostrar na tela, passo a passo, como funciona o deploy para homologação por aqui. Siga o PAIT — ele vai destacar cada ponto.',
    steps: [
      {
        target: 'tour-nav-trilha',
        title: 'Passo 1 — Abra a Trilha',
        text: 'O processo de deploy está no módulo da sua trilha. Clique em Trilha de Aprendizado para acompanhar o conteúdo oficial.',
        placement: 'right',
        screen: 'trilha',
      },
      {
        target: 'howto-mod-deploy',
        title: 'Passo 2 — Módulo de Deploy',
        text: 'Este é o módulo Processo de Deploy (CI/CD). Ele está 40% concluído — é exatamente o que você precisa antes da primeira PR.',
        placement: 'bottom',
        screen: 'trilha',
      },
      {
        target: 'howto-mod-arch',
        title: 'Passo 3 — Contexto da arquitetura',
        text: 'Antes ou em paralelo, vale avançar em Arquitetura de Sistemas Internos (60%). Entender os serviços evita erros no deploy.',
        placement: 'bottom',
        screen: 'trilha',
      },
      {
        target: 'tour-nav-tutor',
        title: 'Passo 4 — O fluxo em 4 etapas',
        text: '1) Abra um PR na branch develop com o card do Jira. 2) Aguarde 1 revisor + CI. 3) Após o merge, o deploy de homologação roda sozinho. 4) Valide no staging.',
        placement: 'right',
        screen: 'tutor',
      },
      {
        target: 'tour-chat-input',
        title: 'Pronto!',
        text: 'Se travar em algum check de CI ou na URL de staging, é só me perguntar aqui. Quer que eu abra o checklist de LGPD também?',
        placement: 'top',
        screen: 'tutor',
      },
    ],
  },

  trilha: {
    id: 'trilha',
    label: 'Usar a Trilha de Aprendizado',
    chatReply:
      'Vou te guiar pela Trilha de Aprendizado. O PAIT vai aparecer em cada módulo e explicar o que fazer.',
    steps: [
      {
        target: 'tour-nav-trilha',
        title: 'Abra a Trilha',
        text: 'Aqui fica sua jornada personalizada. Ela se adapta ao seu perfil, squad e às dúvidas que você me faz no chat.',
        placement: 'right',
        screen: 'trilha',
      },
      {
        target: 'howto-trilha-banner',
        title: 'Seu progresso geral',
        text: 'Este banner mostra que você já concluiu 68% da trilha de Desenvolvedor de Software. A ordem dos módulos pode mudar conforme suas perguntas.',
        placement: 'bottom',
        screen: 'trilha',
      },
      {
        target: 'howto-mod-arch',
        title: 'O que fazer agora',
        text: 'Módulos com o badge “Recomendado agora” são sua prioridade. Este de Arquitetura está em andamento — continue por aqui.',
        placement: 'bottom',
        screen: 'trilha',
      },
      {
        target: 'howto-mod-lgpd',
        title: 'Prioridade alta',
        text: 'LGPD está marcada como prioridade alta. Mesmo pendente, vale colocar na fila logo após o módulo atual.',
        placement: 'bottom',
        screen: 'trilha',
      },
      {
        target: 'howto-mod-locked',
        title: 'Módulos bloqueados',
        text: 'Itens com cadeado pedem um pré-requisito. Conclua Arquitetura de Sistemas Internos para liberar Boas Práticas de Código.',
        placement: 'top',
        screen: 'trilha',
      },
    ],
  },

  progresso: {
    id: 'progresso',
    label: 'Acompanhar meu progresso',
    chatReply:
      'Vou te mostrar como ler seu painel de progresso e as lacunas que eu identifiquem nas suas perguntas.',
    steps: [
      {
        target: 'tour-nav-progresso',
        title: 'Meu Progresso',
        text: 'Este menu concentra métricas do seu onboarding e o mapa de lacunas de conhecimento.',
        placement: 'right',
        screen: 'progresso',
      },
      {
        target: 'howto-metric-day',
        title: 'Dia de onboarding',
        text: 'Você está no dia 3 de ~21 dias estimados. Isso é o ritmo projetado para a squad de Pagamentos.',
        placement: 'bottom',
        screen: 'progresso',
      },
      {
        target: 'howto-metric-trilha',
        title: 'Trilha vs. média',
        text: '68% concluído — acima da média da squad (52%). Bom sinal de aceleração no ramp-up.',
        placement: 'bottom',
        screen: 'progresso',
      },
      {
        target: 'howto-gaps',
        title: 'Lacunas identificadas',
        text: 'Eu analiso suas perguntas dos últimos 7 dias. Microsserviços, deploy e nomenclatura de PR são os temas que mais aparecem — e entram na trilha.',
        placement: 'top',
        screen: 'progresso',
      },
    ],
  },

  lgpd: {
    id: 'lgpd',
    label: 'Checklist LGPD para deploy',
    chatReply:
      'Tema sensível — vou te guiar pelo checklist de LGPD e onde isso aparece na sua trilha.',
    steps: [
      {
        target: 'tour-nav-trilha',
        title: 'Módulo de LGPD',
        text: 'Proteção de dados para devs faz parte da trilha. Vamos até lá.',
        placement: 'right',
        screen: 'trilha',
      },
      {
        target: 'howto-mod-lgpd',
        title: 'LGPD na trilha',
        text: 'Este módulo tem prioridade alta (50 min). Ele cobre o que a squad espera antes de qualquer deploy com dados.',
        placement: 'bottom',
        screen: 'trilha',
      },
      {
        target: 'howto-mod-deploy',
        title: 'No momento do deploy',
        text: 'Checklist rápido: (1) sem PII em logs, (2) migrations com PII passam por Compliance, (3) menor privilégio nas credenciais de staging.',
        placement: 'bottom',
        screen: 'trilha',
      },
      {
        target: 'tour-chat-input',
        title: 'Compliance avisado',
        text: 'Quando o tema envolve dados sensíveis, eu notifico o Compliance automaticamente. Qualquer dúvida fina, pergunta aqui no chat.',
        placement: 'top',
        screen: 'tutor',
      },
    ],
  },

  modulo: {
    id: 'modulo',
    label: 'Marcar módulo como concluído',
    chatReply:
      'Vou te mostrar onde a trilha registra a conclusão e o que acontece depois que um módulo é marcado.',
    steps: [
      {
        target: 'tour-nav-trilha',
        title: 'Vá até a Trilha',
        text: 'A conclusão dos módulos aparece aqui, com check verde nos itens finalizados.',
        placement: 'right',
        screen: 'trilha',
      },
      {
        target: 'howto-mod-done',
        title: 'Módulos concluídos',
        text: 'Estes já estão com check verde (Cultural, Setup, Ferramentas). Ao marcar um novo, ele entra neste grupo.',
        placement: 'bottom',
        screen: 'trilha',
      },
      {
        target: 'howto-mod-arch',
        title: 'Próximo recomendado',
        text: 'Depois de concluir Deploy, o sistema recomenda Arquitetura de Sistemas Internos — que já está 60% pronto.',
        placement: 'bottom',
        screen: 'trilha',
      },
      {
        target: 'tour-nav-progresso',
        title: 'Impacto no progresso',
        text: 'Cada módulo concluído sobe o percentual da trilha e atualiza o tempo de ramp-up projetado.',
        placement: 'right',
        screen: 'progresso',
      },
    ],
  },

  generic: {
    id: 'generic',
    label: 'Como usar o PAIT',
    chatReply:
      'Entendi que você quer um passo a passo. Vou abrir um tutorial guiado com o mascote para te mostrar o caminho na interface.',
    steps: [
      {
        target: 'tour-nav-tutor',
        title: 'Comece pelo chat',
        text: 'Pergunte “como fazer…” sobre deploy, trilha, LGPD, progresso ou até ferramentas externas como o Gmail.',
        placement: 'right',
        screen: 'tutor',
      },
      {
        target: 'tour-nav-trilha',
        title: 'Trilha',
        text: 'Conteúdo oficial da squad, reordenado pelas suas dúvidas.',
        placement: 'right',
        screen: 'trilha',
      },
      {
        target: 'tour-nav-progresso',
        title: 'Progresso',
        text: 'Métricas e lacunas — o espelho do que você ainda precisa reforçar.',
        placement: 'right',
        screen: 'progresso',
      },
      {
        target: 'tour-chat-input',
        title: 'Tente agora',
        text: 'Exemplos: “como fazer o deploy?”, “como criar pastas no Gmail?”, “como ver meu progresso?”.',
        placement: 'top',
        screen: 'tutor',
      },
    ],
  },

  gmail: {
    id: 'gmail',
    label: 'Criar pastas no Gmail',
    chatReply:
      'Beleza! Vou abrir uma simulação do Gmail e te guiar passo a passo — como no tutorial de criar marcadores (pastas) e mover e-mails. No Gmail, “pasta” = marcador.',
    steps: [
      {
        target: 'gmail-inbox',
        title: 'Caixa de entrada cheia',
        text: 'Olha só: vários e-mails misturados, inclusive muitos do Mercado Livre. Em vez de apagar, vamos organizar numa pastinha.',
        placement: 'left',
        screen: 'gmail',
      },
      {
        target: 'gmail-labels',
        title: 'Marcadores = pastas',
        text: 'No menu esquerdo, em Marcadores, fica a organização. O Gmail chama de marcador, mas funciona como pasta.',
        placement: 'right',
        screen: 'gmail',
      },
      {
        target: 'gmail-create-modal',
        title: 'Criar o marcador',
        text: 'Clique no + ao lado de Marcadores, digite o nome — aqui “Mercado Livre” — e confirme em Criar.',
        placement: 'left',
        screen: 'gmail',
      },
      {
        target: 'gmail-label-ml',
        title: 'Pasta criada!',
        text: 'Pronto: “Mercado Livre” apareceu na lista. Nos três pontinhos você pode renomear, mudar a cor ou ocultar — mas o foco agora é só a criação.',
        placement: 'right',
        screen: 'gmail',
      },
      {
        target: 'gmail-search',
        title: 'Achar os e-mails',
        text: 'Pesquise “Mercado Livre” (e, se quiser, filtre só a Caixa de entrada) para listar as conversas certas antes de mover.',
        placement: 'bottom',
        screen: 'gmail',
      },
      {
        target: 'gmail-move-menu',
        title: 'Mover para a pasta',
        text: 'Selecione os e-mails, use Mover para e escolha “Mercado Livre”. Se não achar na lista, digite o nome do marcador.',
        placement: 'left',
        screen: 'gmail',
      },
      {
        target: 'gmail-label-ml',
        title: 'Organizado!',
        text: 'Os e-mails do Mercado Livre agora estão no marcador. É assim que você cria pastas no Gmail e organiza a caixa de entrada.',
        placement: 'right',
        screen: 'gmail',
      },
    ],
  },

  github: {
    id: 'github',
    label: 'Criar repositório no GitHub',
    chatReply:
      'Perfeito! Vou abrir uma simulação do GitHub e te mostrar como criar um repositório do zero — nome, descrição, público/privado e o README. Depois você conecta com git push.',
    steps: [
      {
        target: 'gh-dashboard',
        title: 'Conta pronta — e agora?',
        text: 'Com a conta criada no GitHub, o próximo passo é ter um repositório para guardar o código do projeto (no vídeo: o app webview).',
        placement: 'right',
        screen: 'github',
      },
      {
        target: 'gh-repos-side',
        title: 'Seus repositórios',
        text: 'Em Your repositories / Top repositories você vê o que já existe. Se a lista estiver vazia, é hora de criar o primeiro.',
        placement: 'left',
        screen: 'github',
      },
      {
        target: 'gh-new-repo-link',
        title: 'Botão New',
        text: 'Clique em New (ou Repositories → New). Isso abre o formulário de criação do repositório.',
        placement: 'left',
        screen: 'github',
      },
      {
        target: 'gh-repo-name',
        title: 'Nome e descrição',
        text: 'Escolha um nome disponível — aqui “webview” — e uma descrição opcional, tipo “Meu primeiro aplicativo Android”.',
        placement: 'right',
        screen: 'github',
      },
      {
        target: 'gh-visibility',
        title: 'Público ou privado?',
        text: 'Public: qualquer um com o link vê (ótimo para portfólio/entrevistas). Private: só você. No tutorial, deixamos Public e marcamos Add a README.',
        placement: 'right',
        screen: 'github',
      },
      {
        target: 'gh-repo-page',
        title: 'Repositório criado!',
        text: 'Pronto: o repo “webview” existe com o README. Em seguida, no PC: git remote add origin + git push para enviar os arquivos.',
        placement: 'left',
        screen: 'github',
      },
    ],
  },

  jira: {
    id: 'jira',
    label: 'Abrir chamado no Jira Service Management',
    chatReply:
      'Boa! Vou abrir o portal do cliente no Jira Service Management e te guiar: escolher categoria, tipo de solicitação, preencher o formulário e ver as notificações — como no vídeo do portal.',
    steps: [
      {
        target: 'jsm-home',
        title: 'Portal do cliente',
        text: 'É por aqui que o usuário final abre solicitação ou reclamação — sem precisar entrar no Jira “de agente”.',
        placement: 'bottom',
        screen: 'jira',
      },
      {
        target: 'jsm-categories',
        title: 'Escolha a categoria',
        text: 'O cliente seleciona a categoria com a qual mais se identifica (TI, RH, Facilities…). No exemplo, vamos em Solicitações gerais.',
        placement: 'top',
        screen: 'jira',
      },
      {
        target: 'jsm-request-types',
        title: 'Tipo: Solicitação',
        text: 'Dentro da categoria, escolha o tipo — aqui “Solicitação” (pedido ao suporte). Também pode existir Reclamação/Incidente.',
        placement: 'top',
        screen: 'jira',
      },
      {
        target: 'jsm-form',
        title: 'Preencha os campos',
        text: 'Resumo é obrigatório. Descrição e anexo podem ser opcionais — quem decide é o admin do projeto no Jira.',
        placement: 'left',
        screen: 'jira',
      },
      {
        target: 'jsm-submit',
        title: 'Enviar',
        text: 'Ao clicar em Enviar, o chamado é aberto e o cliente é avisado em dois canais.',
        placement: 'top',
        screen: 'jira',
      },
      {
        target: 'jsm-notifications',
        title: 'Duas notificações',
        text: '1) Central de notificações no portal, com o status. 2) E-mail “seu chamado foi recebido”, se o e-mail estiver ativo.',
        placement: 'left',
        screen: 'jira',
      },
      {
        target: 'jsm-client-actions',
        title: 'Autonomia no fluxo',
        text: 'Se o admin liberar no workflow, o cliente pode escalar, resolver/encerrar ou cancelar enquanto o chamado aguarda suporte. Tudo fica no histórico.',
        placement: 'top',
        screen: 'jira',
      },
    ],
  },
}

export function matchHowTo(text) {
  const t = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const isHowTo =
    /\b(como|me explica|me mostre|mostrar|tutorial|passo a passo|como faco|como fazer|como usar|como marcar|como abrir|como ver|como funciona)\b/.test(
      t,
    ) || /\?/.test(t)

  if (/jira|service management|chamado|portal do cliente|solicitacao|abrir.*ticket/.test(t)) {
    return HOW_TO_TUTORIALS.jira
  }
  if (/github|repositorio|git hub|git\b.*repo|criar.*repo|subir.*projeto/.test(t)) {
    return HOW_TO_TUTORIALS.github
  }
  if (/gmail|marcador|pasta.*email|email.*pasta|caixa de entrada|mercado livre/.test(t)) {
    return HOW_TO_TUTORIALS.gmail
  }
  if (/deploy|homolog|pipeline|ci\/?cd|pull request|\bpr\b|staging/.test(t)) {
    return HOW_TO_TUTORIALS.deploy
  }
  if (/lgpd|dados pessoais|compliance|pii/.test(t)) {
    return HOW_TO_TUTORIALS.lgpd
  }
  if (/marcar.*modulo|modulo.*conclu|concluir.*modulo/.test(t)) {
    return HOW_TO_TUTORIALS.modulo
  }
  if (/trilha|modulo|onboarding cultural|aprendizado/.test(t)) {
    return HOW_TO_TUTORIALS.trilha
  }
  if (/progresso|ramp.?up|lacuna|metric/.test(t)) {
    return HOW_TO_TUTORIALS.progresso
  }
  if (isHowTo) {
    return HOW_TO_TUTORIALS.generic
  }
  return null
}
