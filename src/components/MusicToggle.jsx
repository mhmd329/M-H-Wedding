import { useEffect, useState } from "react";
import { toggleMute, isMuted, subscribeMute } from "./Music";

// Small floating mute/unmute control. Render this in both WeddingCard and
// WeddingInvitation so guests always have a way to turn the music off.
function MusicToggle() {
  const [muted, setMuted] = useState(isMuted());

  useEffect(() => subscribeMute(setMuted), []);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // don't trigger the envelope's own onClick
        setMuted(toggleMute());
      }}
      aria-label={muted ? "تشغيل الموسيقى" : "كتم الموسيقى"}
      className='fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A15D]/40 bg-[#2E0F1C]/90 text-lg text-[#F6EFE3] shadow-lg backdrop-blur transition-transform hover:scale-105'>
      {muted ? "🔇" : "🎵"}
    </button>
  );
}

export default MusicToggle;
