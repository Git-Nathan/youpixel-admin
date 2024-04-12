import clsx from "clsx";
import {
  MouseEvent,
  TouchEvent,
  memo,
  useCallback,
  useEffect,
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

export interface IRenderFunctionData {
  element: (isActive: boolean) => JSX.Element;
  activeOverlay?: JSX.Element;
}

export interface ICarouselProps {
  renderData?: IRenderData[];
  renderFunctionData?: IRenderFunctionData[];
  activeScale?: boolean;
  minSlide?: number;
  sliderClass?: string;
  className?: string;
  dotsClass?: string;
  dotsColor?: string;
  autoPlay?: number;
  renderNextButton?: JSX.Element;
  renderPrevButton?: JSX.Element;
  disableDrag?: boolean;
}

function Carousel({
  renderData,
  renderFunctionData,
  activeScale = false,
  minSlide,
  sliderClass,
  className,
  dotsClass,
  dotsColor,
  autoPlay,
  renderNextButton,
  renderPrevButton,
  disableDrag,
}: ICarouselProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [preventOnClick, setPreventOnClick] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const { width } = useWindowSize();

  const renderChildrens = useMemo(() => {
    if (renderData) {
      if (renderData.length === 0) {
        return [];
      }

      let newArray = [...renderData];
      while (newArray.length <= (minSlide || 9)) {
        newArray = newArray.concat(newArray);
      }
      return newArray;
    } else if (renderFunctionData) {
      if (renderFunctionData.length === 0) {
        return [];
      }

      let newArray = [...renderFunctionData];
      while (newArray.length <= (minSlide || 9)) {
        newArray = newArray.concat(newArray);
      }
      return newArray;
    }

    return [];
  }, [minSlide, renderData, renderFunctionData]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setStartIndex(index);
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

    if (dragOffset > clientWidth / 8) {
      setIndex((prev) => prev - indexOffset);
    } else if (dragOffset < -clientWidth / 8) {
      setIndex((prev) => prev + indexOffset);
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    setStartIndex(index);
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
    if (renderData) {
      const renderOffset = startIndex - Math.floor(renderData.length / 2);
      let newIndex = index + 1;
      if (newIndex >= renderOffset + renderData.length) {
        newIndex = newIndex - renderData.length;
      }
      setIndex(newIndex);
    } else if (renderFunctionData) {
      const renderOffset =
        startIndex - Math.floor(renderFunctionData.length / 2);
      let newIndex = index + 1;
      if (newIndex >= renderOffset + renderFunctionData.length) {
        newIndex = newIndex - renderFunctionData.length;
      }
      setIndex(newIndex);
    }
  }, [index, renderData, renderFunctionData, startIndex]);

  const handlePrevSlide = useCallback(() => {
    if (renderData) {
      const renderOffset = startIndex - Math.floor(renderData.length / 2);
      let newIndex = index - 1;
      if (newIndex < renderOffset) {
        newIndex = newIndex + renderData.length;
      }
      setIndex(newIndex);
    } else if (renderFunctionData) {
      const renderOffset =
        startIndex - Math.floor(renderFunctionData.length / 2);
      let newIndex = index - 1;
      if (newIndex < renderOffset) {
        newIndex = newIndex + renderFunctionData.length;
      }
      setIndex(newIndex);
    }
  }, [index, renderData, renderFunctionData, startIndex]);

  useEffect(() => {
    setIsDragging(false);
    setTranslateX(-index * (containerRef.current?.clientWidth || 0));
  }, [index]);

  useEffect(() => {
    setIsResizing(true);
    setIndex((prev) => {
      setTranslateX(-prev * (containerRef.current?.clientWidth || 0));
      return prev;
    });
    const timeoutId = setTimeout(() => setIsResizing(false), 100);

    return () => clearTimeout(timeoutId);
  }, [width]);

  useEffect(() => {
    if (autoPlay) {
      const timeoutId = setTimeout(() => {
        handleNextSlide();
      }, autoPlay);

      return () => clearTimeout(timeoutId);
    }
  }, [autoPlay, handleNextSlide]);

  let startRender = 0;

  if (renderChildrens?.length === 0) {
    return (
      <div className="relative mb-[45px] flex h-full w-full items-center justify-center rounded-2xl lg:mb-[60px]">
        <p className="font-overPass absolute bottom-2 text-[18px] font-bold sm:text-[25px]">
          Not available
        </p>
      </div>
    );
  }

  if (renderData && renderChildrens) {
    if (renderData.length === 1) {
      return (
        <div className="relative mb-[45px] h-full w-full lg:mb-[60px]">
          {renderData[0].element}
          {renderData[0] && (
            <div className="absolute top-0 h-full w-full">
              {renderData[0]?.activeOverlay}
            </div>
          )}
        </div>
      );
    }

    startRender =
      (startIndex - Math.floor(renderChildrens.length / 2)) %
      renderChildrens.length;
  }

  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <div
        className={`slider relative flex ${sliderClass || ""}`}
        ref={containerRef}
        onMouseDown={disableDrag ? undefined : handleDragStart}
        onMouseMove={disableDrag ? undefined : handleDragMove}
        onMouseUpCapture={disableDrag ? undefined : handleEndDrag}
        onMouseLeave={disableDrag ? undefined : handleEndDrag}
        onTouchStart={disableDrag ? undefined : handleTouchStart}
        onTouchMove={disableDrag ? undefined : handleTouchMove}
        onTouchEnd={disableDrag ? undefined : handleEndDrag}
      >
        <div className="absolute left-1/2 h-full w-[100vw] -translate-x-1/2" />
        {renderChildrens &&
          [...renderChildrens.slice(startRender)]
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
                  preventOnClick={preventOnClick}
                  isResizing={isResizing}
                />
              );
            })}
      </div>
      <Dots
        length={renderData?.length || renderFunctionData?.length || 0}
        setActiveIndex={setIndex}
        activeIndex={index}
        setStartIndex={setStartIndex}
        startIndex={startIndex}
        dotsClass={dotsClass}
        dotsColor={dotsColor}
      />
      {renderNextButton && (
        <div onClick={handleNextSlide}>{renderNextButton}</div>
      )}
      {renderPrevButton && (
        <div onClick={handlePrevSlide}>{renderPrevButton}</div>
      )}
    </div>
  );
}
export default memo(Carousel);
