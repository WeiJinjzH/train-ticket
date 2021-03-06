import React, { useState, useMemo, memo, useEffect, useCallback, useRef } from 'react';
import './App.css'
import { createSet, createAdd, createRemove, createToggle } from './action'

let idSeq = Date.now()
function bindActionCreators(actionCreators, dispatch) {
  const ret = {}
  for (let key in actionCreators) {
    ret[key] = function (...args) {
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }
  return ret
}

const Control = memo(function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()

  const onSubmit = (e) =>  {
    e.preventDefault()
    const newText = inputRef.current.value.trim()
    if (newText.length === 0) {
      return
    }

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false,
    })
    inputRef.current.value = ''
  }

  return (
  <div className="control">
    <h1>todos</h1>
    <form onSubmit={onSubmit}>
      <input type="text" className="new-todo" ref={inputRef} placeholder="What needs to be done?" />
    </form>
  </div>
  )
})

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, text, complete }, removeTodo, toggleTodo } = props

  const onChange = () =>  {
    toggleTodo(id)
  }

  const onRemove = () => {
    removeTodo(id)
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        onChange={onChange}
        checked={complete}
      />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
})

const Todos = memo(function Todos(props) {
  const { todos, removeTodo, toggleTodo } = props
  console.log(props)
  return (
    <ul className="todos">
      {
        todos.map((item) => (
        <TodoItem
          key={item.id}
          todo={item}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
        />
        ))
      }
    </ul>
  )
})

const LS_KEY = '_$-todo_'

function TodoList() {
  const [ todos, setTodos ] = useState([])

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  }, [])

  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map((todo) => {
      return todo.id === id ?
      {
        ...todo,
        complete: !todo.complete,
      } : todo
    }))
  }, [])

  const dispatch = useCallback((action) => {
    const { type, payload } = action
    switch (type) {
      case 'set':
        setTodos(payload)
        break;
      case 'add':
        setTodos(todos => [...todos, payload])
        break;
      case 'remove':
        setTodos(todos => todos.filter(todo => todo.id !== payload))
        break;
      case 'toggle':
        setTodos(todos => todos.map((todo) => {
          return todo.id === payload ?
          {
            ...todo,
            complete: !todo.complete,
          } : todo
        }))
        break;
      default:
    }
  }, [])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    createSet({ type: 'set', payload: todos })
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos]);

  return (
    <div className="todo-list">
      <Control
        {
          ...bindActionCreators({
            addTodo: createAdd,
          },
          dispatch)
        }
      />
      <Todos 
        {
          ...bindActionCreators({
            removeTodo: createRemove,
            toggleTodo: createToggle,
          },
          dispatch)
        }
        todos={todos}
      />
    </div>
  )
}

export default TodoList;
