import Todo from "./components/Todo";
import React, {useEffect, useState} from "react";
import {getAllTodos, addTodo, deleteTodo, updateTodo, updateProgress} from "./components/utils/HandleApi";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const App = () => {

    const [open, setOpen] = useState(false)
    const [todos, setTodos] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [inputText, setInputText] = useState("")
    const [todoUpdateId, setTodoUpdateId] = useState("")

    const updateMode = (id, text) => {
        setIsUpdating(true)
        setInputText(text)
        setTodoUpdateId(id)
    }

    useEffect(() => {
        getAllTodos(setTodos, setOpen)
    }, [])

    return (
        <div className="App">
            <div className="container">
                <h1>Todo App</h1>
                <div className="top">
                    <input
                    type="text"
                    placeholder="Add todo..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    />
                    <div className="add"
                         onClick={
                             isUpdating
                                 ?
                                 () => updateTodo(todoUpdateId, inputText, setInputText, setIsUpdating, setTodos, setOpen)
                                 :
                                 () => addTodo(inputText, setInputText, setTodos, setOpen)
                         }
                    >
                        { isUpdating ? 'Update' : 'Add' }
                    </div>
                </div>
                <div className="list">
                    {
                        todos.map((item) =>
                            <Todo
                                text={item.text}
                                key={item._id}
                                updateTodo={() => updateMode(item._id, item.text)}
                                deleteTodo={() => deleteTodo(item._id, setTodos, setOpen)}
                                updateProgress={() => updateProgress(item._id, item.progress, setTodos, setOpen)}
                                progress={item.progress}
                            />)
                    }
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    );
}

export default App;