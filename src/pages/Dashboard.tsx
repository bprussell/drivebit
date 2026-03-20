import type { Component } from "solid-js";
import { profile } from "../store/profile";
import { addDrive, totalDayMinutes, totalNightMinutes, totalMinutes } from "../store/drives";
import PixelProgressBar from "../components/PixelProgressBar";
import DriveForm from "../components/DriveForm";
import type { Drive } from "../types";

const Dashboard: Component = () => {
  const p = () => profile()!;

  const handleSave = (drive: Drive) => {
    addDrive(drive);
  };

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

      <div class="mt-6 p-4 border-2 border-primary bg-[#16213E]">
        <h2 class="font-pixel text-primary text-sm mb-4">Log a Drive</h2>
        <DriveForm onSave={handleSave} />
      </div>
    </div>
  );
};

export default Dashboard;
