import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import store from "@sivic/web/store";
import useModal from "@sivic/web/hooks/useModal"
import BoxForm from "@sivic/web/components/BoxForm"
import Modal from "@sivic/web/components/Modal"

const Content = observer(() => {
  const { imageProcess, editor, pointEditor, history } = store;
  if(imageProcess.image === undefined){ 
    return null
  }
  return (
    <Modal
      isActive={true}
      onClose={history.goBack}
    >
      <BoxForm 
        image={imageProcess.image}
        file={imageProcess.file}
        boxes={imageProcess.boxes}
        onSave={imageProcess.save}
        onDelete={imageProcess.delete}
        onSaveImage={imageProcess.updateImage}
      />
    </Modal>
  );
});

export default Content;
