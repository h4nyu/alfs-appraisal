import React from 'react';
import Line from '@alfs-appraisal/core/line'
import Point from '@alfs-appraisal/core/point'
import File from '@alfs-appraisal/core/file'
import Box from '@alfs-appraisal/core/box'
import Image from '@alfs-appraisal/core/image'
import SvgCharPlot from '@alfs-appraisal/web/components/SvgCharPlot'
import Tag from '@alfs-appraisal/core/tag'
import { flatMap } from "lodash";
import ResetBtn from "@alfs-appraisal/web/components/ResetBtn"
import SaveBtn from "@alfs-appraisal/web/components/SaveBtn"
import { Payload as LoadLinePayload } from '@alfs-appraisal/core/line/load'
import usePointPlot from "@alfs-appraisal/web/hooks/usePointPlot"
import useLinePlot from "@alfs-appraisal/web/hooks/useLinePlot"


const TARGETS = [ "point", "line"] as const
type Target = typeof TARGETS[number]
const ReferenceForm = (props: Readonly<{
  box?:Box;
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
  } = usePointPlot({ points: props.points ?? [] })
  const { lines:_lines, selectPoint, startPoint } = useLinePlot({points, lines:props.lines})
  const pointIds = points.map(x => x.id)
  const lines = _lines.filter(x => {
    return pointIds.includes(x.start.id) && pointIds.includes(x.end.id)
  }).slice(-2)
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
            {props.box?.id}
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
