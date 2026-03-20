import { Component, For, Show, createMemo } from "solid-js";
import { drives } from "../store/drives";

function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

const Report: Component = () => {
  const byDate = createMemo(() => {
    const map = new Map<string, { day: number; night: number }>();
    for (const d of drives()) {
      const entry = map.get(d.date) || { day: 0, night: 0 };
      entry.day += d.dayMinutes;
      entry.night += d.nightMinutes;
      map.set(d.date, entry);
    }
    return [...map.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, vals]) => ({ date, ...vals }));
  });

  const totals = createMemo(() => {
    let day = 0;
    let night = 0;
    for (const row of byDate()) {
      day += row.day;
      night += row.night;
    }
    return { day, night, overall: day + night };
  });

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    return `${m}/${d}/${y}`;
  };

  return (
    <div class="min-h-screen p-4 pb-20">
      <h1 class="font-pixel text-primary text-lg mb-6">Report</h1>

      <Show
        when={drives().length > 0}
        fallback={
          <div class="text-center mt-12 p-6 border-2 border-gray-600">
            <p class="font-pixel text-[10px] text-gray-400 leading-relaxed">
              No drives yet!<br />
              Log some drives to see your report.
            </p>
          </div>
        }
      >
        {/* Header */}
        <div class="grid grid-cols-3 gap-2 mb-2 px-2">
          <span class="font-pixel text-[8px] text-gray-400">Date</span>
          <span class="font-pixel text-[8px] text-gray-400 text-center">☀️ Day</span>
          <span class="font-pixel text-[8px] text-gray-400 text-center">🌙 Night</span>
        </div>

        {/* Rows */}
        <div class="flex flex-col gap-1">
          <For each={byDate()}>
            {(row) => (
              <div class="grid grid-cols-3 gap-2 p-2 border-2 border-[#16213E] bg-[#16213E]">
                <span class="font-pixel text-[9px] text-gray-300">{formatDate(row.date)}</span>
                <span class="text-sm text-gray-300 text-center">{formatMinutes(row.day)}</span>
                <span class="text-sm text-gray-300 text-center">{formatMinutes(row.night)}</span>
              </div>
            )}
          </For>
        </div>

        {/* Totals */}
        <div class="mt-4 p-3 border-2 border-primary bg-[#16213E]">
          <p class="font-pixel text-[10px] text-primary mb-3">Totals</p>
          <div class="grid grid-cols-3 gap-2">
            <span class="font-pixel text-[9px] text-gray-400">Day</span>
            <span class="font-pixel text-[9px] text-gray-400">Night</span>
            <span class="font-pixel text-[9px] text-gray-400">Overall</span>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-1">
            <span class="text-sm text-gray-300">{formatMinutes(totals().day)}</span>
            <span class="text-sm text-gray-300">{formatMinutes(totals().night)}</span>
            <span class="text-sm text-primary font-bold">{formatMinutes(totals().overall)}</span>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default Report;
