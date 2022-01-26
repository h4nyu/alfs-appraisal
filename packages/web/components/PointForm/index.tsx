import React from "react"
import Box from "@alfs-appraisal/core/box"
import Tag from "@alfs-appraisal/core/tag"
import SaveBtn from "@alfs-appraisal/web/components/SaveBtn"
import DeleteBtn from "@alfs-appraisal/web/components/DeleteBtn"
import Point, { ResizeFn } from "@alfs-appraisal/core/point"
import ResetBtn from "@alfs-appraisal/web/components/ResetBtn"
import usePointPlot from "@alfs-appraisal/web/hooks/usePointPlot"
import Line from "@alfs-appraisal/core/line"
import File from "@alfs-appraisal/core/file"
import SvgCharPlot from "@alfs-appraisal/web/components/SvgCharPlot"



export const PointForm = (props: {
  box?: Box,
  tag?: Tag,
  file?: File,
  referenceBox?:Box,
  referenceFile?: File,
  referenceLines?: Line[],
  referencePoints?:Point[],
  points?: Point[],
  onSave: (payload:{points: Point[]}) => Promise<void>,
  onDelete?: VoidFunction,
  onReset?: VoidFunction
}) => {
  const getDefaultPoints = () => {
    if(props.box === undefined || props.referenceBox === undefined) {return []}
    const resize = ResizeFn({source:props.referenceBox, target:props.box})
    return props.referencePoints?.map(p => Point({
      x:p.x,
      y:p.y,
      boxId: props.box?.id,
      positionId: p.positionId,
    })).map(resize) ?? []
  }

  const {draggingId, toggleDrag, move, points, reset } = usePointPlot({ points: (props.points?.length ?? 0) > 0  ? props.points : getDefaultPoints() })

  const draggingPoint = points.find(p => p.id === draggingId)
  const refDraggingId = props.referencePoints?.find(p => p.positionId === draggingPoint?.positionId)?.id
  const referenceLines = props.referenceLines ?? []
  const lines = referenceLines.map(x => {
    const start = points.find(p => p.positionId === x.start.positionId)
    const end = points.find(p => p.positionId === x.end.positionId)
    return Line({
      start,
      end,
      boxId: props.box?.id,
    })
  })



  return (
    <div
      className="box"
      style={{
        display: 'grid',
        gridTemplateColumns: "1fr auto",
      }}
    >

      <div 
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-Around",
          gap: "1em",
        }}
      >
        <SvgCharPlot 
          data={props.referenceFile?.data} 
          lines={referenceLines}
          points={props.referencePoints}
          selectedId={refDraggingId}
          width={512}
        />
        <SvgCharPlot  
          data={props.file?.data} 
          points={points} 
          lines={lines}
          selectedId={draggingId}
          onPointSelect={toggleDrag} 
          onMove={move} 
          size={512}
        /> 
      </div>
      <div>
        <div className="field">
          <label className="label">Box ID</label>
          {props.box?.id}
        </div>
        <div className="field">
          <label className="label">Tag</label>
          { props.tag?.name ?? "None"}
        </div>
        <div 
          className="field"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <DeleteBtn 
            onClick={() => props.onDelete?.()}
          />
          <div/>
          <div>
            <ResetBtn 
              onClick={() => reset(getDefaultPoints())}
            />
            <SaveBtn 
              onClick={() => props.onSave?.({points})}
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default PointForm
