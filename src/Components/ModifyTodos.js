import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { modifyTodo, getIncompleteTodos, getAllTodos } from "../queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

class ModifyTodos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo_text: "",
      todo_user: "",
      todo_category: ""
    };
  }

  modifytodo(update_todos) {
    var todo_user = localStorage.getItem("sub");
    this.setState({ todo_user: todo_user }, function() {
      update_todos({
        variables: this.state,
        refetchQueries: [{ query: getIncompleteTodos }, { query: getAllTodos }]
      });
    });
  }

  render() {
    return (
      <Mutation mutation={modifyTodo}>
        {(update_todos, { data }) => (
          <Button
            onClick={e => {
              e.preventDefault();
              this.modifytodo(update_todos);
            }}
          >
            <FontAwesomeIcon icon={faEdit} style={{ color: "blue" }} />
          </Button>
        )}
      </Mutation>
    );
  }
}

export default ModifyTodos;
