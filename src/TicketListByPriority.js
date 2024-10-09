// src/TicketListByPriority.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal'; // Import the modal component
import './Card.css'; // Optional CSS for cards

const TicketListByPriority = () => {
    const [tickets, setTickets] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentPriority, setCurrentPriority] = useState(1); // Default priority

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                setTickets(response.data.tickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    // Group tickets by priority
    const groupedTickets = tickets.reduce((acc, ticket) => {
        acc[ticket.priority] = acc[ticket.priority] || [];
        acc[ticket.priority].push(ticket);
        return acc;
    }, {});

    // Handle adding new task
    const addNewTask = (taskDetails) => {
        setTickets(prevTickets => [
            ...prevTickets,
            {
                id: `CAM-${prevTickets.length + 1}`, // Simple ID generation
                title: taskDetails.title,
                tag: taskDetails.tag,
                userId: taskDetails.userId,
                status: taskDetails.status,
                priority: taskDetails.priority,
            }
        ]);
    };
    const moveTask = (id, newStatus) => {
        setTickets(prevTickets => {
            return prevTickets.map(ticket => {
                if (ticket.id === id) {
                    return { ...ticket, status: newStatus }; // Move task to new status
                }
                return ticket;
            });
        });
    };
    return (
        <div className="ticket-columns">
           
            <div className="columns-container">
                {/* Loop through priority levels (0 to 4) */}
                {[0, 1, 2, 3, 4].map(priority => (
                    <div className="ticket-column" key={priority}>
                        <h3>Priority {priority}</h3>
                        <button onClick={() => { setModalOpen(true); setCurrentPriority(priority); }}>+</button>
                        {groupedTickets[priority] && groupedTickets[priority].map(ticket => (
                            <div className="card" key={ticket.id}>
                                <h4>{ticket.title}</h4>
                                <p>Status: {ticket.status}</p>
                                <button onClick={() => moveTask(ticket.id, 'Backlog')}>Move to Backlog</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Modal for adding a new task */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAddTask={addNewTask}
            />
        </div>
    );
};

export default TicketListByPriority;
