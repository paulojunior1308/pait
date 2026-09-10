import { useState, useCallback } from 'react'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import InicioDashboard from './components/InicioDashboard'
import TutorIA from './components/TutorIA'
import TrilhaAprendizado from './components/TrilhaAprendizado'
import MeuProgresso from './components/MeuProgresso'
import PainelRH from './components/PainelRH'
import GmailMock from './components/GmailMock'
import GitHubMock from './components/GitHubMock'
import JiraServiceMock from './components/JiraServiceMock'
import MascotGuide, { ONBOARDING_STEPS } from './components/MascotGuide'
import { HOW_TO_TUTORIALS } from './data/howToTutorials'
import mascot from './assets/pait-mascot-fullbody.png'

const EXTERNAL_TUTORIALS = {
  gmail: { label: 'Tutorial externo · Gmail' },
  github: { label: 'Tutorial externo · GitHub' },
  jira: { label: 'Tutorial externo · Jira Service Management' },
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeScreen, setActiveScreen] = useState('inicio')
  const [guide, setGuide] = useState(null)
  const [externalPhase, setExternalPhase] = useState(0)

  const onNavigate = useCallback((screen) => {
    setActiveScreen(screen)
  }, [])

  const startHowTo = useCallback((howtoId) => {
    if (!HOW_TO_TUTORIALS[howtoId]) return
    if (EXTERNAL_TUTORIALS[howtoId]) setExternalPhase(0)
    setGuide({ mode: 'howto', id: howtoId })
  }, [])

  const finishGuide = useCallback(() => {
    setGuide(null)
    setActiveScreen('inicio')
  }, [])

  const onStepChange = useCallback(
    (stepIndex) => {
      if (guide?.mode === 'howto' && EXTERNAL_TUTORIALS[guide.id]) {
        setExternalPhase(stepIndex)
      }
    },
    [guide],
  )

  const guideSteps =
    guide?.mode === 'howto'
      ? HOW_TO_TUTORIALS[guide.id]?.steps
      : guide?.mode === 'onboarding'
        ? ONBOARDING_STEPS
        : null

  const isExternal = guide?.mode === 'howto' && !!EXTERNAL_TUTORIALS[guide.id]

  const guideBadge =
    guide?.mode === 'howto'
      ? isExternal
        ? EXTERNAL_TUTORIALS[guide.id].label
        : `Tutorial · ${HOW_TO_TUTORIALS[guide.id]?.label}`
      : null

  const finishLabel = isExternal
    ? 'Concluir tutorial'
    : guide?.mode === 'howto'
      ? 'Entendi!'
      : 'Começar'

  if (!authenticated) {
    return (
      <Login
        onSuccess={() => {
          setAuthenticated(true)
        }}
      />
    )
  }

  return (
    <div className="flex h-full min-h-screen bg-surface">
      <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />
      <div className="ml-sidebar flex min-h-screen flex-1 flex-col">
        <Topbar activeScreen={activeScreen} />
        <main className="flex-1 overflow-hidden">
          <div className="h-[calc(100vh-89px)] overflow-y-auto">
            <div className={activeScreen === 'inicio' ? 'block' : 'hidden'}>
              <InicioDashboard onNavigate={setActiveScreen} />
            </div>
            <div className={activeScreen === 'tutor' ? 'h-full' : 'hidden'}>
              <TutorIA onStartHowTo={startHowTo} />
            </div>
            <div className={activeScreen === 'trilha' ? 'block' : 'hidden'}>
              <TrilhaAprendizado />
            </div>
            <div className={activeScreen === 'progresso' ? 'block' : 'hidden'}>
              <MeuProgresso />
            </div>
            <div className={activeScreen === 'rh' ? 'block' : 'hidden'}>
              <PainelRH />
            </div>
            <div className={activeScreen === 'gmail' ? 'h-full' : 'hidden'}>
              <GmailMock phase={guide?.id === 'gmail' ? externalPhase : 0} />
            </div>
            <div className={activeScreen === 'github' ? 'h-full' : 'hidden'}>
              <GitHubMock phase={guide?.id === 'github' ? externalPhase : 0} />
            </div>
            <div className={activeScreen === 'jira' ? 'h-full' : 'hidden'}>
              <JiraServiceMock phase={guide?.id === 'jira' ? externalPhase : 0} />
            </div>
          </div>
        </main>
      </div>

      {guideSteps && (
        <MascotGuide
          key={guide.mode === 'howto' ? `howto-${guide.id}` : 'onboarding'}
          steps={guideSteps}
          onNavigate={onNavigate}
          onFinish={finishGuide}
          finishLabel={finishLabel}
          badge={guideBadge}
          onStepChange={onStepChange}
        />
      )}

      {!guide && (
        <button
          type="button"
          onClick={() => {
            setActiveScreen('inicio')
            setGuide({ mode: 'onboarding' })
          }}
          className="group fixed bottom-6 right-6 z-40 flex items-end gap-2"
          aria-label="Reabrir tour do PAIT"
        >
          <span className="tour-bubble-peek mb-4 hidden max-w-[260px] rounded-2xl rounded-br-md border border-border bg-white px-3 py-2 text-xs font-medium text-ink shadow-lg group-hover:block">
            Pergunte: Gmail, GitHub, Jira, deploy…
          </span>
          <img
            src={mascot}
            alt="PAIT"
            className="tour-mascot-bob h-20 w-auto drop-shadow-lg transition-transform group-hover:scale-105"
          />
        </button>
      )}
    </div>
  )
}
