import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Reembolso — Cavalcante Social Mídia',
  description: 'Condições de cancelamento e reembolso dos nossos serviços.',
}

export default function PoliticaDeReembolso() {
  return (
    <main className="min-h-screen bg-[#060D1F] px-8 py-32 md:px-20">
      <div className="mx-auto max-w-[760px]">

        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-[#64748B] transition-colors hover:text-[#60A5FA]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Voltar ao início
        </Link>

        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#60A5FA]">
          Legal
        </p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#F9FAFB] md:text-5xl">
          Política de Reembolso
        </h1>
        <p className="mb-16 text-sm text-[#64748B]">Última atualização: maio de 2026</p>

        <div className="prose-legal">

          <Section title="Projetos pontuais">
            <p className="text-xs font-medium uppercase tracking-wide text-[#64748B]" style={{ marginBottom: '1rem' }}>
              Design, sites, identidade visual
            </p>
            <ul>
              <li><strong>Antes do início:</strong> reembolso de 100% do valor pago</li>
              <li><strong>Após aprovação do briefing e início do projeto:</strong> sem reembolso — o trabalho criativo já foi iniciado</li>
              <li><strong>Insatisfação com o resultado:</strong> oferecemos até 2 rodadas de revisão incluídas no valor. Revisões adicionais são cobradas separadamente</li>
            </ul>
          </Section>

          <Section title="Gestão de Social Media">
            <p className="text-xs font-medium uppercase tracking-wide text-[#64748B]" style={{ marginBottom: '1rem' }}>
              Planos mensais
            </p>
            <ul>
              <li>O valor mensal não é reembolsável após o início do mês de serviço</li>
              <li>Cancelamentos devem ser comunicados com 30 dias de antecedência</li>
              <li>Não cobramos multa por cancelamento</li>
            </ul>
          </Section>

          <Section title="Mentoria">
            <ul>
              <li><strong>Cancelamento com mais de 24h de antecedência:</strong> reembolso total</li>
              <li><strong>Cancelamento com menos de 24h:</strong> sem reembolso</li>
              <li><strong>No-show</strong> (não comparecimento sem aviso): sem reembolso</li>
            </ul>
          </Section>

          <Section title="Como solicitar reembolso">
            <p>
              Entre em contato pelo WhatsApp <a href="https://wa.me/5569992142406">(69) 99214-2406</a> informando o motivo. Analisamos cada caso individualmente e respondemos em até 2 dias úteis.
            </p>
          </Section>

        </div>
      </div>

      <style>{`
        .prose-legal { color: #94a3b8; line-height: 1.8; }
        .prose-legal p { margin-bottom: 1rem; }
        .prose-legal strong { color: #f1f5f9; font-weight: 600; }
        .prose-legal a { color: #60a5fa; text-decoration: none; }
        .prose-legal a:hover { text-decoration: underline; }
        .prose-legal ul { margin: 0.75rem 0 1rem 1.5rem; list-style: disc; }
        .prose-legal ul li { margin-bottom: 0.4rem; }
      `}</style>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-bold text-[#F9FAFB]">{title}</h2>
      <div className="rounded-2xl border border-[#60A5FA]/10 bg-[#0A0F1E] p-6 md:p-8">
        {children}
      </div>
    </section>
  )
}
