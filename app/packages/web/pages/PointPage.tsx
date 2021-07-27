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

const Content = observer(() => {
  const { imageProcess, pointEditor, } = store;
  return (
    <div
      className="box"
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100%",
      }}
    >
      <div className="buttons">
        <a className="button is-success is-light" 
        >
          BaseLine 
        </a>
        <SaveBtn 
          onClick={store.featureForm.save}
        />
      </div>
      <div
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 8) {
            pointEditor.del()
          }
        }}
        style={{
          overflow:"scroll",
          display: "grid",
          alignItems: "center",
        }}
      >
        {
          <SvgCharPlot 
            data={store.featureForm.file?.data}
            points={pointEditor.points}
            lines={store.featureForm.refLines}
            selectedId={pointEditor.draggingId}
            onPointSelect={pointEditor.toggleDrag}
            onAdd={pointEditor.add}
            onMove={pointEditor.move}
            size={pointEditor.size}
            width={512}
          />
        }
      </div>
    </div>
  );
});

export default Content;
