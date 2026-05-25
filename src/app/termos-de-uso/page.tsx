import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso — Cavalcante Social Mídia',
  description: 'Termos e condições de uso e prestação de serviços.',
}

export default function TermosDeUso() {
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
          Termos de Uso
        </h1>
        <p className="mb-16 text-sm text-[#64748B]">Última atualização: maio de 2026</p>

        <div className="prose-legal">

          <Section title="1. Prestador de Serviços">
            <p>
              <strong>José Cavalcante</strong>, autônomo, CPF a informar mediante contrato, Rondônia, Brasil.
            </p>
            <p>Contato: <a href="mailto:boypink066@gmail.com">boypink066@gmail.com</a> | WhatsApp <a href="https://wa.me/5569992142406">(69) 99214-2406</a>.</p>
          </Section>

          <Section title="2. Serviços oferecidos">
            <ul>
              <li>Gestão de Social Media</li>
              <li>Design e Identidade Visual</li>
              <li>Criação de Sites</li>
              <li>Mentoria em Marketing Digital</li>
            </ul>
          </Section>

          <Section title="3. Contratação">
            <p>Todos os serviços são contratados mediante:</p>
            <ul>
              <li>Conversa inicial de diagnóstico (gratuita)</li>
              <li>Apresentação de proposta comercial personalizada</li>
              <li>Aceite formal do cliente por escrito (WhatsApp ou email)</li>
              <li>Pagamento do valor acordado conforme condições da proposta</li>
            </ul>
            <p>Não há contratação automática pelo site. Todo contrato é feito de forma individual e personalizada.</p>
          </Section>

          <Section title="4. Pagamento">
            <ul>
              <li>Condições de pagamento definidas individualmente em cada proposta</li>
              <li>Geralmente solicitamos 50% no início e 50% na entrega</li>
              <li>Pagamentos via PIX ou transferência bancária</li>
              <li>Não realizamos reembolso após início da execução do serviço</li>
            </ul>
          </Section>

          <Section title="5. Prazo de entrega">
            <p>
              Os prazos são definidos individualmente em cada proposta comercial e dependem da complexidade do projeto e da agilidade do cliente em fornecer informações e feedbacks.
            </p>
          </Section>

          <Section title="6. Responsabilidades do cliente">
            <ul>
              <li>Fornecer informações verídicas sobre seu negócio</li>
              <li>Responder feedbacks e solicitações em tempo hábil</li>
              <li>Não utilizar os materiais entregues para fins ilegais ou antiéticos</li>
              <li>Realizar os pagamentos nos prazos acordados</li>
            </ul>
          </Section>

          <Section title="7. Propriedade intelectual">
            <p>
              Após a quitação total do serviço, todos os materiais produzidos passam a ser de propriedade do cliente. Nos reservamos o direito de utilizar os trabalhos realizados em portfólio, salvo solicitação expressa de confidencialidade pelo cliente.
            </p>
          </Section>

          <Section title="8. Limitação de responsabilidade">
            <p>
              Não nos responsabilizamos por resultados específicos de vendas ou crescimento, pois dependem de múltiplos fatores externos ao nosso controle. Nos comprometemos com a qualidade da execução e com a estratégia aplicada.
            </p>
          </Section>

          <Section title="9. Cancelamento">
            <ul>
              <li>Cancelamento antes do início: reembolso total</li>
              <li>Cancelamento após início: cobrança proporcional ao trabalho realizado</li>
              <li>Cancelamento de gestão mensal: aviso prévio de 30 dias</li>
            </ul>
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
