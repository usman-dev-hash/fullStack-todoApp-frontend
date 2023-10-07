import Todo from "./components/Todo";
import React, {useEffect, useState} from "react";
import {getAllTodos, addTodo, deleteTodo, updateTodo, updateProgress} from "./components/utils/HandleApi";

const App = () => {

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
        getAllTodos(setTodos)
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
                                 () => updateTodo(todoUpdateId, inputText, setInputText, setIsUpdating, setTodos)
                                 :
                                 () => addTodo(inputText, setInputText, setTodos)
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
                                deleteTodo={() => deleteTodo(item._id, setTodos)}
                                updateProgress={() => updateProgress(item._id, item.progress, setTodos)}
                                progress={item.progress}
                            />)
                    }
                </div>
            </div>
        </div>
    );
}

export default App;