// Values for fit fields must match lib/form-contracts.ts exactly.
//
// i18n note: only `question` and option `label` are translated (display only).
// The option `value`s are CRM contract keys and are IDENTICAL across languages —
// never translate them. buildFormAnswers keeps `value` canonical and sends the
// localized `question`/`label` alongside for human-readable display in the CRM.

export type Lang = 'es' | 'en' | 'pt'

/** Map a content `meta.locale` (es_US | en_US | pt_BR) to a UI language. */
export function localeToLang(locale: string): Lang {
  if (locale.startsWith('pt')) return 'pt'
  if (locale.startsWith('en')) return 'en'
  return 'es'
}

export interface QuizQuestion {
  field: string
  question: string
  options: Array<{ label: string; value: string }>
}

// ── Localized question definitions ────────────────────────────────────────────
// `value` is canonical (CRM). `question`/`label` carry one string per language.

interface QuizQuestionDef {
  field:    string
  question: Record<Lang, string>
  options:  Array<{ value: string; label: Record<Lang, string> }>
}

const QUIZ_DEFS: QuizQuestionDef[] = [
  // ── Fit fields (CRM match_value rules apply to these keys/values) ─────────

  {
    field: 'timeline',
    question: {
      es: '¿Cuándo planeas comprar tu casa?',
      en: 'When are you planning to buy your home?',
      pt: 'Quando você planeja comprar sua casa?',
    },
    options: [
      { value: 'under_3_months',    label: { es: 'En los próximos 3 meses', en: 'In the next 3 months', pt: 'Nos próximos 3 meses' } },
      { value: '3_6_months',        label: { es: 'En 3 a 6 meses',          en: 'In 3 to 6 months',     pt: 'Em 3 a 6 meses' } },
      { value: '6_12_months',       label: { es: 'En 6 a 12 meses',         en: 'In 6 to 12 months',    pt: 'Em 6 a 12 meses' } },
      { value: 'over_12_explorando', label: { es: 'Aún estoy explorando',    en: 'Just exploring for now', pt: 'Ainda estou pesquisando' } },
    ],
  },

  {
    field: 'financing',
    question: {
      es: '¿En qué etapa estás con el financiamiento?',
      en: 'Where are you in the financing process?',
      pt: 'Em que etapa você está no financiamento?',
    },
    options: [
      { value: 'cash',        label: { es: 'Pagamos al contado (cash)',            en: 'Paying in cash',                  pt: 'Vou pagar à vista (cash)' } },
      { value: 'preapproved', label: { es: 'Ya tengo carta de pre-aprobación',     en: 'I already have a pre-approval',   pt: 'Já tenho carta de pré-aprovação' } },
      { value: 'in_process',  label: { es: 'Estoy en proceso con un prestamista',  en: 'In process with a lender',        pt: 'Estou em processo com um credor' } },
      { value: 'not_started', label: { es: 'Aún no he empezado a buscarlo',        en: "Haven't started yet",             pt: 'Ainda não comecei' } },
    ],
  },

  {
    // El MONTO, no el nivel. El formulario no puede saber que es "premium" para
    // esta agencia — antes lo decidia aqui con cortes de 300k/500k que no coinciden
    // con los que la agencia tiene configurados en el CRM, asi que un lead de
    // $280k salia "entry" cuando para ellos es "mid". Ahora se manda el numero y
    // el CRM lo clasifica contra los cortes de cada agencia.
    //
    // Las etiquetas que ve el usuario NO cambian: cambia lo que se transmite.
    // Rango cerrado -> punto medio; abierto -> el limite que declaro.
    field: 'budget_amount',
    question: {
      es: '¿Cuál es tu presupuesto aproximado?',
      en: "What's your approximate budget?",
      pt: 'Qual é o seu orçamento aproximado?',
    },
    options: [
      { value: '300000',        label: { es: 'Hasta $300,000',           en: 'Up to $300,000',      pt: 'Até $300,000' } },
      { value: '300000-500000', label: { es: '$300,000 – $500,000',      en: '$300,000 – $500,000', pt: '$300,000 – $500,000' } },
      { value: '500000',        label: { es: 'Más de $500,000',          en: 'More than $500,000',  pt: 'Mais de $500,000' } },
      // Sin numero parseable el CRM no deriva bucket, que es exactamente lo que
      // significa: no lo sabemos. Equivale al viejo budget_tier 'undefined' (0 pts).
      { value: 'sin_definir',   label: { es: 'Aún no lo tengo definido', en: 'Not defined yet',     pt: 'Ainda não defini' } },
    ],
  },

  {
    field: 'agent_status',
    question: {
      es: '¿Ya tienes un agente de bienes raíces?',
      en: 'Do you already have a real estate agent?',
      pt: 'Você já tem um corretor de imóveis?',
    },
    options: [
      { value: 'sin_agente', label: { es: 'No, estoy buscando', en: "No, I'm looking", pt: 'Não, estou procurando' } },
      { value: 'con_agente', label: { es: 'Sí, ya tengo uno',   en: 'Yes, I have one', pt: 'Sim, já tenho um' } },
    ],
  },

  // ── Free fields (stored for display; no CRM scoring rules apply) ──────────
  // (`area` ya no es libre: alimenta geo_fit via el perfil de la agencia.)

  {
    field: 'property_type',
    question: {
      es: '¿Qué tipo de propiedad buscas?',
      en: 'What type of property are you looking for?',
      pt: 'Que tipo de imóvel você procura?',
    },
    options: [
      { value: 'single_family', label: { es: 'Casa unifamiliar',      en: 'Single-family home', pt: 'Casa (unifamiliar)' } },
      { value: 'townhouse',     label: { es: 'Townhouse',             en: 'Townhouse',          pt: 'Townhouse' } },
      { value: 'condo',         label: { es: 'Condominio',            en: 'Condo',              pt: 'Condomínio (condo)' } },
      { value: 'undecided',     label: { es: 'No estoy seguro/a aún', en: 'Not sure yet',       pt: 'Ainda não tenho certeza' } },
    ],
  },

  {
    field: 'area',
    question: {
      es: '¿En qué zona te interesa vivir?',
      en: 'Which area are you interested in?',
      pt: 'Em qual região você quer morar?',
    },
    // La zona en palabras, no un slug: el CRM la compara contra las zonas que la
    // agencia declaro en sus ajustes ("Virginia Beach"), y 'virginia_beach' no
    // casaba con eso — geo_fit quedaba sin clasificar siempre.
    // Estas opciones ESPEJAN las zonas declaradas por la agencia en el CRM
    // (Ajustes -> Tu negocio). Ofrecer ciudades que la agencia no declaro no era
    // neutral: cada una caia en "fuera de zona" y le restaba 10 puntos al lead,
    // en un formulario disenado justamente para captarlo.
    //
    // Si la agencia cambia sus zonas, hay que cambiarlas aqui tambien: este
    // proyecto vive fuera del CRM y no puede derivarlas solo.
    options: [
      { value: 'Virginia Beach', label: { es: 'Virginia Beach',  en: 'Virginia Beach',  pt: 'Virginia Beach' } },
      { value: 'North Carolina', label: { es: 'North Carolina',  en: 'North Carolina',  pt: 'North Carolina' } },
      { value: 'Otra',           label: { es: 'Otra zona',       en: 'Another area',    pt: 'Outra região' } },
    ],
  },
]

