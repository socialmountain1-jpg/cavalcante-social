import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade — Cavalcante Social Mídia',
  description: 'Como coletamos, usamos e protegemos seus dados pessoais.',
}

export default function PoliticaDePrivacidade() {
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
          Política de Privacidade
        </h1>
        <p className="mb-16 text-sm text-[#64748B]">Última atualização: maio de 2026</p>

        <div className="prose-legal">

          <Section title="Quem somos">
            <p>
              Este site é operado por <strong>José Cavalcante</strong>, prestador de serviços autônomo de Social Media, Design, Criação de Sites e Mentoria, com sede em Rondônia, Brasil.
            </p>
            <p>Para entrar em contato: <a href="mailto:boypink066@gmail.com">boypink066@gmail.com</a> ou WhatsApp <a href="https://wa.me/5569992142406">(69) 99214-2406</a>.</p>
          </Section>

          <Section title="Quais dados coletamos">
            <p>Coletamos apenas os dados que você nos fornece voluntariamente ao entrar em contato via WhatsApp ou email:</p>
            <ul>
              <li>Nome completo</li>
              <li>Número de telefone/WhatsApp</li>
              <li>Endereço de email</li>
              <li>Informações sobre seu negócio compartilhadas durante a conversa</li>
            </ul>
            <p>Não utilizamos formulários de cadastro nem coletamos dados automaticamente além dos cookies essenciais de funcionamento do site.</p>
          </Section>

          <Section title="Como usamos seus dados">
            <p>Seus dados são usados exclusivamente para:</p>
            <ul>
              <li>Responder sua mensagem e apresentar nossos serviços</li>
              <li>Enviar orçamentos e propostas comerciais</li>
              <li>Executar os serviços contratados</li>
              <li>Manter contato durante a prestação do serviço</li>
            </ul>
            <p>Não vendemos, alugamos ou compartilhamos seus dados com terceiros.</p>
          </Section>

          <Section title="Por quanto tempo guardamos seus dados">
            <p>
              Mantemos seus dados enquanto houver uma relação comercial ativa. Você pode solicitar a exclusão dos seus dados a qualquer momento pelo WhatsApp <a href="https://wa.me/5569992142406">(69) 99214-2406</a>.
            </p>
          </Section>

          <Section title="Seus direitos (LGPD)">
            <p>De acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:</p>
            <ul>
              <li>Confirmar se tratamos seus dados</li>
              <li>Acessar seus dados</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>
            <p>Para exercer qualquer um desses direitos, entre em contato pelo WhatsApp <a href="https://wa.me/5569992142406">(69) 99214-2406</a>.</p>
          </Section>

          <Section title="Cookies">
            <p>
              Este site utiliza apenas cookies essenciais para funcionamento básico. Não utilizamos cookies de rastreamento ou publicidade.
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
