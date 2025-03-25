import React, { useState, useEffect } from "react";
import "./Todo.css";

function Todo() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    const addTask = (e) => {
        e.preventDefault();
        const taskInput = e.target.elements.taskInput.value.trim();
        if (taskInput) {
            const newTask = { id: Date.now().toString(), text: taskInput, completed: false };
            setTasks([...tasks, newTask]);
            e.target.reset();
        }
    };


    const toggleTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };


    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };


    const clearAllTasks = () => {
        if (tasks.length > 0) {
            setTasks([]);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Plan & Achieve</h1>
                <p>Rejalashtirish muvaffaqiyatning kalitidir!</p>
            </div>

            <div className="form-container">
                <form className="task-form" onSubmit={addTask}>
                    <input type="text" name="taskInput" className="task-input" placeholder="Rejangi yaz..." required />
                    <button type="submit" className="add-btn">Add</button>
                </form>
            </div>

            <div className="tasks-container">
                {tasks.length === 0 ? (
                    <div className="empty-state">

                    </div>
                ) : (
                    <ul className="task-list">
                        {tasks.map(task => (
                            <li key={task.id} className="task-item">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    className="task-checkbox"
                                />
                                <span className={`task-content ${task.completed ? "completed" : ""}`}>
                                    {task.text}
                                </span>
                                <button onClick={() => deleteTask(task.id)} className="delete-btn">
                                    &times;
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="footer">
                <button className="clear-all" onClick={clearAllTasks}>Clear All</button>
            </div>
        </div>
    );
}

export default Todo;
