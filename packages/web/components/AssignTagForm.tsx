import React, {useState} from "react"
import Box from "@alfs-appraisal/core/box"
import Tag from "@alfs-appraisal/core/tag"
import File from "@alfs-appraisal/core/file";
import TagSelector from "@alfs-appraisal/web/components/TagSelector"
import BoxView from "@alfs-appraisal/web/components/BoxView"
import { sortBy } from "lodash"

const AssignTagForm = (props:{
  boxes?: Box[]
  tags?: Tag[],
  files?: File[],
  tagId?:string,
  onSubmit?: (box:Box) => void
}) => {
  const [tagId, setTagId] = useState(props.tagId)

  return (
    <div className="box">
      <TagSelector 
        tags={props.tags}
        value={tagId}
        onChange={t => setTagId(t?.id)}
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
                key={b.id}
                box={b} 
                files={props.files}
                tags={props.tags}
                onClick={() => props.onSubmit?.(Box({
                  ...b,
                  tagId,
                }))}
              />
            )
          })
        }
      </div>
    </div>
  )
}
export default AssignTagForm
