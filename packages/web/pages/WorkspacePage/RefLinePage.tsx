import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "@sivic/web/store";
import ReferenceForm from "@sivic/web/components/ReferenceForm"
import Modal from "@sivic/web/components/Modal"
import { useNavigate } from "react-router-dom"; 

const Content = observer(() => {
  const navigate = useNavigate()
  const { featureForm, workspaceForm } = store;
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
