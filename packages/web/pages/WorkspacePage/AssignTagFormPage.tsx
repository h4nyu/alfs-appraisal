import React from "react"
import { observer } from "mobx-react-lite";
import AssignTagFormView from '@sivic/web/components/AssignTagForm'
import Modal from "@sivic/web/components/Modal"
import { useNavigate } from "react-router-dom";
import store from "@sivic/web/store"

const Content = observer(() => {
  const navigate = useNavigate()
  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <AssignTagFormView 
        tagId={store.assignTagForm.tagId}
        boxes={store.workspaceForm.boxes}
        tags={store.workspaceForm.tags}
        files={store.fileStore.files}
        onBoxClick={store.assignTagForm.assign}
        onTagChange={t => store.assignTagForm.setTagId(t?.id)}
      />
    </Modal>
  );
});
export default Content;
