import Decimal from 'decimal.js';

/**
 * Format large numbers for display (1.2M, 4.5B, 1.2T, etc.)
 */
export function formatNumber(value: string | number): string {
  const d = new Decimal(value.toString());
  const n = d.toNumber();
  if (n >= 1e18) return d.div(1e18).toFixed(2) + 'Q';
  if (n >= 1e15) return d.div(1e15).toFixed(2) + 'q';
  if (n >= 1e12) return d.div(1e12).toFixed(2) + 'T';
  if (n >= 1e9) return d.div(1e9).toFixed(2) + 'B';
  if (n >= 1e6) return d.div(1e6).toFixed(2) + 'M';
  if (n >= 1e3) return d.div(1e3).toFixed(2) + 'K';
  return d.toFixed(0);
}

/**
 * Multiply order: Base Gain → Global → Boost → World
 */
export function computeTickGain(
  baseGain: number,
  globalMult: number,
  boostMult: number,
  worldMult: number,
  shadowBonusPercent: number = 0
): Decimal {
  const shadowFactor = new Decimal(1).plus(shadowBonusPercent / 100);
  return new Decimal(baseGain)
    .times(globalMult)
    .times(boostMult)
    .times(worldMult)
    .times(shadowFactor);
}
