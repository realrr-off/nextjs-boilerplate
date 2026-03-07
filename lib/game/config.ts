/**
 * Aetherfall - Tunable balancing config
 * Adjust these without refactoring core systems
 */

export const TICK_CONFIG = {
  /** Base tick interval in ms */
  intervalMs: 1000,
  /** Base stat gain per tick (before multipliers) */
  baseGainPerTick: 1,
} as const;

export const MULTIPLIER_DEFAULTS = {
  global: 1,
  boost: 1,
  world: 1,
} as const;

export const ASCENSION_CONFIG = {
  /** Stat threshold to unlock ascension */
  statThreshold: 1e9,
  /** Permanent multiplier per ascension level */
  bonusPerLevel: 1.5,
  /** Max ascension levels */
  maxLevel: 100,
} as const;

export const COMBAT_CONFIG = {
  /** Base damage formula: strength * multiplier */
  baseDamageMultiplier: 1,
  /** Defence mitigation: damage * (1 / (1 + defence/1000)) */
  defenceDivisor: 1000,
  /** DoT tick interval ms */
  dotTickMs: 500,
} as const;

export const ABILITY_KEYS = ['z', 'x', 'c', 'v'] as const;
export const AWAKENING_KEY = 'f' as const;
