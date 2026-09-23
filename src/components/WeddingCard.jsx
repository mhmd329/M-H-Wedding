function WeddingCard({ onOpen }) {
  return (
    <section className='flex min-h-screen items-center justify-center bg-[#240008] px-6'>
      <div
        onClick={onOpen}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onOpen();
          }
        }}
        className='flex w-full max-w-107.5 cursor-pointer flex-col items-center'>
        {/* Card */}
        <div className='relative aspect-[1.55/1] w-full overflow-hidden rounded-2xl border border-[#D6B77A]/20 bg-[#4A0615] shadow-[0_30px_80px_rgba(0,0,0,0.45)]'>
          {/* Letter */}
          <div className='absolute inset-[8%] z-2 flex flex-col items-center justify-center rounded-xl border border-[#D6B77A]/25 bg-[#32000C] text-[#F8F1E7]'>
            <span className='font-serif text-4xl tracking-[2px]'>محمد</span>

            <span className='my-4 text-lg text-[#D6B77A]'>&</span>

            <span className='font-serif text-4xl tracking-[2px]'>هاجر</span>
          </div>

          {/* Flap */}
          <div className='absolute left-0 top-0 z-5 h-[55%] w-full bg-[#6B1224] [clip-path:polygon(0_0,100%_0,50%_100%)]' />

          {/* Front */}
          <div className='absolute inset-0 z-4 bg-[#4A0615]/95 [clip-path:polygon(0_35%,50%_68%,100%_35%,100%_100%,0_100%)]' />

          {/* Seal */}
          <div className='absolute left-1/2 top-[51%] z-10 flex h-15.5 w-15.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#E6CFA7] bg-[#D6B77A] font-serif text-[17px] tracking-[1px] text-[#32000C] shadow-[0_8px_25px_rgba(0,0,0,0.4)]'>
            M & H
          </div>
        </div>

        {/* CTA */}
        <p className='mt-8 text-[17px] text-[#F8F1E7]'>اضغط لفتح الدعوة</p>

        <span className='mt-2 animate-pulse text-xl text-[#D6B77A]'>♡</span>
      </div>
    </section>
  );
}

export default WeddingCard;
