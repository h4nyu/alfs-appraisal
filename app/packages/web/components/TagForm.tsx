import React from "react"
import SaveBtn from "@sivic/web/components/SaveBtn"
import CancelBtn from "@sivic/web/components/CancelBtn"
import DeleteBtn from "@sivic/web/components/DeleteBtn"
import Box from "@sivic/core/box"
import BoxView from "@sivic/web/components/BoxView"
import DownloadBtn from "@sivic/web/components/DownloadBtn"
import { Workspace } from "@sivic/core/workspace"
import Summary from "@sivic/core/summary"
import File from "@sivic/core/file"
import Tag from "@sivic/core/tag"
import SummaryTable from "@sivic/web/components/SummaryTable"

export const TagForm = (props: {
  tag?:Tag,
  id?: string,
  name?: string,
  workspaceId?: string,
  referenceBoxId?:string,
  onNameChange?: (value:string) => void,
  boxes?: Box[],
  files?: File[],
  workspace?:Workspace,
  summaryPairs?: Summary[][],
  onReferenceBoxChange?: (box:Box) => void,
  onBoxClick?: (box:Box) => void,
  onSave?:() => Promise<void>
  onCancel?: () => void
  onDelete?: () => void
  onDownload?: () => void
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
                  isSelected={x.id === props.referenceBoxId}
                  onClick={props.onReferenceBoxChange && (() => props.onReferenceBoxChange?.(x))}
                />
               )
            })
          }
        </div>
      </div>
      <div className="field">
        <div className="level">
          <div className="level-left">
            {
              props.onDelete && 
                <DeleteBtn onClick={e => props.onDelete?.()} />
            }
          </div>
          <div className="level-right">
            <div className="p-1">
              {
                props.onDownload && <DownloadBtn onClick={e => props.onDownload?.()} />
              }
            </div>
            <div className="p-1">
            {
              props.onSave && props.workspaceId && <SaveBtn onClick={props.onSave} />
            }
            </div>
          </div>
        </div>
      </div>
      {
        props.summaryPairs?.map( (summaries, i) => {
          return props.tag && (
            <div className="field"
              key={i}
            >
              <SummaryTable rows={summaries} tag={props.tag} workspace={props.workspace} onBoxClick={props.onBoxClick}/>
            </div>
          )
        })
      }
    </div>
  )
}
export default TagForm
