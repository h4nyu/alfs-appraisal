import React from "react"
import SaveBtn from "@sivic/web/components/SaveBtn"
import CancelBtn from "@sivic/web/components/CancelBtn"
import DeleteBtn from "@sivic/web/components/DeleteBtn"

export const TagForm = (props: {
  name?: string
  workspaceId?: string
  onNameChange?: (value:string) => void
  onSave?:() => void
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
      <div className="field is-grouped is-fullwidth">
        <div className="control">
          {
            props.onSave && <SaveBtn onClick={e => props.onSave?.()} />
          }
        </div>
        <div className="control">
          {
            props.onDelete && <DeleteBtn onClick={e => props.onDelete?.()} />
          }
        </div>
        <div className="control">
          {
            props.onCancel && <CancelBtn onClick={e => props.onCancel?.()} />
          }
        </div>
      </div>
    </div>
  )
}
export default TagForm
