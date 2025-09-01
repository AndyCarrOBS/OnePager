import React from "react";

const products = [
  {
    id: 1,
    title: "OORO Streaming Dongle",
    description:
      "Built-in Arabic-first experience Built-in Arabic-first experience",
    image: "/img/image-163.png",
    rectangleImage: "/img/rectangle-150.svg",
    arrowIcon1: "/img/vector-5.svg",
    arrowIcon2: "/img/vector-6.svg",
  },
  {
    id: 2,
    title: "OORO Streaming Dongle",
    description: "Transform any TV into smart Transform\nmany TV into smart",
    image: "/img/chatgpt-image-aug-27-2025-04-40-13-pm-1.png",
    logoImage: "/img/ooro-logo-1-1.png",
    logoBackground: "/img/rectangle-1161684.svg",
    arrowIcon1: "/img/vector-7.svg",
    arrowIcon2: "/img/vector-8.svg",
  },
];

export const ProductShowcaseSection = (): JSX.Element => {
  return (
    <section className="w-[1173px] gap-16 top-0 left-[268px] flex flex-col items-center absolute">
      <header className="relative self-stretch h-[37px] mt-[-1.00px] font-english-display-medium-bold font-[number:var(--english-display-medium-bold-font-weight)] text-white text-[length:var(--english-display-medium-bold-font-size)] text-center tracking-[var(--english-display-medium-bold-letter-spacing)] leading-[var(--english-display-medium-bold-line-height)] whitespace-nowrap [font-style:var(--english-display-medium-bold-font-style)]">
        Our Products
      </header>

      <div className="flex items-center justify-center gap-[97px] relative self-stretch w-full flex-[0_0_auto]">
        {products.map((product, index) => (
          <article
            key={product.id}
            className={`flex flex-col w-[538px] ${index === 0 ? "h-[476px] items-center gap-3 px-[66px] py-[43px] relative rounded-3xl border-[none] before:content-[''] before:absolute before:inset-0 before:p-0.5 before:rounded-3xl before:[background:linear-gradient(180deg,rgba(82,68,155,1)_0%,rgba(27,117,186,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none" : "items-start gap-2.5 relative"}`}
          >
            {index === 0 ? (
              <>
                <div className="relative w-[376px] h-[239.53px] bg-[url(/img/image-163.png)] bg-[100%_100%]">
                  <img
                    className="absolute w-[230px] h-[205px] top-1 left-[71px]"
                    alt="Rectangle"
                    src={product.rectangleImage}
                  />
                </div>

                <div className="flex flex-col w-[411px] items-center gap-2 relative flex-[0_0_auto] mb-[-19.53px] ml-[-2.50px] mr-[-2.50px]">
                  <h3 className="relative w-fit mt-[-1.00px] font-english-h2-semibold font-[number:var(--english-h2-semibold-font-weight)] text-white text-[length:var(--english-h2-semibold-font-size)] text-center tracking-[var(--english-h2-semibold-letter-spacing)] leading-[var(--english-h2-semibold-line-height)] whitespace-nowrap [font-style:var(--english-h2-semibold-font-style)]">
                    {product.title}
                  </h3>

                  <p className="relative self-stretch font-english-subtitle-rugular font-[number:var(--english-subtitle-rugular-font-weight)] text-white text-[length:var(--english-subtitle-rugular-font-size)] text-center tracking-[var(--english-subtitle-rugular-letter-spacing)] leading-[var(--english-subtitle-rugular-line-height)] [font-style:var(--english-subtitle-rugular-font-style)]">
                    {product.description}
                  </p>

                  <a
                    href="#"
                    className="flex w-[149px] items-center justify-center gap-2 relative flex-[0_0_auto] group"
                    aria-label={`Learn more about ${product.title}`}
                  >
                    <span className="relative w-[101px] h-6 [font-family:'Noto_Sans',Helvetica] font-semibold text-cta-2 text-lg text-center tracking-[0] leading-[42px] whitespace-nowrap">
                      Learn More
                    </span>

                    <div className="inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] rounded-[40px]">
                      <div className="relative w-6 h-6">
                        <div className="relative w-5 h-2 top-2 left-0.5">
                          <img
                            className="absolute w-1 h-2 top-0 left-4"
                            alt=""
                            src={product.arrowIcon1}
                          />

                          <img
                            className="absolute w-5 h-px top-1 left-0"
                            alt=""
                            src={product.arrowIcon2}
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </>
            ) : (
              <div className="relative w-[538px] h-[476px]">
                <div className="relative h-[476px] rounded-3xl">
                  <div className="absolute w-[377px] h-[251px] top-[49px] left-[69px]">
                    <div className="h-[251px] bg-[url(/img/chatgpt-image-aug-27-2025-04-40-13-pm-1.png)] bg-cover bg-[50%_50%]">
                      <div className="relative w-[133px] h-[84px] top-[70px] left-[124px] bg-[url(/img/rectangle-1161684.svg)] bg-[100%_100%]">
                        <img
                          className="absolute w-[91px] h-[61px] top-3 left-[21px] aspect-[4.24] object-cover"
                          alt="Ooro logo"
                          src={product.logoImage}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-[411px] items-center gap-2 absolute top-[294px] left-[63px]">
                    <h3 className="relative w-fit mt-[-1.00px] font-english-h2-semibold font-[number:var(--english-h2-semibold-font-weight)] text-white text-[length:var(--english-h2-semibold-font-size)] text-center tracking-[var(--english-h2-semibold-letter-spacing)] leading-[var(--english-h2-semibold-line-height)] whitespace-nowrap [font-style:var(--english-h2-semibold-font-style)]">
                      {product.title}
                    </h3>

                    <p className="relative self-stretch font-english-subtitle-rugular font-[number:var(--english-subtitle-rugular-font-weight)] text-white text-[length:var(--english-subtitle-rugular-font-size)] text-center tracking-[var(--english-subtitle-rugular-letter-spacing)] leading-[var(--english-subtitle-rugular-line-height)] [font-style:var(--english-subtitle-rugular-font-style)]">
                      Transform any TV into smart Transform
                      <br />
                      many TV into smart
                    </p>

                    <a
                      href="#"
                      className="flex w-[149px] items-center justify-center gap-2 relative flex-[0_0_auto] group"
                      aria-label={`Learn more about ${product.title}`}
                    >
                      <span className="relative w-[101px] h-6 [font-family:'Noto_Sans',Helvetica] font-semibold text-cta-2 text-lg text-center tracking-[0] leading-[42px] whitespace-nowrap">
                        Learn More
                      </span>

                      <div className="inline-flex items-center justify-center gap-2.5 p-2 relative flex-[0_0_auto] rounded-[40px]">
                        <div className="relative w-6 h-6">
                          <div className="relative w-5 h-2 top-2 left-0.5">
                            <img
                              className="absolute w-1 h-2 top-0 left-4"
                              alt=""
                              src={product.arrowIcon1}
                            />

                            <img
                              className="absolute w-5 h-px top-1 left-0"
                              alt=""
                              src={product.arrowIcon2}
                            />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="absolute w-[538px] h-[476px] top-0 left-0 rounded-3xl border-[none] before:content-[''] before:absolute before:inset-0 before:p-0.5 before:rounded-3xl before:[background:linear-gradient(180deg,rgba(82,68,155,1)_0%,rgba(27,117,186,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none" />
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
