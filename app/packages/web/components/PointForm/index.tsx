import React from "react"
import Box from "@sivic/core/box"
import Tag from "@sivic/core/tag"
import SaveBtn from "@sivic/web/components/SaveBtn"
import DeleteBtn from "@sivic/web/components/DeleteBtn"
import Point from "@sivic/core/point"
import ResetBtn from "@sivic/web/components/ResetBtn"
import usePointPlot from "@sivic/web/hooks/usePointPlot"
import File from "@sivic/core/file"
import SvgCharPlot from "@sivic/web/components/SvgCharPlot"



export const PointForm = (props: {
  box?: Box,
  tag?: Tag,
  file?: File,
  points?: Point[],
  onDelete?: VoidFunction,
  onSave?: VoidFunction,
}) => {
  const {draggingId, toggleDrag, move, points} = usePointPlot({ points: props.points })
  return (
    <div
      className="box"
    >
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Box ID</label>
        </div>
        <div className="field-body">
          <div className="field">
            <span>
              {props.box?.id}
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
          <label className="label">Count</label>
        </div>
        <div className="field-body">
          <div className="field">
            { props.points?.length ?? 0 } 
          </div>
        </div>
      </div>
      <div 
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-Around"
        }}
      >
        <div className="card">
          {/* <SvgCharPlot */} 
          {/*   data={featureForm.referenceFile?.data} */}
          {/*   lines={store.featureForm.referenceLines} */}
          {/*   points={featureForm.referencePoints} */}
          {/*   selectedId={store.featureForm.selectedReferencePoint?.id} */}
          {/*   size={pointEditor.size} */}
          {/*   width={512} */}
          {/* /> */}
        </div>
        <div className="card">
          <SvgCharPlot  
            data={props.file?.data} 
            points={points} 
            selectedId={draggingId}
            onPointSelect={toggleDrag} 
            onMove={move} 
            size={512}
          /> 
          {/* <Cursor */} 
          {/*   onUp={pointEditor.up} */}
          {/*   onDown={pointEditor.down} */}
          {/*   onRight={pointEditor.right} */}
          {/*   onLeft={pointEditor.left} */}
          {/* /> */}
        </div>
      </div>
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className="buttons">
          <DeleteBtn />
        </div>
        <div className="buttons">
          <ResetBtn />
          <SaveBtn />
        </div>
      </div>
    </div>

  )
}

export default PointForm
