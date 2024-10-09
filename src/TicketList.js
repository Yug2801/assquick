// src/TicketList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css'; // Optional CSS for cards

const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                setTickets(response.data.tickets); // Adjust this if the structure is different
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="card-container">
            <h2>Tickets</h2>
            {tickets.map(ticket => (
                <div className="card" key={ticket.id}>
                    <h3>{ticket.title}</h3>
                    <p>Status: {ticket.status}</p>
                    <p>Priority: {ticket.priority}</p>
                </div>
            ))}
        </div>
    );
};

export default TicketList;
