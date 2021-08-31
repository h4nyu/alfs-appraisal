import React from "react"
import { observer } from "mobx-react-lite";
import AssignTagFormView from '@sivic/web/components/AssignTagForm'
import store from "@sivic/web/store"

const Content = observer(() => {
  return (
    <AssignTagFormView 
      tagId={store.assignTagForm.tagId}
      onTagChange={t => store.assignTagForm.setTagId(t?.id)}
      boxes={store.workspaceForm.boxes}
      tags={store.workspaceForm.tags}
      files={store.fileStore.files}
      onBoxClick={store.assignTagForm.assign}
    />
  );
});
export default Content;
