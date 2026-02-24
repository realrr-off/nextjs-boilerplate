'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { useAuth } from '../auth/AuthProvider';
import {
    Rocket, Zap, TrendingUp, Sparkles, Loader2, LogOut, ChevronRight, MousePointer2,
    Cpu, Globe, Signal, Shield, ShieldCheck, Box, Compass, Crosshair,
    Activity, HardDrive, Layers, Settings, Terminal, Users, Cloud,
    Database, Lock, Unlock, Key, Eye, EyeOff, Bell, Mail,
    MessageSquare, Gift, Star, Heart, Smile, Trophy, Target, Flag,
    Anchor, Briefcase, Camera, Music, Headphones, RefreshCw
} from 'lucide-react';

interface Upgrade {
    id: string;
    name: string;
    description: string;
    baseCost: number;
    power: number;
    icon: React.ReactNode;
}

interface Weapon {
    id: string;
    name: string;
    rarity: string;
    multiplier: number;
    color: string;
    chance: number; // per-weapon drop chance (%)
    description?: string;
}

// Rarity weights: Common=50%, Uncommon=25%, Rare=12%, Epic=6%, Legendary=3.5%,
// Mythic=1.8%, Divine=0.8%, Celestial=0.5%, Galactic=0.25%, Godly=0.1%
// Divided among 5 weapons per tier
const WEAPONS: Weapon[] = [
    // Common (50% / 5 = 10% each)
    { id: 'w1', name: 'Rusty Blade', rarity: 'Common', multiplier: 1.5, color: '#94a3b8', chance: 10 },
    { id: 'w2', name: 'Iron Dagger', rarity: 'Common', multiplier: 1.6, color: '#94a3b8', chance: 10 },
    { id: 'w3', name: 'Scrap Hammer', rarity: 'Common', multiplier: 1.7, color: '#94a3b8', chance: 10 },
    { id: 'w4', name: 'Dulled Spear', rarity: 'Common', multiplier: 1.8, color: '#94a3b8', chance: 10 },
    { id: 'w5', name: 'Broken Mace', rarity: 'Common', multiplier: 2.0, color: '#94a3b8', chance: 10 },
    // Uncommon (25% / 5 = 5% each)
    { id: 'w6', name: 'Steel Cutlass', rarity: 'Uncommon', multiplier: 2.2, color: '#4ade80', chance: 5 },
    { id: 'w7', name: 'Recurve Bow', rarity: 'Uncommon', multiplier: 2.4, color: '#4ade80', chance: 5 },
    { id: 'w8', name: 'Reinforced Buckler', rarity: 'Uncommon', multiplier: 2.6, color: '#4ade80', chance: 5 },
    { id: 'w9', name: 'Sharp Slasher', rarity: 'Uncommon', multiplier: 2.8, color: '#4ade80', chance: 5 },
    { id: 'w10', name: 'Hardened Club', rarity: 'Uncommon', multiplier: 3.0, color: '#4ade80', chance: 5 },
    // Rare (12% / 5 = 2.4% each)
    { id: 'w11', name: 'Mithril Dirk', rarity: 'Rare', multiplier: 3.3, color: '#60a5fa', chance: 2.4 },
    { id: 'w12', name: 'Arcane Wand', rarity: 'Rare', multiplier: 3.6, color: '#60a5fa', chance: 2.4 },
    { id: 'w13', name: 'Cobalt Greatsword', rarity: 'Rare', multiplier: 3.9, color: '#60a5fa', chance: 2.4 },
    { id: 'w14', name: 'Crystal Staff', rarity: 'Rare', multiplier: 4.2, color: '#60a5fa', chance: 2.4 },
    { id: 'w15', name: 'Obsidian Axe', rarity: 'Rare', multiplier: 4.5, color: '#60a5fa', chance: 2.4 },
    // Epic (6% / 5 = 1.2% each)
    { id: 'w16', name: 'Dragon Bone Bow', rarity: 'Epic', multiplier: 5.0, color: '#c084fc', chance: 1.2 },
    { id: 'w17', name: 'Phoenix Talon', rarity: 'Epic', multiplier: 5.4, color: '#c084fc', chance: 1.2 },
    { id: 'w18', name: 'Stormbringer', rarity: 'Epic', multiplier: 5.8, color: '#c084fc', chance: 1.2 },
    { id: 'w19', name: 'Shadow Blade', rarity: 'Epic', multiplier: 6.2, color: '#c084fc', chance: 1.2 },
    { id: 'w20', name: 'Frostbite Spear', rarity: 'Epic', multiplier: 6.5, color: '#c084fc', chance: 1.2 },
    // Legendary (3.5% / 5 = 0.7% each)
    { id: 'w21', name: 'Excalibur', rarity: 'Legendary', multiplier: 7.0, color: '#fbbf24', chance: 0.7 },
    { id: 'w22', name: 'Mjöllnir', rarity: 'Legendary', multiplier: 7.4, color: '#fbbf24', chance: 0.7 },
    { id: 'w23', name: 'Aegis Shield', rarity: 'Legendary', multiplier: 7.8, color: '#fbbf24', chance: 0.7 },
    { id: 'w24', name: 'Sunfire Bow', rarity: 'Legendary', multiplier: 8.2, color: '#fbbf24', chance: 0.7 },
    { id: 'w25', name: 'Void Reaver', rarity: 'Legendary', multiplier: 8.5, color: '#fbbf24', chance: 0.7 },
    // Mythic (1.8% / 5 = 0.36% each)
    { id: 'w26', name: 'Godslayer', rarity: 'Mythic', multiplier: 9.0, color: '#f472b6', chance: 0.36 },
    { id: 'w27', name: 'Soul Eater', rarity: 'Mythic', multiplier: 9.5, color: '#f472b6', chance: 0.36 },
    { id: 'w28', name: 'Ragnarok', rarity: 'Mythic', multiplier: 10.0, color: '#f472b6', chance: 0.36 },
    { id: 'w29', name: 'Infinity Edge', rarity: 'Mythic', multiplier: 10.5, color: '#f472b6', chance: 0.36 },
    { id: 'w30', name: 'Eternity Staff', rarity: 'Mythic', multiplier: 11.0, color: '#f472b6', chance: 0.36 },
    // Divine (0.8% / 5 = 0.16% each)
    { id: 'w31', name: 'Divine Avenger', rarity: 'Divine', multiplier: 11.5, color: '#fb7185', chance: 0.16 },
    { id: 'w32', name: 'Holy Grail', rarity: 'Divine', multiplier: 12.0, color: '#fb7185', chance: 0.16 },
    { id: 'w33', name: 'Seraphim Wing', rarity: 'Divine', multiplier: 12.8, color: '#fb7185', chance: 0.16 },
    { id: 'w34', name: 'Judgement', rarity: 'Divine', multiplier: 13.5, color: '#fb7185', chance: 0.16 },
    { id: 'w35', name: 'Eden Blossom', rarity: 'Divine', multiplier: 14.0, color: '#fb7185', chance: 0.16 },
    // Celestial (0.5% / 5 = 0.1% each)
    { id: 'w36', name: 'Nova Star', rarity: 'Celestial', multiplier: 14.5, color: '#38bdf8', chance: 0.1 },
    { id: 'w37', name: 'Nebula Weaver', rarity: 'Celestial', multiplier: 15.0, color: '#38bdf8', chance: 0.1 },
    { id: 'w38', name: 'Pulsar Cannon', rarity: 'Celestial', multiplier: 15.8, color: '#38bdf8', chance: 0.1 },
    { id: 'w39', name: 'Andromeda', rarity: 'Celestial', multiplier: 16.5, color: '#38bdf8', chance: 0.1 },
    { id: 'w40', name: 'Comet Slasher', rarity: 'Celestial', multiplier: 17.0, color: '#38bdf8', chance: 0.1 },
    // Galactic (0.25% / 5 = 0.05% each)
    { id: 'w41', name: 'Black Hole', rarity: 'Galactic', multiplier: 17.5, color: '#4f46e5', chance: 0.05 },
    { id: 'w42', name: 'Supercluster', rarity: 'Galactic', multiplier: 18.0, color: '#4f46e5', chance: 0.05 },
    { id: 'w43', name: 'Event Horizon', rarity: 'Galactic', multiplier: 18.5, color: '#4f46e5', chance: 0.05 },
    { id: 'w44', name: 'Milky Way', rarity: 'Galactic', multiplier: 19.0, color: '#4f46e5', chance: 0.05 },
    { id: 'w45', name: 'Quasar Blade', rarity: 'Galactic', multiplier: 19.5, color: '#4f46e5', chance: 0.05 },
    // Godly (0.1% / 5 = 0.02% each)
    { id: 'w46', name: 'Omnipotence', rarity: 'Godly', multiplier: 20.0, color: '#ffffff', chance: 0.02 },
    { id: 'w47', name: 'Nexus of Fate', rarity: 'Godly', multiplier: 20.0, color: '#ffffff', chance: 0.02 },
    { id: 'w48', name: 'Creator Core', rarity: 'Godly', multiplier: 20.0, color: '#ffffff', chance: 0.02, description: 'The peak of power' },
    { id: 'w49', name: 'Singularity Edge', rarity: 'Godly', multiplier: 20.0, color: '#ffffff', chance: 0.02 },
    { id: 'w50', name: 'The Absolute', rarity: 'Godly', multiplier: 20.0, color: '#ffffff', chance: 0.02 },
];

