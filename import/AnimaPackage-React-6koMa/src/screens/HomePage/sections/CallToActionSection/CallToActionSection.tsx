import React from "react";

export const CallToActionSection = (): JSX.Element => {
  const navigationLinks = ["About OORO", "Devices", "Content", "Where to Buy"];

  const legalLinks = ["Privacy Policy", "Terms & Conditions"];

  const supportLinks = ["F.A.Qs"];

  return (
    <footer
      className="absolute w-[1442px] h-[370px] top-[6471px] -left-px bg-[#0e0614]"
      role="contentinfo"
    >
      <p className="absolute h-6 top-[338px] left-[592px] opacity-[0.87] [font-family:'Epilogue',Helvetica] font-normal text-white text-base tracking-[0] leading-6 whitespace-nowrap">
        © 2025 Transparent. All rights reserved.
      </p>

      <div className="flex w-[1280px] items-start justify-between absolute top-20 left-20">
        <div className="inline-flex flex-col items-start gap-8 relative flex-[0_0_auto]">
          <div className="relative w-[314px] h-20">
            <img
              className="absolute h-7 top-0 left-0 w-[120px] aspect-[4.24] object-cover"
              alt="Ooro logo"
              src="/img/ooro-logo-1-2.png"
            />

            <div className="absolute h-[29px] top-[50px] left-0 opacity-[0.87] [font-family:'Epilogue',Helvetica] font-normal text-white text-lg tracking-[0.36px] leading-[28.8px] whitespace-nowrap">
              Questions? Comments? Concerns?
            </div>
          </div>
        </div>

        <nav
          className="inline-flex flex-col items-start gap-[19px] relative flex-[0_0_auto]"
          aria-label="Main navigation"
        >
          <div className="inline-flex flex-col items-center justify-center gap-[13px] relative flex-[0_0_auto] opacity-[0.87]">
            <ul className="inline-flex flex-col items-start justify-center gap-4 relative flex-[0_0_auto] list-none p-0 m-0">
              {navigationLinks.map((link, index) => (
                <li
                  key={index}
                  className={`relative ${index === 0 ? "w-[110px]" : index === 1 ? "w-[68px]" : index === 2 ? "w-[75px]" : "w-[128.71px]"} h-8 ${index === 0 ? "mt-[-1.00px]" : ""} ${index === 3 ? "mr-[-2.00px]" : ""}`}
                >
                  <a
                    href="#"
                    className={`absolute ${index === 1 || index === 2 ? "w-[66px]" : index === 3 ? "w-[127px]" : "w-[110px]"} h-8 top-0 left-0 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-english-body-rugular font-[number:var(--english-body-rugular-font-weight)] text-transparent text-[length:var(--english-body-rugular-font-size)] tracking-[var(--english-body-rugular-letter-spacing)] leading-[var(--english-body-rugular-line-height)] [font-style:var(--english-body-rugular-font-style)] hover:opacity-80 transition-opacity duration-200`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <nav
          className="inline-flex flex-col items-start gap-5 relative flex-[0_0_auto]"
          aria-label="Legal links"
        >
          <ul className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto] opacity-[0.87] list-none p-0 m-0">
            {legalLinks.map((link, index) => (
              <li
                key={index}
                className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""}`}
              >
                <a
                  href="#"
                  className="[font-family:'Epilogue',Helvetica] font-normal text-white text-base tracking-[0.32px] leading-[25.6px] whitespace-nowrap hover:opacity-80 transition-opacity duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav
          className="inline-flex flex-col items-start gap-5 relative flex-[0_0_auto]"
          aria-label="Support links"
        >
          <ul className="inline-flex flex-col items-start gap-5 relative flex-[0_0_auto] opacity-[0.87] list-none p-0 m-0">
            {supportLinks.map((link, index) => (
              <li
                key={index}
                className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""}`}
              >
                <a
                  href="#"
                  className="[font-family:'Epilogue',Helvetica] font-normal text-white text-base tracking-[0.32px] leading-[25.6px] whitespace-nowrap hover:opacity-80 transition-opacity duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <img
          className="relative flex-[0_0_auto]"
          alt="Social media links"
          src="/img/frame-1618872893.svg"
        />
      </div>
    </footer>
  );
};
