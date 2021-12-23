import React from "react"
import { observer } from "mobx-react-lite";
import TagFormView from '@sivic/web/components/TagForm'
import TagForm from '@sivic/web/store/TagForm'
import store from "@sivic/web/store"
import Modal from "@sivic/web/components/Modal"
import { useNavigate } from "react-router-dom"; 

const Content = observer(() => {
  const navigate = useNavigate()
  return (
    <Modal
      isActive={true}
      onClose={() => navigate(-1)}
    >
      <TagFormView 
        workspace={store.imageForm.workspace}
        tag={store.tagForm.tag}
        id={store.tagForm.id}
        name={store.tagForm.name}
        workspaceId={store.tagForm.workspaceId}
        referenceBoxId={store.tagForm.referenceBoxId}
        onNameChange={store.tagForm.setName}
        boxes={store.boxStore.boxes}
        files={store.fileStore.files}
        summaryPairs={store.tagForm.summaryPairs}
        onReferenceBoxChange={b => store.tagForm.setReferenceBoxId(b.id)}
        onBoxClick={box => {
          if(box.tagId === undefined) { return }
          store.featureForm.init(box)
          navigate("/workspace/point")
        }}
        onSave={async () => {
          await store.tagForm.save()
        }}
        onDelete={store.tagForm.delete}
      />

    </Modal>
  );
});
export default Content;
