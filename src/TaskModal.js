// src/TaskModal.js
import React, { useState } from 'react';
import './Modal.css'; // Your modal CSS

const TaskModal = ({ isOpen, onClose, onAddTask, currentStatus, currentPriority }) => {
    const [taskDetails, setTaskDetails] = useState({
        title: '',
        tag: 'Feature Request',
        userId: 'usr-1',
        status: currentStatus || 'Todo',
        priority: currentPriority || 1,
    });

    const handleChange = (e) => {
        setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(taskDetails);
        onClose();
        setTaskDetails({
            title: '',
            tag: 'Feature Request',
            userId: 'usr-1',
            status: currentStatus || 'Todo',
            priority: currentPriority || 1,
        });
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Add New Task</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={taskDetails.title}
                            onChange={handleChange}
                            placeholder="Task Title"
                            required
                        />
                        <select name="tag" value={taskDetails.tag} onChange={handleChange}>
                            <option value="Feature Request">Feature Request</option>
                            <option value="Bug Fix">Bug Fix</option>
                        </select>
                        <select name="userId" value={taskDetails.userId} onChange={handleChange}>
                            <option value="usr-1">Anoop Sharma</option>
                            <option value="usr-2">Yogesh</option>
                            <option value="usr-3">Shankar Kumar</option>
                            <option value="usr-4">Ramesh</option>
                            <option value="usr-5">Suresh</option>
                        </select>
                        <select name="priority" value={taskDetails.priority} onChange={handleChange}>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                        <button type="submit">Add Task</button>
                    </form>
                </div>
            </div>
        )
    );
};

export default TaskModal;
