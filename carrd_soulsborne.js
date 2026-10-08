/*
SOULSBORNE CARRD INTERACTIONS
Paste into a Carrd Embed:
Type: Code / Style: Hidden / Location: Body End

The hover animation is CSS-driven.
This JS only handles:
- section navigation
- active button state
- optional hover sound
- audio unlock after the visitor makes a click/tap
*/

(() => {
  const root = document.getElementById("soulsborne-carrd");
  if (!root) return;

  /* ================================
     EDIT THIS ONE VALUE FOR REAL SFX
     ================================ */
  const AUDIO_URL = ""; // e.g. "https://your-site.com/hover-chime.mp3";

  const buttons = [...root.querySelectorAll(".sb-button[data-target]")];
  const status = root.querySelector("#sb-audio-status");

  let hoverAudio = null;
  let audioUnlocked = false;
  let audioContext = null;

  function setStatus(message) {
    if (status) status.textContent = message;
  }

  function unlockAudio() {
    audioUnlocked = true;

    // Real file, when provided.
    if (AUDIO_URL && !hoverAudio) {
      hoverAudio = new Audio(AUDIO_URL);
      hoverAudio.preload = "auto";
      hoverAudio.volume = 0.16;
    }

    // WebAudio fallback means the demo still has a subtle sound
    // even before you upload a generated SFX file.
    if (!audioContext && window.AudioContext) {
      audioContext = new AudioContext();
    }

    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
  }

  document.addEventListener("pointerdown", unlockAudio, { once: true, passive: true });

  function playHoverSound() {
    if (!audioUnlocked) {
      setStatus("Sound becomes available after your first click/tap.");
      return;
    }

    // Preferred: generated/uploaded file.
    if (hoverAudio) {
      hoverAudio.currentTime = 0;
      hoverAudio.play().catch(() => {});
      return;
    }

    // Dependency-free fallback: a very short dark bell/chime.
    if (!audioContext) return;

    try {
      const now = audioContext.currentTime;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.18);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.055, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.21);
    } catch (_) {
      // Audio is deliberately non-critical.
    }
  }

  buttons.forEach((button) => {
    const targetId = button.dataset.target;
    const target = document.getElementById(targetId);

    if (!target) return;

    button.addEventListener("click", () => {
      unlockAudio();

      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    });

    button.addEventListener("mouseenter", playHoverSound);
    button.addEventListener("focus", playHoverSound);
  });

  root.querySelectorAll(".sb-card, .sb-link").forEach((item) => {
    item.addEventListener("mouseenter", playHoverSound);
  });
})();
