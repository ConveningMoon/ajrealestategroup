import { notFound }      from 'next/navigation'
import type { Metadata } from 'next'
import Script             from 'next/script'
import { getLMContent, allLMSlugs } from '@/lib/lm-content'
import { localeToLang }             from '@/lib/quiz-data'
import { Hero }          from '@/components/template/sections/Hero'
import { Benefits }      from '@/components/template/sections/Benefits'
import { QuizSection }   from '@/components/template/sections/QuizSection'
import { AgentIntro }    from '@/components/template/sections/AgentIntro'
import { Testimonials }  from '@/components/template/sections/Testimonials'
import { CTAFinal }      from '@/components/template/sections/CTAFinal'
import { StickyMobileCTA } from '@/components/template/sections/StickyMobileCTA'

const BASE_URL = process.env.NEXT_PUBLIC_ITMANO_BASE_URL ?? 'https://app.itmano.com'

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return allLMSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const content  = getLMContent(slug)
  if (!content) return {}
  const { meta } = content
  return {
    title:       meta.title,
    description: meta.description,
    keywords:    meta.keywords,
    authors:     [{ name: 'A&J Real Estate Group' }],
    openGraph: {
      title:       meta.title,
      description: meta.description,
      url:         `https://lm.ajrealestateva.com/${slug}`,
      siteName:    'A&J Real Estate Group',
      images:      [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.title }],
      locale:      meta.locale,
      type:        'website',
    },
    twitter: {
      card:        'summary_large_image',
      title:       meta.title,
      description: meta.description,
      images:      [meta.ogImage],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LMPage({ params }: PageProps) {
  const { slug }  = await params
  const content   = getLMContent(slug)
  if (!content) notFound()

  const lang = localeToLang(content.meta.locale)

  return (
    <>
      <Script
        src={`${BASE_URL}/intake.js`}
        data-channel={content.channelPublicId}
        strategy="afterInteractive"
      />
      <main>
        <Hero {...content.hero} />
        <Benefits {...content.benefits} />
        <QuizSection
          {...content.quizSection}
          channelPublicId={content.channelPublicId}
          intent={content.intent}
          quizSuccess={content.quizSuccess}
          lang={lang}
          supportEmail={content.footer.contact.email}
        />
        <AgentIntro {...content.agentIntro} />
        <Testimonials {...content.testimonials} />
        <CTAFinal
          {...content.ctaFinal}
          logo={content.footer.logo}
          lang={lang}
        />
      </main>
      <StickyMobileCTA ctaText={content.hero.ctaText} />
    </>
  )
}
