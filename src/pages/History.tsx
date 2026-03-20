import { Component, For, Show, createSignal } from "solid-js";
import { drives, updateDrive, deleteDrive } from "../store/drives";
import DriveForm from "../components/DriveForm";
import type { Drive } from "../types";

const History: Component = () => {
  const [editingId, setEditingId] = createSignal<string | null>(null);
  const [deleteTarget, setDeleteTarget] = createSignal<string | null>(null);

  const sortedDrives = () =>
    [...drives()].sort((a, b) => b.date.localeCompare(a.date));

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    return `${m}/${d}/${y}`;
  };

  const handleSave = (drive: Drive) => {
    updateDrive(drive.id, {
      date: drive.date,
      dayMinutes: drive.dayMinutes,
      nightMinutes: drive.nightMinutes,
      comment: drive.comment,
    });
    setEditingId(null);
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    const id = deleteTarget();
    if (id) {
      deleteDrive(id);
      setEditingId(null);
    }
    setDeleteTarget(null);
  };

  return (
    <div class="min-h-screen p-4 pb-20">
      <h1 class="font-pixel text-primary text-lg mb-6">History</h1>

      <Show
        when={drives().length > 0}
        fallback={
          <div class="text-center mt-12 p-6 border-2 border-gray-600">
            <p class="font-pixel text-[10px] text-gray-400 leading-relaxed">
              No drives yet!<br />
              Head to the dashboard to log your first one.
            </p>
          </div>
        }
      >
        <div class="flex flex-col gap-3">
          <For each={sortedDrives()}>
            {(drive) => (
              <Show
                when={editingId() === drive.id}
                fallback={
                  <div
                    class="p-4 border-2 border-primary bg-[#16213E] cursor-pointer hover:border-accent transition-colors"
                    onClick={() => setEditingId(drive.id)}
                  >
                    <div class="flex justify-between items-center mb-2">
                      <span class="font-pixel text-[10px] text-primary">
                        {formatDate(drive.date)}
                      </span>
                    </div>
                    <div class="flex gap-4 text-sm text-gray-300">
                      <span>☀️ {drive.dayMinutes}m</span>
                      <span>🌙 {drive.nightMinutes}m</span>
                    </div>
                    <Show when={drive.comment}>
                      <p class="text-sm text-gray-400 mt-2 italic">
                        {drive.comment}
                      </p>
                    </Show>
                  </div>
                }
              >
                <div class="p-4 border-2 border-accent bg-[#16213E]">
                  <div class="flex justify-between items-center mb-3">
                    <span class="font-pixel text-[10px] text-accent">Editing</span>
                    <button
                      class="font-pixel text-[8px] text-gray-400 border-gray-600 px-2 py-1 bg-transparent"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                  <DriveForm
                    drive={drive}
                    onSave={handleSave}
                    onDelete={() => handleDeleteRequest(drive.id)}
                  />
                </div>
              </Show>
            )}
          </For>
        </div>
      </Show>

      {/* Custom delete confirmation modal */}
      <Show when={deleteTarget()}>
        <div
          class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-100 p-4"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            class="bg-[#16213E] border-2 border-accent p-6 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p class="font-pixel text-accent text-sm mb-2">⚠️ Delete Drive</p>
            <p class="text-gray-300 text-sm mb-6">
              Are you sure? This can't be undone.
            </p>
            <div class="flex gap-3">
              <button
                class="flex-1 bg-transparent border-gray-500 text-gray-300"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                class="flex-1 bg-accent border-accent text-[#1A1A2E]"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default History;
