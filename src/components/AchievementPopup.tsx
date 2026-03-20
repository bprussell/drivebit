import { Component, createSignal, onMount, onCleanup } from "solid-js";
import type { AchievementDef } from "../types";

interface Props {
  achievement: AchievementDef;
  onDismiss: () => void;
}

const AchievementPopup: Component<Props> = (props) => {
  const [visible, setVisible] = createSignal(false);

  onMount(() => {
    // Trigger animation on next frame
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      props.onDismiss();
    }, 3000);

    onCleanup(() => clearTimeout(timer));
  });

  return (
    <div
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-200 p-4 cursor-pointer"
      onClick={() => props.onDismiss()}
    >
      <div
        class="text-center"
        classList={{ "animate-bounce-in": visible() }}
        style={{ opacity: visible() ? undefined : "0" }}
      >
        {/* Sparkle effects */}
        <div class="relative inline-block">
          <span class="absolute -top-4 -left-4 text-xl" style={{ animation: "sparkle 1s ease-in-out infinite" }}>✨</span>
          <span class="absolute -top-2 -right-6 text-lg" style={{ animation: "sparkle 1s ease-in-out 0.3s infinite" }}>✨</span>
          <span class="absolute -bottom-2 -left-6 text-lg" style={{ animation: "sparkle 1s ease-in-out 0.6s infinite" }}>✨</span>
          <span class="absolute -bottom-4 -right-4 text-xl" style={{ animation: "sparkle 1s ease-in-out 0.15s infinite" }}>✨</span>

          <span class="text-6xl block mb-4">{props.achievement.icon}</span>
        </div>

        <div class="animate-fade-in" style={{ "animation-delay": "0.3s", opacity: "0" }}>
          <p class="font-pixel text-primary text-sm mb-2">Achievement Unlocked!</p>
          <p class="font-pixel text-accent text-lg mb-2">{props.achievement.name}</p>
          <p class="text-gray-300 text-sm">{props.achievement.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementPopup;
