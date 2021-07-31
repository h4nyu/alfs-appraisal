import React from "react";
import ImagePage from "./BoxPage";
import { Router, Switch, Route } from "react-router-dom";
import { createHashHistory } from "history";
import { Image } from "@sivic/core/image";
import { Map } from "immutable"
import { Box } from "@sivic/core/box"
import { v4 as uuid } from "uuid"
import File from "@sivic/core/file"
import store from "@sivic/web/store"
import annot from "/srv/data/annto.json";

const history = createHashHistory();

const { imageData } = annot;
export default {
  title: "pages/ImagePage",
  component: ImagePage,
  decorators: [(Story) => (
    <Router history={history}>
      <div style={{height: 500}}>
        <Story/>
      </div>
    </Router>

  )]
};

store.imageProcess.image = Image({
  name: "image name"
})
store.imageProcess.file = File({
  data: annot.imageData,
})
store.editor.boxes = [
  Box({
    x0: 5, 
    y0: 5,
    x1: 10,
    y1: 10,
  })
]

export const Primary = (args) => <ImagePage /> 
