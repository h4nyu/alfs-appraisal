import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import store from "@sivic/web/store";

const Content = observer(() => {
  const { workspaceForm } = store
  return (
    <div
      className="box"
      style={{
        display: "grid",
        gridTemplateRows: "1fr 110px",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="field" 
        style={{ 
          gridRow: "1",
          height: "100%",
        }}
      >
        <label className="label">Name</label>
        <div className="control" >
          <input 
            className="input" 
            type="text" 
            value={store.workspaceForm.name} 
            onChange={e => store.workspaceForm.setName(e.target.value)}
          />
        </div>
      </div>
      <div 
        style={{
          gridRow: "2"
        }}
      >
        <div className="button is-info" onClick={() => workspaceForm.save()}> Save </div>
      </div>
    </div>
  );
});

export default Content;
