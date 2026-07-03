'use client'
import Image from 'next/image'
import { scrollToQuiz } from '@/lib/scroll'
import { CTA_FINAL_UI, AJ_MAIN_SITE_URL, type Lang } from '@/lib/quiz-data'
import type { LMContent } from '@/lib/lm-content'

type CTAFinalProps = LMContent['ctaFinal'] & {
  logo: string
  lang: Lang
}

export function CTAFinal({ title, paragraph, ctaText, logo, lang }: CTAFinalProps) {
  const t = CTA_FINAL_UI[lang]

  return (
    <section className="bg-navy-dark py-20">
      <div className="max-w-[940px] mx-auto px-6 text-center">
        <h2
          className="font-heading font-bold text-white"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
        >
          {title}
        </h2>
        <p className="font-body text-white/70 text-base leading-relaxed max-w-2xl mx-auto mt-4">
          {paragraph}
        </p>
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={scrollToQuiz}
            className="bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:scale-[1.04] transition-transform duration-200 cursor-pointer"
          >
            {ctaText}
          </button>
        </div>

        {/* Closing brand block — logo + link back to the main company site */}
        <div className="flex flex-col items-center gap-4 mt-14 pt-10 border-t border-white/10">
          <Image src={logo} alt="A&J Real Estate Group" width={140} height={48} />
          <a
            href={AJ_MAIN_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-white/60 hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            {t.learnMore} →
          </a>
          <p className="font-body text-[11px] text-white/30">
            © {new Date().getFullYear()} A&J Real Estate · {t.designedBy}
          </p>
        </div>
      </div>
    </section>
  )
}
