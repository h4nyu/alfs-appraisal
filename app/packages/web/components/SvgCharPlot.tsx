import React, { RefObject, useRef, useEffect, useState } from "react";
import { Box } from "@charpoints/core/box";
import { InputMode } from "@sivic/web/store/BoxEditor"
import { Map } from "immutable"

export const SvgCharPlot = (props: {
  data?: string;
  mode?: InputMode;
  boxes?: Map<string, Box>;
  size?: number;
  selectedId?: string;
  width?:number;
  onAdd?: () => void;
  onMove?: (pos: { x: number; y: number }) => void;
  onSelect?: (id: string, InputMode: InputMode) => void;
  onLeave?: () => void;
}) => {
  const {
    data,
    mode,
    onAdd,
    onMove,
    selectedId,
    boxes,
    onSelect,
    onLeave,
  } = props;
  if (data === undefined) {
    return null;
  }
  const svgRef: RefObject<SVGSVGElement> = useRef(null);
  const size = props.size || 128;
  const pointSize = 3;
  const width = props.width === undefined? 512: props.width
  const [aspect, setAspect] = React.useState(1)
  const [scale, setScale] = React.useState(1)
  useEffect(() => {
    const tmp = new Image()
    tmp.onload = () => {
      setAspect(tmp.height/tmp.width)
      setScale(width/tmp.width)
    }
    tmp.src = `data:image;base64,${data}`
  }, [data]);

  const handleMove = (e) => {
    if (onMove === undefined) {
      return;
    }
    const svg = svgRef.current;
    if (svg === null) {
      return;
    }
    const { left, top } = svg.getBoundingClientRect();
    const { clientX, clientY } = e;
    const x = clientX - left;
    const y = clientY - top;
    onMove({ x , y });
  };

  return (
    <svg
      ref={svgRef}
      style={{ 
        userSelect: "none",
      }}
      onMouseMove={handleMove}
      onMouseLeave={onLeave}
      onClick={(e) => {
        onAdd && onAdd();
      }}
      width={width}
      height={width * aspect}
    >
      <image 
        href={`data:image;base64,${data}`} 
        x="0" 
        y="0"
        width={width}
        height={width * aspect}
      />

      {boxes
        ?.map((b, i) => (
          <g key={i}>
            <text
              x={b.x0 }
              y={b.y0 + pointSize * 4}
              fontSize={pointSize * 4}
              fill={selectedId === i ? "green" : "red"}
            >
              {b.label}
            </text>
            <rect
              x={b.x0 * scale }
              y={b.y0 * scale }
              width={(b.x1 - b.x0) * scale }
              height={(b.y1 - b.y0) * scale }
              fill="none"
              stroke={selectedId === i ? "green" : "red"}
              strokeWidth={pointSize / 4}
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect(i, InputMode.Box);
              }}
            />
            <circle
              cx={b.x0 * scale}
              cy={b.y0 * scale}
              r={pointSize}
              stroke="none"
              fill={selectedId === i ? "green" : "red"}
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect(i, InputMode.TL);
              }}
            />
            <circle
              cx={b.x1 * scale}
              cy={b.y0 * scale}
              r={pointSize}
              fill={selectedId === i ? "green" : "red"}
              stroke="none"
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect(i, InputMode.TR);
              }}
            />
            <circle
              cx={b.x0 * scale}
              cy={b.y1 * scale}
              r={pointSize}
              fill={selectedId === i ? "green" : "red"}
              stroke="none"
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect(i, InputMode.BL);
              }}
            />
            <circle
              cx={b.x1 * scale}
              cy={b.y1 * scale}
              r={pointSize}
              stroke="none"
              fill={selectedId === i ? "green" : "red"}
              onClick={(e) => {
                onSelect && onSelect(i, InputMode.BR);
                e.stopPropagation();
              }}
            />
          </g>
        ))
        .toList()}
    </svg>
  );
};
export default SvgCharPlot;
