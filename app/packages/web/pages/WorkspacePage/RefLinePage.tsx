import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
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
import ReferenceTag from "@sivic/web/components/ReferenceTag"
import Cursor from "@sivic/web/components/Cursor"
import RefLineForm from "@sivic/web/components/RefLineForm"

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
            <span>
              {featureForm.referenceBox?.id}
            </span>
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
      <div 
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-Around"
        }}
      >
        {
          <>
            <div className="card">
              <RefLineForm 
                file={store.featureForm.referenceFile}
                points={store.featureForm.referencePoints}
                lines={store.featureForm.referenceLines}
                onSubmit={store.featureForm.submit}
              />
            </div>
          </>
        }
      </div>
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className="buttons">
          <SaveBtn 
            onClick={store.featureForm.submit}
          />
        </div>
      </div>
    </div>
  );
});

export default Content;
