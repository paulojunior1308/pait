import { useEffect, useState, useCallback, useLayoutEffect, useRef } from 'react'
import { ChevronRight, X, MousePointerClick } from 'lucide-react'
import mascot from '../assets/pait-mascot-fullbody.png'

export const ONBOARDING_STEPS = [
  {
    target: 'tour-logo',
    title: 'Olá! Eu sou o PAIT',
    text: 'Sou seu Personal AI Tutor. Clique no logo para continuar e conhecer a plataforma.',
    placement: 'right',
    screen: 'tutor',
  },
  {
    target: 'tour-nav-tutor',
    title: 'Tutor IA',
    text: 'Aqui você tira dúvidas. Clique neste menu para abrir o Tutor.',
    placement: 'right',
    screen: 'tutor',
  },
  {
    target: 'tour-nav-trilha',
    title: 'Trilha de Aprendizado',
    text: 'Sua jornada personalizada. Clique para abrir a trilha.',
    placement: 'right',
    screen: 'trilha',
  },
  {
    target: 'tour-nav-progresso',
    title: 'Meu Progresso',
    text: 'Métricas e lacunas de conhecimento. Clique para ver seu progresso.',
    placement: 'right',
    screen: 'progresso',
  },
  {
    target: 'tour-nav-rh',
    title: 'Painel RH',
    text: 'Visão de liderança. Clique para abrir o painel.',
    placement: 'right',
    screen: 'rh',
  },
  {
    target: 'tour-badge',
    title: 'Rastreabilidade',
    text: 'Toda resposta cita a fonte oficial. Clique no badge para seguir.',
    placement: 'bottom',
    screen: 'tutor',
  },
  {
    target: 'tour-chat-input',
    title: 'Pergunte qualquer coisa',
    text: 'É aqui que você pergunta “como fazer…”. Clique na barra para concluir o tour.',
    placement: 'top',
    screen: 'tutor',
  },
]

function getTargetEl(targetId) {
  return document.querySelector(`[data-tour="${targetId}"]`)
}

function getTargetRect(targetId) {
  const el = getTargetEl(targetId)
  if (!el) return null
  return el.getBoundingClientRect()
}

