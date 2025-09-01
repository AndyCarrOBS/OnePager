import React from "react";

export const StatisticsSection = (): JSX.Element => {
  const statisticsData = [
    {
      value: "50+",
      label: "Arabic Channels",
    },
    {
      value: "1M+",
      label: "Hours Watched",
    },
  ];

  return (
    <section
      className="inline-flex items-center gap-8 absolute top-[5076px] left-[375px]"
      role="region"
      aria-label="Platform Statistics"
    >
      {statisticsData.map((stat, index) => (
        <div key={index} className="relative w-[354px] h-[259px]">
          <div className="relative w-[350px] h-[259px] bg-[#1b75ba66] rounded-xl">
            <div className="absolute w-[196px] h-[25px] top-[146px] left-[87px] [font-family:'Noto_Sans',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[48px] whitespace-nowrap">
              {stat.label}
            </div>

            {index === 0 ? (
              <div className="h-24 top-[38px] left-[107px] [font-family:'Noto_Sans',Helvetica] font-bold text-[100px] leading-[96px] whitespace-nowrap absolute text-white tracking-[0]">
                {stat.value}
              </div>
            ) : (
              <p className="absolute h-24 top-[37px] left-[480px] [font-family:'Noto_Sans',Helvetica] font-bold text-white text-[80px] leading-[96px] whitespace-nowrap">
                <span className="tracking-[-4.48px]">1M</span>
                <span className="tracking-[-5.76px]">+</span>
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};
