import axios from "axios";

// this base url of node js project which deployed on vercel.com
const base_url = "https://full-stack-todo-app-be.vercel.app"

const getAllTodos = (setTodos, setOpen) => {
    setOpen(true)
    axios
        .get(`${base_url}/`)
        .then(({data}) => {
            setOpen(false)
            console.log("get all todos", data.response)
            setTodos(data.response)
        })
        .catch((error) => {
            setOpen(false)
            console.log("Error while getting all todos", error)
        })
}

const addTodo = (text, setText, setTodos, setOpen) => {
    setOpen(true)
    axios
        .post(`${base_url}/store`, {text})
        .then((data) => {
            console.log("add todo", data)
            setText("")
            getAllTodos(setTodos, setOpen)
        })
        .catch((error) => {
            setOpen(false)
            console.log("Error while adding todo", error)
        })
}

const updateTodo = (id, todoText, setInputText, setIsUpdating, setTodos, setOpen) => {
    setOpen(true)
    axios
        .post(`${base_url}/update`, {id: id, text: todoText})
        .then((data) => {
            console.log("update todo", data)
            setInputText("")
            setIsUpdating(false)
            getAllTodos(setTodos, setOpen)
        })
        .catch((error) => {
            setOpen(false)
            console.log("Error while updating todo", error)
        })
}

const deleteTodo = (id, setTodos, setOpen) => {
    setOpen(true)
    axios
        .post(`${base_url}/delete`, {id: id})
        .then((data) => {
            console.log("delete todo", data)
            getAllTodos(setTodos, setOpen)
        })
        .catch((error) => {
            setOpen(false)
            console.log("Error while deleting todo", error)
        })
}

const updateProgress = (id, progress, setTodos, setOpen) => {
    setOpen(true)
    progress = !progress;

    axios
        .post(`${base_url}/update`, {id: id, progress: progress})
        .then((data) => {
            console.log("update Progress", data)
            getAllTodos(setTodos, setOpen)
        })
        .catch((error) => {
            setOpen(false)
            console.log("Error while updating task progress", error)
        })
}

export {getAllTodos, addTodo, deleteTodo, updateTodo, updateProgress}