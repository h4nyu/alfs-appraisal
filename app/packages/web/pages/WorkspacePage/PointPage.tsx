import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import ImageView from "@sivic/web/components/ImageView";
import store from "@sivic/web/store";
import { InputMode } from "@sivic/web/store/BoxEditor"
import CharPlot from "@sivic/web/components/CharPlot";
import SvgCharPlot from "@sivic/web/components/SvgCharPlot"
import ResetBtn from "@sivic/web/components/ResetBtn"
import SaveBtn from "@sivic/web/components/SaveBtn"
import TagSelector from "@sivic/web/components/TagSelector"
import DeleteBtn from "@sivic/web/components/DeleteBtn"
import PointTable from "@sivic/web/components/PointTable"
import CheckBox from "@sivic/web/components/CheckBox"

const Content = observer(() => {
  const { featureForm, pointEditor, workspaceForm } = store;
  return (
    <div
      className="box"
    >
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">ID</label>
        </div>
        <div className="field-body">
          <div className="field">
            {featureForm.box?.id}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Tag</label>
        </div>
        <div className="field-body">
          <div className="field">
            { featureForm.tag?.name ?? "None"}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Count</label>
        </div>
        <div className="field-body">
          <div className="field">
            { pointEditor.points?.length ?? 0 } 
          </div>
        </div>
      </div>
      <div 
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-Around"
        }}
      >
        {
          featureForm.referenceBox?.id !== featureForm.box?.id &&
          <SvgCharPlot 
            data={featureForm.referenceFile?.data}
            points={featureForm.referencePoints}
            size={pointEditor.size}
            width={256}
          />
        }
        <SvgCharPlot 
          data={featureForm.file?.data}
          points={pointEditor.points}
          lines={store.featureForm.refLines}
          selectedId={pointEditor.draggingId}
          onPointSelect={pointEditor.toggleDrag}
          onAdd={pointEditor.add}
          onMove={pointEditor.move}
          size={pointEditor.size}
          width={256}
        />
      </div>
      <div className="level">
        <div className="level-left">
          <DeleteBtn 
            onClick={() => store.featureForm.delete()}
          />
        </div>
        <div className="level-right">
          <SaveBtn 
            onClick={store.featureForm.save}
          />
        </div>
      </div>
    </div>
  );
});

export default Content;
