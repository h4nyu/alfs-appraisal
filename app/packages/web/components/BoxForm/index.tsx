import React from "react"
import { SvgCharPlotProps } from "@sivic/web/components/SvgCharPlot"
import Box from "@sivic/core/box"
import File from "@sivic/core/file"
import ResetBtn from "@sivic/web/components/ResetBtn"
import SaveBtn from "@sivic/web/components/SaveBtn"
import useBoxPlot from "@sivic/web/hooks/useBoxPlot"
import useImageForm from "@sivic/web/hooks/useImageForm"
import SvgCharPlot from "@sivic/web/components/SvgCharPlot"
import DeleteBtn from "@sivic/web/components/DeleteBtn"
import UpdateBtn from "@sivic/web/components/UpdateBtn"
import Tag from "@sivic/core/tag"
import Image from "@sivic/core/image"


export type BoxFormProps = {
  image: Image,
  file?: File
  tags?: Tag[]
  onSaveImage: (payload:{name:string}) => Promise<void>
  boxes: Box[]
  onSave: (payload: {boxes: Box[]}) => Promise<void>
  onDelete: VoidFunction
}
export const BoxForm = (props:BoxFormProps) => {
  const { toggleDrag, move, boxes, draggingId, add, remove } = useBoxPlot({
    boxes: props.boxes
  })
  const { name, setName } = useImageForm(props)
  return (
    <div
      className="box"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
      }}
    >
      <SvgCharPlot 
        data={props.file?.data} 
        boxes={boxes}
        tags={props.tags}
        selectedId={draggingId}
        onSelect={toggleDrag}
        onAdd={add}
        onMove={move}
        width={512+256}
        onDelete={remove}
      />
      <div className="p-1">
        <div className="field">
          <label className="label">File Name</label>
          <div className="control">
            <div className="field has-addons">
              <input 
                className="input" 
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <div className="control">
                <UpdateBtn 
                  onClick={() => props.onSaveImage({name})}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Box Count</label>
          { props.boxes.length }
        </div>
        <div 
          className="field"
          style={{
            display:"flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DeleteBtn 
            onClick={() => props.onDelete()}
          />
          <SaveBtn onClick={() => props.onSave({boxes})} />
        </div>
      </div>
    </div>
  )
} 
export default BoxForm