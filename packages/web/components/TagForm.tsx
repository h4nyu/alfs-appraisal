import React from "react"
import SaveBtn from "@alfs-appraisal/web/components/SaveBtn"
import CancelBtn from "@alfs-appraisal/web/components/CancelBtn"
import DeleteBtn from "@alfs-appraisal/web/components/DeleteBtn"
import Box from "@alfs-appraisal/core/box"
import BoxView from "@alfs-appraisal/web/components/BoxView"
import DownloadBtn from "@alfs-appraisal/web/components/DownloadBtn"
import { Workspace } from "@alfs-appraisal/core/workspace"
import Summary from "@alfs-appraisal/core/summary"
import File from "@alfs-appraisal/core/file"
import Tag from "@alfs-appraisal/core/tag"
import { useForm } from "react-hook-form";
import SummaryTable from "@alfs-appraisal/web/components/SummaryTable"
import Loading from "@alfs-appraisal/web/components/Loading"

type FormValues = {
  id?: string,
  name: string,
  referenceBoxId? :string,
}
export const TagForm = (props: {
  tag?:Tag,
  id?: string,
  referenceBoxId?:string,
  onNameChange?: (value:string) => void,
  boxes?: Box[],
  files?: File[],
  workspace?:Workspace,
  summaryPairs?: Summary[][],
  onReferenceBoxChange?: (box:Box) => void,
  onBoxClick?: (box:Box) => void,
  onSubmit?:(v:FormValues) => Promise<void>
  onCancel?: () => void
  onDelete?: () => void
  onDownload?: () => void
  style?: React.CSSProperties,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      id: props.tag?.id,
      name: props.tag?.name ?? "",
      referenceBoxId: props.tag?.referenceBoxId, 
    }
  });
  const onSubmit = data => props.onSubmit?.(data)
  const boxes = props.boxes?.filter(x => x.tagId === props.tag?.id)

  return (
    <div className="box" 
      style={props.style}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              placeholder="Tag name"
              {...register("name")} 
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
                    key={x.id}
                    box={x} 
                    files={props.files}
                    isSelected={x.id === watch('referenceBoxId')}
                    onClick={() => setValue("referenceBoxId", x.id)}
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
                <SaveBtn onClick={handleSubmit(onSubmit)} />
              </div>
            </div>
          </div>
        </div>
      </form>
      {
        props.summaryPairs?.map( (summaries, i) => {
          return props.tag && (
            <SummaryTable key={i} rows={summaries} tag={props.tag} workspace={props.workspace} onBoxClick={props.onBoxClick}/>
          )
        })
      }
    </div>
  )
}
export default TagForm
