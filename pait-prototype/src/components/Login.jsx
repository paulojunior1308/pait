import { useState } from 'react'
import { Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react'
import mascot from '../assets/pait-mascot-fullbody.png'

const VALID_USER = 'lucas.ferreira'
const VALID_PASS = 'Teste123'

export default function Login({ onSuccess }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!user.trim() || !pass) {
      setError('Preencha usuário e senha para continuar.')
      return
    }

    setLoading(true)
    // Simula autenticação (protótipo sem backend)
    setTimeout(() => {
      if (user.trim() === VALID_USER && pass === VALID_PASS) {
        onSuccess?.()
      } else {
        setError('Usuário ou senha incorretos. Tente novamente.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent-blue/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-cyan/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row md:items-stretch md:gap-12">
        {/* Brand / mascot */}
        <div className="flex flex-1 flex-col items-center justify-center text-center md:items-start md:text-left">
          <img
            src={mascot}
            alt="PAIT"
            className="tour-mascot-bob mb-4 h-40 w-auto drop-shadow-2xl md:h-52"
          />
          <h1 className="font-sora text-4xl font-800 tracking-tight text-white">
            PAIT
          </h1>
          <p className="mt-2 text-lg font-medium text-accent-cyan">
            Personal AI Tutor
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            Seu tutor de onboarding corporativo — tire dúvidas, siga a trilha e
            aprenda sistemas internos e externos com guias passo a passo.
          </p>
        </div>

        {/* Form card */}
        <div className="w-full max-w-md shrink-0">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/10 bg-white p-8 shadow-2xl"
          >
            <h2 className="font-sora text-xl font-700 text-ink">Entrar</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Acesse com sua conta corporativa
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="login-user" className="mb-1.5 block text-xs font-semibold text-ink">
                  Usuário
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 focus-within:border-accent-cyan focus-within:ring-2 focus-within:ring-accent-cyan/20">
                  <User size={16} className="shrink-0 text-ink-muted" />
                  <input
                    id="login-user"
                    type="text"
                    autoComplete="username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="nome.sobrenome"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-pass" className="mb-1.5 block text-xs font-semibold text-ink">
                  Senha
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 focus-within:border-accent-cyan focus-within:ring-2 focus-within:ring-accent-cyan/20">
                  <Lock size={16} className="shrink-0 text-ink-muted" />
                  <input
                    id="login-pass"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="shrink-0 text-ink-muted hover:text-ink"
                    aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-[#FEF3F2] px-3 py-2 text-xs font-medium text-[#D92D20]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-accent mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:opacity-70"
            >
              {loading ? 'Entrando…' : 'Entrar no PAIT'}
              {!loading && <ArrowRight size={16} />}
            </button>

            <p className="mt-4 text-center text-[11px] text-ink-muted">
              Demo · usuário{' '}
              <span className="font-semibold text-ink">lucas.ferreira</span> · senha{' '}
              <span className="font-semibold text-ink">Teste123</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
