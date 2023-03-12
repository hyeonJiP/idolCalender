import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";

const PostList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="content" />
        <TextField source="date" />
        <EditButton basePath="/admin" />
        <DeleteButton basePath="/admin" />
      </Datagrid>
    </List>
  );
};

export default PostList;
