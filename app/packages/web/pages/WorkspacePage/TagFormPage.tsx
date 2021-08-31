import React from "react"
import { observer } from "mobx-react-lite";
import TagFormView from '@sivic/web/components/TagForm'
import TagForm from '@sivic/web/store/TagForm'
import store from "@sivic/web/store"

const Content = observer(() => {
  return (
    <TagFormView 
      id={store.tagForm.id}
      name={store.tagForm.name}
      referenceBoxId={store.tagForm.referenceBoxId}
      onNameChange={store.tagForm.setName}
      boxes={store.boxStore.boxes}
      files={store.fileStore.files}
      onBoxClick={b => store.tagForm.setReferenceBoxId(b.id)}
      onSave={async () => {
        await store.tagForm.save()
      }}
      onDelete={store.tagForm.delete}
    />
  );
});
export default Content;
