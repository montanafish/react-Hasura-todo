import gql from 'graphql-tag'

export const getAllTodos = gql`
  {
    todos(order_by: [todo_mark_asc, todo_id_desc]) {
      todo_id
      todo_text
      todo_mark
      todo_user
    }
  }
`

export const getIncompleteTodos = gql`
  {
    todos(where: { todo_mark: { _eq: false } }) {
      todo_id
      todo_text
      todo_mark
      todo_user
      todo_category
    }
  }
`

export const getCompleteTodos = gql`
  {
    todos(where: { todo_mark: { _eq: true } }) {
      todo_id
      todo_text
      todo_mark
      todo_user
      todo_category
    }
  }
`

export const addTodo = gql`
  mutation($todo_text: String!, $todo_user: String!, $todo_category: String!) {
    insert_todos(objects: [{ todo_text: $todo_text, todo_user: $todo_user, todo_category: $todo_category }]) {
      affected_rows
    }
  }
`

export const modifyTodo = gql`
  mutation($todo_id: Int!, $todo_text: String!, $todo_category: String!) {
    update_todos(
      where: { todo_id: { _eq: $todo_id } }
      _set: { todo_text: $todo_text, todo_category: $todo_category }
    ) {
      affected_rows
    }
  }
`

export const markTodo = gql`
  mutation($todo_id: Int!) {
    update_todos(where: { todo_id: { _eq: $todo_id } }, _set: { todo_mark: true }) {
      affected_rows
    }
  }
`

export const deleteTodo = gql`
  mutation($todo_id: Int!) {
    delete_todos(where: { todo_id: { _eq: $todo_id } }) {
      affected_rows
    }
  }
`
