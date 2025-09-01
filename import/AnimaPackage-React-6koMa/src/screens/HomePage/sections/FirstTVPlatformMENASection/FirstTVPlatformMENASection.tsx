import React from "react";

export const FirstTVPlatformMENASection = (): JSX.Element => {
  return (
    <section className="absolute w-[1441px] h-[623px] top-[5732px] left-[22px]">
      <div className="relative w-[935px] h-[423px] top-[113px] left-[244px]">
        <div className="flex flex-col w-[935px] h-[423px] items-center justify-center gap-2.5 px-0.5 py-[134px] relative">
          <div className="absolute w-[1484px] h-[822px] top-[-127px] left-[-268px]">
            <div className="relative h-[822px]">
              <img
                className="absolute w-[1484px] h-[820px] top-0.5 left-0 aspect-[1.81]"
                alt="Featured content background"
                src="/img/1-unconnected-featured-content-1.png"
              />

              <div className="absolute w-[1444px] h-[646px] top-0 left-[21px] aspect-[2.24] bg-[linear-gradient(243deg,rgba(34,29,60,1)_0%,rgba(92,79,162,0.4)_100%)] opacity-80" />
            </div>
          </div>

          <div className="flex flex-col w-[934px] items-center justify-center gap-8 relative flex-[0_0_auto] mt-[-32.00px] mb-[-32.00px] ml-[-1.50px] mr-[-1.50px]">
            <h2 className="relative self-stretch h-8 mt-[-1.00px] font-english-display-medium-bold font-[number:var(--english-display-medium-bold-font-weight)] text-white text-[length:var(--english-display-medium-bold-font-size)] text-center tracking-[var(--english-display-medium-bold-letter-spacing)] leading-[var(--english-display-medium-bold-line-height)] whitespace-nowrap [font-style:var(--english-display-medium-bold-font-style)]">
              Let&apos;s Connect
            </h2>

            <p className="relative w-[706px] font-english-h3-rugular font-[number:var(--english-h3-rugular-font-weight)] text-white text-[length:var(--english-h3-rugular-font-size)] text-center tracking-[var(--english-h3-rugular-letter-spacing)] leading-[var(--english-h3-rugular-line-height)] [font-style:var(--english-h3-rugular-font-style)]">
              &nbsp;&nbsp;Discover partnership opportunities with OORO and get
              your content viewed even more
            </p>

            <button
              className="relative w-[260px] h-[51px] bg-d-9d-9d-9 rounded-sm transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              type="button"
              aria-label="Let's connect - Contact us for partnership opportunities"
            >
              <div className="flex w-[260px] h-[51px] items-center justify-center gap-2.5 px-[63px] py-[22px] rounded-[10px]">
                <span className="relative w-fit mt-[-8.50px] mb-[-6.50px] [font-family:'Noto_Sans',Helvetica] font-normal text-white text-base text-center tracking-[0] leading-[normal]">
                  Let&apos;s connect
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
