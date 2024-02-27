import clsx from "clsx";
import {
  MouseEvent,
  TouchEvent,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Dots from "./Dots";
import { Slider } from "./Slider";

import { useWindowSize } from "@/hooks/useWindowSize";

export interface IRenderData {
  element: JSX.Element;
  activeOverlay?: JSX.Element;
}

export interface ICarouselProps {
  renderData: IRenderData[];
  activeScale?: boolean;
  minSlide?: number;
  sliderClass?: string;
  className?: string;
  dotsClass?: string;
  dotsColor?: string;
  autoPlay?: number;
}

function Carousel({
  renderData,
  activeScale = false,
  minSlide,
  sliderClass,
  className,
  dotsClass,
  dotsColor,
  autoPlay,
}: ICarouselProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [preventOnClick, setPreventOnClick] = useState(false);

  const { width } = useWindowSize();

  const renderChildrens = useMemo(() => {
    let newArray = [...renderData];
    while (newArray.length <= (minSlide || 7)) {
      newArray = newArray.concat(newArray);
    }
    return newArray;
  }, [minSlide, renderData]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleDragMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;

    if (startX === undefined) return;

    setDragOffset(e.clientX - startX);
    setPreventOnClick(true);
  };

  const handleEndDrag = (): void => {
    setDragOffset(0);
    setIsDragging(false);
    setPreventOnClick(false);
    const clientWidth = containerRef.current?.clientWidth || 0;

    const indexOffset = Math.ceil(Math.abs(dragOffset) / clientWidth);

    if (dragOffset > clientWidth / 4) {
      setIndex((prev) => prev - indexOffset);
    } else if (dragOffset < -clientWidth / 4) {
      setIndex((prev) => prev + indexOffset);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    if (!isDragging) return;

    if (startX === undefined) return;

    setDragOffset(e.touches[0].clientX - startX);
    setPreventOnClick(true);
  };

  const handleNextSlide = useCallback(() => {
    const renderOffset = startIndex - Math.floor(renderData.length / 2);
    let newIndex = index + 1;
    if (newIndex >= renderOffset + renderData.length) {
      newIndex = newIndex - renderData.length;
    }
    setIndex(newIndex);
  }, [index, renderData.length, startIndex]);

  useLayoutEffect(() => {
    setIsDragging(false);
    setTranslateX(-index * (containerRef.current?.clientWidth || 0));
  }, [index, width]);

  useEffect(() => {
    setIsDragging(true);
  }, [width]);

  useEffect(() => {
    if (autoPlay) {
      const timeoutId = setTimeout(() => {
        handleNextSlide();
      }, autoPlay);

      return () => clearTimeout(timeoutId);
    }
  }, [autoPlay, handleNextSlide]);

  const startRender =
    (startIndex - Math.floor(renderChildrens.length / 2)) %
    renderChildrens.length;

  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <div
        className={`slider relative flex ${sliderClass || ""}`}
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUpCapture={handleEndDrag}
        onMouseLeave={handleEndDrag}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEndDrag}
      >
        <div className="absolute w-[100vw] h-full left-1/2 -translate-x-1/2"></div>
        {renderChildrens
          .slice(startRender)
          .concat(renderChildrens.slice(0, startRender))
          .map((child, i) => {
            const offset =
              (-i - startIndex + Math.floor(renderChildrens.length / 2)) *
                (containerRef.current?.clientWidth || 480) -
              translateX -
              dragOffset;

            let scale = 0.625;

            if (activeScale) {
              const absOffset = Math.abs(offset);

              if (absOffset < (containerRef.current?.clientWidth || 480)) {
                scale =
                  1 -
                  (absOffset / (containerRef.current?.clientWidth || 480)) *
                    0.375;
              }
            } else {
              scale = 1;
            }

            return (
              <Slider
                renderData={child}
                isActive={Math.abs(offset) < 100}
                key={i + startIndex - Math.floor(renderChildrens.length / 2)}
                offset={offset}
                isDragging={isDragging}
                scale={scale}
                setStartIndex={setStartIndex}
                startIndex={
                  i + startIndex - Math.floor(renderChildrens.length / 2)
                }
                preventOnClick={preventOnClick}
              />
            );
          })}
      </div>
      <Dots
        length={renderData.length}
        setActiveIndex={setIndex}
        activeIndex={index}
        setStartIndex={setStartIndex}
        startIndex={startIndex}
        dotsClass={dotsClass}
        dotsColor={dotsColor}
      />
    </div>
  );
}
export default memo(Carousel);
