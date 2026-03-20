import { createMemo } from "solid-js";
import type { AchievementDef, Drive, Profile } from "../types";
import { drives } from "./drives";
import { profile } from "./profile";

function getISOWeek(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const yearStart = new Date(d.getFullYear(), 0, 4);
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + yearStart.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

function hasConsecutiveDates(drives: Drive[], count: number): boolean {
  if (drives.length < count) return false;
  const dates = [...new Set(drives.map((d) => d.date))].sort();
  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1] + "T00:00:00");
    const curr = new Date(dates[i] + "T00:00:00");
    const diff = (curr.getTime() - prev.getTime()) / 86400000;
    if (diff === 1) {
      streak++;
      if (streak >= count) return true;
    } else {
      streak = 1;
    }
  }
  return streak >= count;
}

export const achievementDefs: AchievementDef[] = [
  {
    id: "road-rookie",
    name: "Road Rookie",
    description: "Log your first drive",
    icon: "🚗",
    evaluate: (drives) => drives.length >= 1,
  },
  {
    id: "night-starter",
    name: "Night Starter",
    description: "Log your first nighttime minutes",
    icon: "🌙",
    evaluate: (drives) => drives.some((d) => d.nightMinutes > 0),
  },
  {
    id: "halfway-there",
    name: "Halfway There",
    description: "Reach 50% of your overall hour target",
    icon: "🛣️",
    evaluate: (drives, profile) => {
      const total = drives.reduce((s, d) => s + d.dayMinutes + d.nightMinutes, 0);
      return total / 60 >= profile.overallTarget / 2;
    },
  },
  {
    id: "midnight-halfway",
    name: "Midnight Halfway",
    description: "Reach 50% of your nighttime hour target",
    icon: "🌃",
    evaluate: (drives, profile) => {
      const total = drives.reduce((s, d) => s + d.nightMinutes, 0);
      return total / 60 >= profile.nightTarget / 2;
    },
  },
  {
    id: "road-complete",
    name: "Road Complete",
    description: "Reach your overall hour target",
    icon: "🏁",
    evaluate: (drives, profile) => {
      const total = drives.reduce((s, d) => s + d.dayMinutes + d.nightMinutes, 0);
      return total / 60 >= profile.overallTarget;
    },
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Reach your nighttime hour target",
    icon: "🦉",
    evaluate: (drives, profile) => {
      const total = drives.reduce((s, d) => s + d.nightMinutes, 0);
      return total / 60 >= profile.nightTarget;
    },
  },
  {
    id: "weekend-warrior",
    name: "Weekend Warrior",
    description: "Log a drive on a weekend",
    icon: "🎮",
    evaluate: (drives) =>
      drives.some((d) => {
        const day = new Date(d.date + "T00:00:00").getDay();
        return day === 0 || day === 6;
      }),
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Log a drive before 8 AM",
    icon: "🐦",
    evaluate: (drives) =>
      drives.some((d) => new Date(d.createdAt).getHours() < 8),
  },
  {
    id: "five-alive",
    name: "Five Alive",
    description: "Log 5 drives",
    icon: "🖐️",
    evaluate: (drives) => drives.length >= 5,
  },
  {
    id: "double-digits",
    name: "Double Digits",
    description: "Log 10 drives",
    icon: "🔟",
    evaluate: (drives) => drives.length >= 10,
  },
  {
    id: "streak-star",
    name: "Streak Star",
    description: "Drive 3 days in a row",
    icon: "⭐",
    evaluate: (drives) => hasConsecutiveDates(drives, 3),
  },
  {
    id: "road-tripper",
    name: "Road Tripper",
    description: "Log a single drive of 60+ minutes",
    icon: "🗺️",
    evaluate: (drives) =>
      drives.some((d) => d.dayMinutes + d.nightMinutes >= 60),
  },
  {
    id: "commentator",
    name: "Commentator",
    description: "Add comments to 5 drives",
    icon: "💬",
    evaluate: (drives) =>
      drives.filter((d) => d.comment.trim() !== "").length >= 5,
  },
  {
    id: "consistent-cruiser",
    name: "Consistent Cruiser",
    description: "Log drives across 4 different weeks",
    icon: "📅",
    evaluate: (drives) => {
      const weeks = new Set(drives.map((d) => getISOWeek(d.date)));
      return weeks.size >= 4;
    },
  },
  {
    id: "night-rider",
    name: "Night Rider",
    description: "Log 5 drives with nighttime minutes",
    icon: "🏍️",
    evaluate: (drives) =>
      drives.filter((d) => d.nightMinutes > 0).length >= 5,
  },
  {
    id: "sweet-sixteen",
    name: "Sweet Sixteen",
    description: "Earn all 15 other achievements",
    icon: "👑",
    evaluate: (drives, profile) => {
      return achievementDefs
        .filter((a) => a.id !== "sweet-sixteen")
        .every((a) => a.evaluate(drives, profile));
    },
  },
];

export function evaluateAchievements(
  drives: Drive[],
  profile: Profile | null
): Set<string> {
  if (!profile || drives.length === 0) return new Set();
  const earned = new Set<string>();
  for (const def of achievementDefs) {
    if (def.evaluate(drives, profile)) {
      earned.add(def.id);
    }
  }
  return earned;
}

export const earnedAchievements = createMemo(() =>
  evaluateAchievements(drives(), profile())
);
