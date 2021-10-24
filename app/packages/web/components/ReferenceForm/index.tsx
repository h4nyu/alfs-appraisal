import React from 'react';
import { observer } from "mobx-react-lite";
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


const TARGETS = [ "point", "line"] as const
type Target = typeof TARGETS[number]
const ReferenceForm = observer((props: Readonly<{
  id?:string;
  tag?: Tag;
  file?: File,
  lines?: Line[],
  points?: Point[],
  onSubmit: (lines:Line[]) => Promise<void>;
}>) => {
  const [target, setTarget] = React.useState<Target>("point")
  const [startPoint, setStartPoint] = React.useState<Point|undefined>(undefined)
  const { points, toggleDrag, 
    remove:removePoint, add: addPoint, move } = usePointPlot({ points: props.points })
  const [lines, setLines] = React.useState<Line[]>(props.lines ?? [])
  // const points = props.points
  // const setPoint = (pointId:string) => {
  //   const point = points?.find(x => x.id === pointId)
  //   if(!point) { return }
  //   const matchedLine = lines.find(line => {
  //     return (line.start.id === point.id) || (line.end.id === point.id)
  //   })
  //   if(matchedLine) {
  //     setLines(
  //       lines.filter(x => x.id !== matchedLine.id)
  //     )
  //     setStartPoint(undefined)
  //     return
  //   }
  //   if(startPoint === undefined && lines.length < 2){
  //     setStartPoint(point)
  //     return
  //   }
  //   if(startPoint !== undefined
  //   && !startPoint.posEquals(point)
  //   ) {
  //     const newLines = [
  //       ...lines,
  //       Line({
  //         start:startPoint,
  //         end:point,
  //       })
  //     ]
  //     setLines(newLines)
  //     setStartPoint(undefined)
  //   }
  // }

  return (
    <div
      className="box"
    >
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">ID</label>
        </div>
        <div className="field-body">
          <div className="field">
            <span>
              {props.id}
            </span>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Tag</label>
        </div>
        <div className="field-body">
          <div className="field">
            { props.tag?.name ?? "None"}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Point</label>
        </div>
        <div className="field-body">
          <div className="field">
            { points?.length ?? 0 } 
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Line</label>
        </div>
        <div className="field-body">
          <div className="field">
          </div>
        </div>
      </div>

      <div className="tabs is-boxed m-0">
        <ul>
          {
            TARGETS.map((x) => {
              return (
                <li 
                  key={x}
                  className={target === x ? "is-active" : ""}
                  onClick={() => setTarget(x)}
                >
                  <a>{x}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div 
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-Around"
        }}
      >
        { 
          target === "line" && 
            <div className="card">
              <SvgCharPlot
                data={props.file?.data}
                points={points}
                selectedId={startPoint?.id}
                width={512}
              />
            </div>
        }
        {
          target === "point" && 
            <SvgCharPlot
              data={props.file?.data}
              points={points}
              onAdd={addPoint}
              onDelete={removePoint}
              onMove={move}
              lines={lines}
              width={512}
            />
        }
      </div>
      <div className="level-right">
        <div className="p-1">
          {
            <SaveBtn  />
          }
        </div>
      </div>
    </div>
  )
})
export default ReferenceForm
