// Lightweight background-music controller.
// Uses a module-level Audio instance (not tied to any component) so playback
// survives the Card -> Invitation swap instead of restarting or cutting off.
//
// Replace the src below with your own licensed / royalty-free track.
// Put the file in your `public` folder, e.g. public/music.mp3.

let audio;
const listeners = new Set();

function getAudio() {
  if (!audio) {
    audio = new Audio(
      "/alex-morgan-wedding-instrumental-vow-exchange-578502.mp3",
    );
    audio.loop = true;
    audio.volume = 0;
  }
  return audio;
}

function fadeTo(target, duration = 1800) {
  const a = getAudio();
  const start = a.volume;
  const steps = 30;
  const stepTime = duration / steps;
  let i = 0;

  const timer = setInterval(() => {
    i += 1;
    a.volume = Math.min(1, Math.max(0, start + ((target - start) * i) / steps));
    if (i >= steps) clearInterval(timer);
  }, stepTime);
}

// Call this from inside a user click/tap handler — browsers block autoplay
// without a user gesture, so this must run synchronously in that handler.
export function playMusic() {
  const a = getAudio();
  if (a.paused) {
    a.play().catch(() => {
      // Autoplay was blocked; nothing to do, the toggle button still works.
    });
  }
  fadeTo(0.35);
}

export function toggleMute() {
  const a = getAudio();
  a.muted = !a.muted;
  listeners.forEach((fn) => fn(a.muted));
  return a.muted;
}

export function isMuted() {
  return getAudio().muted;
}

export function subscribeMute(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
