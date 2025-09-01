import React from "react";

export const FeaturedContentSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-[1438px] items-center gap-6 px-[205px] py-0.5 absolute top-[693px] left-[135px]">
      <header className="relative self-stretch h-[43px] mt-[-1.00px] font-english-display-medium-bold font-[number:var(--english-display-medium-bold-font-weight)] text-white text-[length:var(--english-display-medium-bold-font-size)] text-center tracking-[var(--english-display-medium-bold-letter-spacing)] leading-[var(--english-display-medium-bold-line-height)] whitespace-nowrap [font-style:var(--english-display-medium-bold-font-style)]">
        Don&apos;t Miss This Show
      </header>

      <p className="relative w-[740px] h-[81px] [font-family:'Noto_Sans',Helvetica] font-light text-white text-2xl text-center tracking-[0] leading-[normal] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
        Browse movies, episodes, live TV, and more from across your favorite
        apps. It&apos;s easier than ever to discover what to watch.
      </p>

      <figure className="relative self-stretch w-full h-[566px]">
        <img
          className="w-full h-full object-cover"
          alt="Featured content showcase displaying various movies and TV shows"
          src="/img/frame-1000005164.svg"
        />
      </figure>

      <div className="relative w-[260px] h-[70px]">
        <button
          className="flex w-[260px] h-[51px] items-center justify-center gap-2.5 px-[63px] py-[22px] relative bg-d-9d-9d-9 rounded-sm shadow-[0px_4px_6px_#0000002e] top-4 transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 active:transform active:scale-95"
          type="button"
          aria-label="Explore featured content now"
        >
          <span className="[font-family:'Noto_Sans',Helvetica] font-normal text-white text-base text-center tracking-[0] leading-[normal]">
            Explore now
          </span>
        </button>
      </div>
    </section>
  );
};
