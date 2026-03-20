import { Component, For } from "solid-js";
import { achievementDefs } from "../store/achievements";
import AchievementTile from "./AchievementTile";

interface Props {
  earned: Set<string>;
}

const AchievementGrid: Component<Props> = (props) => {
  return (
    <div class="grid grid-cols-4 gap-2 max-w-md mx-auto">
      <For each={achievementDefs}>
        {(achievement) => (
          <AchievementTile
            achievement={achievement}
            earned={props.earned.has(achievement.id)}
          />
        )}
      </For>
    </div>
  );
};

export default AchievementGrid;
