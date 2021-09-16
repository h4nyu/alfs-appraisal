import React from "react"
import { observer } from "mobx-react-lite";
import TagFormView from '@sivic/web/components/TagForm'
import TagForm from '@sivic/web/store/TagForm'
import store from "@sivic/web/store"

const Content = observer(() => {
  return (
    <TagFormView 
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
        store.history.push("/workspace/point")
      }}
      onSave={async () => {
        await store.tagForm.save()
      }}
      onDelete={store.tagForm.delete}
    />
  );
});
export default Content;
