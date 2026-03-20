import { Component } from "solid-js";

interface Props {
  current: number; // minutes
  target: number;  // hours
  label: string;
  variant: "day" | "night";
}

const PixelProgressBar: Component<Props> = (props) => {
  const percentage = () => {
    if (props.target <= 0) return 0;
    return Math.min(((props.current / 60) / props.target) * 100, 100);
  };

  const hours = () => (props.current / 60).toFixed(1);

  const roadColor = () => props.variant === "day" ? "#555" : "#333";
  const lineColor = () => props.variant === "day" ? "#FFD54F" : "#7986CB";
  const skyTop = () => props.variant === "day" ? "#87CEEB" : "#0D1117";
  const skyBottom = () => props.variant === "day" ? "#E1F5FE" : "#1A1A2E";
  const labelColor = () => props.variant === "day" ? "#4CAF50" : "#7986CB";

  return (
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <span class="font-pixel text-[10px]" style={{ color: labelColor() }}>
          {props.label}
        </span>
        <span class="font-pixel text-[10px] text-gray-300">
          {hours()} / {props.target} hours
        </span>
      </div>

      {/* Road container */}
      <div
        class="relative h-16 border-2 overflow-hidden"
        style={{
          "border-color": labelColor(),
          background: `linear-gradient(180deg, ${skyTop()} 0%, ${skyBottom()} 40%, ${roadColor()} 40%, ${roadColor()} 100%)`,
        }}
      >
        {/* Stars for night variant */}
        {props.variant === "night" && (
          <>
            <div class="absolute w-1 h-1 bg-white rounded-full" style={{ top: "4px", left: "15%" }} />
            <div class="absolute w-1 h-1 bg-white rounded-full" style={{ top: "8px", left: "45%" }} />
            <div class="absolute w-1 h-1 bg-white rounded-full" style={{ top: "3px", left: "70%" }} />
            <div class="absolute w-1 h-1 bg-white rounded-full" style={{ top: "10px", left: "85%" }} />
            <div class="absolute w-1 h-1 bg-yellow-200 rounded-full" style={{ top: "6px", left: "30%" }} />
          </>
        )}

        {/* Road dashes */}
        <div
          class="absolute w-full h-[2px] top-[70%]"
          style={{
            "background-image": `repeating-linear-gradient(90deg, ${lineColor()} 0px, ${lineColor()} 12px, transparent 12px, transparent 24px)`,
          }}
        />

        {/* Finish flag */}
        <div class="absolute right-2 top-[40%] bottom-0 flex items-center">
          <div class="font-pixel text-[8px]" style={{ color: labelColor() }}>🏁</div>
        </div>

        {/* Car sprite */}
        <div
          class="absolute top-[45%] transition-all duration-500 ease-out"
          style={{ left: `calc(${percentage()}% - ${percentage() > 5 ? 20 : 0}px)` }}
        >
          <div class="relative" style={{ width: "28px", height: "16px" }}>
            {/* Car body */}
            <div
              style={{
                width: "4px",
                height: "4px",
                position: "absolute",
                top: "0",
                left: "0",
                "box-shadow": props.variant === "day"
                  ? `
                    4px 0 #e53935, 8px 0 #e53935, 12px 0 #e53935,
                    0px 4px #e53935, 4px 4px #c62828, 8px 4px #c62828, 12px 4px #c62828, 16px 4px #e53935,
                    -4px 8px #333, 0px 8px #e53935, 4px 8px #e53935, 8px 8px #e53935, 12px 8px #e53935, 16px 8px #e53935, 20px 8px #333
                  `
                  : `
                    4px 0 #5C6BC0, 8px 0 #5C6BC0, 12px 0 #5C6BC0,
                    0px 4px #5C6BC0, 4px 4px #3F51B5, 8px 4px #3F51B5, 12px 4px #3F51B5, 16px 4px #5C6BC0,
                    -4px 8px #333, 0px 8px #5C6BC0, 4px 8px #5C6BC0, 8px 8px #5C6BC0, 12px 8px #5C6BC0, 16px 8px #5C6BC0, 20px 8px #333
                  `,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelProgressBar;
