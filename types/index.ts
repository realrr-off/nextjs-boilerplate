// types/index.ts

export type DrillType = 'shooting' | 'handling' | 'physical' | 'defense';

export interface DrillMetrics {
    makes?: number;
    attempts?: number;
    time?: number; // in seconds
    sets?: number;
    reps?: number;
    intensity: 'low' | 'medium' | 'high';
}

export interface DrillLog {
    id: string;
    userId: string;
    date: string;
    type: DrillType;
    drillId: string;
    metrics: DrillMetrics;
    notes?: string;
}

export interface UserStats {
    level: number;
    xp: number;
    totalMinutes: number;
    avgShooting: number;
    activeStreak: number;
}