// Weighted random weapon picker
function rollWeightedWeapon(): Weapon {
    const totalWeight = WEAPONS.reduce((sum, w) => sum + w.chance, 0);
    let roll = Math.random() * totalWeight;
    for (const weapon of WEAPONS) {
        roll -= weapon.chance;
        if (roll <= 0) return weapon;
    }
    return WEAPONS[WEAPONS.length - 1];
}

// Rarity chance lookup for display
const RARITY_CHANCES: Record<string, string> = {
    Common: '50%', Uncommon: '25%', Rare: '12%', Epic: '6%',
    Legendary: '3.5%', Mythic: '1.8%', Divine: '0.8%',
    Celestial: '0.5%', Galactic: '0.25%', Godly: '0.1%'
};

// Helper components for missing icons
const Snowflake = ({ size, className }: { size: number, className?: string }) => <div className={className} style={{ width: size, height: size }}>❄️</div>;
const Clock = ({ size, className }: { size: number, className?: string }) => <div className={className} style={{ width: size, height: size }}>🕐</div>;
const Hexagon = ({ size, className }: { size: number, className?: string }) => <div className={className} style={{ width: size, height: size }}>💠</div>;
const Milestone = ({ size, className }: { size: number, className?: string }) => <div className={className} style={{ width: size, height: size }}>📍</div>;
const Stars = ({ size, className }: { size: number, className?: string }) => <div className={className} style={{ width: size, height: size }}>🌌</div>;
const Flame = ({ size, className }: { size: number, className?: string }) => <div className={className} style={{ width: size, height: size }}>🔥</div>;

