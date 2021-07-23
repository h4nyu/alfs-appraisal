import React from "react"
import { observer } from "mobx-react-lite";
import TagFormView from '@sivic/web/components/TagForm'
import TagForm from '@sivic/web/store/TagForm'

const Content = observer((props: {
  tagForm: TagForm,
}) => {
  return (
    <TagFormView 
      onSave={props.tagForm.save}
      onNameChange={props.tagForm}
    />
  );
});

export default Content;
