/**
 * CRM vocabulary contracts for lead intake forms.
 *
 * IMPORTANT: the `value` of any fit field in form_answers must match these
 * strings EXACTLY. They map to match_value in the CRM's fit scoring rules.
 * Do not use free-text variants or translated strings for these fields.
 *
 * ── How to build a new form ───────────────────────────────────────────────────
 *
 * 1. Declare the form's intent (one of FormIntent).
 * 2. For each fit field, use the typed values below as option `value`s in your
 *    QuizQuestion definition. Labels can be any user-facing string.
 * 3. Call buildFormAnswers(questions, responses) → FormAnswer[]
 * 4. Call submitLead({ ...contact, intent, form_answers })
 *
 * Free fields (property_type, area, etc.) are not listed here — use any
 * consistent value; the CRM stores them for display only, not for scoring.
 */

// ── Intent ────────────────────────────────────────────────────────────────────

// 'compra' | 'invierte' | 'vende' — buyer-guide (Spanish).
// 'buy' | 'sell' | 'event'        — festival (English).
export type FormIntent = 'compra' | 'invierte' | 'vende' | 'buy' | 'sell' | 'event'

// ── Buyer / Investor fit fields ───────────────────────────────────────────────

/** key: 'timeline' */
export type TimelineValue =
  | 'under_3_months'
  | '3_6_months'
  | '6_12_months'
  | 'over_12_explorando'

/** key: 'financing' */
export type FinancingValue =
  | 'cash'
  | 'preapproved'
  | 'in_process'
  | 'not_started'

/**
 * key: 'budget_amount' — EL MONTO, no el nivel.
 *
 * Manda el numero y el CRM lo clasifica contra los cortes que la agencia tiene
 * configurados (Ajustes -> Tu negocio). Un formulario no puede saber que cuenta
 * como "premium" para una agencia: 300.000 es de entrada en un mercado y premium
 * en otro. Cuando el formulario bucketizaba por su cuenta, sus cortes (300k/500k)
 * no coincidian con los de la agencia (250k/600k) y nadie se enteraba.
 *
 * Acepta numero o texto: '350000', '$350,000', '300000-500000' (rango -> punto
 * medio), '350k'. Lo que no se pueda parsear deja la dimension sin determinar,
 * que es la respuesta correcta a "no lo se".
 *
 * `budget_tier` con los codigos de abajo sigue funcionando por compatibilidad,
 * pero si mandas los dos GANA el monto.
 */
export type BudgetTierValue = 'premium' | 'mid' | 'entry' | 'undefined'

/**
 * key: 'area' — la zona EN PALABRAS ('Virginia Beach', 'Chesapeake, VA').
 *
 * El CRM la compara contra las zonas que la agencia declaro para decidir
 * geo_fit (zona principal / secundaria / fuera de zona). Nada de slugs:
 * 'virginia_beach' no casa con 'Virginia Beach'.
 */
export type AreaValue = string

/** key: 'agent_status' */
export type AgentStatusValue = 'sin_agente' | 'con_agente'

// ── Seller fit fields ─────────────────────────────────────────────────────────

/**
 * key: 'sell_motivation'
 * alta:  mudanza urgente / herencia / financiero / divorcio
 * media: upsizing / downsizing / retiro
 * baja:  explorando_valor
 */
export type SellMotivationValue = 'alta' | 'media' | 'baja'

/** key: 'listing_status' */
export type ListingStatusValue = 'no_listado_sin_agente' | 'ya_listado_con_agente'
