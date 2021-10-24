import React from 'react';
import Line from '@sivic/core/line'
import Point from '@sivic/core/point'
import File from '@sivic/core/file'
import Image from '@sivic/core/image'
import SvgCharPlot from '@sivic/web/components/SvgCharPlot'
import Tag from '@sivic/core/tag'
import { flatMap } from "lodash";
import ResetBtn from "@sivic/web/components/ResetBtn"
import SaveBtn from "@sivic/web/components/SaveBtn"
import { Payload as LoadLinePayload } from '@sivic/core/line/load'
import usePointPlot from "@sivic/web/hooks/usePointPlot"
import useLinePlot from "@sivic/web/hooks/useLinePlot"


const TARGETS = [ "point", "line"] as const
type Target = typeof TARGETS[number]
const ReferenceForm = (props: Readonly<{
  id?:string;
  tag?: Tag;
  file?: File,
  lines?: Line[],
  points?: Point[],
  onSubmit: (payload: {
    lines:Line[],
    points:Point[],
  }) => Promise<void>;
}>) => {
  const [target, setTarget] = React.useState<Target>("point")
  const { 
    draggingId,
    points, 
    toggleDrag, 
    remove:removePoint, 
    add: addPoint, 
    move,
  } = usePointPlot({ points: props.points })
  const { lines, selectPoint, startPoint } = useLinePlot({points})
  return (
    <div
      className="box"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
      }}
    >
      <div>
        { 
          target === "line" && 
            <SvgCharPlot
              data={props.file?.data}
              points={points}
              lines={lines}
              onPointSelect={selectPoint}
              selectedId={startPoint?.id}
              width={512 + 256}
            />
        }
        {
          target === "point" && 
            <SvgCharPlot
              data={props.file?.data}
              selectedId={draggingId}
              points={points}
              onAdd={addPoint}
              onDelete={removePoint}
              onPointSelect={toggleDrag}
              onMove={move}
              lines={lines}
              width={512 + 256}
            />
        }
      </div>
      <div
        className="p-1"
        style={{
          height: "calc(100% - 42px)",
        }}
      >
        <div className="field">
          <label className="label">ID</label>
          <span>
            {props.id}
          </span>
        </div>
        <div className="field">
          <label className="label">Tag</label>
          { props.tag?.name ?? "None"}
        </div>
        <div className="field">
          <label className="label">
            <button 
              className={`button ${target === "point" ? "is-active":""}`}
              onClick={() =>setTarget("point")}
            >Point { points?.length ?? 0 }</button>
          </label>
        </div>
        <div className="field">
          <label className="label">
            <button 
              className={`button ${target === "line" ? "is-active":""}`}
              onClick={() =>setTarget("line")}
            >Line { lines?.length ?? 0 }</button>
          </label>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div/>
          <SaveBtn  onClick={() => props.onSubmit({
            lines,
            points,
          })}/>
        </div>
      </div>
    </div>
  )
}
export default ReferenceForm
