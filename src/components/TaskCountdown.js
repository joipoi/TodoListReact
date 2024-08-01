import React, { useState, useEffect } from 'react';

function TaskTimer({ task }) {
  
  const calculateRemainingTime = () => {
    const currentTime = new Date().getTime();
    const taskDate = new Date(task.date).getTime();
    return Math.max(0, taskDate - currentTime);
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime);
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    
    const interval = setInterval(() => {
      const time = calculateRemainingTime();
      setRemainingTime(time);

      if (time <= 0 && !notificationShown) {
       
        showNotification();
        setNotificationShown(true);
        clearInterval(interval); 
      }
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [notificationShown]);

  const formatTime = (milliseconds) => {
    if (milliseconds === 0) {
      return "Task time has passed";
    }

    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    return `Time remaining: ${hours}h ${minutes}m`;
  };

  const showNotification = () => {
    if (!('Notification' in window)) {
      console.log('Web notifications are not supported in this browser.');
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification('Task Reminder', {
          body: task.name,
        });

        notification.onclick = () => {
          // Handle notification click event
        };
      }
    });
  };

  return (
    <div>
      {formatTime(remainingTime)}
    </div>
  );
}

export default TaskTimer;