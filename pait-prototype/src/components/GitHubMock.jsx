import {
  Bell,
  Plus,
  Search,
  Book,
  CircleDot,
  GitPullRequest,
  Package,
  ChevronDown,
  Lock,
  Globe,
  Check,
  BookOpen,
  Code2,
  Eye,
  GitFork,
  Star,
} from 'lucide-react'

/**
 * phase (índice do passo):
 * 0 — dashboard GitHub
 * 1 — menu / repositórios
 * 2 — botão New
 * 3 — formulário criar repo
 * 4 — destaque Public + Create
 * 5 — repositório criado
 */
export default function GitHubMock({ phase = 0 }) {
  const showForm = phase >= 3 && phase < 5
  const created = phase >= 5
  const highlightNew = phase === 2
  const highlightRepos = phase === 1

  return (
    <div
      className="flex h-full min-h-[640px] flex-col bg-[#0D1117] text-[#E6EDF3]"
      data-tour="gh-root"
    >
      {/* Top nav */}
      <header
        className="flex items-center gap-3 border-b border-[#30363D] bg-[#010409] px-4 py-2.5"
        data-tour="gh-header"
      >
        <svg height="28" viewBox="0 0 16 16" width="28" fill="#E6EDF3" aria-hidden>
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>

        <div className="flex h-7 flex-1 max-w-md items-center gap-2 rounded-md border border-[#30363D] bg-[#0D1117] px-2 text-xs text-[#7D8590]">
          <Search size={14} />
          Digite para pesquisar…
        </div>

        <nav className="ml-2 hidden items-center gap-4 text-sm font-semibold md:flex">
          <span>Pull requests</span>
          <span>Issues</span>
          <span className={highlightRepos ? 'text-white' : ''}>Codespaces</span>
          <span>Marketplace</span>
          <span>Explore</span>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Bell size={16} className="text-[#E6EDF3]" />
          <div
            data-tour="gh-new-btn"
            className={`flex items-center gap-1 rounded-md border px-2 py-1 text-sm ${
              highlightNew
                ? 'border-[#2F81F7] bg-[#1F6FEB]/20 text-white'
                : 'border-[#30363D] text-[#E6EDF3]'
            }`}
          >
            <Plus size={14} />
            <ChevronDown size={12} />
          </div>
          <div
            data-tour="gh-avatar"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#238636] text-xs font-bold"
          >
            MD
          </div>
        </div>
      </header>

      {!created && !showForm && (
        <div className="mx-auto flex w-full max-w-5xl flex-1 gap-6 px-6 py-6">
          {/* Left feed */}
          <div className="min-w-0 flex-1" data-tour="gh-dashboard">
            <h1 className="mb-4 font-sora text-xl font-600 text-white">Home</h1>
            <div className="rounded-lg border border-[#30363D] bg-[#161B22] p-4">
              <p className="mb-3 text-sm text-[#7D8590]">
                Bem-vindo, <span className="text-[#E6EDF3]">MarcosDuarteGomes</span> — conta
                criada. Hora de subir seu primeiro projeto.
              </p>
              <div className="space-y-3">
                {['octocat/Hello-World', 'facebook/react', 'vercel/next.js'].map((repo) => (
                  <div
                    key={repo}
                    className="flex items-center gap-2 rounded-md border border-[#30363D] px-3 py-2 text-sm"
                  >
                    <Book size={14} className="text-[#7D8590]" />
                    <span className="text-[#2F81F7]">{repo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="w-72 shrink-0" data-tour="gh-repos-side">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Top repositories</h2>
              <button
                type="button"
                data-tour="gh-new-repo-link"
                className={`rounded-md px-2.5 py-1 text-xs font-semibold text-white ${
                  highlightNew || highlightRepos ? 'bg-[#238636]' : 'bg-[#21262D]'
                }`}
              >
                New
              </button>
            </div>
            <p className="text-xs text-[#7D8590]">Você ainda não tem repositórios.</p>

            <div className="mt-6 space-y-2 text-sm text-[#E6EDF3]" data-tour="gh-profile-menu">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#7D8590]">
                Seu perfil
              </p>
              <MenuRow icon={Book} label="Your repositories" active={highlightRepos} />
              <MenuRow icon={Package} label="Your projects" />
              <MenuRow icon={Star} label="Your stars" />
            </div>
          </aside>
        </div>
      )}

      {showForm && (
        <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-8" data-tour="gh-create-form">
          <h1 className="mb-1 font-sora text-2xl font-700 text-white">Create a new repository</h1>
          <p className="mb-6 text-sm text-[#7D8590]">
            Um repositório contém todo o código, histórico de commits e arquivos do projeto —
            como o “webview” do tutorial.
          </p>

          <div className="space-y-5 rounded-lg border border-[#30363D] bg-[#0D1117] p-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Repository name *</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#7D8590]">MarcosDuarteGomes /</span>
                <input
                  readOnly
                  value="webview"
                  data-tour="gh-repo-name"
                  className="flex-1 rounded-md border border-[#30363D] bg-[#010409] px-3 py-1.5 text-sm text-white outline-none ring-[#2F81F7] focus:ring-1"
                />
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#3FB950]">
                <Check size={12} /> webview is available.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold">
                Description <span className="font-normal text-[#7D8590]">(optional)</span>
              </label>
              <input
                readOnly
                value="Meu primeiro aplicativo Android"
                data-tour="gh-repo-desc"
                className="w-full rounded-md border border-[#30363D] bg-[#010409] px-3 py-1.5 text-sm text-white"
              />
            </div>

            <div data-tour="gh-visibility" className="space-y-2 border-y border-[#30363D] py-4">
              <label className="flex cursor-default items-start gap-3 rounded-md p-2 hover:bg-[#161B22]">
                <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border-4 border-[#2F81F7] bg-[#0D1117]" />
                <span>
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Globe size={14} /> Public
                  </span>
                  <span className="text-xs text-[#7D8590]">
                    Qualquer pessoa na internet pode ver este repositório — ideal para portfólio e
                    recrutadores.
                  </span>
                </span>
              </label>
              <label className="flex cursor-default items-start gap-3 rounded-md p-2 opacity-60">
                <span className="mt-0.5 h-4 w-4 rounded-full border border-[#30363D]" />
                <span>
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Lock size={14} /> Private
                  </span>
                  <span className="text-xs text-[#7D8590]">
                    Só você (e quem convidar) vê o código — use para projetos clientes/comerciais.
                  </span>
                </span>
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm" data-tour="gh-readme">
              <input type="checkbox" checked readOnly className="rounded border-[#30363D]" />
              Add a README file
            </label>

            <button
              type="button"
              data-tour="gh-create-btn"
              className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
                phase === 4 ? 'bg-[#2EA043] ring-2 ring-[#3FB950]' : 'bg-[#238636]'
              }`}
            >
              Create repository
            </button>
          </div>
        </div>
      )}

      {created && (
        <div className="mx-auto w-full max-w-5xl flex-1 px-6 py-4" data-tour="gh-repo-page">
          <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-[#30363D] pb-3">
            <Book size={16} className="text-[#7D8590]" />
            <span className="text-[#2F81F7]">MarcosDuarteGomes</span>
            <span className="text-[#7D8590]">/</span>
            <span className="font-semibold text-[#2F81F7]" data-tour="gh-repo-title">
              webview
            </span>
            <span className="rounded-full border border-[#30363D] px-2 text-[10px] text-[#7D8590]">
              Public
            </span>
            <div className="ml-auto flex gap-2 text-xs">
              <Chip icon={Eye} label="Watch" />
              <Chip icon={GitFork} label="Fork" />
              <Chip icon={Star} label="Star" />
            </div>
          </div>

          <div className="mb-3 flex gap-4 border-b border-[#30363D] text-sm">
            <Tab icon={Code2} label="Code" active />
            <Tab icon={CircleDot} label="Issues" />
            <Tab icon={GitPullRequest} label="Pull requests" />
          </div>

          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-[#7D8590]">
              branch: <span className="font-semibold text-white">main</span>
            </span>
            <span className="text-xs text-[#7D8590]">1 commit · 1 file</span>
          </div>

          <div
            className="overflow-hidden rounded-lg border border-[#30363D]"
            data-tour="gh-readme-file"
          >
            <div className="flex items-center gap-2 border-b border-[#30363D] bg-[#161B22] px-3 py-2 text-sm">
              <BookOpen size={14} />
              README.md
            </div>
            <div className="bg-[#0D1117] px-5 py-4">
              <h2 className="mb-2 border-b border-[#21262D] pb-2 font-sora text-2xl font-700 text-white">
                webview
              </h2>
              <p className="text-sm text-[#E6EDF3]">Meu primeiro aplicativo Android</p>
              <p className="mt-3 text-xs text-[#7D8590]">
                Repositório criado. Depois: git remote add origin + git push para enviar o código
                da sua máquina.
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="border-t border-[#30363D] py-2 text-center text-[10px] text-[#7D8590]">
        Simulação · baseado no tutorial de criar conta/repositório no GitHub
      </p>
    </div>
  )
}

function MenuRow({ icon: Icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${
        active ? 'bg-[#1F6FEB]/25 text-white' : 'text-[#E6EDF3]'
      }`}
    >
      <Icon size={14} className="text-[#7D8590]" />
      {label}
    </div>
  )
}

function Chip({ icon: Icon, label }) {
  return (
    <span className="flex items-center gap-1 rounded-md border border-[#30363D] bg-[#21262D] px-2 py-1">
      <Icon size={12} />
      {label}
    </span>
  )
}

function Tab({ icon: Icon, label, active }) {
  return (
    <span
      className={`flex items-center gap-1.5 border-b-2 px-1 pb-2 ${
        active ? 'border-[#F78166] font-semibold text-white' : 'border-transparent text-[#7D8590]'
      }`}
    >
      <Icon size={14} />
      {label}
    </span>
  )
}
