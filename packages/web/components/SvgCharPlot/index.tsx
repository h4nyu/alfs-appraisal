import React, { RefObject, useRef, useEffect, useState, useMemo } from "react";
import { Box } from "@alfs-appraisal/core/box";
import { Point } from "@alfs-appraisal/core/point";
import Line from "@alfs-appraisal/core/line";
import Tag from "@alfs-appraisal/core/tag"
import { InputMode } from "@alfs-appraisal/web/hooks/useBoxPlot";
import { schemeCategory10 } from "d3-scale-chromatic"
import { sortBy } from "lodash"

export type SvgCharPlotProps = {
  data?: string;
  mode?: InputMode;
  boxes?: Box[];
  points?: Point[];
  lines?:Line[];
  tags?: Tag[];
  size?: number;
  selectedId?: string;
  lineId?:string;
  width?:number;
  showBoxId?:boolean;
  onAdd?: VoidFunction;
  onMove?: (pos: { x: number; y: number }) => void;
  onSelect?: (id: string, InputMode: InputMode) => void;
  onPointSelect?: (id: string) => void;
  onLineSelect?: (id: string) => void;
  onDelete?: VoidFunction
  onLeave?: VoidFunction;
  onUp?: VoidFunction;
  onDown?: VoidFunction;
  onRight?: VoidFunction;
  onLeft?: VoidFunction;
  onEscape?: VoidFunction;
  onEnter?: VoidFunction;
}


export const SvgCharPlot = (props: SvgCharPlotProps) => {
  const {
    data,
    mode,
    onAdd,
    onMove,
    selectedId,
    lineId,
    boxes,
    lines,
    onSelect,
    onPointSelect,
    onLineSelect,
    onLeave,
  } = props;
  if (data === undefined) {
    return null;
  }
  const points = sortBy(props.points, x => x.positionId)
  const svgRef: RefObject<SVGSVGElement> = useRef(null);
  const size = props.size || 128;
  const pointSize = 6;
  const width = props.width === undefined? 512: props.width
  const [aspect, setAspect] = React.useState(1)
  const [scale, setScale] = React.useState(1)
  const showBoxId = props.showBoxId ?? true
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
    const x = (clientX - left) / scale;
    const y = (clientY - top) / scale;
    onMove({ x, y });
  };


  return (
    <div
      tabIndex={0}
      onKeyDown={e => {
        if (e.keyCode === 8) {
          props.onDelete?.()
        }else if(e.keyCode === 37) {
          props.onLeft?.()
        }else if(e.keyCode === 38) {
          props.onUp?.()
        }else if(e.keyCode === 39) {
          props.onRight?.()
        }else if(e.keyCode === 40) {
          props.onDown?.()
        }else if(e.keyCode === 27) {
          props.onEscape?.()
        }else if(e.keyCode === 13) {
          props.onEnter?.()
        }
        e.stopPropagation()
      }}
      style={{
        display: "grid",
        justifyContent: "center",
      }}
    >
      <svg
        ref={svgRef}
        style={{ 
          userSelect: "none",
        }}
        onMouseMove={handleMove}
        onMouseLeave={onLeave}
        onClick={(e) => {
          props.onAdd?.();
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
        {boxes?.map(b => {
          return (
            <g key={b.id}>
              {
                showBoxId && <text 
                  x={b.x0 * scale }
                  y={b.y0 * scale }
                  fill={selectedId === b.id ? "green" : "red"}
                  fontSize={ 15 }
                >
                  {b.id} 
                </text>
              }
              <rect
                x={ b.x0 * scale }
                y={ b.y0 * scale }
                width={(b.x1 - b.x0) * scale }
                height={(b.y1 - b.y0) * scale }
                fill="none"
                stroke={selectedId === b.id ? "green" : "red"}
                strokeWidth={pointSize / 4}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onSelect?.(b.id, InputMode.Box)
                }}
              />
              <circle
                style={{cursor: "crosshair"}}
                cx={b.x0 * scale}
                cy={b.y0 * scale}
                r={pointSize / 2}
                stroke="none"
                fill={selectedId === b.id ? "green" : "red"}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onSelect?.(b.id, InputMode.TL)
                }}
              />
              <circle
                style={{cursor: "crosshair"}}
                cx={b.x1 * scale}
                cy={b.y0 * scale}
                r={pointSize / 2}
                fill={selectedId === b.id ? "green" : "red"}
                stroke="none"
                onClick={(e) => {
                  e.stopPropagation();
                  props.onSelect?.(b.id, InputMode.TR)
                }}
              />
              <circle
                style={{cursor: "crosshair"}}
                cx={b.x0 * scale}
                cy={b.y1 * scale}
                r={pointSize / 2}
                fill={selectedId === b.id ? "green" : "red"}
                stroke="none"
                onClick={(e) => {
                  e.stopPropagation();
                  props.onSelect?.(b.id, InputMode.BL)
                }}
              />
              <circle
                style={{cursor: "crosshair"}}
                cx={b.x1 * scale}
                cy={b.y1 * scale}
                r={pointSize / 2}
                stroke="none"
                fill={selectedId === b.id ? "green" : "red"}
                onClick={(e) => {
                  e.stopPropagation();
                  props.onSelect?.(b.id, InputMode.BR)
                }}
              />
            </g>
          )
        })
        }
        {points?.map((p, k) => (
          <g key={p.id}>
            <text 
              x={p.x * scale }
              y={p.y * scale }
              fill={"red"}
              fontSize={ 12 }
            >
              {p.positionId} 
            </text>
            <circle
              style={{cursor: selectedId === p.id ? "crosshair" : ""}}
              cx={p.x * scale}
              cy={p.y * scale}
              r={selectedId === p.id ? pointSize * 2 : pointSize}
              fill={schemeCategory10[k % schemeCategory10.length]}
              onClick={(e) => {
                e.stopPropagation();
                props.onPointSelect?.(p.id)
              }}
            />
          </g>
        ))}
        {
          lines?.map((l) => {
            const start = props.points?.find((p) => p.id === l.start.id) ?? l.start
            const end = props.points?.find((p) => p.id === l.end.id) ?? l.end
            return (
              <g key={l.id}>
                <line 
                  x1={start.x * scale}
                  y1={start.y * scale}
                  x2={end.x * scale}
                  y2={end.y * scale}
                  stroke={"red"}
                  strokeOpacity="0.5"
                  strokeWidth={1}
                />
              </g>
            )
          })
        }
      </svg>
    </div>
  );
};
export default SvgCharPlot;
