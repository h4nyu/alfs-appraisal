import React from "react"

export const TagForm = (props: {
  name?: string
  workspaceId?: string
  onNameChange?: (value:string) => void
}) => {
  return (
    <div> 
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input"/>
        </div>
      </div>
    </div>
  )
}
export default TagForm
