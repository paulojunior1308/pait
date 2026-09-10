import { useState, useRef, useEffect } from 'react'
import { FileText, ThumbsUp, ThumbsDown, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import paitMascot from '../assets/pait-mascot.png'
import { matchHowTo } from '../data/howToTutorials'

const SUGGESTIONS = [
  'Como abrir um chamado no Jira Service Management?',
  'Como criar um repositório no GitHub?',
  'Como criar pastas no Gmail?',
  'Como fazer o deploy para homologação?',
]

let nextId = 1

export default function TutorIA({ onStartHowTo }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const appendExchange = (userText, assistantMsg) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId++, role: 'user', content: userText },
      { id: nextId++, role: 'assistant', ...assistantMsg },
    ])
  }

  const launchHowTo = (howtoId, delay = 600) => {
    if (!howtoId || !onStartHowTo) return
    setTimeout(() => onStartHowTo(howtoId), delay)
  }

  const handleSend = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')

    const tutorial = matchHowTo(text)
    if (tutorial) {
      appendExchange(text, {
        type: 'howto',
        content: tutorial.chatReply,
        howtoId: tutorial.id,
        howtoLabel: tutorial.label,
      })
      launchHowTo(tutorial.id, 700)
      return
    }

    appendExchange(text, {
      type: 'text',
      content: `Anotei sua dúvida sobre "${text}". Já registrei esse tema no mapa de lacunas de conhecimento e vou priorizar conteúdos relacionados na sua trilha. Se quiser um passo a passo visual, pergunte “como fazer…” sobre o tema.`,
    })
  }

  const handleSuggestion = (text) => {
    setInput('')
    const tutorial = matchHowTo(text)
    if (tutorial) {
      appendExchange(text, {
        type: 'howto',
        content: tutorial.chatReply,
        howtoId: tutorial.id,
        howtoLabel: tutorial.label,
      })
      launchHowTo(tutorial.id, 700)
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-5 overflow-y-auto px-8 py-6">
        {isEmpty && (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
            <img
              src={paitMascot}
              alt="PAIT"
              className="mb-4 h-24 w-auto object-contain opacity-90"
            />
            <h2 className="font-sora text-xl font-700 text-ink">Novo chat</h2>
            <p className="mt-2 max-w-md text-sm text-ink-muted">
              Pergunte qualquer coisa sobre sistemas, processos ou ferramentas — ou escolha uma
              sugestão para começar.
            </p>
            <div className="mt-6 flex max-w-xl flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSuggestion(s)}
                  className="rounded-full border border-dashed border-accent-cyan/50 bg-white px-3.5 py-1.5 text-[11px] font-medium text-accent-cyan transition-colors hover:border-accent-cyan hover:bg-[#ECFEFF]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) =>
          msg.role === 'user' ? (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[70%] rounded-2xl rounded-br-md bg-navy px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-navy shadow-sm ring-1 ring-border">
                <img src={paitMascot} alt="" className="h-8 w-8 object-contain" />
              </div>
              <div className="max-w-[75%] space-y-3">
                {msg.type === 'success' && (
                  <div className="flex items-start gap-3 rounded-2xl rounded-tl-md border border-[#A6F4C5] bg-[#ECFDF3] px-4 py-3 text-sm leading-relaxed text-ink shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <p>{msg.content}</p>
                  </div>
                )}

                {msg.type === 'checklist' && (
                  <div className="rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-sm">
                    <div className="mb-2 flex items-center gap-2 font-medium">
                      <ShieldCheck className="h-4 w-4 text-accent-blue" />
                      {msg.intro}
                    </div>
                    <ul className="mb-3 space-y-2 pl-1">
                      {msg.items.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="font-semibold text-accent-blue">{i + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-ink-muted">{msg.footer}</p>
                  </div>
                )}

                {msg.type === 'howto' && (
                  <div className="rounded-2xl rounded-tl-md border border-accent-cyan/30 bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-sm">
                    <p>{msg.content}</p>
                    <button
                      type="button"
                      onClick={() => onStartHowTo?.(msg.howtoId)}
                      className="bg-gradient-accent mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                    >
                      <Sparkles size={14} />
                      Mostrar tutorial: {msg.howtoLabel}
                    </button>
                  </div>
                )}

                {(msg.type === 'text' || msg.type === 'deploy') && (
                  <div className="rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-sm">
                    {msg.type === 'deploy' ? (
                      <ol className="space-y-2">
                        {msg.content.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="font-semibold text-accent-blue">{i + 1}.</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p>{msg.content}</p>
                    )}

                    {msg.source && (
                      <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-2.5 text-xs text-ink-muted">
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span>{msg.source}</span>
                      </div>
                    )}

                    {msg.howtoId && (
                      <button
                        type="button"
                        onClick={() => onStartHowTo?.(msg.howtoId)}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent-cyan/40 bg-[#ECFEFF] px-3.5 py-1.5 text-xs font-semibold text-accent-cyan transition-colors hover:bg-accent-cyan hover:text-white"
                      >
                        <Sparkles size={13} />
                        Ver tutorial guiado na tela
                      </button>
                    )}
                  </div>
                )}

                {msg.showFeedback && (
                  <div className="flex items-center gap-3 pl-1">
                    <span className="text-xs text-ink-muted">Isso resolveu sua dúvida?</span>
                    <button
                      type="button"
                      onClick={() => setFeedback('up')}
                      className={`rounded-lg p-1.5 transition-colors ${
                        feedback === 'up'
                          ? 'bg-[#ECFDF3] text-success'
                          : 'text-ink-muted hover:bg-surface hover:text-ink'
                      }`}
                    >
                      <ThumbsUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedback('down')}
                      className={`rounded-lg p-1.5 transition-colors ${
                        feedback === 'down'
                          ? 'bg-[#FEF3F2] text-[#F04438]'
                          : 'text-ink-muted hover:bg-surface hover:text-ink'
                      }`}
                    >
                      <ThumbsDown size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ),
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="border-t border-border bg-white px-8 py-4"
        data-tour="tour-chat-input"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-2.5 shadow-sm focus-within:border-accent-cyan focus-within:ring-2 focus-within:ring-accent-cyan/20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Pergunte “como fazer…” e o PAIT te guia na tela...'
            className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
          />
          <button
            type="submit"
            className="bg-gradient-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-opacity hover:opacity-90"
            aria-label="Enviar mensagem"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
