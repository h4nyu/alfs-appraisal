import React from "react"
import { observer } from "mobx-react-lite";
import TagFormView from '@sivic/web/components/TagForm'
import TagForm from '@sivic/web/store/TagForm'

const Content = observer((props: {
  tagForm: TagForm,
}) => {
  return (
    <TagFormView 
      onNameChange={props.tagForm.setName}
      onSave={props.tagForm.save}
    />
  );
});

export default Content;
