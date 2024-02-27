import { IRenderData } from "./Carousel";

export type ISliderProps = {
  offset: number;
  isDragging: boolean;
  scale: number;
  setStartIndex: (x: number) => void;
  startIndex: number;
  isActive: boolean;
  renderData: IRenderData;
  preventOnClick: boolean;
};

export function Slider({
  renderData,
  offset,
  isDragging,
  scale,
  setStartIndex,
  startIndex,
  isActive,
  preventOnClick,
}: ISliderProps): JSX.Element {
  return (
    <div
      className="prevent-select absolute w-full h-full inline-block"
      style={{
        transform: `translateX(${-offset}px) scale(${scale})`,
        transitionDuration: isDragging ? "0s" : "0.3s",
        pointerEvents: preventOnClick ? "none" : "auto",
      }}
      onMouseDown={() => {
        setStartIndex(startIndex);
      }}
      onTouchStart={() => {
        setStartIndex(startIndex);
      }}
    >
      {renderData.element}
      {renderData.activeOverlay && (
        <div
          className="absolute top-0 w-full h-full"
          style={{
            pointerEvents: preventOnClick ? "none" : "auto",
            opacity: isActive ? "1" : "0",
            transitionDuration: "0.2s",
          }}
        >
          {renderData.activeOverlay}
        </div>
      )}
    </div>
  );
}
