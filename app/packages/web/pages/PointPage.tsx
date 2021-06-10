import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import ImageView from "@sivic/web/components/ImageView";
import store from "@sivic/web/store";
import { InputMode } from "@sivic/web/store/BoxEditor"
import CharPlot from "@sivic/web/components/CharPlot";
import SvgCharPlot from "@sivic/web/components/SvgCharPlot"
import CropedBox from "@sivic/web/components/CropedBox"

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
        <a className="button is-info is-light" onClick={pointEditor.prev}>
          ⇦
        </a>
        <a className="button is-info is-light" onClick={pointEditor.next}>
          ⇨
        </a>
        <a 
          className="button is-light" 
        >
          Detect
        </a>
        <a 
          className="button is-danger is-light" 
          onClick={() => {
            pointEditor.clear()
            lineEditor.clear()
          }}
        >
          Reset
        </a>
        <a className="button is-success is-light" onClick={() => lineEditor.getLine(pointEditor.points.toList().toJS())}>
          BaseLine 
        </a>
        <a className="button is-info is-light" onClick={imageProcess.save}>
          Save
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
          pointEditor.images &&  
            <SvgCharPlot 
              data={pointEditor.images?.get(pointEditor.cursor)?.data} 
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
