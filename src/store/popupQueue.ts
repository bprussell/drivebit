import { createSignal } from "solid-js";
import type { AchievementDef } from "../types";
import { achievementDefs, evaluateAchievements } from "./achievements";
import { drives } from "./drives";
import { profile } from "./profile";

const [popupQueue, setPopupQueue] = createSignal<AchievementDef[]>([]);

export function checkForNewAchievements(previousEarned: Set<string>) {
  const currentEarned = evaluateAchievements(drives(), profile());
  const newlyEarned: AchievementDef[] = [];

  for (const id of currentEarned) {
    if (!previousEarned.has(id)) {
      const def = achievementDefs.find((a) => a.id === id);
      if (def) newlyEarned.push(def);
    }
  }

  if (newlyEarned.length > 0) {
    setPopupQueue((prev) => [...prev, ...newlyEarned]);
  }
}

export function dismissPopup() {
  setPopupQueue((prev) => prev.slice(1));
}

export function currentPopup() {
  const queue = popupQueue();
  return queue.length > 0 ? queue[0] : null;
}

export { popupQueue };
