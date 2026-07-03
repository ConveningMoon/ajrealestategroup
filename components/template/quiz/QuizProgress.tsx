'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { QUIZ_UI, type Lang } from '@/lib/quiz-data'

interface QuizProgressProps {
  step:  number
  total: number
  lang:  Lang
}

export function QuizProgress({ step, total, lang }: QuizProgressProps) {
  const pref = useReducedMotion()
  const pct  = ((step + 1) / total) * 100
  const ui   = QUIZ_UI[lang]
  const label = `${ui.stepWord} ${step + 1} ${ui.ofWord} ${total}`

  return (
    <div className="mb-8">
      {/* Gold progress bar */}
      <div
        className="w-full h-[10px] rounded-[10px] overflow-hidden"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={label}
        style={{ backgroundColor: 'rgba(199,162,96,0.20)' }}
      >
        <motion.div
          className="h-full bg-gold rounded-[10px]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={pref ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Step label */}
      <p className="font-body font-semibold text-opaque text-sm mt-3">
        {label}
      </p>
    </div>
  )
}
