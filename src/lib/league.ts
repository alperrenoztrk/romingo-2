const LEAGUE_STATE_KEY = "romingo.leagueState.v1";

const LEAGUE_TIERS = ["Bronz", "Gümüş", "Altın", "Safir", "Elmas"] as const;
const OPPONENT_NAMES = ["Ayşe", "Mehmet", "Zeynep", "Ali", "Fatma", "Emre", "Selin", "Can", "Deniz", "Mert", "Ece", "Bora"];
const OPPONENT_AVATARS = ["👩", "👨", "👧", "🧑", "👩‍🦱", "👦", "👩‍🦰", "🧔", "🧑‍🦱", "👨‍🦱", "👩‍🎓", "🧑‍🎓"];

export type LeagueTier = (typeof LEAGUE_TIERS)[number];

export interface LeaguePlayer {
  id: string;
  name: string;
  avatar: string;
  xp: number;
}

export interface LeagueWeekSummary {
  weekKey: string;
  fromLeague: LeagueTier;
  toLeague: LeagueTier;
  previousRank: number;
  movement: "promotion" | "relegation" | "stay";
}

interface LeagueState {
  weekKey: string;
  leagueIndex: number;
  userXp: number;
  opponents: LeaguePlayer[];
  lastWeekSummary?: LeagueWeekSummary;
}

export interface RankedLeaguePlayer extends LeaguePlayer {
  rank: number;
  isYou: boolean;
}

function getStartOfWeek(date: Date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  const mondayOffset = (normalized.getDay() + 6) % 7;
  normalized.setDate(normalized.getDate() - mondayOffset);
  return normalized;
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekKey(date = new Date()) {
  return toDateKey(getStartOfWeek(date));
}

function hashSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function createWeekOpponents(weekKey: string, leagueIndex: number): LeaguePlayer[] {
  const seed = hashSeed(`${weekKey}:${leagueIndex}`);

  return Array.from({ length: 9 }).map((_, index) => {
    const poolIndex = (seed + index * 7) % OPPONENT_NAMES.length;
    const baseXp = 260 + leagueIndex * 110 + ((seed >> (index % 8)) % 420);
    return {
      id: `opponent-${index}`,
      name: OPPONENT_NAMES[poolIndex],
      avatar: OPPONENT_AVATARS[poolIndex],
      xp: baseXp,
    };
  });
}

function sanitizeState(parsed: unknown): LeagueState | null {
  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  const maybe = parsed as Partial<LeagueState>;

  if (typeof maybe.weekKey !== "string") {
    return null;
  }

  if (typeof maybe.leagueIndex !== "number" || !Number.isFinite(maybe.leagueIndex)) {
    return null;
  }

  const leagueIndex = Math.min(Math.max(0, Math.floor(maybe.leagueIndex)), LEAGUE_TIERS.length - 1);
  const userXp = typeof maybe.userXp === "number" && Number.isFinite(maybe.userXp) ? Math.max(0, Math.floor(maybe.userXp)) : 0;

  const opponents = Array.isArray(maybe.opponents)
    ? maybe.opponents.filter((player): player is LeaguePlayer => {
      return Boolean(
        player &&
          typeof player === "object" &&
          typeof player.id === "string" &&
          typeof player.name === "string" &&
          typeof player.avatar === "string" &&
          typeof player.xp === "number" &&
          Number.isFinite(player.xp),
      );
    }).slice(0, 9)
    : [];

  return {
    weekKey: maybe.weekKey,
    leagueIndex,
    userXp,
    opponents,
    lastWeekSummary: maybe.lastWeekSummary,
  };
}

function saveLeagueState(state: LeagueState) {
  localStorage.setItem(LEAGUE_STATE_KEY, JSON.stringify(state));
}

function createFreshState(weekKey: string, leagueIndex = 0, lastWeekSummary?: LeagueWeekSummary): LeagueState {
  const state: LeagueState = {
    weekKey,
    leagueIndex,
    userXp: 0,
    opponents: createWeekOpponents(weekKey, leagueIndex),
    lastWeekSummary,
  };

  saveLeagueState(state);
  return state;
}

function resolveWeekTransition(state: LeagueState, currentWeekKey: string) {
  const ranked = getRankedLeaguePlayers(state);
  const yourRank = ranked.find((player) => player.isYou)?.rank ?? 10;

  let nextLeagueIndex = state.leagueIndex;
  let movement: LeagueWeekSummary["movement"] = "stay";

  if (yourRank <= 3 && state.leagueIndex < LEAGUE_TIERS.length - 1) {
    nextLeagueIndex += 1;
    movement = "promotion";
  } else if (yourRank >= 9 && state.leagueIndex > 0) {
    nextLeagueIndex -= 1;
    movement = "relegation";
  }

  const lastWeekSummary: LeagueWeekSummary = {
    weekKey: state.weekKey,
    fromLeague: LEAGUE_TIERS[state.leagueIndex],
    toLeague: LEAGUE_TIERS[nextLeagueIndex],
    previousRank: yourRank,
    movement,
  };

  return createFreshState(currentWeekKey, nextLeagueIndex, lastWeekSummary);
}

export function getLeagueState() {
  const currentWeekKey = getWeekKey();
  const raw = localStorage.getItem(LEAGUE_STATE_KEY);

  if (!raw) {
    return createFreshState(currentWeekKey);
  }

  try {
    const parsed = sanitizeState(JSON.parse(raw));
    if (!parsed) {
      return createFreshState(currentWeekKey);
    }

    if (parsed.weekKey !== currentWeekKey) {
      return resolveWeekTransition(parsed, currentWeekKey);
    }

    if (parsed.opponents.length < 9) {
      parsed.opponents = createWeekOpponents(parsed.weekKey, parsed.leagueIndex);
      saveLeagueState(parsed);
    }

    return parsed;
  } catch {
    return createFreshState(currentWeekKey);
  }
}

export function getRankedLeaguePlayers(state = getLeagueState()): RankedLeaguePlayer[] {
  const players: RankedLeaguePlayer[] = [
    ...state.opponents.map((player) => ({ ...player, rank: 0, isYou: false })),
    { id: "you", name: "Sen", avatar: "🦩", xp: state.userXp, rank: 0, isYou: true },
  ];

  const sorted = players.sort((a, b) => {
    if (b.xp !== a.xp) {
      return b.xp - a.xp;
    }
    return a.name.localeCompare(b.name, "tr");
  });

  return sorted.map((player, index) => ({ ...player, rank: index + 1 }));
}

export function addLeagueXp(amount: number) {
  if (amount <= 0) {
    return;
  }

  const state = getLeagueState();
  state.userXp += Math.floor(amount);
  saveLeagueState(state);
  window.dispatchEvent(new Event("romingo:league-updated"));
}

export function getLeagueMeta() {
  const state = getLeagueState();
  return {
    tierName: LEAGUE_TIERS[state.leagueIndex],
    weekKey: state.weekKey,
    lastWeekSummary: state.lastWeekSummary,
  };
}

export function getTimeUntilReset(now = new Date()) {
  const currentWeekStart = getStartOfWeek(now);
  const nextWeekStart = new Date(currentWeekStart);
  nextWeekStart.setDate(currentWeekStart.getDate() + 7);

  const diffMs = Math.max(0, nextWeekStart.getTime() - now.getTime());
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  return { days, hours };
}
