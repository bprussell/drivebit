import { createSignal, createEffect } from "solid-js";
import type { Profile } from "../types";

const STORAGE_KEY = "drivebit-profile";

function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

function saveProfile(p: Profile | null) {
  if (p === null) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }
}

const [profile, setProfile] = createSignal<Profile | null>(loadProfile());

createEffect(() => saveProfile(profile()));

export { profile, setProfile };
