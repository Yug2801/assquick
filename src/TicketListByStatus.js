import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal'; // Import the modal component
import './Card.css'; // Optional CSS for cards
import './styles.css'; // Import your main CSS for layout

const TicketListByStatus = () => {
    const [tickets, setTickets] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('Todo'); // Track which status the task is being added to

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

    // Group tickets by status
    const groupedTickets = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
    }, {});

    // Handle task completion
    const completeTask = (id) => {
        setTickets(prevTickets => {
            return prevTickets.map(ticket => {
                if (ticket.id === id) {
                    return { ...ticket, status: 'Completed' }; // Move task to Completed
                }
                return ticket;
            });
        });
    };

    // Handle moving tasks to next statuses
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

    return (
        <div className="ticket-columns">
          
            <div className="columns-container">
                {/* Column for Todo */}
                <div className="ticket-column">
                    <h3>Todo</h3>
                    <button onClick={() => { setModalOpen(true); setCurrentStatus('Todo'); }}>+</button>
                    {groupedTickets["Todo"] && groupedTickets["Todo"].map(ticket => (
                        <div className="card" key={ticket.id}>
                            <h4>{ticket.title}</h4>
                            <p>Priority: {ticket.priority}</p>
                            <div className="button-group">
                                <button onClick={() => moveTask(ticket.id, 'In progress')}>Move to In Progress</button>
                                <button onClick={() => moveTask(ticket.id, 'Backlog')}>Move to Backlog</button>
                                <button onClick={() => completeTask(ticket.id)}>✓</button> {/* Tick button */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Column for In Progress */}
                <div className="ticket-column">
                    <h3>In Progress</h3>
                    <button onClick={() => { setModalOpen(true); setCurrentStatus('In progress'); }}>+</button>
                    {groupedTickets["In progress"] && groupedTickets["In progress"].map(ticket => (
                        <div className="card" key={ticket.id}>
                            <h4>{ticket.title}</h4>
                            <p>Priority: {ticket.priority}</p>
                            <div className="button-group">
                                <button onClick={() => moveTask(ticket.id, 'Completed')}>Move to Completed</button>
                                <button onClick={() => moveTask(ticket.id, 'Backlog')}>Move to Backlog</button>
                                <button onClick={() => completeTask(ticket.id)}>✓</button> {/* Tick button */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Column for Backlog */}
                <div className="ticket-column">
                    <h3>Backlog</h3>
                    <button onClick={() => { setModalOpen(true); setCurrentStatus('Backlog'); }}>+</button>
                    {groupedTickets["Backlog"] && groupedTickets["Backlog"].map(ticket => (
                        <div className="card" key={ticket.id}>
                            <h4>{ticket.title}</h4>
                            <p>Priority: {ticket.priority}</p>
                            <div className="button-group">
                                <button onClick={() => moveTask(ticket.id, 'Todo')}>Move to Todo</button>
                                <button onClick={() => moveTask(ticket.id, 'In progress')}>Move to In Progress</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Column for Completed */}
                <div className="ticket-column">
                    <h3>Completed</h3>
                    {groupedTickets["Completed"] && groupedTickets["Completed"].map(ticket => (
                        <div className="card" key={ticket.id}>
                            <h4>{ticket.title}</h4>
                            <p>Priority: {ticket.priority}</p>
                        </div>
                    ))}
                </div>
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

export default TicketListByStatus;
