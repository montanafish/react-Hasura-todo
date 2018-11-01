import React, { Component } from "react";
import {
  markTodo,
  getIncompleteTodos,
  sortByCategoryIncompleteTodos,
  getAllTodos
} from "../queries";
import { Mutation } from "react-apollo";
import { DropdownButton, MenuItem } from "react-bootstrap";

class SortTodo extends Component {
  render() {
    return (
      <DropdownButton title="Sort By">
        <MenuItem>{"Text"}</MenuItem>
        <MenuItem>{"Category"}</MenuItem>
      </DropdownButton>
    );
  }
}
export default SortTodo;
