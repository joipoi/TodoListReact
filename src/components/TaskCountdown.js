import React, { useState, useEffect } from 'react';

function TaskTimer({ task }) {
    const calculateRemainingTime = () => {
        const currentTime = new Date().getTime();
        const taskDate = new Date(task.date).getTime();
        return Math.max(0, taskDate - currentTime);
      };


  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

 

  const formatTime = (milliseconds) => {
    if(milliseconds === 0){
        return "Task time has passed"
    }
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    return `Time remaining: ${hours}h ${minutes}m`;
  };

  return (
    <div>
       {formatTime(remainingTime)}
    </div>
  );
}

export default TaskTimer;