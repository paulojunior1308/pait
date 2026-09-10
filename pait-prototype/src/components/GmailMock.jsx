import { useMemo } from 'react'
import {
  Menu,
  Search,
  HelpCircle,
  Settings,
  Grid3X3,
  PenSquare,
  Inbox,
  Star,
  Clock,
  Send,
  File,
  Tag,
  Plus,
  MoreVertical,
  ChevronDown,
  Mail,
  Archive,
  Trash2,
  FolderInput,
} from 'lucide-react'

const INBOX_MAILS = [
  { id: 1, from: 'Mercado Livre', subject: 'Seu pedido foi enviado', preview: 'Acompanhe a entrega do seu pedido #ML-92831…', time: '09:14', unread: true, tag: 'ml' },
  { id: 2, from: 'Mercado Livre', subject: 'Cupom de R$20 pra você', preview: 'Válido até domingo em produtos selecionados…', time: '08:02', unread: true, tag: 'ml' },
  { id: 3, from: 'GitHub', subject: '[PAIT] PR #42 needs review', preview: 'lucasferreira requested your review on…', time: '07:41', unread: true, tag: null },
  { id: 4, from: 'Mercado Livre', subject: 'Pergunta sobre o anúncio', preview: 'Um comprador perguntou: ainda tem estoque?…', time: 'Ontem', unread: false, tag: 'ml' },
  { id: 5, from: 'Slack', subject: 'Resumo diário — #squad-pagamentos', preview: '12 mensagens novas desde ontem…', time: 'Ontem', unread: false, tag: null },
  { id: 6, from: 'Mercado Livre', subject: 'Avalie sua compra', preview: 'Como foi a experiência com o vendedor?…', time: 'Seg', unread: false, tag: 'ml' },
  { id: 7, from: 'Jira', subject: 'PAY-184 movido para In Progress', preview: 'Ana atribuiu o card a você…', time: 'Seg', unread: false, tag: null },
  { id: 8, from: 'Mercado Livre', subject: 'Oferta relâmpago pra você', preview: 'Produtos com até 40% off…', time: 'Dom', unread: false, tag: 'ml' },
]

/**
 * phase (índice do passo do tutorial):
 * 0 inbox cheia
 * 1 destacar marcadores
 * 2 modal criar marcador
 * 3 marcador criado
 * 4 busca / lista filtrada
 * 5 e-mails selecionados
 * 6 movidos para a pasta
 */