export default function MascotGuide({
  steps = ONBOARDING_STEPS,
  onNavigate,
  onFinish,
  finishLabel = 'Começar',
  badge,
  onStepChange,
}) {
  const [stepIndex, setStepIndex] = useState(0)
  const [rect, setRect] = useState(null)
  const [animKey, setAnimKey] = useState(0)
  const advancingRef = useRef(false)

  const step = steps[stepIndex]
  const isLast = stepIndex === steps.length - 1

  const updateRect = useCallback(() => {
    if (!steps[stepIndex]) return
    const r = getTargetRect(steps[stepIndex].target)
    setRect(r)
    getTargetEl(steps[stepIndex].target)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [stepIndex, steps])

  const goNext = useCallback(() => {
    if (advancingRef.current) return
    advancingRef.current = true
    if (stepIndex >= steps.length - 1) {
      onFinish?.()
      return
    }
    setStepIndex((i) => i + 1)
    setTimeout(() => {
      advancingRef.current = false
    }, 400)
  }, [stepIndex, steps.length, onFinish])

  useLayoutEffect(() => {
    setStepIndex(0)
    advancingRef.current = false
    onStepChange?.(0)
  }, [steps]) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    const screen = steps[stepIndex]?.screen
    if (screen) onNavigate(screen)
    onStepChange?.(stepIndex)
  }, [stepIndex, steps, onNavigate, onStepChange])

  useEffect(() => {
    setAnimKey((k) => k + 1)
    advancingRef.current = false
    const t1 = setTimeout(updateRect, 80)
    const t2 = setTimeout(updateRect, 350)
    const t3 = setTimeout(updateRect, 600)
    window.addEventListener('resize', updateRect)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      window.removeEventListener('resize', updateRect)
    }
  }, [stepIndex, updateRect, steps])

  // Clique no elemento destacado = próximo passo (aprender fazendo)
  useEffect(() => {
    if (!step?.target) return

    const attach = () => {
      const el = getTargetEl(step.target)
      if (!el) return null

      el.classList.add('tour-target-live')

      const onClick = () => {
        // Clique real no elemento (menu, botão…) + avança o tutorial
        setTimeout(() => goNext(), 140)
      }

      el.addEventListener('click', onClick, true)
      return () => {
        el.classList.remove('tour-target-live')
        el.removeEventListener('click', onClick, true)
      }
    }

    let cleanup = attach()
    const retry = setTimeout(() => {
      cleanup?.()
      cleanup = attach()
    }, 400)

    return () => {
      clearTimeout(retry)
      cleanup?.()
    }
  }, [step, stepIndex, goNext])

  const skip = () => onFinish?.()

  if (!step) return null

  let clusterStyle = { left: 260, top: 100 }
  const pad = 6
  let hole = null

  if (rect) {
    hole = {
      top: rect.top - pad,
      left: rect.left - pad,
      width: rect.width + pad * 2,
      height: rect.height + pad * 2,
    }

    if (step.placement === 'right') {
      clusterStyle = {
        left: Math.min(rect.right + 18, window.innerWidth - 360),
        top: Math.min(
          Math.max(16, rect.top + rect.height / 2 - 50),
          window.innerHeight - 200,
        ),
      }
    } else if (step.placement === 'left') {
      clusterStyle = {
        left: Math.max(16, rect.left - 340),
        top: Math.min(
          Math.max(16, rect.top + rect.height / 2 - 50),
          window.innerHeight - 200,
        ),
      }
    } else if (step.placement === 'bottom') {
      clusterStyle = {
        left: Math.min(
          Math.max(16, rect.left + rect.width / 2 - 160),
          window.innerWidth - 360,
        ),
        top: Math.min(rect.bottom + 14, window.innerHeight - 220),
      }
    } else if (step.placement === 'top') {
      clusterStyle = {
        left: Math.min(Math.max(250, rect.left + 40), window.innerWidth - 360),
        top: Math.max(16, rect.top - 210),
      }
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Escurece tudo, menos o “buraco” clicável do alvo */}
      {hole ? (
        <>
          <div
            className="tour-dim pointer-events-auto absolute inset-x-0 top-0"
            style={{ height: Math.max(0, hole.top) }}
          />
          <div
            className="tour-dim pointer-events-auto absolute inset-x-0 bottom-0"
            style={{ top: hole.top + hole.height }}
          />
          <div
            className="tour-dim pointer-events-auto absolute"
            style={{
              top: hole.top,
              left: 0,
              width: Math.max(0, hole.left),
              height: hole.height,
            }}
          />
          <div
            className="tour-dim pointer-events-auto absolute"
            style={{
              top: hole.top,
              left: hole.left + hole.width,
              right: 0,
              height: hole.height,
            }}
          />
          {/* Anel de destaque — não bloqueia o clique no elemento real */}
          <div
            className="tour-highlight-ring pointer-events-none absolute rounded-2xl"
            style={hole}
          />
        </>
      ) : (
        <div className="pointer-events-auto absolute inset-0 bg-navy/40" />
      )}

      <div
        key={animKey}
        className="pointer-events-auto absolute flex items-end gap-1"
        style={clusterStyle}
      >
        <div className="tour-mascot-enter relative z-10 shrink-0">
          <img
            src={mascot}
            alt="PAIT"
            className="tour-mascot-bob h-[7.5rem] w-auto select-none drop-shadow-xl"
            draggable={false}
          />
        </div>

        <div className="tour-bubble-rise relative z-10 mb-8 max-w-[300px]">
          <div className="rounded-2xl rounded-bl-md border border-border bg-white px-4 py-3.5 shadow-xl">
            {badge && (
              <span className="mb-2 inline-block rounded-full bg-[#ECFEFF] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-cyan">
                {badge}
              </span>
            )}
            <div className="mb-1 flex items-center gap-2">
              <span className="bg-gradient-accent h-1.5 w-1.5 animate-pulse rounded-full" />
              <p className="font-sora text-sm font-700 text-navy">{step.title}</p>
            </div>
            <p className="text-[13px] leading-relaxed text-ink-muted">{step.text}</p>

            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#ECFEFF] px-2.5 py-1.5 text-[11px] font-medium text-accent-cyan">
              <MousePointerClick size={13} />
              Clique na área destacada para continuar
            </div>

            <div className="mt-3.5 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={skip}
                className="flex items-center gap-1 rounded-lg px-1.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <X size={12} />
                Pular
              </button>
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        i === stepIndex ? 'bg-accent-cyan' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-1 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:border-accent-cyan hover:text-accent-cyan"
                >
                  {isLast ? finishLabel : 'Pular etapa'}
                  {!isLast && <ChevronRight size={14} />}
                </button>
              </div>
            </div>
          </div>
          <div className="absolute -left-1.5 bottom-10 h-3 w-3 rotate-45 border-b border-l border-border bg-white" />
        </div>
      </div>
    </div>
  )
}
