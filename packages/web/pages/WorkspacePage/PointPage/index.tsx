import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "@sivic/web/store";
import PointForm from "@sivic/web/components/PointForm";
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
      <PointForm 
        box={featureForm.box}
        tag={featureForm.tag}
        file={featureForm.file}
        points={featureForm.points}
        referenceFile={featureForm.referenceFile}
        referencePoints={featureForm.referencePoints}
        referenceLines={featureForm.referenceLines}
        lines={featureForm.lines}
        onSave={featureForm.save}
        onDelete={featureForm.delete}
        onReset={featureForm.resetPoints}
      />
    </Modal>
  );
});

export default Content;
