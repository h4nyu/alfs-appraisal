import React from "react"
import { observer } from "mobx-react-lite";
import TagFormView from '@sivic/web/components/TagForm'
import TagForm from '@sivic/web/store/TagForm'
import { History } from '@sivic/web/store'

const Content = observer((props: {
  tagForm: TagForm,
  history: History,
}) => {
  return (
    <TagFormView 
      name={props.tagForm.name}
      onNameChange={props.tagForm.setName}
      onSave={props.tagForm.save}
      onCancel={() => props.history.goBack()}
      onDelete={props.tagForm.delete}
    />
  );
});

export default Content;
