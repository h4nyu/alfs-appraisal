import React from "react";
import { Workspace } from "@sivic/core/workspace"
import { useForm } from "react-hook-form";
import SaveBtn from "@sivic/web/components/SaveBtn"

export const WorkspaceForm = (props: {
  workspace:Workspace
  onSubmit: (workspace:Workspace) => void
}) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => props.onSubmit(Workspace({
    ...props.workspace,
    ...data,
  }))

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Name</label>
        <div className="field has-addons">
          <div className="control is-expanded" >
            <input 
              className="input" 
              defaultValue={props.workspace.name}
              {...register("name")} 
            />
          </div>
          <div className="control">
            <SaveBtn onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default WorkspaceForm
