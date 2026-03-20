import { Component, createSignal, createMemo, For, Show } from "solid-js";

interface Props {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DatePicker: Component<Props> = (props) => {
  const [open, setOpen] = createSignal(false);

  const selectedDate = () => {
    const [y, m, d] = props.value.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const [viewYear, setViewYear] = createSignal(selectedDate().getFullYear());
  const [viewMonth, setViewMonth] = createSignal(selectedDate().getMonth());

  const calendarDays = createMemo(() => {
    const year = viewYear();
    const month = viewMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  });

  const displayDate = () => {
    const d = selectedDate();
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const isSelected = (day: number) => {
    const d = selectedDate();
    return d.getFullYear() === viewYear() && d.getMonth() === viewMonth() && d.getDate() === day;
  };

  const isToday = (day: number) => {
    const now = new Date();
    return now.getFullYear() === viewYear() && now.getMonth() === viewMonth() && now.getDate() === day;
  };

  const selectDay = (day: number) => {
    const m = String(viewMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    props.onChange(`${viewYear()}-${m}-${d}`);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth() === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth() === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  return (
    <div class="relative">
      <button
        type="button"
        class="w-full text-left bg-[#16213E] border-2 border-primary text-gray-300 px-3 py-2 min-h-[44px] font-sans text-base"
        onClick={() => {
          setViewYear(selectedDate().getFullYear());
          setViewMonth(selectedDate().getMonth());
          setOpen(!open());
        }}
      >
        📅 {displayDate()}
      </button>

      <Show when={open()}>
        <div class="absolute z-50 mt-1 left-0 bg-[#16213E] border-2 border-primary p-3 w-[280px]">
          {/* Month/Year nav */}
          <div class="flex justify-between items-center mb-3">
            <button
              type="button"
              class="bg-transparent border-none text-primary font-pixel text-xs px-2 py-1 min-h-0"
              onClick={prevMonth}
            >
              ◀
            </button>
            <span class="font-pixel text-[10px] text-gray-300">
              {MONTHS[viewMonth()]} {viewYear()}
            </span>
            <button
              type="button"
              class="bg-transparent border-none text-primary font-pixel text-xs px-2 py-1 min-h-0"
              onClick={nextMonth}
            >
              ▶
            </button>
          </div>

          {/* Day headers */}
          <div class="grid grid-cols-7 gap-1 mb-1">
            <For each={DAYS}>
              {(day) => (
                <span class="font-pixel text-[7px] text-gray-500 text-center">{day}</span>
              )}
            </For>
          </div>

          {/* Day grid */}
          <div class="grid grid-cols-7 gap-2">
            <For each={calendarDays()}>
              {(day) => (
                <Show when={day !== null} fallback={<div />}>
                  <button
                    type="button"
                    class="text-sm text-center w-8 h-8 min-h-0 p-0 border-none transition-colors mx-auto"
                    classList={{
                      "bg-primary text-[#1A1A2E] font-bold": isSelected(day!),
                      "bg-transparent text-gray-300 hover:bg-[#1A1A2E]": !isSelected(day!) && !isToday(day!),
                      "bg-transparent text-accent": isToday(day!) && !isSelected(day!),
                    }}
                    onClick={() => selectDay(day!)}
                  >
                    {day}
                  </button>
                </Show>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default DatePicker;
