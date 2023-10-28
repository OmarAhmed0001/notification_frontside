import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Establish a socket.io connection to the server
    const socket = io('http://localhost:3001'); // Replace with your server's address

    // Join the room
    socket.emit('joinRoom', "653ccd94cf84c5a8466a3a02");// Replace with your room ID (user._id)

    // Handle received notifications
    socket.on('createNotification', (data) => {
        console.log(data);
      // Update the notifications state with the new notification
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      // Leave the room on component unmount
      socket.emit('leaveRoom', "653ccd94cf84c5a8466a3a02");// Replace with your room ID (user._id)
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