const UPGRADES: Upgrade[] = [
    { id: '1', name: 'Nano Thruster', description: '+1 per click', baseCost: 10, power: 1, icon: <Rocket size={16} /> },
    { id: '2', name: 'Static Collector', description: '+2 per click', baseCost: 50, power: 2, icon: <Zap size={16} /> },
    { id: '3', name: 'Void Pulse', description: '+5 per click', baseCost: 200, power: 5, icon: <Activity size={16} /> },
    { id: '4', name: 'Orbital Drill', description: '+12 per click', baseCost: 750, power: 12, icon: <Settings size={16} /> },
    { id: '5', name: 'Aether Siphon', description: '+30 per click', baseCost: 2500, power: 30, icon: <Layers size={16} /> },
    { id: '6', name: 'Gravity Hook', description: '+75 per click', baseCost: 8000, power: 75, icon: <Anchor size={16} /> },
    { id: '7', name: 'Plasma Forge', description: '+160 per click', baseCost: 25000, power: 160, icon: <Flame size={16} className="text-orange-400" /> },
    { id: '8', name: 'Stellar Gate', description: '+350 per click', baseCost: 75000, power: 350, icon: <Globe size={16} /> },
    { id: '9', name: 'Cosmic Relay', description: '+800 per click', baseCost: 200000, power: 800, icon: <Signal size={16} /> },
    { id: '10', name: 'Nebula Net', description: '+1,800 per click', baseCost: 500000, power: 1800, icon: <Cloud size={16} /> },
    { id: '11', name: 'Warp Tunnel', description: '+4,000 per click', baseCost: 1200000, power: 4000, icon: <TrendingUp size={16} /> },
    { id: '12', name: 'Quasar Core', description: '+9,000 per click', baseCost: 3500000, power: 9000, icon: <Sparkles size={16} /> },
    { id: '13', name: 'Dark Matter Box', description: '+20,000 per click', baseCost: 10000000, power: 20000, icon: <Box size={16} /> },
    { id: '14', name: 'Supernova Fan', description: '+45,000 per click', baseCost: 25000000, power: 45000, icon: <RefreshCw size={16} /> },
    { id: '15', name: 'Event Horizon', description: '+100,000 per click', baseCost: 75000000, power: 100000, icon: <Target size={16} /> },
    { id: '16', name: 'Singularity', description: '+250,000 per click', baseCost: 200000000, power: 250000, icon: <Hexagon size={16} /> },
    { id: '17', name: 'Void Shard', description: '+600,000 per click', baseCost: 500000000, power: 600000, icon: <Zap size={16} /> },
    { id: '18', name: 'Star Map', description: '+1.4M per click', baseCost: 1500000000, power: 1400000, icon: <Compass size={16} /> },
    { id: '19', name: 'Quantum Chip', description: '+3M per click', baseCost: 4000000000, power: 3000000, icon: <Cpu size={16} /> },
    { id: '20', name: 'Bio-Reactor', description: '+7M per click', baseCost: 10000000000, power: 7000000, icon: <Heart size={16} /> },
    { id: '21', name: 'Data Hive', description: '+16M per click', baseCost: 25000000000, power: 16000000, icon: <Database size={16} /> },
    { id: '22', name: 'Neural Link', description: '+35M per click', baseCost: 60000000000, power: 35000000, icon: <Terminal size={16} /> },
    { id: '23', name: 'Solar Sails', description: '+80M per click', baseCost: 150000000000, power: 80000000, icon: <Flag size={16} /> },
    { id: '24', name: 'Frost Engine', description: '+180M per click', baseCost: 400000000000, power: 180000000, icon: <Snowflake size={16} /> },
    { id: '25', name: 'Titan Armor', description: '+400M per click', baseCost: 1000000000000, power: 400000000, icon: <Shield size={16} /> },
    { id: '26', name: 'Ghost Sensor', description: '+900M per click', baseCost: 2500000000000, power: 900000000, icon: <EyeOff size={16} /> },
    { id: '27', name: 'Hyper Drive', description: '+2B per click', baseCost: 7000000000000, power: 2000000000, icon: <Rocket size={16} /> },
    { id: '28', name: 'Chrono Ring', description: '+5B per click', baseCost: 18000000000000, power: 5000000000, icon: <Clock size={16} /> },
    { id: '29', name: 'Tachyon Beam', description: '+12B per click', baseCost: 50000000000000, power: 12000000000, icon: <Zap size={16} /> },
    { id: '30', name: 'Nova Burst', description: '+30B per click', baseCost: 150000000000000, power: 30000000000, icon: <Star size={16} /> },
    { id: '31', name: 'Legacy Drive', description: '+75B per click', baseCost: 400000000000000, power: 75000000000, icon: <HardDrive size={16} /> },
    { id: '32', name: 'God Core', description: '+200B per click', baseCost: 1000000000000000, power: 200000000000, icon: <Trophy size={16} /> },
    { id: '33', name: 'Alpha Gate', description: '+500B per click', baseCost: 3000000000000000, power: 500000000000, icon: <Unlock size={16} /> },
    { id: '34', name: 'Omega Shield', description: '+1.2T per click', baseCost: 9000000000000000, power: 1200000000000, icon: <ShieldCheck size={16} /> },
    { id: '35', name: 'Reality Warp', description: '+3T per click', baseCost: 25000000000000000, power: 3000000000000, icon: <Sparkles size={16} /> },
    { id: '36', name: 'Zenith Hub', description: '+8T per click', baseCost: 75000000000000000, power: 8000000000000, icon: <Milestone size={16} /> },
    { id: '37', name: 'Apex Lens', description: '+20T per click', baseCost: 200000000000000000, power: 20000000000000, icon: <Camera size={16} /> },
    { id: '38', name: 'Universal Key', description: '+50T per click', baseCost: 600000000000000000, power: 50000000000000, icon: <Key size={16} /> },
    { id: '39', name: 'Prime Signal', description: '+120T per click', baseCost: 1800000000000000000, power: 120000000000000, icon: <Signal size={16} /> },
    { id: '40', name: 'Transcendant', description: '+300T per click', baseCost: 5000000000000000000, power: 300000000000000, icon: <Stars size={16} /> },
];

