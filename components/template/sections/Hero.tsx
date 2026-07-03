'use client'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { scrollToQuiz } from '@/lib/scroll'
import type { LMContent } from '@/lib/lm-content'

type HeroProps = LMContent['hero']

export function Hero({ badge, titleLine1, titleLine2, subheadline, bullets, ctaText, microcopy, images }: HeroProps) {
  const pref = useReducedMotion()

  return (
    <header
      className="bg-navy bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${images.background})` }}
    >
      <div className="flex flex-col lg:flex-row max-w-[940px] mx-auto px-6 pt-10 lg:pt-10">

        {/* ── Text column ── */}
        <div className="flex-1 flex flex-col gap-6 justify-center">

          {/* Badge */}
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gold flex-none" />
            <p className="font-body text-[11px] font-medium tracking-[0.16em] uppercase text-white">
              {badge}
            </p>
          </div>

          {/* Title */}
          <div>
            <h1 className="font-heading font-bold text-white leading-[1.05]" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
              {titleLine1}{' '}
              <span className="text-gold italic">{titleLine2}</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="font-body text-white text-base leading-7">{subheadline}</p>

          {/* Bullet list */}
          <div className="grid grid-cols-1 gap-y-2.5">
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  fill="currentColor"
                  className="text-gold flex-none mt-0.5"
                  aria-hidden="true"
                >
                  <path d="M21 11a1 1 0 0 0-1 1 8 8 0 0 1-8 8A8 8 0 0 1 6.33 6.36 7.93 7.93 0 0 1 12 4a8.79 8.79 0 0 1 1.9.22 1 1 0 1 0 .47-1.94A10.54 10.54 0 0 0 12 2a10 10 0 0 0-7 17.09A9.93 9.93 0 0 0 12 22a10 10 0 0 0 10-10 1 1 0 0 0-1-1z" />
                  <path d="M9.71 11.29a1 1 0 0 0-1.42 1.42l3 3A1 1 0 0 0 12 16a1 1 0 0 0 .72-.34l7-8a1 1 0 0 0-1.5-1.32L12 13.54z" />
                </svg>
                <span className="font-body text-white text-sm">{b}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-3 pt-1">
            <button
              onClick={scrollToQuiz}
              className="flex items-center gap-2.5 bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider px-6 py-4 rounded-xl hover:scale-[1.04] transition-transform duration-200 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M10.74 3.75c-.51 0-.95.39-.99.91-.16 1.75-.18 3.52-.08 5.27-.25.01-.49.03-.74.05l-1.49.11c-.57.04-.9.68-.59 1.17 1.06 1.66 2.43 3.11 4.04 4.26l.6.43c.31.22.72.22 1.03 0l.6-.43c1.6-1.15 2.97-2.6 4.04-4.26.31-.49-.02-1.13-.59-1.17l-1.49-.11c-.25-.02-.5-.04-.74-.05.1-1.75.07-3.52-.08-5.27-.04-.52-.48-.91-.99-.91h-2.52Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5 16.25c.41 0 .75.34.75.75v2c0 .14.11.25.25.25h12c.14 0 .25-.11.25-.25v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .97-.78 1.75-1.75 1.75H6c-.97 0-1.75-.78-1.75-1.75v-2c0-.41.34-.75.75-.75Z" />
              </svg>
              {ctaText}
            </button>

            <div className="flex items-center gap-2 pb-10">
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 12L10.5 14.5L16 9" stroke="rgba(255,255,255,0.45)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 13V4.22L4.94 4.07C6.64 3.94 8.3 3.54 9.87 2.89L12 2l2.13.89C15.7 3.54 17.36 3.94 19.06 4.07L21 4.22V13c0 4.97-4.03 9-9 9s-9-4.03-9-9Z" stroke="rgba(255,255,255,0.45)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-body text-white/50 text-xs">{microcopy}</span>
            </div>
          </div>
        </div>

        {/* ── Portrait + guide cover ── */}
        <div className="w-full lg:w-[420px] flex items-end justify-center lg:self-end">
          <div className="relative w-full max-w-[420px] overflow-visible">
            {/* Full portrait — container yields to the image so nothing is cropped */}
            <Image
              src={images.portrait}
              alt=""
              width={460}
              height={640}
              priority
              sizes="(max-width: 1024px) 100vw, 420px"
              className="w-full h-auto object-contain object-bottom select-none pointer-events-none"
            />

            <div className="absolute z-10 bottom-0 left-1/2 -translate-x-1/2 mb-[-200px] lg:left-auto lg:right-0 lg:translate-x-0 lg:mr-[-200px] lg:mb-[-180px]">
              <div
                className="inline-block rounded-xl p-4"
                style={{ background: 'radial-gradient(ellipse at center, #c7a260 0%, transparent 60%)', padding: '100px' }}
              >
                <motion.div
                  animate={pref ? undefined : { y: [0, -10, 0] }}
                  transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
                >
                  <Image
                    src={images.guideCover}
                    alt={images.guideCoverAlt}
                    width={300}
                    height={390}
                    priority
                    className="max-h-[400px] min-w-[200px] w-auto h-auto rounded-xl"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
