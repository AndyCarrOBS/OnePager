import React from "react";

export const LiveStreamingSection = (): JSX.Element => {
  return (
    <section
      className="inline-flex items-start absolute top-[1645px] left-[203px]"
      role="region"
      aria-labelledby="live-streaming-title"
    >
      <img
        className="relative w-[281px] h-[547px]"
        alt="Left decorative component"
        src="/img/component-6.svg"
        role="presentation"
      />

      <div className="relative w-[740px] h-[864px]">
        <div className="inline-flex items-center justify-center gap-2.5 relative">
          <div className="relative w-[740px] h-[864px]">
            <div className="absolute w-[744px] h-[763px] top-0 left-0">
              <img
                className="absolute w-[713px] h-[120px] top-[643px] left-[27px] aspect-[5.94]"
                alt="OORO streaming platform interface"
                src="/img/image-87.png"
              />

              <div className="absolute w-[658px] h-[408px] top-[184px] left-[55px] bg-[url(/img/best-smart-tvs-in-india-2.png)] bg-[100%_100%]">
                <div className="relative w-[635px] h-[385px] top-[9px] left-3 aspect-[1.65]" />
              </div>

              <h2
                id="live-streaming-title"
                className="absolute w-[582px] h-8 top-0 left-[79px] font-english-display-small-bold font-[number:var(--english-display-small-bold-font-weight)] text-white text-[length:var(--english-display-small-bold-font-size)] text-center tracking-[var(--english-display-small-bold-letter-spacing)] leading-[var(--english-display-small-bold-line-height)] whitespace-nowrap [font-style:var(--english-display-small-bold-font-style)]"
              >
                Live Stream with OORO
              </h2>

              <p className="absolute w-[740px] h-8 top-14 left-0 [font-family:'Noto_Sans',Helvetica] font-light text-white text-2xl text-center tracking-[0] leading-[normal] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                More to watch. Less to search. we&apos;ve got you covered
              </p>
            </div>

            <button
              className="absolute w-[260px] h-[51px] top-[813px] left-[252px] bg-d-9d-9d-9 rounded-sm shadow-[0px_4px_6px_#0000002e] flex items-center justify-center gap-2.5 px-[63px] py-[22px] rounded-[10px] transition-all duration-200 hover:shadow-[0px_6px_8px_#0000003a] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              type="button"
              aria-label="Explore more streaming content"
            >
              <span className="[font-family:'Noto_Sans',Helvetica] font-normal text-white text-base text-center tracking-[0] leading-[normal]">
                Explore More
              </span>
            </button>
          </div>
        </div>
      </div>

      <img
        className="relative w-[281px] h-[547px]"
        alt="Right decorative component"
        src="/img/component-8.svg"
        role="presentation"
      />
    </section>
  );
};
