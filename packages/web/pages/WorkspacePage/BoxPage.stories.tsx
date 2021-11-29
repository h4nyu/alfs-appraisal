import React from "react";
import ImagePage from "./BoxPage";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { Image } from "@sivic/core/image";
import { Box } from "@sivic/core/box"
import { v4 as uuid } from "uuid"
import File from "@sivic/core/file"
import store from "@sivic/web/store"
import annot from "/app/data/annto.json";


const { imageData } = annot;
export default {
  title: "pages/ImagePage",
  component: ImagePage,
  decorators: [(Story) => (
    <Router>
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

export const Primary = (args) => <ImagePage /> 