/** Localized questions for a given language (values stay canonical for the CRM). */
export function getQuizQuestions(lang: Lang): QuizQuestion[] {
  return QUIZ_DEFS.map((d) => ({
    field:    d.field,
    question: d.question[lang],
    options:  d.options.map((o) => ({ value: o.value, label: o.label[lang] })),
  }))
}

export const QUIZ_LENGTH = QUIZ_DEFS.length

export type QuizAnswers = Record<string, string | undefined>

// ── UI strings (chrome around the questions) ──────────────────────────────────

export const QUIZ_UI: Record<Lang, {
  introEyebrow: string
  introHelp:    string
  back:         string
  stepWord:     string
  ofWord:       string
  contact: {
    firstName:      string
    lastName:       string
    email:          string
    phone:          string
    languagePref:   string
    firstNamePh:    string
    lastNamePh:     string
    emailPh:        string
    phonePh:        string
    required:       string
    submit:         string
    submitting:     string
  }
  error: {
    title: string
    body:  string
    retry: string
  }
}> = {
  es: {
    introEyebrow: 'Cuéntanos un poco...',
    introHelp:    'Esto nos ayuda a enviarte los recursos más relevantes para ti',
    back:         '← Atrás',
    stepWord:     'Paso',
    ofWord:       'de',
    contact: {
      firstName:    'Nombre *',
      lastName:     'Apellido *',
      email:        'Correo electrónico *',
      phone:        'Teléfono *',
      languagePref: 'Prefiero comunicarme en',
      firstNamePh:  'Tu nombre',
      lastNamePh:   'Tu apellido',
      emailPh:      'tucorreo@ejemplo.com',
      phonePh:      '(757) 000-0000',
      required:     '* Campos obligatorios. Tu información está protegida y nunca será compartida.',
      submit:       'Recibir mi guía gratis →',
      submitting:   'Enviando...',
    },
    error: {
      title: 'Algo salió mal',
      body:  'No pudimos procesar tu solicitud. Intenta de nuevo o escríbenos a',
      retry: 'Intentar de nuevo',
    },
  },
  en: {
    introEyebrow: 'Tell us a little...',
    introHelp:    'This helps us send you the resources most relevant to you',
    back:         '← Back',
    stepWord:     'Step',
    ofWord:       'of',
    contact: {
      firstName:    'First name *',
      lastName:     'Last name *',
      email:        'Email *',
      phone:        'Phone *',
      languagePref: 'I prefer to communicate in',
      firstNamePh:  'Your first name',
      lastNamePh:   'Your last name',
      emailPh:      'you@example.com',
      phonePh:      '(757) 000-0000',
      required:     '* Required fields. Your information is protected and never shared.',
      submit:       'Get my free guide →',
      submitting:   'Sending...',
    },
    error: {
      title: 'Something went wrong',
      body:  "We couldn't process your request. Please try again or email us at",
      retry: 'Try again',
    },
  },
  pt: {
    introEyebrow: 'Conte um pouco...',
    introHelp:    'Isso nos ajuda a enviar os recursos mais relevantes para você',
    back:         '← Voltar',
    stepWord:     'Etapa',
    ofWord:       'de',
    contact: {
      firstName:    'Nome *',
      lastName:     'Sobrenome *',
      email:        'E-mail *',
      phone:        'Telefone *',
      languagePref: 'Prefiro me comunicar em',
      firstNamePh:  'Seu nome',
      lastNamePh:   'Seu sobrenome',
      emailPh:      'voce@exemplo.com',
      phonePh:      '(757) 000-0000',
      required:     '* Campos obrigatórios. Suas informações estão protegidas e nunca serão compartilhadas.',
      submit:       'Receber meu guia grátis →',
      submitting:   'Enviando...',
    },
    error: {
      title: 'Algo deu errado',
      body:  'Não conseguimos processar sua solicitação. Tente novamente ou escreva para',
      retry: 'Tentar novamente',
    },
  },
}

