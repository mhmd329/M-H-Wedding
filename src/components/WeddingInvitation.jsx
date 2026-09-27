import { useEffect, useRef, useState } from "react";
import wedding from "./wedding.json";
import MusicToggle from "./MusicToggle";

/**
 * Color system (keep in sync with WeddingCard.jsx):
 * ink        #1B0812  – page background
 * surface    #2E0F1C  – panels / letter / buttons
 * raised     #45182A  – envelope body & flap
 * gold       #C9A15D  – primary accent (borders, seal, CTA)
 * gold-soft  #E3CB9A  – secondary highlight (ayah, subtext)
 * cream      #F6EFE3  – body text
 */

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-[850ms] ease-out motion-reduce:transition-none ${
        visible ?
          "opacity-100 translate-y-0 blur-0"
        : "opacity-0 translate-y-6 blur-sm"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
}

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
      <div className='absolute left-[8%] top-[10%] h-72 w-72 animate-drift-slow rounded-full bg-[#C9A15D]/15 blur-3xl' />
      <div className='absolute right-[8%] top-[45%] h-96 w-96 animate-drift-slower rounded-full bg-[#45182A]/50 blur-3xl' />
      <div className='absolute bottom-[8%] left-[30%] h-64 w-64 animate-drift-slow rounded-full bg-[#E3CB9A]/10 blur-3xl' />
    </div>
  );
}

