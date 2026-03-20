import type { Component } from "solid-js";
import { profile } from "../store/profile";
import { totalDayMinutes, totalNightMinutes, totalMinutes } from "../store/drives";
import PixelProgressBar from "../components/PixelProgressBar";

const Dashboard: Component = () => {
  const p = () => profile()!;

  return (
    <div class="min-h-screen p-4 pb-20">
      <h1 class="font-pixel text-primary text-lg mb-6">
        Hey, {p().name}!
      </h1>

      <PixelProgressBar
        current={totalMinutes()}
        target={p().overallTarget}
        label="Overall Hours"
        variant="day"
      />

      <PixelProgressBar
        current={totalNightMinutes()}
        target={p().nightTarget}
        label="Nighttime Hours"
        variant="night"
      />
    </div>
  );
};

export default Dashboard;
