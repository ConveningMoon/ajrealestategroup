import { Calculator, CreditCard, Gift, MapPin, ClipboardList, Shield,
         Home, Key, FileText, TrendingUp, Users, Heart,
         Ruler, BadgeCheck, PiggyBank } from 'lucide-react'
import type { FormIntent } from './form-contracts'
import guiaHispanas from '@/content/adriana/guia-para-familias-hispanas/content.json'
import primeraCasaHamptonRoads from '@/content/melany/your-first-home-hampton-roads/content.json'
import guiaBrasileiras from '@/content/viviane/guia-para-familias-brasileiras/content.json'
import pcsPlaybook from '@/content/john/pcs-homebuyers-playbook/content.json'

// ─── Icon map (used by Benefits template) ────────────────────────────────────

export const BENEFIT_ICONS = {
  Calculator, CreditCard, Gift, MapPin, ClipboardList, Shield,
  Home, Key, FileText, TrendingUp, Users, Heart,
  Ruler, BadgeCheck, PiggyBank,
} as const

export type BenefitIconName = keyof typeof BENEFIT_ICONS

// ─── Content types ────────────────────────────────────────────────────────────

export interface LMContent {
  slug:            string
  channelPublicId: string
  intent:          FormIntent

  meta: {
    title:       string
    description: string
    keywords:    string[]
    ogImage:     string
    locale:      string
  }

  hero: {
    badge:       string
    titleLine1:  string
    titleLine2:  string
    subheadline: string
    bullets:     string[]
    ctaText:     string
    microcopy:   string
    images: {
      background:    string
      portrait:      string
      guideCover:    string
      guideCoverAlt: string
    }
  }

  benefits: {
    label:    string
    title:    string
    subtitle: string
    cards:    Array<{ icon: BenefitIconName; title: string; desc: string }>
  }

  quizSection: {
    label:          string
    title:          string
    subtitle:       string
    contactHeading: string
  }

  agentIntro: {
    label:           string
    name:            string
    title:           string
    paragraphs:      string[]
    quote:           string
    photo:           string
    whatsappUrl:     string
    instagramUrl:    string
    instagramHandle: string
  }

  testimonials: {
    label: string
    title: string
    items: Array<{
      image:    string
      name:     string
      location: string
      quote:    string
    }>
  }

  ctaFinal: {
    title:     string
    paragraph: string
    ctaText:   string
  }

  footer: {
    logo:    string
    contact: { email: string }
  }

  quizSuccess: {
    createdHeading:      string
    createdBody:         string
    createdWhatsappUrl:  string
    createdWhatsappLabel: string
    alreadyHeading:      string
    alreadyBody:         string
    alreadyPhoneIntro:   string
    alreadyPhone:        string
    alreadyPhoneLabel:   string
  }
}

// ─── Validator (runs at build time — throws on bad JSON) ─────────────────────

function req(slug: string, path: string, value: unknown): void {
  if (value === undefined || value === null || value === '') {
    throw new Error(`LMContent inválido en "${slug}": "${path}" es requerido`)
  }
}

function validateLMContent(c: LMContent): void {
  req(c.slug, 'slug',            c.slug)
  req(c.slug, 'channelPublicId', c.channelPublicId)
  req(c.slug, 'intent',          c.intent)

  req(c.slug, 'meta.title',       c.meta.title)
  req(c.slug, 'meta.description', c.meta.description)
  req(c.slug, 'meta.ogImage',     c.meta.ogImage)
  req(c.slug, 'meta.locale',      c.meta.locale)

  req(c.slug, 'hero.badge',      c.hero.badge)
  req(c.slug, 'hero.titleLine1', c.hero.titleLine1)
  req(c.slug, 'hero.titleLine2', c.hero.titleLine2)
  if (c.hero.bullets.length === 0)
    throw new Error(`LMContent inválido en "${c.slug}": hero.bullets no puede estar vacío`)

  if (c.benefits.cards.length === 0)
    throw new Error(`LMContent inválido en "${c.slug}": benefits.cards no puede estar vacío`)
  for (const [i, card] of c.benefits.cards.entries()) {
    if (!(card.icon in BENEFIT_ICONS))
      throw new Error(`LMContent inválido en "${c.slug}": benefits.cards[${i}].icon "${card.icon}" no está en BENEFIT_ICONS`)
  }

  if (c.agentIntro.paragraphs.length === 0)
    throw new Error(`LMContent inválido en "${c.slug}": agentIntro.paragraphs no puede estar vacío`)

  if (c.testimonials.items.length === 0)
    throw new Error(`LMContent inválido en "${c.slug}": testimonials.items no puede estar vacío`)
}

// ─── Loader ───────────────────────────────────────────────────────────────────

function buildContentMap(rawItems: unknown[]): Record<string, LMContent> {
  const map: Record<string, LMContent> = {}
  for (const raw of rawItems) {
    const c = raw as LMContent
    validateLMContent(c)
    map[c.slug] = c
  }
  return map
}

// To add a new LM: add one import + one entry in this array. No other file changes.
export const LM_CONTENT: Record<string, LMContent> = buildContentMap([
  guiaHispanas,
  primeraCasaHamptonRoads,
  guiaBrasileiras,
  pcsPlaybook,
])

export function getLMContent(slug: string): LMContent | undefined {
  return LM_CONTENT[slug]
}

export function allLMSlugs(): string[] {
  return Object.keys(LM_CONTENT)
}
