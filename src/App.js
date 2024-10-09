// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TicketListByStatus from './TicketListByStatus';
import TicketListByPriority from './TicketListByPriority';
import UserList from './UserList';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <h1>Ticket and User Management</h1>
                <Routes>
                    <Route path="/tickets/status" element={<TicketListByStatus />} />
                    <Route path="/tickets/priority" element={<TicketListByPriority />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/" element={<h2>Select a page: <a href="/tickets/status">Tickets by Status</a> | <a href="/tickets/priority">Tickets by Priority</a> | <a href="/users">Users</a></h2>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
