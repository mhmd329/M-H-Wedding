import { useState } from "react";
import { playMusic } from "./music";
import MusicToggle from "./MusicToggle";

/**
 * Color system (keep in sync with WeddingInvitation.jsx):
 * ink        #1B0812  – page background
 * surface    #2E0F1C  – panels / letter / buttons
 * raised     #45182A  – envelope body & flap
 * gold       #C9A15D  – primary accent (borders, seal, CTA)
 * gold-soft  #E3CB9A  – secondary highlight (ayah, subtext)
 * cream      #F6EFE3  – body text
 */

function AmbientBackground() {
  const patternSvg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><g fill='none' stroke='#C9A15D' stroke-width='0.7'><path d='M32 2 L62 32 L32 62 L2 32 Z'/><circle cx='32' cy='32' r='3'/></g></svg>";
  const patternUrl = `url("data:image/svg+xml,${encodeURIComponent(patternSvg)}")`;

  return (
    <div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
      <div
        className='absolute inset-0'
        style={{
          background:
            "radial-gradient(1200px 600px at 12% -10%, rgba(201,161,93,0.10), transparent 60%), radial-gradient(1000px 600px at 110% 25%, rgba(69,24,42,0.55), transparent 55%), radial-gradient(900px 600px at 50% 115%, rgba(46,15,28,0.6), transparent 60%), #1B0812",
        }}
      />
      <div
        className='absolute inset-0 opacity-[0.05]'
        style={{ backgroundImage: patternUrl, backgroundSize: "64px 64px" }}
      />
      <div className='absolute left-[8%] top-[15%] h-72 w-72 animate-drift-slow rounded-full bg-[#C9A15D]/15 blur-3xl' />
      <div className='absolute right-[10%] top-[55%] h-96 w-96 animate-drift-slower rounded-full bg-[#45182A]/50 blur-3xl' />
      <div className='absolute bottom-[5%] left-[35%] h-64 w-64 animate-drift-slow rounded-full bg-[#E3CB9A]/10 blur-3xl' />
    </div>
  );
}

function WeddingCard({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;

    setIsOpening(true);
    playMusic(); // must run inside this click handler so autoplay isn't blocked

    // Matches the full osmosis-bloom + flap + letter sequence below (~950ms)
    setTimeout(() => {
      onOpen();
    }, 950);
  };

  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden px-6'>
      <style>{`
        @keyframes osmosisBloom {
          0%   { opacity: 0;    transform: scale(0.25); }
          35%  { opacity: 0.55; transform: scale(4); }
          100% { opacity: 0;    transform: scale(15); }
        }
        .animate-osmosis-bloom {
          animation: osmosisBloom 1050ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes floatIdle {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .animate-float-idle { animation: floatIdle 4.5s ease-in-out infinite; }
        @keyframes driftSlow {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(30px, -25px) scale(1.08); }
          100% { transform: translate(-15px, 15px) scale(0.96); }
        }
        @keyframes driftSlower {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(-25px, 20px) scale(1.05); }
          100% { transform: translate(20px, -15px) scale(0.97); }
        }
        .animate-drift-slow   { animation: driftSlow 18s ease-in-out infinite alternate; }
        .animate-drift-slower { animation: driftSlower 24s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .animate-osmosis-bloom,
          .animate-float-idle,
          .animate-drift-slow,
          .animate-drift-slower { animation: none; }
        }
      `}</style>

      <AmbientBackground />
      <MusicToggle />

      <div
        onClick={handleOpen}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
        className={`flex w-full cursor-pointer max-w-107.5 flex-col items-center ${
          !isOpening ? "animate-float-idle" : ""
        }`}>
        {/* Card */}
        <div
          className={`relative aspect-[1.55/1] w-full transition-all duration-700 motion-reduce:transition-none ${
            isOpening ? "scale-[1.03]" : ""
          }`}
          style={{ perspective: "1200px" }}>
          {/* Card body */}
          <div className='absolute inset-0 rounded-2xl border border-[#C9A15D]/20 bg-[#45182A] shadow-[0_30px_80px_rgba(0,0,0,0.45)]' />

          {/* Osmosis bloom — diffuses outward from the seal on open */}
          <div
            className={`pointer-events-none absolute left-1/2 top-[51%] z-[8] h-15.5 w-15.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
              isOpening ? "animate-osmosis-bloom" : "opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(circle, rgba(201,161,93,0.55) 0%, rgba(201,161,93,0.18) 45%, rgba(201,161,93,0) 72%)",
            }}
          />

          {/* Letter */}
          <div
            className={`absolute inset-[8%] z-[2] flex flex-col items-center justify-center rounded-xl border border-[#C9A15D]/25 bg-[#2E0F1C] text-[#F6EFE3] transition-all duration-800 motion-reduce:transition-none ${
              isOpening ?
                "-translate-y-[25%] scale-[0.95] opacity-0 blur-sm"
              : "blur-0"
            }`}>
            <span className='font-serif text-4xl tracking-[2px]'>محمد</span>

            <span className='my-4 text-lg text-[#C9A15D]'>&</span>

            <span className='font-serif text-4xl tracking-[2px]'>هاجر</span>
          </div>

          {/* Flap */}
          <div
            className='absolute left-0 top-0 z-[5] h-[55%] w-full bg-[#45182A] transition-transform duration-[1050ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
              transform: isOpening ? "rotateX(-180deg)" : "rotateX(0deg)",
              backfaceVisibility: "hidden",
            }}
          />

          {/* Front */}
          <div
            className={`absolute inset-0 z-[4] bg-[#45182A]/90 transition-all duration-800 motion-reduce:transition-none ${
              isOpening ? "translate-y-[28%] opacity-0" : ""
            }`}
            style={{
              clipPath: "polygon(0 35%, 50% 68%, 100% 35%, 100% 100%, 0 100%)",
            }}
          />

          {/* Seal */}
          <div
            className={`absolute left-1/2 top-[51%] z-10 flex h-15.5 w-15.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#E3CB9A] bg-[#C9A15D] font-serif text-[17px] tracking-[1px] text-[#1B0812] shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-500 motion-reduce:transition-none ${
              isOpening ? "scale-[1.6] rotate-12 opacity-0" : ""
            }`}>
            M & H
          </div>
        </div>

        {/* CTA */}
        <div
          className={`transition-all duration-500 motion-reduce:transition-none ${
            isOpening ? "translate-y-5 opacity-0" : ""
          }`}>
          <p className='mt-8 text-[17px] text-[#F6EFE3]'>اضغط لفتح الدعوة</p>

          <span className='mt-2 block animate-pulse text-center text-xl text-[#C9A15D]'>
            ♡
          </span>
        </div>
      </div>
    </section>
  );
}

export default WeddingCard;
