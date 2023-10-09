import axios from "axios";

// this base url of node js project which deployed on vercel.com
const base_url = "https://full-stack-todo-app-be.vercel.app/"

const getAllTodos = (setTodos) => {
    axios
        .get(`${base_url}/`)
        .then(({data}) => {
            console.log("get all todos", data.response)
            setTodos(data.response)
        })
        .catch((error) => {
            console.log("Error while getting all todos", error)
        })
}

const addTodo = (text, setText, setTodos) => {
    axios
        .post(`${base_url}/store`, {text})
        .then((data) => {
            console.log("add todo", data)
            setText("")
            getAllTodos(setTodos)
        })
        .catch((error) => {
            console.log("Error while adding todo", error)
        })
}

const updateTodo = (id, todoText, setInputText, setIsUpdating, setTodos) => {
    axios
        .post(`${base_url}/update`, {id: id, text: todoText})
        .then((data) => {
            console.log("update todo", data)
            setInputText("")
            setIsUpdating(false)
            getAllTodos(setTodos)
        })
        .catch((error) => {
            console.log("Error while updating todo", error)
        })
}

const deleteTodo = (id, setTodos) => {
    axios
        .post(`${base_url}/delete`, {id: id})
        .then((data) => {
            console.log("delete todo", data)
            getAllTodos(setTodos)
        })
        .catch((error) => {
            console.log("Error while deleting todo", error)
        })
}

const updateProgress = (id, progress, setTodos) => {

    progress = !progress;

    axios
        .post(`${base_url}/update`, {id: id, progress: progress})
        .then((data) => {
            console.log("update Progress", data)
            getAllTodos(setTodos)
        })
        .catch((error) => {
            console.log("Error while updating task progress", error)
        })
}

export {getAllTodos, addTodo, deleteTodo, updateTodo, updateProgress}