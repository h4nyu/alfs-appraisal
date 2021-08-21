import React from "react"
import SaveBtn from "@sivic/web/components/SaveBtn"
import CancelBtn from "@sivic/web/components/CancelBtn"
import DeleteBtn from "@sivic/web/components/DeleteBtn"

export const TagForm = (props: {
  name?: string
  workspaceId?: string
  onNameChange?: (value:string) => void
  onSave?:() => Promise<void>
  onCancel?: () => void
  onDelete?: () => void
}) => {
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
