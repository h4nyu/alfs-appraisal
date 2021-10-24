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
import ReferenceForm from "@sivic/web/components/ReferenceForm"

const Content = observer(() => {
  const { featureForm, pointEditor, workspaceForm } = store;
  return (
      <ReferenceForm 
        id={store.featureForm.referenceBox?.id}
        tag={store.featureForm.tag}
        file={store.featureForm.referenceFile}
        points={[]}
        lines={store.featureForm.referenceLines}
        onSubmit={store.featureForm.save}
      />
  );
});

export default Content;