export default function GmailMock({ phase = 0 }) {
  const labelCreated = phase >= 3
  const searching = phase >= 4
  const selected = phase >= 5
  const moved = phase >= 6

  const visibleMails = useMemo(() => {
    if (moved) {
      return INBOX_MAILS.filter((m) => m.tag !== 'ml')
    }
    if (searching) {
      return INBOX_MAILS.filter((m) => m.tag === 'ml')
    }
    return INBOX_MAILS
  }, [searching, moved])

  const folderMails = moved ? INBOX_MAILS.filter((m) => m.tag === 'ml') : []
  const viewingFolder = phase >= 6
  const list = viewingFolder ? folderMails : visibleMails

  return (
    <div className="flex h-full min-h-[640px] flex-col bg-[#F6F8FC] px-4 py-3" data-tour="gmail-root">
      {/* Chrome-like top bar */}
      <div className="mb-2 flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm" data-tour="gmail-header">
        <Menu size={20} className="text-[#5F6368]" />
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EA4335]">
            <Mail size={16} className="text-white" />
          </div>
          <span className="text-xl font-normal text-[#5F6368]">Gmail</span>
        </div>
        <div
          data-tour="gmail-search"
          className="ml-6 flex h-11 flex-1 items-center gap-3 rounded-full bg-[#EAF1FB] px-4"
        >
          <Search size={18} className="text-[#5F6368]" />
          <span className="text-sm text-[#5F6368]">
            {searching && !moved
              ? 'Mercado Livre  ·  em:caixa de entrada'
              : 'Pesquisar no correio'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[#5F6368]">
          <HelpCircle size={20} />
          <Settings size={20} />
          <Grid3X3 size={20} />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
            L
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-2">
        {/* Left nav */}
        <aside className="flex w-[220px] shrink-0 flex-col gap-1 px-1 pt-1">
          <button
            type="button"
            className="mb-3 flex items-center gap-3 rounded-2xl bg-[#C2E7FF] px-5 py-3.5 text-sm font-medium text-[#001D35] shadow-sm"
          >
            <PenSquare size={18} />
            Escrever
          </button>

          <NavItem icon={Inbox} label="Caixa de entrada" active={!viewingFolder} count={moved ? 3 : 8} />
          <NavItem icon={Star} label="Com estrela" />
          <NavItem icon={Clock} label="Adiados" />
          <NavItem icon={Send} label="Enviados" />
          <NavItem icon={File} label="Rascunhos" count={2} />

          <div className="mt-3 px-3" data-tour="gmail-labels">
            <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-[#5F6368]">
              <span className="flex items-center gap-1">
                Marcadores <ChevronDown size={12} />
              </span>
              <Plus
                size={14}
                data-tour="gmail-new-label"
                className="cursor-pointer text-[#5F6368]"
              />
            </div>

            {labelCreated ? (
              <div
                data-tour="gmail-label-ml"
                className={`flex items-center justify-between rounded-r-full px-3 py-1.5 text-sm ${
                  viewingFolder ? 'bg-[#D3E3FD] font-medium text-[#041E49]' : 'text-[#202124] hover:bg-[#E8EAED]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Tag size={14} className="text-[#EA4335]" />
                  Mercado Livre
                </span>
                {moved && <span className="text-xs text-[#5F6368]">{folderMails.length}</span>}
                <MoreVertical size={14} className="text-[#5F6368]" data-tour="gmail-label-menu" />
              </div>
            ) : (
              <p className="px-3 py-1 text-xs text-[#9AA0A6]">Nenhum marcador ainda</p>
            )}
          </div>
        </aside>

        {/* Mail list */}
        <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#E8EAED] px-3 py-2 text-[#5F6368]">
            <input
              type="checkbox"
              checked={selected || viewingFolder}
              readOnly
              className="h-4 w-4 rounded border-gray-400"
              data-tour="gmail-select-all"
            />
            {(selected || viewingFolder) && (
              <div className="flex items-center gap-3" data-tour="gmail-move">
                <Archive size={18} />
                <Trash2 size={18} />
                <FolderInput size={18} className="text-[#1A73E8]" />
                <span className="text-xs font-medium text-[#1A73E8]">Mover para</span>
              </div>
            )}
            <span className="ml-auto text-xs">
              {viewingFolder
                ? `Marcador: Mercado Livre · ${folderMails.length} conversas`
                : searching
                  ? `${visibleMails.length} resultados`
                  : `1–${INBOX_MAILS.length} de ${INBOX_MAILS.length}`}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto" data-tour="gmail-inbox">
            {list.map((mail) => (
              <div
                key={mail.id}
                className={`flex cursor-default items-center gap-3 border-b border-[#F1F3F4] px-3 py-2.5 text-sm ${
                  mail.unread ? 'bg-white font-semibold' : 'bg-[#F2F6FC]/60 font-normal'
                } ${selected && mail.tag === 'ml' ? 'bg-[#C2E7FF]/40' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selected && mail.tag === 'ml'}
                  readOnly
                  className="h-4 w-4"
                />
                <Star size={16} className="shrink-0 text-[#DADCE0]" />
                <span className="w-36 shrink-0 truncate text-[#202124]">{mail.from}</span>
                <span className="min-w-0 flex-1 truncate text-[#202124]">
                  {mail.subject}
                  <span className="font-normal text-[#5F6368]"> — {mail.preview}</span>
                </span>
                <span className="shrink-0 text-xs text-[#5F6368]">{mail.time}</span>
              </div>
            ))}
          </div>

          {/* Create label modal */}
          {phase === 2 && (
            <div
              data-tour="gmail-create-modal"
              className="absolute left-1/2 top-24 z-10 w-[360px] -translate-x-1/2 rounded-xl bg-white p-5 shadow-2xl ring-1 ring-black/10"
            >
              <h3 className="mb-4 text-base font-medium text-[#202124]">Novo marcador</h3>
              <label className="mb-1 block text-xs text-[#5F6368]">Nome do marcador</label>
              <input
                readOnly
                value="Mercado Livre"
                className="mb-4 w-full rounded border border-[#DADCE0] px-3 py-2 text-sm outline-none ring-[#1A73E8] focus:ring-2"
              />
              <div className="flex justify-end gap-2">
                <button type="button" className="rounded px-4 py-2 text-sm text-[#1A73E8]">
                  Cancelar
                </button>
                <button
                  type="button"
                  data-tour="gmail-create-btn"
                  className="rounded bg-[#1A73E8] px-4 py-2 text-sm font-medium text-white"
                >
                  Criar
                </button>
              </div>
            </div>
          )}

          {/* Move menu */}
          {phase === 5 && (
            <div
              data-tour="gmail-move-menu"
              className="absolute right-16 top-14 z-10 w-56 rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/10"
            >
              <p className="px-4 py-1 text-xs font-medium text-[#5F6368]">Mover para:</p>
              <button
                type="button"
                className="flex w-full items-center gap-2 bg-[#E8F0FE] px-4 py-2 text-left text-sm text-[#202124]"
              >
                <Tag size={14} className="text-[#EA4335]" />
                Mercado Livre
              </button>
            </div>
          )}
        </section>
      </div>

      <p className="mt-2 text-center text-[10px] text-ink-muted">
        Simulação de interface · baseado no tutorial de criação de pastas/marcadores no Gmail
      </p>
    </div>
  )
}

function NavItem({ icon: Icon, label, active, count }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-r-full px-4 py-1.5 text-sm ${
        active ? 'bg-[#D3E3FD] font-bold text-[#041E49]' : 'font-medium text-[#202124]'
      }`}
    >
      <Icon size={18} />
      <span className="flex-1">{label}</span>
      {count != null && <span className="text-xs">{count}</span>}
    </div>
  )
}
