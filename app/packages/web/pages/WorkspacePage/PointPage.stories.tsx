import React from "react";
import Page from "./PointPage";
import { Router, Switch, Route } from "react-router-dom";
import { createHashHistory } from "history";
import { Image } from "@sivic/core/image";
import { Box } from "@sivic/core/box"
import { v4 as uuid } from "uuid"
import File from "@sivic/core/file"
import store from "@sivic/web/store"
import annot from "/srv/data/annto.json";

const history = createHashHistory();

const { imageData } = annot;
export default {
  title: "pages/PointPage",
  component: Page,
  decorators: [(Story) => (
    <Router history={history}>
      <div style={{height: 500}}>
        <Story/>
      </div>
    </Router>

  )]
};
store.featureForm.box = Box({
  fileId: "f0"
})
store.fileStore.files = [
  File({
    id: "f0",
    data: annot.imageData,
  })
]

store.featureForm 
export const Primary = (args) => <Page /> 
