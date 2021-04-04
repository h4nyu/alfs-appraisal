import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Map } from "immutable";
import ImageView from "@sivic/web/components/ImageView";
import store from "@sivic/web/store";
import CharPlot from "@sivic/web/components/CharPlot";
import CropedBox from "@sivic/web/components/CropedBox"

const Content = observer(() => {
  const { imageProcess } = store;
  const { image, boxes } = imageProcess
  return (
    <div
      className="box"
      style={{
        display: "grid",
        gridTemplateRows: "auto 2fr 1fr",
        height: "100%",
      }}
    >
      <div>
        <a className="button is-info is-light" onClick={imageProcess.fetchBox}>
          Box 
        </a>
      </div>
      <div
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 8) {
            imageProcess.deleteBox()
          }
        }}
        style={{
          overflow:"scroll"
        }}
      >
        {
          image &&  <CharPlot 
            data={image.data} 
            boxes={imageProcess.boxes}
            lineWidth={imageProcess.lineWidth}
            selectedId={imageProcess.selectedId}
            onBoxClick={imageProcess.selectBox}
            style={{
              width:"100%"
            }}
          />
        }
      </div>
      <div
        style={{
          overflow:"scroll",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {
          imageProcess.boxes.toList().map(b => (
            <div
              className="card m-1"
              style={{
                width: 50,
                height: 50,
              }}
            >
              <CropedBox 
                box={b}
                data={image?.data}
                style={{
                  maxWidth:"100%",
                  maxHeight:"100%"
                }}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
});

export default Content;
