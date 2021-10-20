import React from 'react';
import Line from '@sivic/core/line'
import Point from '@sivic/core/point'
import File from '@sivic/core/file'
import Image from '@sivic/core/image'
import SvgCharPlot from '@sivic/web/components/SvgCharPlot'
import { useForm } from "react-hook-form";
import { flatMap } from "lodash";


const RefLineForm = (props: Readonly<{
  file?: File,
  points?: Point[],
  lines?: Line[],
  onSubmit: () => Promise<void>;
}>) => {
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();

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
    <form>
      <SvgCharPlot
        data={props.file?.data}
        points={props.points}
        lines={lines}
        selectedId={startPoint?.id}
        onPointSelect={(i, _) => setPoint(i)}
      />
    </form>
  )
}
export default RefLineForm
