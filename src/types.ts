export interface Profile {
  name: string;
  overallTarget: number; // target hours (not minutes)
  nightTarget: number; // target hours (not minutes)
}

export interface Drive {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  dayMinutes: number;
  nightMinutes: number;
  comment: string;
  createdAt: number; // Unix timestamp of when entry was created
}

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  evaluate: (drives: Drive[], profile: Profile) => boolean;
}
