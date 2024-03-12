import { IRenderData, IRenderFunctionData } from "./Carousel";

export type ISliderProps = {
  offset: number;
  isDragging: boolean;
  scale: number;
  isActive: boolean;
  renderData: IRenderData | IRenderFunctionData;
  preventOnClick: boolean;
  isResizing: boolean;
};

export function Slider({
  renderData,
  offset,
  isDragging,
  scale,
  isActive,
  preventOnClick,
  isResizing,
}: ISliderProps): JSX.Element {
  return (
    <div
      className="prevent-select absolute w-full h-full inline-block"
      style={{
        transform: `translateX(${-offset}px) scale(${scale})`,
        transitionDuration: isDragging || isResizing ? "0s" : "0.3s",
        pointerEvents: preventOnClick ? "none" : "auto",
      }}
    >
      {renderData.element instanceof Function
        ? renderData.element(isActive)
        : renderData.element}
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
