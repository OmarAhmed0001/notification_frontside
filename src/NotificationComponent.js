import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const receiverID = "6512ae29b455ef560dffed57"; // Replace this with the specific user's ID

  useEffect(() => {
    const socket = io('http://localhost:3001');
  
    console.log('Attempting to join room...');
    socket.emit('joinRoom', receiverID);
  
    socket.on('createNotification', (data) => {
      console.log('Received notification:', data);
      if (data.receiver === receiverID) {
        setNotifications((prevNotifications) => [...prevNotifications, data]);
        console.log('Notification added to state:', data);
      }
    });
  
    return () => {
      console.log('Leaving room and disconnecting...');
      socket.emit('leaveRoom', receiverID);
      socket.disconnect();
    };
  }, [receiverID]);

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
