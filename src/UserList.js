// src/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserCard.css'; // CSS for user cards

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="user-list">
            <h2>Users</h2>
            <div className="user-cards-container">
                {users.map(user => (
                    <div className="user-card" key={user.id}>
                        <h4>{user.name}</h4>
                        <p>Status: {user.available ? "Available" : "Unavailable"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
