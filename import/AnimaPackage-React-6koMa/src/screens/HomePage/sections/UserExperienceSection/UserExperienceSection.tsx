import React from "react";

export const UserExperienceSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-[907px] items-center gap-[42px] absolute top-[181px] left-[289px]">
      <header className="inline-flex flex-col items-center gap-6 relative flex-[0_0_auto]">
        <h1 className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans',Helvetica] font-bold text-text-2 text-[56px] text-center tracking-[0] leading-[72px] whitespace-nowrap">
          First TV Platform For MENA
        </h1>

        <p className="relative w-[753px] font-english-h3-rugular font-[number:var(--english-h3-rugular-font-weight)] text-text-2 text-[length:var(--english-h3-rugular-font-size)] text-center tracking-[var(--english-h3-rugular-letter-spacing)] leading-[var(--english-h3-rugular-line-height)] [font-style:var(--english-h3-rugular-font-style)]">
          Stream, discover, and enjoy content in Arabic with OORO-powered
          devices designed for the Middle East and North Africa
        </p>
      </header>

      <div className="flex flex-col h-[520px] items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full bg-[#070708] rounded-lg shadow-[0px_2px_55px_#6e57cc59]">
        <img
          className="relative w-[887px] h-[499px] object-cover"
          alt="OORO TV Platform interface showing streaming content for MENA region"
          src="/img/1-2345685.png"
        />
      </div>

      <img
        className="relative w-[291px] h-[51px]"
        alt="OORO brand logo"
        src="/img/frame-1618873226.png"
      />
    </section>
  );
};
