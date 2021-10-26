import React from "react"
import Box from "@sivic/core/box"
import Tag from "@sivic/core/tag"
import File from "@sivic/core/file";
import TagSelector from "@sivic/web/components/TagSelector"
import BoxView from "@sivic/web/components/BoxView"
import { sortBy } from "lodash"

const AssignTagForm = (props:{
  boxes?: Box[]
  tags?: Tag[],
  files?: File[],
  tagId?:string,
  onTagChange?: (tag?:Tag) => void
  onBoxClick?:(box:Box) => void
}) => {
  return (
    <div className="box">
      <TagSelector 
        value={props.tagId}
        tags={props.tags}
        onChange={props.onTagChange}
      />
      <div
        style={{
          display: 'flex',
          flexWrap: "wrap",
          maxHeight: 300,
          overflow: 'auto'
        }}
      >
        {
          props.boxes?.map(b => {
            return (
              <BoxView 
                box={b} 
                files={props.files}
                tags={props.tags}
                onClick={props.onBoxClick && (() => props.onBoxClick?.(b))}
              />
            )
          })
        }
      </div>
    </div>
  )
}
export default AssignTagForm