// ── Closing CTA section (replaces the old footer nav/social block) ────────────

export const AJ_MAIN_SITE_URL = 'https://www.ajrealestateva.com/'

export const CTA_FINAL_UI: Record<Lang, { learnMore: string; designedBy: string }> = {
  es: { learnMore: 'Conoce más de A&J Real Estate', designedBy: 'Diseñado por ITMANO' },
  en: { learnMore: 'Learn more about A&J Real Estate', designedBy: 'Designed by ITMANO' },
  pt: { learnMore: 'Conheça mais a A&J Real Estate', designedBy: 'Desenvolvido por ITMANO' },
}

// ── Rich answer snapshot ──────────────────────────────────────────────────────

export interface FormAnswer {
  key:      string
  question: string
  value:    string
  label:    string
}

/**
 * Converts raw quiz responses into a self-contained snapshot that the CRM
 * can store and display without needing access to the form definition.
 *
 * Pass the LOCALIZED questions (from getQuizQuestions(lang)) — the `value`s
 * stay canonical for CRM scoring, while `question`/`label` are human-readable
 * in the lead's own language.
 *
 * For free-text fields (no option list), label === value.
 */
export function buildFormAnswers(
  questions: QuizQuestion[],
  responses: Record<string, string | undefined>,
): FormAnswer[] {
  return questions
    .filter(q => responses[q.field] !== undefined)
    .map(q => {
      const value  = responses[q.field] as string
      const option = q.options.find(o => o.value === value)
      return {
        key:      q.field,
        question: q.question,
        value,
        label:    option?.label ?? value,
      }
    })
}
