import React, { useState } from 'react';
import { Workspace } from "@alfs-appraisal/core/workspace";
import DateView from "@alfs-appraisal/web/components/DateView";
import TableHeader from "@alfs-appraisal/web/components/TableHeader";
import Divider from "@alfs-appraisal/web/components/Divider";
import DeleteBtn from "@alfs-appraisal/web/components/DeleteBtn";
import CreateBtn from "@alfs-appraisal/web/components/CreateBtn";
import AddBtn from "@alfs-appraisal/web/components/AddBtn";

export const WorkspaceTable = (props: {
  name?: string,
  workspaces: Workspace[];
  onClick?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCreate?:() => void;
  onNameChange?:(name: string) => void;
}) => {
  const { 
    workspaces, 
    onClick, 
    onDelete, 
    onNameChange 
  } = props;

  let rows = workspaces.map(x => {
    return {
      ...x,
      Name: x.name,
      Create:x.createdAt,
      onClick: () => props.onClick?.(x.id),
      onDelete: () => props.onDelete?.(x.id),
    }
  })
  return (
    <div style={{width:"100%"}}>
      {
        <div
          style={{ 
            display: "grid",
            gridTemplateColumns: "1fr auto auto",
            alignItems: "center",
          }}
        >
          <span className="label">
            Workspaces
          </span>
            <div className="control">
              {
                props.onCreate && <div className="button is-success is-light" onClick={() => props.onCreate?.()}> new </div>
              }
            </div>
        </div>
      }
      <Divider/>
      {rows
        .map((x, i) => {
          return (
            <div
              key={i}
            >
              <div
                style={{ 
                  cursor: onClick ? "pointer" : "",
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  alignItems: "center",
                }}
              >
                <a className="p-1" onClick={x.onClick}> {x.name} </a>
                <div className="p-1" onClick={x.onClick}> <DateView value={x.createdAt} /> </div>
                <div className="p-1"> <DeleteBtn onClick={x.onDelete} /> </div>
              </div>
              <Divider/>
            </div>
          );
        })}
    </div>
  );
};
export default WorkspaceTable;
