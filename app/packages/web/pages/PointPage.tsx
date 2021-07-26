import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import ImageView from "@sivic/web/components/ImageView";
import store from "@sivic/web/store";
import { InputMode } from "@sivic/web/store/BoxEditor"
import CharPlot from "@sivic/web/components/CharPlot";
import SvgCharPlot from "@sivic/web/components/SvgCharPlot"
import ResetBtn from "@sivic/web/components/ResetBtn"

const Content = observer(() => {
  const { imageProcess, pointEditor, lineEditor } = store;
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
        <ResetBtn 
          onClick={() => {
            pointEditor.clear()
            lineEditor.clear()
          }}
        />
        <a className="button is-success is-light" 
          onClick={() => lineEditor.getLine(pointEditor.points)}>
          BaseLine 
        </a>
      </div>
      <div
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 8) {
            pointEditor.del()
            lineEditor.del()
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
            points={pointEditor.points}
            lines={lineEditor.lines}
            selectedId={pointEditor.draggingId}
            lineId={lineEditor.draggingId}
            onPointSelect={pointEditor.toggleDrag}
            onLineSelect={lineEditor.toggleDrag}
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
