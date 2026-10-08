document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll(".nav button");

  let audioContext = null;
  let audioUnlocked = false;

  /*
    Unlock audio after the visitor clicks/taps.
    Browsers usually block automatic audio before user interaction.
  */

  function unlockAudio() {
    audioUnlocked = true;

    if (!audioContext) {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      if (AudioContext) {
        audioContext = new AudioContext();
      }
    }

    if (
      audioContext &&
      audioContext.state === "suspended"
    ) {
      audioContext.resume().catch(() => {});
    }
  }

  document.addEventListener(
    "pointerdown",
    unlockAudio,
    { once: true }
  );


  /*
    Gothic hover sound.
    No external audio file required.
  */

  function playHoverSound() {

    if (!audioUnlocked || !audioContext) {
      return;
    }

    try {

      const now = audioContext.currentTime;

      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(
        620,
        now
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        380,
        now + 0.18
      );

      gain.gain.setValueAtTime(
        0.0001,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.045,
        now + 0.012
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.20
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.21);

    } catch (error) {
      // Sound is optional.
    }
  }


  /*
    Navigation buttons
  */

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const targetId =
        button.dataset.target;

      const target =
        document.getElementById(targetId);

      buttons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      unlockAudio();
      playHoverSound();

      if (target) {

        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth",

          block: "start"
        });

      }

    });


    /*
      Hover sound on buttons
    */

    button.addEventListener(
      "mouseenter",
      playHoverSound
    );

    button.addEventListener(
      "focus",
      playHoverSound
    );

  });


  /*
    Hover sound on cards/images
  */

  const interactiveElements =
    document.querySelectorAll(
      ".card, .media, .link"
    );

  interactiveElements.forEach(element => {

    element.addEventListener(
      "mouseenter",
      playHoverSound
    );

  });

});
