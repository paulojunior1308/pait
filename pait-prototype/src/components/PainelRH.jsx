import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Users } from 'lucide-react'

const kpiCards = [
  { label: 'Novos colaboradores ativos', value: '24' },
  { label: 'Redução de tempo de ramp-up', value: '-38%' },
  { label: 'Tickets de suporte evitados', value: '312' },
  { label: 'Uso ativo semanal', value: '91%' },
]

const rampUpData = [
  { name: 'Antes do PAIT', dias: 34 },
  { name: 'Com PAIT (atual)', dias: 21 },
]

const doubtsData = [
  { name: 'Deploy/CI-CD', value: 38 },
  { name: 'Arquitetura', value: 29 },
  { name: 'LGPD', value: 17 },
  { name: 'Ferramentas', value: 12 },
]

const RAMP_COLORS = ['#98A2B3', '#3B82F6']

export default function PainelRH() {
  return (
    <div className="space-y-6 px-8 py-6">
      <div className="grid grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border bg-white px-4 py-4 shadow-sm"
          >
            <p className="text-xs font-medium text-ink-muted">{card.label}</p>
            <p className="mt-2 font-sora text-2xl font-800 text-ink">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-white px-5 py-5 shadow-sm">
          <h3 className="mb-4 font-sora text-sm font-700 text-ink">
            Tempo médio de ramp-up (dias)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rampUpData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#667085', fontSize: 12 }}
                  axisLine={{ stroke: '#E4E7EC' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#667085', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 40]}
                />
                <Tooltip
                  cursor={{ fill: '#F5F7FA' }}
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #E4E7EC',
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="dias" radius={[8, 8, 0, 0]} barSize={56}>
                  {rampUpData.map((_, i) => (
                    <Cell key={i} fill={RAMP_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white px-5 py-5 shadow-sm">
          <h3 className="mb-4 font-sora text-sm font-700 text-ink">
            Dúvidas mais frequentes do mês
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={doubtsData}
                layout="vertical"
                margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: '#667085', fontSize: 12 }}
                  axisLine={{ stroke: '#E4E7EC' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fill: '#101828', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#F5F7FA' }}
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #E4E7EC',
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="value" fill="#22B8CF" radius={[0, 8, 8, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-5 py-4">
        <Users className="mt-0.5 h-5 w-5 shrink-0 text-accent-blue" />
        <p className="text-sm leading-relaxed text-ink">
          Os tópicos mais recorrentes indicam onde a documentação interna da squad de Pagamentos
          pode estar desatualizada ou incompleta — recomendação gerada automaticamente para o time
          de T&amp;D.
        </p>
      </div>
    </div>
  )
}
