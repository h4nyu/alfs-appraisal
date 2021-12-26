import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "@sivic/web/store";
import useModal from "@sivic/web/hooks/useModal"
import BoxForm from "@sivic/web/components/BoxForm"
import { useNavigate } from "react-router-dom";
import Modal from "@sivic/web/components/Modal"

const Content = observer(() => {
  const { imageProcess } = store;
  const navigate = useNavigate()
  if(imageProcess.image === undefined){ 
    return null
  }
  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <BoxForm 
        image={imageProcess.image}
        file={imageProcess.file}
        boxes={imageProcess.boxes}
        onSave={imageProcess.save}
        onDelete={imageProcess.delete}
        onDetect={imageProcess.detectBoxes}
        onSaveImage={imageProcess.updateImage}
      />
    </Modal>
  );
});

export default Content;
