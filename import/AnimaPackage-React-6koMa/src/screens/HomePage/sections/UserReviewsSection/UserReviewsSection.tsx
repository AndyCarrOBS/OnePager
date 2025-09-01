import React from "react";

export const UserReviewsSection = (): JSX.Element => {
  const reviewsData = [
    {
      id: 1,
      name: "Hana Ali",
      occupation: "House Wife",
      location: "Dubai",
      quote: "Finally , a TV that understands Arabic content",
      image: "/img/image-96-3.png",
    },
    {
      id: 2,
      name: "Hana Ali",
      occupation: "House Wife",
      location: "Dubai",
      quote: "Finally , a TV that understands Arabic content",
      image: "/img/image-96-3.png",
    },
    {
      id: 3,
      name: "Hana Ali",
      occupation: "House Wife",
      location: "Dubai",
      quote: "Finally , a TV that understands Arabic content",
      image: "/img/image-96-3.png",
    },
    {
      id: 4,
      name: "Hana Ali",
      occupation: "House Wife",
      location: "Dubai",
      quote: "Finally , a TV that understands Arabic content",
      image: "/img/image-96-3.png",
    },
  ];

  return (
    <section
      className="inline-flex flex-col items-center gap-16 absolute top-[4560px] left-[102px]"
      role="region"
      aria-labelledby="reviews-heading"
    >
      <header className="flex flex-col w-[1091px] items-center gap-8 relative flex-[0_0_auto]">
        <h2
          id="reviews-heading"
          className="relative self-stretch h-8 mt-[-1.00px] font-english-display-small-bold font-[number:var(--english-display-small-bold-font-weight)] text-white text-[length:var(--english-display-small-bold-font-size)] text-center tracking-[var(--english-display-small-bold-letter-spacing)] leading-[var(--english-display-small-bold-line-height)] whitespace-nowrap [font-style:var(--english-display-small-bold-font-style)]"
        >
          Trusted Across MENA
        </h2>
      </header>

      <div className="flex w-[1281px] items-start relative flex-[0_0_auto]">
        <div className="flex w-[1035px] items-center gap-6 relative">
          {reviewsData.slice(0, 2).map((review) => (
            <article
              key={review.id}
              className="relative w-[303px] h-[304px] bg-white rounded-3xl border border-solid border-[#d9d9d9] opacity-[0.88]"
              role="article"
              aria-labelledby={`review-${review.id}-name`}
            >
              <img
                className="absolute w-[104px] h-[106px] top-6 left-6 aspect-[0.99]"
                alt={`Profile picture of ${review.name}`}
                src={review.image}
              />

              <div className="absolute w-[113px] top-[85px] left-[152px] [font-family:'Open_Sans',Helvetica] font-semibold text-[#b9b9b9] text-base tracking-[0] leading-[normal]">
                {review.occupation}
              </div>

              <h3
                id={`review-${review.id}-name`}
                className="absolute w-[182px] top-[43px] left-[152px] [font-family:'Open_Sans',Helvetica] font-semibold text-black text-2xl tracking-[0] leading-[normal]"
              >
                {review.name}
              </h3>

              <div className="absolute w-[279px] h-[125px] top-[153px] left-6">
                <blockquote className="absolute w-[279px] top-0 left-0 [font-family:'Noto_Sans',Helvetica] font-normal text-neutral-800 text-2xl tracking-[0] leading-8">
                  &quot;{review.quote}&quot;
                </blockquote>

                <div className="absolute top-[103px] left-[196px] [font-family:'Open_Sans',Helvetica] font-semibold text-black text-base tracking-[0] leading-[normal]">
                  {review.location}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex w-[661px] items-center gap-6 relative mr-[-37.00px] ml-[-378px]">
          {reviewsData.slice(2, 4).map((review) => (
            <article
              key={review.id}
              className="relative w-[303px] h-[304px] bg-white rounded-3xl border border-solid border-[#d9d9d9] opacity-[0.88]"
              role="article"
              aria-labelledby={`review-${review.id}-name`}
            >
              <img
                className="absolute w-[104px] h-[106px] top-6 left-6 aspect-[0.99]"
                alt={`Profile picture of ${review.name}`}
                src={review.image}
              />

              <div className="absolute w-[113px] top-[85px] left-[152px] [font-family:'Open_Sans',Helvetica] font-semibold text-[#b9b9b9] text-base tracking-[0] leading-[normal]">
                {review.occupation}
              </div>

              <h3
                id={`review-${review.id}-name`}
                className="absolute w-[182px] top-[43px] left-[152px] [font-family:'Open_Sans',Helvetica] font-semibold text-black text-2xl tracking-[0] leading-[normal]"
              >
                {review.name}
              </h3>

              <div className="absolute w-[279px] h-[125px] top-[153px] left-6">
                <blockquote className="absolute w-[279px] top-0 left-0 [font-family:'Noto_Sans',Helvetica] font-normal text-neutral-800 text-2xl tracking-[0] leading-8">
                  &quot;{review.quote}&quot;
                </blockquote>

                <div className="absolute top-[103px] left-[196px] [font-family:'Open_Sans',Helvetica] font-semibold text-black text-base tracking-[0] leading-[normal]">
                  {review.location}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
