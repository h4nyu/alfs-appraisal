import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "@sivic/web/store";
import { useNavigate } from "react-router-dom";
import ReferenceForm from "@sivic/web/components/ReferenceForm"
import Modal from "@sivic/web/components/Modal"

const Content = observer(() => {
  const { featureForm, workspaceForm } = store;
  const navigate = useNavigate()
  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <ReferenceForm 
        id={store.featureForm.referenceBox?.id}
        tag={store.featureForm.tag}
        file={store.featureForm.referenceFile}
        points={store.featureForm.points}
        lines={store.featureForm.referenceLines}
        onSubmit={store.featureForm.save}
      />
    </Modal>
  );
});

export default Content;
