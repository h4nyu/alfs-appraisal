import React from "react"
import Box from "@sivic/core/box"
import Tag from "@sivic/core/tag"
import TagSelector from "@sivic/web/components/TagSelector"
import BoxView from "@sivic/web/components/BoxView"

const AssignTagForm = (props:{
  boxes?: Box[]
  tags?: Tag[],
  tagId?:string,
  onTagChange?: (tag?:Tag) => void
}) => {
  return (
    <div>
      <TagSelector 
        value={props.tagId}
        tags={props.tags}
        onChange={props.onTagChange}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: "wrap",
        }}
      >
        {
          props.boxes?.map(b => {
            return (
              <BoxView box={b} />
            )
          })
        }
      </div>
    </div>
  )
}
export default AssignTagForm
