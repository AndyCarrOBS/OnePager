import React from "react";

const entertainmentApps = [
  { name: "YouTube", logo: "/img/youtube-logo.png" },
  { name: "Netflix", logo: "/img/netflix-logo.png" },
  { name: "VIU", logo: "/img/viu-logo.png" },
  { name: "Wavo", logo: "/img/wavo-logo.png" },
  { name: "Shahid", logo: "/img/shahid-logo.png" },
];

export const EntertainmentAppsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-[1421px] items-center gap-10 px-[228px] py-6 absolute top-[4060px] left-8">
      <header className="relative self-stretch h-8 mt-[-1.00px]">
        <h2 className="font-english-display-medium-bold font-[number:var(--english-display-medium-bold-font-weight)] text-white text-[length:var(--english-display-medium-bold-font-size)] text-center tracking-[var(--english-display-medium-bold-letter-spacing)] leading-[var(--english-display-medium-bold-line-height)] whitespace-nowrap [font-style:var(--english-display-medium-bold-font-style)]">
          Entertainment apps
        </h2>
      </header>

      <p className="relative self-stretch [font-family:'Noto_Sans',Helvetica] font-light text-white text-2xl text-center tracking-[0] leading-[normal]">
        Biggest streaming services in MENA are available now
      </p>

      <div
        className="relative w-[961px] h-[191px]"
        role="img"
        aria-label="Entertainment apps logos"
      >
        <img
          className="w-full h-full object-contain"
          alt="Entertainment apps including YouTube, Netflix, VIU, Wavo, and Shahid logos"
          src="/img/group-1321314557.png"
        />
      </div>
    </section>
  );
};
