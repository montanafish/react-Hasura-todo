import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { modifyTodo, getIncompleteTodos } from '../queries'
import { Mutation } from 'react-apollo'
import MarkTodo from './MarkTodo'
import DeleteTodo from './DeleteTodo'
import AddTodos from './AddTodos'
import ModifyTodos from './ModifyTodos'
import { ListGroup, ListGroupItem, ButtonGroup, Grid, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

class GetTodos extends Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'view', selectedTodoId: 0, selectedTodoText: '', selectedTodoCategory: '' }
  }

  onEditClick(todo) {
    this.setState({
      mode: 'edit',
      selectedTodoId: todo.todo_id,
      selectedTodoText: todo.todo_text,
      selectedTodoCategory: todo.todo_category,
    })
  }

  onSaveClick(update_todos) {
    update_todos({
      variables: {
        todo_id: this.state.selectedTodoId,
        todo_text: this.state.selectedTodoText,
        todo_category: this.state.selectedTodoCategory,
      },
      refetchQueries: [{ query: getIncompleteTodos }],
    })
    this.setState({ mode: 'view', selectedTodoId: 0, selectedTodoText: '', selectedTodoCategory: '' }, function() {})
  }

  onCancelClick() {
    this.setState({ mode: 'view', selectedTodoId: 0, selectedTodoText: '', selectedTodoCategory: '' })
  }

  render() {
    return (
      <Query query={getIncompleteTodos}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <h2>
                Loading... <FontAwesomeIcon icon={faSpinner} style={{ color: 'blue' }} spin />
              </h2>
            )
          if (error) return `Error! fetching todos.`
          if (data.todos.length === 0)
            return (
              <div>
                <h3>No Todos Created Yet</h3>
                <AddTodos />
              </div>
            )
          let count = 0
          return (
            <div>
              <Grid>
                <Row>
                  <Col md={8} mdPush={2}>
                    <ListGroup>
                      {data.todos.map(todo => (
                        <ListGroupItem>
                          <ButtonGroup className="pull-right">
                            <MarkTodo todo_id={todo.todo_id} />
                            <DeleteTodo todo_id={todo.todo_id} />
                            {this.state.mode === 'view' && (
                              <Button
                                onClick={e => {
                                  e.preventDefault()
                                  this.onEditClick(todo)
                                }}
                              >
                                <FontAwesomeIcon icon={faEdit} style={{ color: 'blue' }} />
                              </Button>
                            )}
                            {this.state.mode === 'edit' &&
                              todo.todo_id === this.state.selectedTodoId && (
                                <span>
                                  <Mutation mutation={modifyTodo}>
                                    {(update_todos, { data }) => (
                                      <Button
                                        onClick={e => {
                                          e.preventDefault()
                                          this.onSaveClick(update_todos)
                                        }}
                                      >
                                        <FontAwesomeIcon icon={faSave} />
                                      </Button>
                                    )}
                                  </Mutation>
                                  <Button onClick={() => this.onCancelClick(todo)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                  </Button>
                                </span>
                              )}
                          </ButtonGroup>
                          {todo.todo_id !== this.state.selectedTodoId && (
                            <div>
                              <h4>
                                {(count = count + 1)}.{todo.todo_text}
                              </h4>
                              <p>
                                <b>category: </b>
                                {todo.todo_category}
                              </p>
                            </div>
                          )}
                          {this.state.mode === 'edit' &&
                            todo.todo_id === this.state.selectedTodoId && (
                              <div>
                                <h4>
                                  {(count = count + 1)}.
                                  <input
                                    type="text"
                                    value={this.state.selectedTodoText}
                                    onChange={e => this.setState({ selectedTodoText: e.target.value })}
                                  />
                                </h4>
                                <p>
                                  <b>category: </b>
                                  <input
                                    type="text"
                                    value={this.state.selectedTodoCategory}
                                    onChange={e => this.setState({ selectedTodoCategory: e.target.value })}
                                  />
                                </p>
                              </div>
                            )}
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                    <ListGroup>
                      <ListGroupItem>
                        <AddTodos />
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                </Row>
              </Grid>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default GetTodos
