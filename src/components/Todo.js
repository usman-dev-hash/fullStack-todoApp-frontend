import React from "react";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {BsCircleFill, BsFillCheckCircleFill} from "react-icons/bs";

const Todo = ({text, updateTodo, deleteTodo, updateProgress, progress}) => {

    const progressStyle = {
        // You can add other style properties here if needed
    };

    if (progress) {
        progressStyle.textDecoration = 'line-through';
    }

    return (
        <>
            <div className="todo">
                <div className="checkbox">
                    {
                        progress
                            ?
                            <BsFillCheckCircleFill className="fill-icon" onClick={updateProgress}/>
                            :
                            <BsCircleFill className="fill-icon" onClick={updateProgress}/>
                    }
                    <div className="text" style={progressStyle}>{text}</div>
                </div>
                <div className="icons">
                    <BiEdit className="icon" onClick={updateTodo} />
                    <AiFillDelete className="icon" onClick={deleteTodo} />
                </div>
            </div>
        </>
    )
}

export default Todo;