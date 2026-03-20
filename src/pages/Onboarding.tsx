import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { setProfile } from "../store/profile";

const Onboarding: Component = () => {
  const navigate = useNavigate();
  const [name, setName] = createSignal("");
  const [overallTarget, setOverallTarget] = createSignal("");
  const [nightTarget, setNightTarget] = createSignal("");

  const isValid = () =>
    name().trim() !== "" &&
    overallTarget() !== "" &&
    Number(overallTarget()) > 0 &&
    nightTarget() !== "" &&
    Number(nightTarget()) > 0;

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!isValid()) return;
    setProfile({
      name: name().trim(),
      overallTarget: Number(overallTarget()),
      nightTarget: Number(nightTarget()),
    });
    navigate("/", { replace: true });
  };

  return (
    <div class="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} class="w-full max-w-sm text-center">
        <h1 class="font-pixel text-primary text-2xl mb-2">DriveBit</h1>
        <p class="font-pixel text-accent text-[10px] mb-8">
          Track your driving hours!
        </p>

        <div class="mb-6 text-left">
          <label class="font-pixel text-[10px] text-gray-300 block mb-2">
            First Name
          </label>
          <input
            type="text"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
            placeholder="Sarah"
          />
        </div>

        <div class="mb-6 text-left">
          <label class="font-pixel text-[10px] text-gray-300 block mb-2">
            Overall Hour Target
          </label>
          <input
            type="number"
            value={overallTarget()}
            onInput={(e) => setOverallTarget(e.currentTarget.value)}
            placeholder="50"
            min="1"
          />
        </div>

        <div class="mb-8 text-left">
          <label class="font-pixel text-[10px] text-gray-300 block mb-2">
            Nighttime Hour Target
          </label>
          <input
            type="number"
            value={nightTarget()}
            onInput={(e) => setNightTarget(e.currentTarget.value)}
            placeholder="10"
            min="1"
          />
        </div>

        <button
          type="submit"
          class="w-full border-primary text-[#1A1A2E] font-pixel text-sm py-3"
          classList={{
            "bg-primary": isValid(),
            "opacity-40 cursor-not-allowed bg-gray-600 border-gray-600": !isValid(),
          }}
          disabled={!isValid()}
        >
          Let's Go!
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
