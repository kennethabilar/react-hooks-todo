import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

function TodoForm({ addTodo }) {
    const [value, setValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!value) return
        addTodo(value)
        setValue('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            { ' ' }
            <input type="text" name="title" value={value} onChange={(e) => setValue(e.target.value)} />
            { ' ' }
            <input type="submit" value="Add" />
        </form>
    )
}

function Todo({ todo, delTodo, updateTodo }) {
    return (
        <div className="todo" style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
            <input
                type="checkbox"
                defaultChecked={todo.completed}
            onChange={() => updateTodo(todo.id)} />
            { ' ' }
            { todo.title }
            <button className="del-btn" onClick={() => delTodo(todo.id)}>X</button>
        </div>
    )
}

function App() {
    const [todos, setTodos] = useState([
        { id: uuidv4(), title: 'Learn Angular Framework', completed: true },
        { id: uuidv4(), title: 'Learn Django Framework', completed: true },
        { id: uuidv4(), title: 'Learn Spring Framework', completed: false }
    ])

    const addTodo = (title) => {
        const newTodos = [...todos, { id: uuidv4(), title, completed: false }]

        setTodos(newTodos)
    }

    const delTodo = (id) => {
        const newTodos = [...todos.filter(todo => todo.id !== id)]
        
        setTodos(newTodos)
    }

    const updateTodo = (id) => {
        const newTodos = [...todos]

        newTodos.map(todo => {
            if(todo.id === id) {
                todo.completed = !todo.completed
            }

            return todo
        })

        setTodos(newTodos)
    }

    return (
        <div className="App">
            <h1>React Hooks Todo</h1>
            <h2>Add Todo</h2>
            <TodoForm addTodo={addTodo} />
            <h2>Todos</h2>
            <div className="todos">
                { todos.map(todo => {
                    return (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            delTodo={delTodo}
                            updateTodo={updateTodo}
                        />
                    )
                }) }
            </div>
        </div>
    )
}

export default App
