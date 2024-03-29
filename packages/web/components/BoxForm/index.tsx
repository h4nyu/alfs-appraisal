import React from "react"
import { SvgCharPlotProps } from "@alfs-appraisal/web/components/SvgCharPlot"
import Box from "@alfs-appraisal/core/box"
import File from "@alfs-appraisal/core/file"
import ResetBtn from "@alfs-appraisal/web/components/ResetBtn"
import SaveBtn from "@alfs-appraisal/web/components/SaveBtn"
import useBoxPlot from "@alfs-appraisal/web/hooks/useBoxPlot"
import useImageForm from "@alfs-appraisal/web/hooks/useImageForm"
import SvgCharPlot from "@alfs-appraisal/web/components/SvgCharPlot"
import DeleteBtn from "@alfs-appraisal/web/components/DeleteBtn"
import UpdateBtn from "@alfs-appraisal/web/components/UpdateBtn"
import DetectBtn from "@alfs-appraisal/web/components/DetectBtn"
import Tag from "@alfs-appraisal/core/tag"
import Image from "@alfs-appraisal/core/image"
import CheckBox from "@alfs-appraisal/web/components/CheckBox"


export type BoxFormProps = {
  image: Image,
  file?: File
  tags?: Tag[]
  onSaveImage: (payload:{name:string}) => Promise<void>
  boxes: Box[]
  onDetect: () => Promise<Box[]>
  onSave: (payload: {boxes: Box[]}) => Promise<void>
  onDelete: VoidFunction
}
export const BoxForm = (props:BoxFormProps) => {
  const { 
    toggleDrag, 
    move, 
    boxes, 
    dragId, 
    add, 
    remove, 
    setBoxes, 
    shiftX, 
    shiftY,
    setDragId,
  } = useBoxPlot({
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
        selectedId={dragId}
        onSelect={toggleDrag}
        onAdd={add}
        onMove={move}
        width={512 + 256}
        onDelete={remove}
        onUp={() => shiftY(-1)}
        onDown={() => shiftY(1)}
        onRight={() => shiftX(1)}
        onLeft={() => shiftX(-1)}
        onEscape={() => setDragId(undefined)}
        onEnter={() => setDragId(undefined)}
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
          <DetectBtn 
            onClick={async () => {
              setBoxes(await props.onDetect())
            }}
          />
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
