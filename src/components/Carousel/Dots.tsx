import clsx from "clsx";
import { memo } from "react";

export type DotProps = {
  length: number;
  activeIndex: number;
  startIndex: number;
  setActiveIndex: (index: number) => void;
  setStartIndex: (x: number) => void;
  dotsClass?: string;
  dotsColor?: string;
};

function Dots({
  length,
  activeIndex,
  setActiveIndex,
  startIndex,
  dotsClass,
  dotsColor,
}: DotProps): JSX.Element {
  let activeDot = activeIndex % length;

  if (activeIndex < 0) {
    if (Math.abs(activeIndex) % length === 0) {
      activeDot = 0;
    } else {
      activeDot = length - (Math.abs(activeIndex) % length);
    }
  }

  const renderOffset = startIndex - Math.floor(length / 2);

  const handleOnClick = (i: number): void => {
    let newIndex = i + length * Math.floor(activeIndex / length);
    if (newIndex < renderOffset) {
      newIndex = newIndex + length;
    } else if (newIndex >= renderOffset + length) {
      newIndex = newIndex - length;
    }
    setActiveIndex(newIndex);
  };

  return (
    <div className={clsx(`flex justify-center items-center`, dotsClass)}>
      {new Array(length).fill("").map((_, i) => (
        <div
          key={i}
          onClick={() => {
            handleOnClick(i);
          }}
          className="w-5 h-5 md:mx-2 flex items-center justify-center cursor-pointer"
        >
          <span
            className="rounded-full"
            style={{
              background:
                i === activeDot
                  ? dotsColor
                    ? dotsColor
                    : "#3dcac1"
                  : "#595a72",
              width: i === activeDot ? "16px" : "10px",
              height: i === activeDot ? "16px" : "10px",
            }}
          ></span>
        </div>
      ))}
    </div>
  );
}
export default memo(Dots);
