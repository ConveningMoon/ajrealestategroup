import { Quiz }            from '@/components/template/quiz/Quiz'
import type { FormIntent } from '@/lib/form-contracts'
import type { Lang }       from '@/lib/quiz-data'
import type { LMContent }  from '@/lib/lm-content'

interface QuizSectionProps {
  label:           string
  title:           string
  subtitle:        string
  contactHeading:  string
  channelPublicId: string
  intent:          FormIntent
  quizSuccess:     LMContent['quizSuccess']
  lang:            Lang
  supportEmail:    string
}

export function QuizSection({ label, title, subtitle, contactHeading, channelPublicId, intent, quizSuccess, lang, supportEmail }: QuizSectionProps) {
  return (
    <section
      id="quiz"
      className="py-20"
      style={{ backgroundColor: 'rgba(199,162,96,0.05)' }}
    >
      <div className="max-w-[940px] mx-auto px-6">

        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <p className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-opaque">
            {label}
          </p>
          <h2
            className="font-heading font-bold text-navy"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.05' }}
          >
            {title}
          </h2>
          <p className="font-body text-navy/60 text-base leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Quiz card */}
        <div
          className="bg-white rounded-[20px] px-8 sm:px-10 pb-10 pt-3"
          style={{ boxShadow: '7px 6px 20px rgba(16,32,55,0.20)' }}
        >
          <Quiz
            channelPublicId={channelPublicId}
            intent={intent}
            contactHeading={contactHeading}
            quizSuccess={quizSuccess}
            lang={lang}
            supportEmail={supportEmail}
          />
        </div>
      </div>
    </section>
  )
}
