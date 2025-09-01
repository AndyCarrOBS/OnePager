import React from "react";

export const KeyFeaturesSection = (): JSX.Element => {
  const features = [
    {
      id: 1,
      title: "Entertainment Apps",
      description: "Youtube , shahid , Watch it and so much more",
      icon: {
        type: "image",
        src: "/img/vector-4.svg",
        className: "absolute w-[34px] h-[26px] top-[7px] left-[3px]",
      },
      iconContainer:
        "inline-flex items-center gap-2.5 p-4 relative flex-[0_0_auto] bg-[#00dfff1c] rounded-[84px]",
    },
    {
      id: 2,
      title: "OORO Cast",
      description: "Lorem Ipsum Lorem Ipsum\nLorem Ipsum",
      icon: {
        type: "frame",
        src: "/img/frame-1618872926.svg",
        className: "relative flex-[0_0_auto]",
      },
      iconContainer: null,
    },
    {
      id: 3,
      title: "OORO Browser",
      description: "Lorem Ipsum Lorem Ipsum\nLorem Ipsum",
      icon: {
        type: "complex",
        elements: [
          {
            src: "/img/vector-2.svg",
            className: "absolute w-3 h-7 top-0 left-[7px]",
          },
          {
            src: "/img/vector-3.svg",
            className: "absolute w-[26px] h-[9px] top-[9px] left-0",
          },
        ],
      },
      iconContainer:
        "flex w-[72px] h-[72px] items-center justify-center gap-2.5 p-4 relative bg-[#00dfff1c] rounded-[84px] aspect-[1]",
    },
    {
      id: 4,
      title: "OORO Media player",
      description: "Lorem Ipsum Lorem Ipsum\nLorem Ipsum",
      icon: {
        type: "image",
        src: "/img/vector-4.svg",
        className: "absolute w-[34px] h-[26px] top-[7px] left-[3px]",
      },
      iconContainer:
        "inline-flex items-center gap-2.5 p-4 relative flex-[0_0_auto] bg-[#00dfff1c] rounded-[84px]",
    },
  ];

  const renderIcon = (feature: (typeof features)[0]) => {
    if (feature.icon.type === "frame") {
      return (
        <img
          className={feature.icon.className}
          alt="Frame"
          src={feature.icon.src}
        />
      );
    }

    if (feature.icon.type === "complex") {
      return (
        <div className="relative w-7 h-7 aspect-[1] bg-[url(/img/vector-1.svg)] bg-[100%_100%]">
          <div className="relative w-[26px] h-7 left-px">
            {feature.icon.elements?.map((element, index) => (
              <img
                key={index}
                className={element.className}
                alt="Vector"
                src={element.src}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-10 h-10 aspect-[1]">
        <img
          className={feature.icon.className}
          alt="Vector"
          src={feature.icon.src}
        />
      </div>
    );
  };

  return (
    <section
      className="flex w-[1184px] items-center gap-8 absolute top-[1128px] left-[150px]"
      role="region"
      aria-label="Key Features"
    >
      {features.map((feature) => (
        <article
          key={feature.id}
          className="flex flex-col items-center gap-4 relative flex-1 grow"
        >
          <div className={feature.iconContainer || ""}>
            {renderIcon(feature)}
          </div>

          <div className="flex flex-col items-center gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="relative w-fit mt-[-1.00px] font-english-subtitle-semibold font-[number:var(--english-subtitle-semibold-font-weight)] text-white text-[length:var(--english-subtitle-semibold-font-size)] tracking-[var(--english-subtitle-semibold-letter-spacing)] leading-[var(--english-subtitle-semibold-line-height)] whitespace-nowrap [font-style:var(--english-subtitle-semibold-font-style)]">
              {feature.title}
            </h3>

            <p className="relative self-stretch [font-family:'Noto_Sans',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-6">
              {feature.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < feature.description.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};
