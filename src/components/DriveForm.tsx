import { Component, createSignal, Show } from "solid-js";
import type { Drive } from "../types";
import DatePicker from "./DatePicker";

interface Props {
  drive?: Drive;
  onSave: (drive: Drive) => void;
  onDelete?: () => void;
}

const DriveForm: Component<Props> = (props) => {
  const isEdit = () => !!props.drive;
  const today = () => new Date().toISOString().split("T")[0];

  const [date, setDate] = createSignal(props.drive?.date ?? today());
  const [dayMinutes, setDayMinutes] = createSignal(props.drive?.dayMinutes ?? 0);
  const [nightMinutes, setNightMinutes] = createSignal(props.drive?.nightMinutes ?? 0);
  const [comment, setComment] = createSignal(props.drive?.comment ?? "");
  const [error, setError] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (dayMinutes() <= 0 && nightMinutes() <= 0) {
      setError("Log at least 1 minute of day or night driving.");
      return;
    }
    setError("");

    const drive: Drive = {
      id: props.drive?.id ?? Date.now().toString(),
      date: date(),
      dayMinutes: dayMinutes(),
      nightMinutes: nightMinutes(),
      comment: comment().trim(),
      createdAt: props.drive?.createdAt ?? Date.now(),
    };

    props.onSave(drive);

    if (!isEdit()) {
      setDate(today());
      setDayMinutes(0);
      setNightMinutes(0);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-4">
        <label class="font-pixel text-[10px] text-gray-300 block mb-2">Date</label>
        <DatePicker value={date()} onChange={setDate} />
      </div>

      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          <label class="font-pixel text-[10px] text-gray-300 block mb-2">Day Min</label>
          <input
            type="number"
            value={dayMinutes()}
            onInput={(e) => setDayMinutes(Number(e.currentTarget.value) || 0)}
            min="0"
          />
        </div>
        <div class="flex-1">
          <label class="font-pixel text-[10px] text-gray-300 block mb-2">Night Min</label>
          <input
            type="number"
            value={nightMinutes()}
            onInput={(e) => setNightMinutes(Number(e.currentTarget.value) || 0)}
            min="0"
          />
        </div>
      </div>

      <div class="mb-4">
        <label class="font-pixel text-[10px] text-gray-300 block mb-2">Comment</label>
        <input
          type="text"
          value={comment()}
          onInput={(e) => setComment(e.currentTarget.value)}
          placeholder="Drove to school..."
        />
      </div>

      <Show when={error()}>
        <p class="font-pixel text-[10px] text-accent mb-3">{error()}</p>
      </Show>

      <div class="flex gap-3">
        <button
          type="submit"
          class="flex-1 bg-primary border-primary text-[#1A1A2E]"
        >
          {isEdit() ? "Save" : "Log Drive"}
        </button>
        <Show when={isEdit() && props.onDelete}>
          <button
            type="button"
            class="bg-accent border-accent text-[#1A1A2E]"
            onClick={() => props.onDelete?.()}
          >
            Delete
          </button>
        </Show>
      </div>
    </form>
  );
};

export default DriveForm;
