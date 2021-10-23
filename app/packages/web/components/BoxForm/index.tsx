import React from "react"
import { SvgCharPlotProps } from "@sivic/web/components/SvgCharPlot"
import Box from "@sivic/core/box"
import ResetBtn from "@sivic/web/components/ResetBtn"
import SaveBtn from "@sivic/web/components/SaveBtn"

export type BoxFormProps = {
  name: string
  onNameChange:(value:string) => void
  onSaveName: () => Promise<void>
  boxes: Box[]
}
export const BoxForm = (props:BoxFormProps) => {
  return (
    <div
      className="box"
    >
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">File Name</label>
        </div>
        <div className="field-body">
          <div className="field has-addons">
            <input 
              className="input" 
              type="text"
              value={props.name}
              onChange={e => props.onNameChange(e.target.value)}
            />
            <div className="control">
              <SaveBtn 
                onClick={props.onSaveName}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="level">
        <div className="level-item">
          <div>
            <p className="heading">Count</p>
            <p className="title"> { props.boxes.length } </p>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 8) {
          }
        }}
        style={{
          display: "grid",
          justifyContent: "center",
        }}
      >
      </div>
      <div className="level">
        <div className="level-left">
        </div>
      </div>
    </div>
  )
} 
