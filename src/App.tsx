import type { Component } from "solid-js";
import { profile, setProfile } from "./store/profile";
import {
  drives,
  addDrive,
  totalDayMinutes,
  totalNightMinutes,
  totalMinutes,
} from "./store/drives";

const App: Component = () => {
  const handleSetProfile = () => {
    setProfile({ name: "Sarah", overallTarget: 50, nightTarget: 10 });
  };

  const handleAddDrive = () => {
    addDrive({
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      dayMinutes: 30,
      nightMinutes: 15,
      comment: "Test drive",
      createdAt: Date.now(),
    });
  };

  return (
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="text-center">
        <h1 class="font-pixel text-primary text-xl mb-4">DriveBit</h1>
        <p class="text-gray-400 mb-4">Store Layer Test</p>

        <div class="mb-4">
          <p class="text-sm text-gray-300 mb-2">
            Profile: {profile() ? profile()!.name : "None"}
          </p>
          <button
            class="px-4 py-2 border-2 border-primary text-primary font-pixel text-xs mr-2"
            onClick={handleSetProfile}
          >
            Set Profile
          </button>
        </div>

        <div class="mb-4">
          <p class="text-sm text-gray-300 mb-2">
            Drives: {drives().length} | Day: {totalDayMinutes()}m | Night:{" "}
            {totalNightMinutes()}m | Total: {totalMinutes()}m
          </p>
          <button
            class="px-4 py-2 border-2 border-accent text-accent font-pixel text-xs"
            onClick={handleAddDrive}
          >
            Add Drive
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
