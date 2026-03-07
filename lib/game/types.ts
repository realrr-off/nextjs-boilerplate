import type Decimal from 'decimal.js';

export type StatType = 'strength' | 'defence' | 'chakra' | 'sword';

export interface GameStats {
  strength: string;
  defence: string;
  chakra: string;
  sword: string;
}

export interface Multipliers {
  global: number;
  boost: number;
  world: number;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  unlockedBy: string;
  abilities: Ability[];
  awakening: Awakening;
}

export interface Ability {
  id: string;
  key: 'z' | 'x' | 'c' | 'v';
  name: string;
  cooldownMs: number;
  damageMultiplier: number;
  description: string;
}

export interface Awakening {
  id: string;
  key: 'f';
  name: string;
  durationMs: number;
  damageMultiplier: number;
  tickEfficiencyMultiplier: number;
  description: string;
}

export interface Shadow {
  id: string;
  name: string;
  statBonusPercent: number;
}

export interface World {
  id: string;
  name: string;
  tier: number;
  statGainMultiplier: number;
  unlockRequirement: string;
}

export interface PlayerGameState {
  stats: GameStats;
  currentWorldId: string;
  currentCharacterId: string;
  shadows: string[];
  ascensionLevel: number;
  ascensionBonus: number;
  awakeningActiveUntil: number;
  abilityCooldowns: Record<string, number>;
}
