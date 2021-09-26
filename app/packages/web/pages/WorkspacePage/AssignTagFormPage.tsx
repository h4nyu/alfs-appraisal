import React from "react"
import { observer } from "mobx-react-lite";
import AssignTagFormView from '@sivic/web/components/AssignTagForm'
import store from "@sivic/web/store"

const Content = observer(() => {
  return (
    <AssignTagFormView 
      tagId={store.assignTagForm.tagId}
      boxes={store.workspaceForm.boxes}
      tags={store.workspaceForm.tags}
      files={store.fileStore.files}
      onBoxClick={store.assignTagForm.assign}
      onTagChange={t => store.assignTagForm.setTagId(t?.id)}
    />
  );
});
export default Content;
