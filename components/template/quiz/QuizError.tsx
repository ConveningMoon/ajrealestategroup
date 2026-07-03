import { AlertCircle } from 'lucide-react'
import { QUIZ_UI, type Lang } from '@/lib/quiz-data'

interface QuizErrorProps {
  onRetry:      () => void
  lang:         Lang
  supportEmail: string
}

export function QuizError({ onRetry, lang, supportEmail }: QuizErrorProps) {
  const t = QUIZ_UI[lang].error
  return (
    <div className="text-center py-10 space-y-4">
      <AlertCircle className="w-16 h-16 text-red-400 mx-auto" strokeWidth={1.5} />
      <h3 className="font-heading text-2xl font-semibold text-navy">{t.title}</h3>
      <p className="font-body text-navy/70 max-w-sm mx-auto leading-relaxed">
        {t.body}{' '}
        <a
          href={`mailto:${supportEmail}`}
          className="text-gold underline hover:text-navy transition-colors"
        >
          {supportEmail}
        </a>
      </p>
      <button
        type="button" onClick={onRetry}
        className="mt-2 px-8 py-3 bg-navy text-white rounded-md font-body font-medium hover:bg-navy-light transition-colors cursor-pointer"
      >
        {t.retry}
      </button>
    </div>
  )
}