export default function SpaceClicker() {
    const { user, profile, refreshProfile } = useAuth();
    const [points, setPoints] = useState(0);
    const [clickPower, setClickPower] = useState(1);
    const [ownedUpgrades, setOwnedUpgrades] = useState<Record<string, number>>({});
    const [rebirths, setRebirths] = useState(0);
    const [prestige, setPrestige] = useState(0);
    const [currentWeapon, setCurrentWeapon] = useState<Weapon | null>(null);
    const [unlockedWeapons, setUnlockedWeapons] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showIndex, setShowIndex] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [rolling, setRolling] = useState(false);
    const [rollResult, setRollResult] = useState<Weapon | null>(null);
    const [clicks, setClicks] = useState<{ id: number, x: number, y: number, val: number }[]>([]);

    const MAX_REBIRTHS = 5;
    const MAX_PRESTIGE = 5;

    // Track state in refs for auto-save and to avoid stale closures
    const stateRef = useRef({
        points,
        clickPower,
        ownedUpgrades,
        rebirths,
        prestige,
        currentWeaponId: currentWeapon?.id,
        currentWeaponMulti: currentWeapon?.multiplier,
        unlockedWeapons
    });

    useEffect(() => {
        stateRef.current = {
            points,
            clickPower,
            ownedUpgrades,
            rebirths,
            prestige,
            currentWeaponId: currentWeapon?.id,
            currentWeaponMulti: currentWeapon?.multiplier || 1,
            unlockedWeapons
        };
    }, [points, clickPower, ownedUpgrades, rebirths, prestige, currentWeapon, unlockedWeapons]);

    useEffect(() => {
        if (profile) {
            setPoints(Number(profile.points || 0));
            setClickPower(Number(profile.click_power || 1));
            setOwnedUpgrades(profile.upgrades || {});
            setRebirths(Number(profile.rebirths || 0));
            setPrestige(Number(profile.prestige || 0));

            if (profile.weapon_id) {
                const weapon = WEAPONS.find(w => w.id === profile.weapon_id);
                setCurrentWeapon(weapon || null);
            }
            setUnlockedWeapons(profile.unlocked_weapons || []);
        }
    }, [profile]);

    // Fetch leaderboard
    const fetchLeaderboard = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, points, rebirths, prestige, weapon_id')
                .order('prestige', { ascending: false })
                .order('rebirths', { ascending: false })
                .order('points', { ascending: false })
                .limit(20);
            if (error) throw error;
            setLeaderboard(data || []);
        } catch (err) {
            console.error('Failed to fetch leaderboard:', err);
        }
    }, []);

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 30000);
        return () => clearInterval(interval);
    }, [fetchLeaderboard]);

    const saveProgress = useCallback(async (overrides?: Partial<typeof stateRef.current>) => {
        if (!user) return;

        setIsSaving(true);
        const data = { ...stateRef.current, ...overrides };

        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    username: profile?.username || user.email?.split('@')[0],
                    points: data.points,
                    click_power: data.clickPower,
                    upgrades: data.ownedUpgrades,
                    rebirths: data.rebirths,
                    prestige: data.prestige,
                    weapon_id: data.currentWeaponId,
                    weapon_multi: data.currentWeaponMulti,
                    unlocked_weapons: data.unlockedWeapons,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (error) throw error;
            console.log('Progress saved');
            await refreshProfile();
        } catch (err) {
            console.error('Failed to save progress:', err);
        } finally {
            setIsSaving(false);
        }
    }, [user, profile, refreshProfile]);

    // Auto-save every 15 seconds if points changed
    useEffect(() => {
        const interval = setInterval(() => {
            if (stateRef.current.points !== Number(profile?.points || 0)) {
                saveProgress();
            }
        }, 15000);
        return () => clearInterval(interval);
    }, [profile, saveProgress]);

    // Multiplier: 2^rebirths * 2^prestige * weapon
    const getMultiplier = () => Math.pow(2, rebirths) * Math.pow(2, prestige) * (currentWeapon?.multiplier || 1);
    const getCurrentClickValue = () => Math.floor(clickPower * getMultiplier());

    const handleClick = (e: React.MouseEvent) => {
        const val = getCurrentClickValue();
        setPoints(p => {
            const next = p + val;
            stateRef.current.points = next;
            return next;
        });

        const id = Date.now();
        setClicks(prev => [...prev, { id, x: e.clientX, y: e.clientY, val }]);
        setTimeout(() => setClicks(prev => prev.filter(c => c.id !== id)), 800);
    };

    const handleRollWeapon = async () => {
        if (points < 10000 || rolling) return;

        setRolling(true);
        const cost = 10000;

        setPoints(p => {
            const next = p - cost;
            stateRef.current.points = next;
            return next;
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        const randomWeapon = rollWeightedWeapon();
        setRollResult(randomWeapon);

        const isHigher = !currentWeapon || randomWeapon.multiplier > currentWeapon.multiplier;

        setUnlockedWeapons(prev => {
            const next = Array.from(new Set([...prev, randomWeapon.id]));
            stateRef.current.unlockedWeapons = next;

            if (isHigher) {
                setCurrentWeapon(randomWeapon);
                stateRef.current.currentWeaponId = randomWeapon.id;
                stateRef.current.currentWeaponMulti = randomWeapon.multiplier;
            }

            // Save immediately with the latest values
            saveProgress({
                unlockedWeapons: next,
                currentWeaponId: isHigher ? randomWeapon.id : stateRef.current.currentWeaponId,
                currentWeaponMulti: isHigher ? randomWeapon.multiplier : stateRef.current.currentWeaponMulti
            });

            return next;
        });

        setRolling(false);
        setTimeout(() => setRollResult(null), 3000);
    };

    const getUpgradeCost = (upgrade: Upgrade) => {
        const count = ownedUpgrades[upgrade.id] || 0;
        return Math.floor(upgrade.baseCost * Math.pow(1.5, count));
    };

    const buyUpgrade = (upgrade: Upgrade) => {
        const count = ownedUpgrades[upgrade.id] || 0;
        if (count >= 10) return;

        const cost = getUpgradeCost(upgrade);
        if (points >= cost) {
            setPoints(p => {
                const nextPoints = p - cost;
                const nextCount = count + 1;
                const nextUpgrades = { ...ownedUpgrades, [upgrade.id]: nextCount };
                const nextPower = clickPower + upgrade.power;

                setOwnedUpgrades(nextUpgrades);
                setClickPower(nextPower);

                // Update ref for background saving
                stateRef.current.points = nextPoints;
                stateRef.current.ownedUpgrades = nextUpgrades;
                stateRef.current.clickPower = nextPower;

                saveProgress({
                    points: nextPoints,
                    ownedUpgrades: nextUpgrades,
                    clickPower: nextPower
                });

                return nextPoints;
            });
        }
    };

    const getRebirthCost = () => {
        return Math.pow(10, 6 + (rebirths * 3));
    };

    const canRebirth = rebirths < MAX_REBIRTHS && points >= getRebirthCost();
    const canPrestige = rebirths >= MAX_REBIRTHS && prestige < MAX_PRESTIGE;

    const handleRebirth = () => {
        if (!canRebirth) return;

        const nextRebirths = rebirths + 1;
        const nextPoints = 0;
        const nextPower = 1;
        const nextUpgrades = {};

        setPoints(nextPoints);
        setClickPower(nextPower);
        setOwnedUpgrades(nextUpgrades);
        setRebirths(nextRebirths);

        saveProgress({
            points: nextPoints,
            clickPower: nextPower,
            ownedUpgrades: nextUpgrades,
            rebirths: nextRebirths
        });
    };

    const handlePrestige = () => {
        if (!canPrestige) return;

        const nextPrestige = prestige + 1;
        const nextPoints = 0;
        const nextPower = 1;
        const nextUpgrades = {};
        const nextRebirths = 0;

        setPoints(nextPoints);
        setClickPower(nextPower);
        setOwnedUpgrades(nextUpgrades);
        setRebirths(nextRebirths);
        setPrestige(nextPrestige);

        saveProgress({
            points: nextPoints,
            clickPower: nextPower,
            ownedUpgrades: nextUpgrades,
            rebirths: nextRebirths,
            prestige: nextPrestige
        });
    };

    const formatNumber = (num: number) => {
        if (num >= 1e18) return (num / 1e18).toFixed(2) + 'Qi';
        if (num >= 1e15) return (num / 1e15).toFixed(2) + 'Qa';
        if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        return num.toLocaleString();
    };

    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden selection:bg-blue-500/30">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/5 blur-[180px] rounded-full" />
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full animate-pulse" />
            </div>

            {/* Main Area (Left) */}
            <div className="flex-1 flex flex-col relative z-10 p-12">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
                            SPACE<span className="text-blue-500">CLICKER</span>
                        </h1>
                        <div className="flex items-center gap-3 text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
                            <span className="text-zinc-400">@{profile?.username}</span>
                            <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                            <span>{isSaving ? 'Syncing...' : 'Stable'}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center min-w-[100px]">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Prestige</div>
                            <div className="text-2xl font-black text-purple-400">★{prestige}</div>
                        </div>
                        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center min-w-[100px]">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Rebirths</div>
                            <div className="text-2xl font-black text-blue-400">#{rebirths}/{MAX_REBIRTHS}</div>
                        </div>
                        <button onClick={() => supabase.auth.signOut()} className="p-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-colors">
                            <LogOut size={20} className="text-zinc-500" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center -mt-10">
                    <div className="text-center space-y-2 mb-12">
                        <div className="text-[120px] font-black tracking-tighter leading-none tabular-nums animate-pulse-slow">
                            {formatNumber(points)}
                        </div>
                        <div className="text-zinc-500 font-bold uppercase tracking-[0.6em] text-xs">Total Credits</div>
                    </div>

                    <button
                        onClick={handleClick}
                        className="group relative w-72 h-72 flex items-center justify-center outline-none active:scale-90 transition-transform duration-75"
                    >
                        <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all" />
                        <div className="absolute inset-[-40px] border border-blue-500/10 rounded-full animate-spin-slow" />
                        <div className="relative w-56 h-56 bg-zinc-950 border border-white/5 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
                            <span className="text-7xl">💠</span>
                        </div>
                    </button>

                    <div className="mt-16 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 px-8 py-4 bg-zinc-900/80 border border-white/5 rounded-2xl backdrop-blur-3xl">
                            <MousePointer2 size={18} className="text-blue-500" />
                            <span className="text-2xl font-black tracking-tight">{formatNumber(getCurrentClickValue())}</span>
                            <span className="text-zinc-500 text-xs font-bold uppercase">per click</span>
                        </div>
                        {(rebirths > 0 || prestige > 0) && (
                            <div className="text-[10px] font-black text-blue-400/50 uppercase tracking-widest">
                                Includes x{formatNumber(getMultiplier())} Multiplier
                            </div>
                        )}
                    </div>

                    {/* Weapon Section */}
                    <div className="mt-8 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleRollWeapon}
                                disabled={points < 10000 || rolling}
                                className={`px-6 py-3 rounded-2xl border font-black text-sm transition-all flex items-center gap-2
                                    ${points >= 10000 && !rolling
                                        ? 'bg-zinc-900 border-white/10 hover:border-blue-500/50 hover:bg-zinc-800'
                                        : 'bg-zinc-950 border-white/5 text-zinc-700 opacity-50 cursor-not-allowed'}`}
                            >
                                {rolling ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                                ROLL WEAPON (10K)
                            </button>
                            <button
                                onClick={() => setShowIndex(true)}
                                className="px-6 py-3 bg-zinc-900 border border-white/10 rounded-2xl font-black text-sm hover:bg-zinc-800 transition-all flex items-center gap-2"
                            >
                                <Box size={16} />
                                INDEX
                            </button>
                            <button
                                onClick={() => { fetchLeaderboard(); setShowLeaderboard(true); }}
                                className="px-6 py-3 bg-zinc-900 border border-white/10 rounded-2xl font-black text-sm hover:bg-zinc-800 transition-all flex items-center gap-2"
                            >
                                <Trophy size={16} />
                                RANKS
                            </button>
                        </div>

                        {currentWeapon ? (
                            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                                <div className="text-[10px] font-black text-zinc-500 tracking-[0.4em] uppercase mb-2">Active Weapon</div>
                                <div
                                    className="px-6 py-2 rounded-full border text-sm font-black tracking-wide shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                                    style={{ borderColor: `${currentWeapon.color}44`, color: currentWeapon.color, backgroundColor: `${currentWeapon.color}11` }}
                                >
                                    {currentWeapon.name.toUpperCase()} (x{currentWeapon.multiplier})
                                </div>
                            </div>
                        ) : (
                            <div className="text-zinc-700 text-[10px] font-black tracking-widest uppercase">No weapon equipped</div>
                        )}
                    </div>
                </div>
                {/* Bottom Left: Rebirth & Prestige */}
                <div className="absolute bottom-12 left-12 flex gap-4">
                    {/* Rebirth Button */}
                    <button
                        onClick={handleRebirth}
                        disabled={!canRebirth}
                        className={`p-5 rounded-[28px] border transition-all flex items-center gap-5 group
                            ${canRebirth
                                ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95'
                                : 'bg-zinc-900 border-white/5 text-zinc-600 opacity-50 cursor-not-allowed'}`}
                    >
                        <div className={`p-3 rounded-xl ${canRebirth ? 'bg-white/20' : 'bg-zinc-800'}`}>
                            <RefreshCw size={20} className={canRebirth ? 'animate-spin-slow' : ''} />
                        </div>
                        <div className="text-left">
                            <div className="text-[9px] font-black uppercase tracking-widest mb-0.5 opacity-70">Ascend</div>
                            <div className="text-lg font-black">REBIRTH</div>
                            <div className="text-[9px] font-bold mt-0.5">
                                {rebirths >= MAX_REBIRTHS ? 'MAX' : `Cost: ${formatNumber(getRebirthCost())}`}
                            </div>
                        </div>
                    </button>
                    {/* Prestige Button */}
                    <button
                        onClick={handlePrestige}
                        disabled={!canPrestige}
                        className={`p-5 rounded-[28px] border transition-all flex items-center gap-5 group
                            ${canPrestige
                                ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95'
                                : 'bg-zinc-900 border-white/5 text-zinc-600 opacity-50 cursor-not-allowed'}`}
                    >
                        <div className={`p-3 rounded-xl ${canPrestige ? 'bg-white/20' : 'bg-zinc-800'}`}>
                            <Star size={20} className={canPrestige ? 'animate-pulse' : ''} />
                        </div>
                        <div className="text-left">
                            <div className="text-[9px] font-black uppercase tracking-widest mb-0.5 opacity-70">Transcend</div>
                            <div className="text-lg font-black">PRESTIGE</div>
                            <div className="text-[9px] font-bold mt-0.5">
                                {prestige >= MAX_PRESTIGE ? 'MAX' : `Requires ${MAX_REBIRTHS} Rebirths`}
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Sidebar (Right) */}
            <div className="w-[480px] bg-[#0A0A0A] border-l border-white/5 flex flex-col z-20 overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black tracking-tight">UPGRADES</h2>
                        <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest leading-loose">Max Level 10 per core</div>
                    </div>
                    <div className="bg-zinc-900 border border-white/5 px-4 py-2 rounded-xl text-xs font-black text-zinc-400">
                        {Object.values(ownedUpgrades).reduce((a, b) => a + b, 0)} / 400
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {UPGRADES.map((upgrade) => {
                        const count = ownedUpgrades[upgrade.id] || 0;
                        const isMax = count >= 10;
                        const cost = getUpgradeCost(upgrade);
                        const canAfford = points >= cost && !isMax;

                        return (
                            <button
                                key={upgrade.id}
                                disabled={!canAfford || isMax}
                                onClick={() => buyUpgrade(upgrade)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all relative overflow-hidden group 
                                    ${isMax
                                        ? 'bg-zinc-900/20 border-zinc-800 opacity-30 cursor-default'
                                        : canAfford
                                            ? 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900 hover:border-blue-500/30 active:scale-[0.98]'
                                            : 'bg-zinc-950 border-white/5 opacity-50 cursor-not-allowed'}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 
                                    ${canAfford ? 'bg-blue-600/10 text-blue-400' : isMax ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-900 text-zinc-600'}`}>
                                    {upgrade.icon}
                                </div>

                                <div className="flex-1 text-left min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <div className="text-xs font-black truncate pr-2">{upgrade.name}</div>
                                        <div className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${isMax ? 'bg-blue-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                                            {isMax ? 'MAX' : `LVL ${count}`}
                                        </div>
                                    </div>
                                    <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight mb-1">{upgrade.description}</div>
                                    {!isMax && (
                                        <div className={`text-sm font-black tabular-nums ${canAfford ? 'text-white' : 'text-zinc-600'}`}>
                                            {formatNumber(cost)}
                                        </div>
                                    )}
                                </div>

                                {!isMax && (
                                    <div className={`p-1.5 rounded-full transition-all ${canAfford ? 'bg-blue-500 text-black' : 'bg-zinc-800 text-zinc-600'}`}>
                                        <ChevronRight size={14} strokeWidth={4} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Floating Clicks */}
            {clicks.map(click => (
                <div
                    key={click.id}
                    className="fixed pointer-events-none text-blue-400 font-black text-3xl animate-float-up z-[100] drop-shadow-lg"
                    style={{ left: click.x, top: click.y }}
                >
                    +{formatNumber(click.val)}
                </div>
            ))}

            {/* Roll Animation Overlay */}
            {rolling && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="flex flex-col items-center gap-8">
                        <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <div className="text-2xl font-black tracking-tighter animate-pulse">ROLLING COSMIC WEAPON...</div>
                    </div>
                </div>
            )}

            {/* Roll Result Popup */}
            {rollResult && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[210] p-12 bg-zinc-950 border border-white/10 rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col items-center animate-in zoom-in duration-300">
                    <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-4">New Discovery</div>
                    <div className="text-6xl font-black mb-2" style={{ color: rollResult.color }}>{rollResult.name}</div>
                    <div className="text-2xl font-black text-zinc-500">x{rollResult.multiplier} MULTIPLIER</div>
                    <div className="mt-8 text-xs font-bold text-zinc-400 capitalize bg-zinc-900 px-4 py-2 rounded-full border border-white/5">
                        {rollResult.rarity}
                    </div>
                </div>
            )}

            {/* Index Modal */}
            {showIndex && (
                <div className="fixed inset-0 z-[220] flex items-center justify-center p-12 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setShowIndex(false)} />
                    <div className="relative w-full max-w-5xl h-full max-h-[800px] bg-[#080808] border border-white/5 rounded-[48px] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-10 border-b border-white/5 flex justify-between items-center bg-zinc-900/20">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter">WEAPON INDEX</h2>
                                <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mt-1">
                                    Discovered: {unlockedWeapons.length} / {WEAPONS.length}
                                </p>
                            </div>
                            <button onClick={() => setShowIndex(false)} className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-colors">
                                <ChevronRight className="rotate-90" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-10 grid grid-cols-5 gap-4 custom-scrollbar">
                            {WEAPONS.map(weapon => {
                                const isUnlocked = unlockedWeapons.includes(weapon.id);
                                return (
                                    <div
                                        key={weapon.id}
                                        className={`p-4 rounded-3xl border transition-all flex flex-col items-center text-center gap-2
                                            ${isUnlocked
                                                ? 'bg-zinc-900/40 border-white/5'
                                                : 'bg-black border-zinc-900 opacity-20 grayscale'}`}
                                    >
                                        <div className="text-[8px] font-black uppercase tracking-tighter" style={{ color: isUnlocked ? weapon.color : '#333' }}>
                                            {weapon.rarity}
                                        </div>
                                        <div className="text-[7px] font-bold text-zinc-600">{RARITY_CHANCES[weapon.rarity] || '?'}</div>
                                        <div className="text-[10px] font-black leading-tight line-clamp-1 h-3 flex items-center justify-center">
                                            {isUnlocked ? weapon.name : '??????'}
                                        </div>
                                        <div className="text-xs font-black tabular-nums">
                                            {isUnlocked ? `x${weapon.multiplier}` : 'x??'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Leaderboard Modal */}
            {showLeaderboard && (
                <div className="fixed inset-0 z-[220] flex items-center justify-center p-12 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setShowLeaderboard(false)} />
                    <div className="relative w-full max-w-2xl h-full max-h-[700px] bg-[#080808] border border-white/5 rounded-[48px] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-10 border-b border-white/5 flex justify-between items-center bg-zinc-900/20">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3"><Trophy size={28} className="text-yellow-400" /> LEADERBOARD</h2>
                                <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mt-1">Top Players</p>
                            </div>
                            <button onClick={() => setShowLeaderboard(false)} className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-2xl hover:bg-zinc-800 transition-colors">
                                <ChevronRight className="rotate-90" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar">
                            {leaderboard.map((entry, i) => {
                                const weapon = WEAPONS.find(w => w.id === entry.weapon_id);
                                const isMe = entry.username === profile?.username;
                                return (
                                    <div
                                        key={entry.username}
                                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all
                                            ${isMe ? 'bg-blue-600/10 border-blue-500/30' : 'bg-zinc-900/30 border-white/5'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg
                                            ${i === 0 ? 'bg-yellow-500/20 text-yellow-400'
                                                : i === 1 ? 'bg-zinc-400/20 text-zinc-300'
                                                    : i === 2 ? 'bg-orange-500/20 text-orange-400'
                                                        : 'bg-zinc-800 text-zinc-500'}`}
                                        >
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-black truncate">
                                                {isMe ? '★ ' : ''}{entry.username}
                                            </div>
                                            <div className="text-[10px] text-zinc-500 font-bold flex items-center gap-2">
                                                <span>{formatNumber(Number(entry.points))} credits</span>
                                                {weapon && (
                                                    <span style={{ color: weapon.color }}>• {weapon.name}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-right">
                                            {entry.prestige > 0 && (
                                                <div className="px-2 py-1 bg-purple-500/20 rounded-lg text-[10px] font-black text-purple-400">
                                                    ★{entry.prestige}
                                                </div>
                                            )}
                                            <div className="px-2 py-1 bg-blue-500/20 rounded-lg text-[10px] font-black text-blue-400">
                                                R{entry.rebirths}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {leaderboard.length === 0 && (
                                <div className="text-center text-zinc-600 text-sm font-bold py-20">No players yet</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes float-up {
                    0% { transform: translate(-50%, 0) scale(1); opacity: 1; filter: blur(0px); }
                    100% { transform: translate(-50%, -150px) scale(1.5); opacity: 0; filter: blur(4px); }
                }
                .animate-float-up {
                    animation: float-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 15s linear infinite;
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
}
