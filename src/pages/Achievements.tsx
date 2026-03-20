import type { Component } from "solid-js";
import { earnedAchievements } from "../store/achievements";
import AchievementGrid from "../components/AchievementGrid";

const Achievements: Component = () => {
  return (
    <div class="min-h-screen p-4 pb-20">
      <h1 class="font-pixel text-primary text-lg mb-2">Achievements</h1>
      <p class="text-gray-400 text-sm mb-6">
        {earnedAchievements().size} / 16 earned
      </p>
      <AchievementGrid earned={earnedAchievements()} />
    </div>
  );
};

export default Achievements;