// Builds a Google Calendar "add event" link so guests can save the date in one tap.
function buildCalendarUrl(date, groom, bride, location) {
  const toGCal = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const start = date;
  const end = new Date(date.getTime() + 4 * 60 * 60 * 1000); // default 4h duration

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `فرح ${groom} & ${bride}`,
    dates: `${toGCal(start)}/${toGCal(end)}`,
    location: `${location.name} - ${location.hall}`,
    details: "يشرفنا حضوركم 🤍",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function WeddingInvitation() {
  const weddingDate = new Date(wedding.weddingDate);

  const calculateTimeLeft = () => {
    const difference = weddingDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  // Continues the osmosis feel from the envelope: the page settles in rather than cutting in
  const [hasSettled, setHasSettled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    const settle = setTimeout(() => setHasSettled(true), 30);

    return () => {
      clearInterval(timer);
      clearTimeout(settle);
    };
  }, []);

  const eventStarted =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0 &&
    // eslint-disable-next-line react-hooks/purity
    weddingDate.getTime() - Date.now() <= 0;

  const heroClass = (delayClass) =>
    `transition-all duration-[900ms] ease-out motion-reduce:transition-none ${delayClass} ${
      hasSettled ?
        "opacity-100 translate-y-0 blur-0"
      : "opacity-0 translate-y-3 blur-sm"
    }`;

  const calendarUrl = buildCalendarUrl(
    weddingDate,
    wedding.groom,
    wedding.bride,
    wedding.location,
  );

  return (
    <section className='relative min-h-screen px-5 py-16 text-[#F6EFE3]'>
      <style>{`
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
        @keyframes tickPulse {
          0%   { transform: scale(1.15); opacity: 0.55; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-tick { animation: tickPulse 380ms ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .animate-drift-slow, .animate-drift-slower, .animate-tick { animation: none; }
        }
      `}</style>

      <AmbientBackground />
      <MusicToggle />

      <div className='relative mx-auto w-full max-w-150 text-center'>
        {/* Basmala */}
        <div className={`mb-10 ${heroClass("")}`}>
          <p className='text-lg text-[#C9A15D]'>{wedding.basmala}</p>
        </div>

        {/* Ayah */}
        <div className={`mb-12 ${heroClass("delay-150")}`}>
          <p className='font-serif text-xl leading-[2.2] text-[#E3CB9A]'>
            {wedding.ayah}
          </p>
        </div>

        <Divider />

        {/* Names */}
        <div className={`mb-12 ${heroClass("delay-300")}`}>
          <h1 className='font-serif text-[68px] font-medium leading-[0.9] sm:text-[96px]'>
            {wedding.groom}

            <span className='my-5 block text-3xl text-[#C9A15D]'>&</span>

            {wedding.bride}
          </h1>

          <p
            className={`mt-8 text-xl text-[#E3CB9A] ${heroClass("delay-500")}`}>
            {wedding.intro}
          </p>
        </div>

        <Divider />

        {/* Wedding Details */}
        <div className='space-y-7'>
          <Reveal delay={0}>
            <Detail
              label='التاريخ'
              value={wedding.date}
            />
          </Reveal>
          <Reveal delay={120}>
            <div className='grid grid-cols-2 gap-3'>
              <Detail
                label='من'
                value={wedding.from}
              />
              <Detail
                label='الي'
                value={wedding.to}
              />
            </div>
          </Reveal>
          <Reveal delay={240}>
            <Detail
              label='المكان'
              value={wedding.location.name}
              subValue={wedding.location.hall}
            />
          </Reveal>
        </div>

        {/* Message */}
        <Reveal className='mt-14'>
          <p className='text-lg leading-loose text-[#F6EFE3]/85'>
            {wedding.message.line1}
          </p>
        </Reveal>

        {/* Location */}
        <section className='mt-16'>
          <Divider />

          <Reveal>
            <p className='mb-3 text-xs tracking-[4px] text-[#C9A15D]'>
              LOCATION
            </p>

            <h2 className='font-serif text-3xl text-[#F6EFE3]'>
              {wedding.location.name}
            </h2>

            <p className='mt-2 text-[#E3CB9A]'>{wedding.location.hall}</p>

            <div className='mt-7 flex flex-wrap items-center justify-center gap-3'>
              <a
                href={wedding.location.mapsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-2 rounded-full border border-[#C9A15D]/40 bg-[#2E0F1C] px-7 py-3 text-sm text-[#F6EFE3] transition-all duration-300 hover:scale-[1.03] hover:border-[#C9A15D] hover:bg-[#45182A]'>
                <span className='text-[#C9A15D]'>📍</span>
                افتح الموقع على الخريطة
              </a>

              <a
                href={calendarUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-2 rounded-full border border-[#C9A15D]/40 bg-[#2E0F1C] px-7 py-3 text-sm text-[#F6EFE3] transition-all duration-300 hover:scale-[1.03] hover:border-[#C9A15D] hover:bg-[#45182A]'>
                <span className='text-[#C9A15D]'>🗓️</span>
                أضف الحدث لتقويمك
              </a>
            </div>
          </Reveal>
        </section>

        {/* Countdown */}
        <section className='mt-20'>
          <Divider />

          <Reveal>
            {eventStarted ?
              <p className='font-serif text-2xl text-[#F6EFE3]'>
                يوم فرحنا وصل 🎉
              </p>
            : <div
                className='grid grid-cols-4 gap-2 sm:gap-4'
                dir='ltr'>
                <CountdownItem
                  value={timeLeft.days}
                  label='Days'
                />
                <CountdownItem
                  value={timeLeft.hours}
                  label='Hours'
                />
                <CountdownItem
                  value={timeLeft.minutes}
                  label='Minutes'
                />
                <CountdownItem
                  value={timeLeft.seconds}
                  label='Seconds'
                />
              </div>
            }
          </Reveal>
        </section>

        {/* Closing */}
        <Reveal className='mt-20'>
          <Divider />
          <p className='text-xl text-[#E3CB9A]'>{wedding.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Detail({ label, value, subValue }) {
  return (
    <div className='rounded-2xl border border-[#C9A15D]/15 bg-[#2E0F1C] px-5 py-5'>
      <span className='text-xs tracking-[3px] text-[#C9A15D]'>{label}</span>

      <strong className='mt-2 block text-xl font-medium text-[#F6EFE3]'>
        {value}
      </strong>

      {subValue && (
        <small className='mt-1 block text-sm text-[#E3CB9A]/80'>
          {subValue}
        </small>
      )}
    </div>
  );
}

function CountdownItem({ value, label }) {
  return (
    <div className='rounded-2xl border border-[#C9A15D]/20 bg-[#2E0F1C] px-2 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:px-4 sm:py-5'>
      <div
        key={value}
        className='animate-tick font-serif text-3xl font-medium text-[#F6EFE3] sm:text-4xl'>
        {String(value).padStart(2, "0")}
      </div>

      <div className='mt-2 text-[9px] tracking-[2px] text-[#C9A15D] sm:text-xs'>
        {label}
      </div>
    </div>
  );
}

function Divider() {
  const [ref, visible] = useReveal(0.6);

  return (
    <div
      ref={ref}
      className='my-9 flex items-center justify-center gap-5'>
      <span
        className={`h-px w-17.5 origin-right bg-[#C9A15D]/25 transition-transform duration-700 ease-out motion-reduce:transition-none ${
          visible ? "scale-x-100" : "scale-x-0"
        }`}
      />
      <span
        className={`text-sm text-[#C9A15D] transition-all delay-200 duration-500 motion-reduce:transition-none ${
          visible ? "rotate-0 opacity-100" : "rotate-45 opacity-0"
        }`}>
        ✦
      </span>
      <span
        className={`h-px w-17.5 origin-left bg-[#C9A15D]/25 transition-transform duration-700 ease-out motion-reduce:transition-none ${
          visible ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </div>
  );
}

export default WeddingInvitation;
