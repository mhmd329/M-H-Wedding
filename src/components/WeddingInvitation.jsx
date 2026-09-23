import { useEffect, useState } from "react";

function WeddingInvitation() {
  const weddingDate = new Date("2026-10-30T18:00:00");

  const calculateTimeLeft = () => {
    const difference = weddingDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className='min-h-screen bg-[#240008] px-5 py-16 text-[#F8F1E7]'>
      <div className='mx-auto w-full max-w-150 text-center'>
        {/* Intro */}
        <div className='mb-14'>
          <p className='mb-8 text-lg text-[#D6B77A]'>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
          </p>

          <p className='mb-5 text-lg text-[#E6CFA7]'>بكل الحب والسعادة</p>

          <h1 className='font-serif text-[72px] font-medium leading-[0.85] sm:text-[100px]'>
            محمد
            <span className='my-5 block font-serif text-3xl text-[#D6B77A]'>
              &
            </span>
            هاجر
          </h1>

          <p className='mt-8 text-lg leading-loose text-[#F8F1E7]/80'>
            يسعدنا دعوتكم لمشاركتنا
            <br />
            أجمل ليلة في عمرنا
          </p>
        </div>

        <Divider />

        {/* Details */}
        <div className='mt-12 flex flex-col gap-4'>
          <Detail
            label='التاريخ'
            value='30 أكتوبر 2026'
          />

          <Detail
            label='الساعة'
            value='6:00 مساءً'
          />

          <Detail
            label='المكان'
            value='مسجد المشير طنطاوي'
            subValue='قاعة الماسة — Open Air'
          />
        </div>

        {/* Countdown */}
        <section className='mt-20'>
          <p className='mb-2 text-xs tracking-[4px] text-[#D6B77A]'>
            COUNTDOWN
          </p>

          <p className='mb-7 text-sm text-[#F8F1E7]/50'>
            حتى نلتقي في أجمل ليلة
          </p>

          <div
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
        </section>

        {/* Location */}
        <section className='mt-20'>
          <Divider />

          <p className='mb-3 text-xs tracking-[4px] text-[#D6B77A]'>LOCATION</p>

          <h2 className='font-serif text-3xl text-[#F8F1E7]'>
            مسجد المشير طنطاوي
          </h2>

          <p className='mt-2 text-[#E6CFA7]'>قاعة الماسة — Open Air</p>

          <a
            href='https://maps.app.goo.gl/5E98in4kKNTUMJen6'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-[#D6B77A]/40 bg-[#32000C] px-7 py-3 text-sm text-[#F8F1E7] transition-all duration-300 hover:border-[#D6B77A] hover:bg-[#4A0615]'>
            <span className='text-[#D6B77A]'>📍</span>
            افتح الموقع على الخريطة
          </a>
        </section>

        {/* Closing */}
        <div className='mt-20'>
          <Divider />

          <p className='text-lg text-[#E6CFA7]'>حضوركم يسعدنا</p>

          <p className='mt-3 text-2xl text-[#D6B77A]'>♥</p>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value, subValue }) {
  return (
    <div className='rounded-2xl border border-[#D6B77A]/15 bg-[#32000C] px-5 py-5'>
      <span className='text-xs tracking-[3px] text-[#D6B77A]'>{label}</span>

      <strong className='mt-2 block text-xl font-medium text-[#F8F1E7]'>
        {value}
      </strong>

      {subValue && (
        <small className='mt-1 block text-sm text-[#E6CFA7]/80'>
          {subValue}
        </small>
      )}
    </div>
  );
}

function CountdownItem({ value, label }) {
  return (
    <div className='rounded-2xl border border-[#D6B77A]/20 bg-[#32000C] px-2 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:px-4 sm:py-5'>
      <div className='font-serif text-3xl font-medium text-[#F8F1E7] sm:text-4xl'>
        {String(value).padStart(2, "0")}
      </div>

      <div className='mt-2 text-[9px] tracking-[2px] text-[#D6B77A] sm:text-xs'>
        {label}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className='my-9 flex items-center justify-center gap-5'>
      <span className='h-px w-17.5 bg-[#D6B77A]/25' />

      <span className='text-sm text-[#D6B77A]'>✦</span>

      <span className='h-px w-17.5 bg-[#D6B77A]/25' />
    </div>
  );
}

export default WeddingInvitation;
