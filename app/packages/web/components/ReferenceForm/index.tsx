import React from 'react';
import { observer } from "mobx-react-lite";
import Line from '@sivic/core/line'
import Point from '@sivic/core/point'
import File from '@sivic/core/file'
import Image from '@sivic/core/image'
import SvgCharPlot from '@sivic/web/components/SvgCharPlot'
import { useForm } from "react-hook-form";
import Tag from '@sivic/core/tag'
import { flatMap } from "lodash";
import ResetBtn from "@sivic/web/components/ResetBtn"
import SaveBtn from "@sivic/web/components/SaveBtn"
import { Payload as LoadLinePayload } from '@sivic/core/line/load'
import PointEditor from '@sivic/web/store/PointEditor'


const TARGETS = [ "point", "line"] as const
type Target = typeof TARGETS[number]
const ReferenceForm = observer((props: Readonly<{
  id?:string;
  tag?: Tag;
  file?: File,
  lines?: Line[],
  pointEditor:PointEditor,
  onSubmit: (lines:Line[]) => Promise<void>;
}>) => {
  const [target, setTarget] = React.useState<Target>("point")
  const [startPoint, setStartPoint] = React.useState<Point|undefined>(undefined)
  const [lines, setLines] = React.useState<Line[]>(props.lines ? props.lines : [])
  const points = props.pointEditor.points
  const setPoint = (pointId:string) => {
    const point = points?.find(x => x.id === pointId)
    if(!point) { return }

    const matchedLine = lines.find(line => {
      return line.start.posEquals(point) || line.end.posEquals(point)
    })
    if(matchedLine) {
      setLines(
        lines.filter(x => x.id !== matchedLine.id)
      )
      setStartPoint(undefined)
      return
    }
    if(startPoint === undefined && lines.length < 2){
      setStartPoint(point)
      return
    }
    if(startPoint !== undefined
    && !startPoint.posEquals(point)
    ) {
      const newLines = [
        ...lines,
        Line({
          start:startPoint,
          end:point,
        })
      ]
      setLines(newLines)
      setStartPoint(undefined)
    }
  }

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
            { lines.length } 
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
                points={props.pointEditor.points}
                lines={lines}
                selectedId={startPoint?.id}
                onPointSelect={(i, _) => setPoint(i)}
                width={512}
              />
            </div>
        }
        {
          target === "point" && 
            <div className="card"
              tabIndex={0}
              onKeyDown={e => {
                if (e.keyCode === 8) {
                  props.pointEditor.del()
                  const { draggingId } = props.pointEditor
                  setLines(
                    lines.filter(l => l.start.id !== draggingId && l.end.id !== draggingId)
                  )
                }
              }}
            >
              <SvgCharPlot
                data={props.file?.data}
                points={props.pointEditor.points}
                lines={lines}
                selectedId={props.pointEditor.draggingId}
                onPointSelect={props.pointEditor.toggleDrag}
                onAdd={props.pointEditor.add}
                onMove={props.pointEditor.move}
                size={props.pointEditor.size}
                width={512}
              />
            </div>
        }
      </div>
      <div className="level-right">
        <div className="p-1">
          {
            <SaveBtn onClick={() => props.onSubmit(lines)} />
          }
        </div>
      </div>
    </div>
  )
})
export default ReferenceForm
