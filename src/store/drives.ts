import { createSignal, createEffect, createMemo } from "solid-js";
import type { Drive } from "../types";

const STORAGE_KEY = "drivebit-drives";

function loadDrives(): Drive[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Drive[];
  } catch {
    return [];
  }
}

function saveDrives(d: Drive[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
}

const [drives, setDrives] = createSignal<Drive[]>(loadDrives());

createEffect(() => saveDrives(drives()));

// CRUD operations
function addDrive(drive: Drive) {
  setDrives((prev) => [...prev, drive]);
}

function updateDrive(id: string, updates: Partial<Omit<Drive, "id">>) {
  setDrives((prev) =>
    prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
  );
}

function deleteDrive(id: string) {
  setDrives((prev) => prev.filter((d) => d.id !== id));
}

// Computed totals
const totalDayMinutes = createMemo(() =>
  drives().reduce((sum, d) => sum + d.dayMinutes, 0)
);

const totalNightMinutes = createMemo(() =>
  drives().reduce((sum, d) => sum + d.nightMinutes, 0)
);

const totalMinutes = createMemo(() => totalDayMinutes() + totalNightMinutes());

export {
  drives,
  setDrives,
  addDrive,
  updateDrive,
  deleteDrive,
  totalDayMinutes,
  totalNightMinutes,
  totalMinutes,
};
