import {
  Search,
  Bell,
  HelpCircle,
  ChevronRight,
  Paperclip,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
  X,
  AlertTriangle,
} from 'lucide-react'

/**
 * phase:
 * 0 — home do portal
 * 1 — categorias
 * 2 — tipo de solicitação
 * 3 — formulário
 * 4 — enviar
 * 5 — confirmação + notificações
 * 6 — detalhe do chamado (autonomia do cliente)
 */
export default function JiraServiceMock({ phase = 0 }) {
  const showCategories = phase >= 1 && phase < 3
  const showRequestType = phase === 2
  const showForm = phase >= 3 && phase < 5
  const submitted = phase >= 5
  const detail = phase >= 6

  return (
    <div
      className="flex h-full min-h-[640px] flex-col bg-[#F4F5F7] text-[#172B4D]"
      data-tour="jsm-root"
    >
      {/* Portal header */}
      <header
        className="flex items-center gap-4 border-b border-[#DFE1E6] bg-white px-6 py-3"
        data-tour="jsm-header"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0052CC]">
            <span className="text-sm font-bold text-white">J</span>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Portal do Cliente</p>
            <p className="text-[10px] text-[#6B778C]">Jira Service Management</p>
          </div>
        </div>
        <div className="ml-8 flex h-9 flex-1 max-w-md items-center gap-2 rounded-md border border-[#DFE1E6] bg-[#FAFBFC] px-3 text-sm text-[#6B778C]">
          <Search size={14} />
          Buscar pedidos e artigos…
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="relative" data-tour="jsm-bell">
            <Bell size={18} className="text-[#42526E]" />
            {submitted && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DE350B] text-[9px] font-bold text-white">
                1
              </span>
            )}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6554C0] text-xs font-bold text-white">
            C
          </div>
        </div>
      </header>

      {!submitted && !showForm && (
        <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-8" data-tour="jsm-home">
          <h1 className="mb-1 font-sora text-2xl font-700">Olá! Como podemos ajudar?</h1>
          <p className="mb-8 text-sm text-[#6B778C]">
            Abra uma solicitação ou reclamação pelo portal — escolha a categoria e preencha o
            formulário.
          </p>

          <div data-tour="jsm-categories" className="grid grid-cols-2 gap-4">
            {[
              { title: 'TI e Acessos', desc: 'Senha, VPN, notebook, softwares', id: 'ti' },
              { title: 'RH e Benefícios', desc: 'Férias, holerite, convênios', id: 'rh' },
              { title: 'Facilities', desc: 'Sala, crachá, estacionamento', id: 'fac' },
              {
                title: 'Solicitações gerais',
                desc: 'Pedidos e reclamações ao suporte',
                id: 'geral',
                highlight: phase >= 1,
              },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                data-tour={cat.id === 'geral' ? 'jsm-cat-request' : undefined}
                className={`flex items-start gap-3 rounded-xl border bg-white p-4 text-left shadow-sm transition-shadow ${
                  cat.highlight
                    ? 'border-[#0052CC] ring-2 ring-[#4C9AFF]/40'
                    : 'border-[#DFE1E6]'
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#DEEBFF] text-[#0052CC]">
                  <HelpCircle size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{cat.title}</p>
                  <p className="mt-0.5 text-xs text-[#6B778C]">{cat.desc}</p>
                </div>
                <ChevronRight size={16} className="mt-1 text-[#6B778C]" />
              </button>
            ))}
          </div>

          {showRequestType && (
            <div
              data-tour="jsm-request-types"
              className="mt-6 rounded-xl border border-[#0052CC] bg-white p-4 shadow-md"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#6B778C]">
                Tipo de solicitação
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-[#DEEBFF] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#0052CC]">Solicitação</p>
                    <p className="text-xs text-[#6B778C]">Pedir algo ao suporte (acesso, dúvida…)</p>
                  </div>
                  <ChevronRight size={16} className="text-[#0052CC]" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[#DFE1E6] px-4 py-3 opacity-70">
                  <div>
                    <p className="text-sm font-semibold">Reclamação / Incidente</p>
                    <p className="text-xs text-[#6B778C]">Algo quebrou ou não funciona</p>
                  </div>
                  <ChevronRight size={16} className="text-[#6B778C]" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="mx-auto w-full max-w-xl flex-1 px-6 py-8" data-tour="jsm-form">
          <p className="mb-1 text-xs text-[#6B778C]">
            Solicitações gerais <ChevronRight size={10} className="inline" /> Solicitação
          </p>
          <h2 className="mb-6 font-sora text-xl font-700">Abrir solicitação</h2>

          <div className="space-y-4 rounded-xl border border-[#DFE1E6] bg-white p-5 shadow-sm">
            <div data-tour="jsm-field-summary">
              <label className="mb-1 block text-xs font-semibold">
                Resumo <span className="text-[#DE350B]">*</span>
              </label>
              <input
                readOnly
                value="Preciso de acesso ao VPN da empresa"
                className="w-full rounded-md border border-[#DFE1E6] px-3 py-2 text-sm outline-none ring-[#4C9AFF] focus:ring-2"
              />
            </div>

            <div data-tour="jsm-field-desc">
              <label className="mb-1 block text-xs font-semibold">
                Descrição <span className="font-normal text-[#6B778C]">(opcional)</span>
              </label>
              <textarea
                readOnly
                rows={3}
                value="Sou novo na squad e ainda não consigo conectar na VPN para acessar os ambientes internos."
                className="w-full resize-none rounded-md border border-[#DFE1E6] px-3 py-2 text-sm"
              />
              <p className="mt-1 text-[11px] text-[#6B778C]">
                O admin define quais campos são obrigatórios — descrição e anexo podem ser
                opcionais.
              </p>
            </div>

            <div data-tour="jsm-field-attach">
              <label className="mb-1 block text-xs font-semibold">
                Anexo <span className="font-normal text-[#6B778C]">(opcional)</span>
              </label>
              <div className="flex items-center gap-2 rounded-md border border-dashed border-[#DFE1E6] px-3 py-3 text-sm text-[#6B778C]">
                <Paperclip size={16} />
                Arraste um arquivo ou clique para anexar
              </div>
            </div>

            <button
              type="button"
              data-tour="jsm-submit"
              className={`flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold text-white ${
                phase === 4 ? 'bg-[#0065FF] ring-2 ring-[#4C9AFF]' : 'bg-[#0052CC]'
              }`}
            >
              <Send size={16} />
              Enviar solicitação
            </button>
          </div>
        </div>
      )}

      {submitted && !detail && (
        <div className="mx-auto w-full max-w-lg flex-1 px-6 py-10" data-tour="jsm-confirmation">
          <div className="rounded-2xl border border-[#ABE2C4] bg-[#E3FCEF] p-6 text-center shadow-sm">
            <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-[#006644]" />
            <h2 className="font-sora text-xl font-700 text-[#006644]">Chamado recebido!</h2>
            <p className="mt-2 text-sm text-[#172B4D]">
              Protocolo <strong>SUP-1842</strong> · status <strong>Aguardando suporte</strong>
            </p>
          </div>

          <div className="mt-6 space-y-3" data-tour="jsm-notifications">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6B778C]">
              Você foi notificado em 2 canais
            </p>
            <div className="flex items-start gap-3 rounded-xl border border-[#DFE1E6] bg-white p-4">
              <Bell size={18} className="mt-0.5 text-[#0052CC]" />
              <div>
                <p className="text-sm font-semibold">Central de notificações</p>
                <p className="text-xs text-[#6B778C]">
                  Nova notificação: seu chamado SUP-1842 está em “Aguardando suporte”.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-[#DFE1E6] bg-white p-4">
              <MessageSquare size={18} className="mt-0.5 text-[#0052CC]" />
              <div>
                <p className="text-sm font-semibold">E-mail</p>
                <p className="text-xs text-[#6B778C]">
                  “Seu chamado foi recebido” — se o e-mail estiver ativado no projeto.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {detail && (
        <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-6" data-tour="jsm-ticket">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#6B778C]">SUP-1842</p>
              <h2 className="font-sora text-xl font-700">Preciso de acesso ao VPN da empresa</h2>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-[#FFFAE6] px-3 py-1 text-xs font-semibold text-[#FF8B00]">
              <Clock size={12} />
              Aguardando suporte
            </span>
          </div>

          <div className="mb-4 rounded-xl border border-[#DFE1E6] bg-white p-4 text-sm">
            <p className="text-[#6B778C]">Descrição</p>
            <p className="mt-1">
              Sou novo na squad e ainda não consigo conectar na VPN para acessar os ambientes
              internos.
            </p>
          </div>

          <div
            data-tour="jsm-client-actions"
            className="rounded-xl border border-[#B3D4FF] bg-[#DEEBFF]/50 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle size={16} className="text-[#0052CC]" />
              <p className="text-sm font-semibold">Autonomia do cliente (workflow)</p>
            </div>
            <p className="mb-3 text-xs text-[#6B778C]">
              O admin liberou transições no fluxo: enquanto o chamado está aguardando suporte, você
              pode escalar, resolver sozinho ou cancelar se abriu por engano.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md bg-[#0052CC] px-3 py-1.5 text-xs font-semibold text-white"
              >
                Escalar
              </button>
              <button
                type="button"
                className="rounded-md border border-[#006644] bg-white px-3 py-1.5 text-xs font-semibold text-[#006644]"
              >
                Resolver / Encerrar
              </button>
              <button
                type="button"
                className="flex items-center gap-1 rounded-md border border-[#DFE1E6] bg-white px-3 py-1.5 text-xs font-semibold text-[#42526E]"
              >
                <X size={12} />
                Cancelar
              </button>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-[#6B778C]">
            Toda ação do cliente e do agente fica registrada no histórico do chamado.
          </p>
        </div>
      )}

      <p className="border-t border-[#DFE1E6] bg-white py-2 text-center text-[10px] text-[#6B778C]">
        Simulação · portal do cliente no Jira Service Management
      </p>
    </div>
  )
}
