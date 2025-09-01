import React from "react";
import { CallToActionSection } from "./sections/CallToActionSection/CallToActionSection";
import { EntertainmentAppsSection } from "./sections/EntertainmentAppsSection";
import { FeaturedContentSection } from "./sections/FeaturedContentSection/FeaturedContentSection";
import { FirstTVPlatformMENASection } from "./sections/FirstTVPlatformMENASection/FirstTVPlatformMENASection";
import { KeyFeaturesSection } from "./sections/KeyFeaturesSection/KeyFeaturesSection";
import { LiveStreamingSection } from "./sections/LiveStreamingSection/LiveStreamingSection";
import { ProductShowcaseSection } from "./sections/ProductShowcaseSection/ProductShowcaseSection";
import { StatisticsSection } from "./sections/StatisticsSection";
import { UserExperienceSection } from "./sections/UserExperienceSection";
import { UserReviewsSection } from "./sections/UserReviewsSection/UserReviewsSection";

const navigationItems = [
  { text: "About OORO", width: "w-[110px]" },
  { text: "Devices", width: "w-[66px]" },
  { text: "Content", width: "w-[73px]" },
  { text: "Where to Buy", width: "w-[127px]" },
];

export const HomePage = (): JSX.Element => {
  return (
    <main
      className="relative w-[1440px] h-[6841px] overflow-hidden bg-[linear-gradient(243deg,rgba(34,29,60,1)_0%,rgba(92,79,162,0.4)_100%)]"
      data-model-id="561:2930"
    >
      <div className="absolute w-[1665px] h-[2509px] top-[1416px] -left-28">
        <img
          className="absolute w-[1665px] h-[1861px] top-[311px] left-0"
          alt="Background objects decoration"
          src="/img/objects-default.svg"
        />

        <ProductShowcaseSection />
        <FeaturedContentSection />
        <LiveStreamingSection />
      </div>

      <header className="flex w-[1450px] h-[62px] items-end justify-center gap-[280px] px-[11px] py-3.5 absolute -top-px left-0">
        <img
          className="relative h-[28.31px] w-[120px] aspect-[4.24] object-cover"
          alt="OORO logo"
          src="/img/ooro-logo-1.png"
        />

        <nav
          className="inline-flex items-center gap-4 relative flex-[0_0_auto]"
          role="navigation"
          aria-label="Main navigation"
        >
          {navigationItems.map((item, index) => (
            <div
              key={index}
              className={`relative ${item.width} h-8 ${index === 0 ? "mt-[-1.00px]" : ""}`}
            >
              <a
                href="#"
                className={`${index === 2 ? "text-center absolute" : "absolute"} ${item.width} h-8 top-0 left-0 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-english-body-rugular font-[number:var(--english-body-rugular-font-weight)] text-transparent text-[length:var(--english-body-rugular-font-size)] ${index !== 2 ? "text-center" : ""} tracking-[var(--english-body-rugular-letter-spacing)] leading-[var(--english-body-rugular-line-height)] [font-style:var(--english-body-rugular-font-style)] hover:opacity-80 transition-opacity`}
              >
                {item.text}
              </a>
            </div>
          ))}
        </nav>

        <div className="relative w-[92px] h-8">
          <div className="absolute w-[11px] h-[30px] top-1.5 left-[7px]">
            <div className="h-[30px] top-0 left-0 font-text font-[number:var(--text-font-weight)] text-[length:var(--text-font-size)] text-center leading-[var(--text-line-height)] [direction:rtl] absolute text-white tracking-[var(--text-letter-spacing)] [font-style:var(--text-font-style)]">
              ع
            </div>
          </div>

          <div className="absolute w-[46px] h-8 top-1.5 left-12">
            <a
              href="#"
              className="absolute w-11 h-8 top-0 left-0 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Noto_Sans',Helvetica] font-semibold text-transparent text-base text-right tracking-[0] leading-6 hover:opacity-80 transition-opacity"
            >
              Login
            </a>
          </div>
        </div>
      </header>

      <UserExperienceSection />
      <KeyFeaturesSection />
      <EntertainmentAppsSection />
      <UserReviewsSection />
      <StatisticsSection />

      <section className="w-[1116px] gap-6 top-[5451px] left-[185px] flex flex-col items-center absolute">
        <h2 className="relative self-stretch mt-[-1.00px] font-english-display-medium-bold font-[number:var(--english-display-medium-bold-font-weight)] text-white text-[length:var(--english-display-medium-bold-font-size)] text-center tracking-[var(--english-display-medium-bold-letter-spacing)] leading-[var(--english-display-medium-bold-line-height)] [font-style:var(--english-display-medium-bold-font-style)]">
          Our Partners
        </h2>

        <img
          className="relative self-stretch w-full flex-[0_0_auto]"
          alt="Partner logos"
          src="/img/frame-1618873234.svg"
        />
      </section>

      <FirstTVPlatformMENASection />
      <CallToActionSection />
    </main>
  );
};
