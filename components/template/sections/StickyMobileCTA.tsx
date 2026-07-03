'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { scrollToQuiz } from '@/lib/scroll'

interface StickyMobileCTAProps {
  ctaText: string
}

/**
 * Mobile-only conversion bar. Lead magnet visitors on phones scroll past the
 * Hero CTA fast and often don't scroll back up — this keeps the primary
 * action reachable at all times without competing with it on first paint.
 */
export function StickyMobileCTA({ ctaText }: StickyMobileCTAProps) {
  const pref = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [quizPassed, setQuizPassed] = useState(false)

  useEffect(() => {
    const heroEl = document.querySelector('header')
    const quizEl = document.getElementById('quiz')
    if (!heroEl) return

    const heroObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setVisible(!entry.isIntersecting)
      },
      { rootMargin: '0px 0px -85% 0px' },
    )
    heroObserver.observe(heroEl)

    let quizObserver: IntersectionObserver | undefined
    if (quizEl) {
      quizObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry) setQuizPassed(entry.boundingClientRect.top < 0)
        },
        { threshold: 0 },
      )
      quizObserver.observe(quizEl)
    }

    return () => {
      heroObserver.disconnect()
      quizObserver?.disconnect()
    }
  }, [])

  const show = visible && !quizPassed

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={pref ? { opacity: 0 } : { y: 80, opacity: 0 }}
          animate={pref ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={pref ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: pref ? 0.15 : 0.25, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="bg-navy/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 shadow-[0_-4px_20px_rgba(16,32,55,0.25)]">
            <button
              onClick={scrollToQuiz}
              className="w-full bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl active:scale-[0.98] transition-transform duration-150 cursor-pointer"
            >
              {ctaText}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
