import { Component, createSignal, Show } from "solid-js";
import type { AchievementDef } from "../types";

interface Props {
  achievement: AchievementDef;
  earned: boolean;
}

const AchievementTile: Component<Props> = (props) => {
  const [showInfo, setShowInfo] = createSignal(false);

  return (
    <>
      <div
        class="relative flex flex-col items-center justify-center p-2 border-2 cursor-pointer transition-all aspect-square"
        classList={{
          "border-primary bg-[#16213E] animate-glow": props.earned,
          "border-gray-700 bg-[#0D1117] grayscale opacity-50": !props.earned,
        }}
        onClick={() => setShowInfo(true)}
      >
        <span class="text-2xl mb-1">{props.earned ? props.achievement.icon : "🔒"}</span>
        <span class="font-pixel text-[7px] text-center text-gray-300 leading-tight">
          {props.achievement.name}
        </span>
      </div>

      <Show when={showInfo()}>
        <div
          class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-100 p-4"
          onClick={() => setShowInfo(false)}
        >
          <div
            class="bg-[#16213E] border-2 p-6 max-w-xs w-full text-center"
            classList={{
              "border-primary": props.earned,
              "border-gray-600": !props.earned,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span class="text-4xl block mb-3">{props.achievement.icon}</span>
            <p class="font-pixel text-sm text-primary mb-2">{props.achievement.name}</p>
            <p class="text-gray-300 text-sm mb-4">{props.achievement.description}</p>
            <p class="font-pixel text-[10px]" classList={{ "text-primary": props.earned, "text-gray-500": !props.earned }}>
              {props.earned ? "✓ Earned" : "Locked"}
            </p>
            <button
              class="mt-4 bg-transparent border-gray-600 text-gray-300 text-[10px] px-4 py-2"
              onClick={() => setShowInfo(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Show>
    </>
  );
};

export default AchievementTile;
