import { Home, MessageSquare, Route, BarChart3, Users, LogOut } from 'lucide-react'
import paitMascot from '../assets/pait-mascot.png'

const mainNav = [
  { id: 'inicio', label: 'Início', icon: Home },
  { id: 'tutor', label: 'Tutor IA', icon: MessageSquare },
  { id: 'trilha', label: 'Trilha de Aprendizado', icon: Route },
  { id: 'progresso', label: 'Meu Progresso', icon: BarChart3 },
]

const leadershipNav = [
  { id: 'rh', label: 'Painel RH', icon: Users },
]

export default function Sidebar({ activeScreen, onNavigate, onLogout }) {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-full w-sidebar flex-col bg-navy text-white">
      <div className="px-5 pb-6 pt-7">
        <div className="flex items-center gap-3" data-tour="tour-logo">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-navy-secondary ring-1 ring-white/10">
            <img
              src={paitMascot}
              alt=""
              className="h-10 w-10 object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="font-sora text-xl font-800 leading-none tracking-tight text-white">
              PAIT
            </p>
            <p className="mt-1.5 text-[11px] font-medium leading-tight text-white/55">
              Personal AI <span className="text-accent-cyan">Tutor</span>
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {mainNav.map(({ id, label, icon: Icon }) => {
            const active = activeScreen === id
            return (
              <li key={id}>
                <button
                  type="button"
                  data-tour={`tour-nav-${id}`}
                  onClick={() => onNavigate(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? 'bg-navy-secondary text-white'
                      : 'text-white/65 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`shrink-0 ${active ? 'text-accent-cyan' : ''}`} size={18} />
                  <span className="font-medium">{label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="my-5 border-t border-white/10" />
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
          Visão de Liderança
        </p>
        <ul className="space-y-1">
          {leadershipNav.map(({ id, label, icon: Icon }) => {
            const active = activeScreen === id
            return (
              <li key={id}>
                <button
                  type="button"
                  data-tour={`tour-nav-${id}`}
                  onClick={() => onNavigate(id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    active
                      ? 'bg-navy-secondary text-white'
                      : 'text-white/65 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`shrink-0 ${active ? 'text-accent-cyan' : ''}`} size={18} />
                  <span className="font-medium">{label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-accent flex h-9 w-9 items-center justify-center rounded-full font-sora text-sm font-700 text-white">
            L
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">Lucas Ferreira</p>
            <p className="truncate text-xs text-white/50">Dev · Squad Pagamentos</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    </aside>
  )
}
