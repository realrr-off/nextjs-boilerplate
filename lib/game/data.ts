import type { Character, World } from './types';

export const WORLDS: World[] = [
  { id: 'w1', name: 'Mortal Realm', tier: 1, statGainMultiplier: 1, unlockRequirement: 'Start' },
  { id: 'w2', name: 'Spirit Realm', tier: 2, statGainMultiplier: 2.5, unlockRequirement: '1B total stats' },
  { id: 'w3', name: 'Celestial Plane', tier: 3, statGainMultiplier: 6, unlockRequirement: '10B total stats' },
  { id: 'w4', name: 'Void Abyss', tier: 4, statGainMultiplier: 15, unlockRequirement: '100B total stats' },
  { id: 'w5', name: 'Aetherfall', tier: 5, statGainMultiplier: 40, unlockRequirement: '1T total stats' },
];

export const CHARACTERS: Character[] = [
  {
    id: 'c1',
    name: 'Nova Strike',
    description: 'Blazing fist martial artist',
    unlockedBy: 'Start',
    abilities: [
      { id: 'a1', key: 'z', name: 'Flame Jab', cooldownMs: 3000, damageMultiplier: 1.2, description: 'Quick strike' },
      { id: 'a2', key: 'x', name: 'Inferno Kick', cooldownMs: 6000, damageMultiplier: 2, description: 'Heavy kick' },
      { id: 'a3', key: 'c', name: 'Burning Uppercut', cooldownMs: 10000, damageMultiplier: 3.5, description: 'Launcher' },
      { id: 'a4', key: 'v', name: 'Meteor Rush', cooldownMs: 20000, damageMultiplier: 6, description: 'Combo finisher' },
    ],
    awakening: {
      id: 'aw1',
      key: 'f',
      name: 'Blazing Aura',
      durationMs: 10000,
      damageMultiplier: 2,
      tickEfficiencyMultiplier: 1.5,
      description: '+100% damage, +50% tick gain',
    },
  },
  {
    id: 'c2',
    name: 'Shadow Blade',
    description: 'Silent assassin of the void',
    unlockedBy: 'Reach 100M Strength',
    abilities: [
      { id: 'a5', key: 'z', name: 'Shadow Slash', cooldownMs: 2500, damageMultiplier: 1.5, description: 'Stealth strike' },
      { id: 'a6', key: 'x', name: 'Void Step', cooldownMs: 5000, damageMultiplier: 2.2, description: 'Dash attack' },
      { id: 'a7', key: 'c', name: 'Dark Rend', cooldownMs: 12000, damageMultiplier: 4, description: 'DoT apply' },
      { id: 'a8', key: 'v', name: 'Execution', cooldownMs: 25000, damageMultiplier: 8, description: 'Execute low HP' },
    ],
    awakening: {
      id: 'aw2',
      key: 'f',
      name: 'Shadow Form',
      durationMs: 8000,
      damageMultiplier: 2.5,
      tickEfficiencyMultiplier: 1.3,
      description: '+150% damage, +30% tick gain',
    },
  },
];
