import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "@sivic/web/store";
import PointForm from "@sivic/web/components/PointForm";
import Modal from "@sivic/web/components/Modal"

const Content = observer(() => {
  const { featureForm, workspaceForm } = store;
  return (
    <Modal
      isActive={true}
      onClose={store.history.goBack}
    >
      <PointForm 
        box={featureForm.box}
        tag={featureForm.tag}
        file={featureForm.file}
        referenceFile={featureForm.referenceFile}
        referencePoints={featureForm.referencePoints}
        referenceLines={featureForm.referenceLines}
        points={featureForm.points}
        lines={featureForm.lines}
      />
    </Modal>
  );
});

export default Content;
