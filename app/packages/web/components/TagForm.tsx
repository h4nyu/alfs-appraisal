import React from "react"
import SaveBtn from "@sivic/web/components/SaveBtn"
import CancelBtn from "@sivic/web/components/CancelBtn"
import DeleteBtn from "@sivic/web/components/DeleteBtn"
import Box from "@sivic/core/box"
import BoxView from "@sivic/web/components/BoxView"
import File from "@sivic/core/file"

export const TagForm = (props: {
  id?: string,
  name?: string,
  workspaceId?: string,
  onNameChange?: (value:string) => void,
  boxes?: Box[],
  files?: File[],
  onSave?:() => Promise<void>
  onCancel?: () => void
  onDelete?: () => void
}) => {
  const boxes = props.boxes?.filter(x => x.tagId === props.id)
  return (
    <div className="box"> 
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input 
            className="input" 
            type="text" 
            placeholder="Tag name"
            value={props.name}
            onChange={e => props.onNameChange?.(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Reference</label>
        <div className="control"
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {
            boxes?.map(x => {
              return ( 
                <BoxView 
                  box={x} 
                  files={props.files}
                />
               )
            })
          }
        </div>
      </div>
      <div className="field">
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto"
          }}
        >
          <div>
            {
              props.onSave && 
                <SaveBtn onClick={props.onSave} />
            }
          </div>
          <div/>
          <div className="buttons">
            {
              props.onDelete && 
                <DeleteBtn onClick={e => props.onDelete?.()} />
            }
            {
              props.onCancel && 
                <CancelBtn onClick={e => props.onCancel?.()} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default TagForm
