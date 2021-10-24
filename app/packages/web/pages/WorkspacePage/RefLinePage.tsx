import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "@sivic/web/store";
import ReferenceForm from "@sivic/web/components/ReferenceForm"
import Modal from "@sivic/web/components/Modal"

const Content = observer(() => {
  const { featureForm, pointEditor, workspaceForm } = store;
  return (
    <Modal
      isActive={true}
      onClose={store.history.goBack}
    >
      <ReferenceForm 
        id={store.featureForm.referenceBox?.id}
        tag={store.featureForm.tag}
        file={store.featureForm.referenceFile}
        points={[]}
        lines={store.featureForm.referenceLines}
        onSubmit={store.featureForm.save}
      />
    </Modal>
  );
});

export default Content;
