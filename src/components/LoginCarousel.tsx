import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./shadcn/ui/carousel";
import { useEffect, useState } from "react";
import classNames from "~/utils/classNames";
import {
  CalendarIllustration,
  SummitIllustration,
  TeamIllustration,
} from "~/svgs";

const illustrations = [
  <SummitIllustration key="SummitIllustration" className="w-full" />,
  <TeamIllustration key="TeamIllustration" className="w-full" />,
  <CalendarIllustration key="CalendarIllustration" className="w-full" />,
];

const headerText = [
  "Streamline your organization's management",
  "Leverage comprehensive tools to enhance campus engagement",
  "Experience seamless coordination and communication",
];

export default function LoginCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            duration: 2000,
          }),
        ]}
        opts={{
          loop: true,
          align: "center",
        }}
        className="w-full"
      >
        <CarouselContent>
          {illustrations.map((illustration, index) => (
            <CarouselItem key={index} className="justify-center">
              {illustration}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex flex-col gap-2 pb-8">
        <h2 className="min-h-24 text-4xl font-semibold text-summit-900">

          {headerText[current - 1]}
        </h2>
        <div className="flex items-center gap-2">
          <button
            className={classNames(
              "h-2 rounded-lg transition-all duration-300",
              current === 1 ? "w-12 bg-summit-900" : "w-6 bg-white",

            )}
            onClick={() => {
              if (api) {
                api.scrollTo(0);
              }
            }}
          />
          <button
            className={classNames(
              "h-2 rounded-lg transition-all duration-300",
              current === 2 ? "w-12 bg-summit-900" : "w-6 bg-white",
            )}
            onClick={() => {
              if (api) {
                api.scrollTo(1);
              }
            }}
          />
          <button
            className={classNames(
              "h-2 rounded-lg transition-all duration-300",
              current === 3 ? "w-12 bg-summit-900" : "w-6 bg-white",

            )}
            onClick={() => {
              if (api) {
                api.scrollTo(2);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
