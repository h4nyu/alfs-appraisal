import React from 'react';
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


const RefLineForm = (props: Readonly<{
  id?:string;
  tag?: Tag;
  file?: File,
  points?: Point[],
  lines?: Line[],
  onSubmit: (payload: {
    lines:Line[],
    points:Point[],
  }) => Promise<void>;
}>) => {
  const [startPoint, setStartPoint] = React.useState<Point|undefined>(undefined)
  const [lines, setLines] = React.useState<Line[]>(props.lines ? props.lines : [])
  const setPoint = (pointId:string) => {
    const point = props.points?.find(x => x.id === pointId)
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
            { props.points?.length ?? 0 } 
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
      <SvgCharPlot
        data={props.file?.data}
        points={props.points}
        lines={lines}
        selectedId={startPoint?.id}
        onPointSelect={(i, _) => setPoint(i)}
      />
      <div className="level-right">
        <div className="p-1">
          {
            props.onSubmit &&  <SaveBtn onClick={() => props.onSubmit({
              points: props.points ?? [],
              lines: lines
            })} />
          }
        </div>
      </div>
    </div>
  )
}
export default RefLineForm
