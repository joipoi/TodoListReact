import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateItem() {
  const [name, setName] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleHoursChange = (event) => {
    setHours(Number(event.target.value));
  };

  const handleMinutesChange = (event) => {
    setMinutes(Number(event.target.value));
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSave = () => {
    const newTodoItem = {
      id: Date.now(), // Generate a unique ID for the new item
      name: name,
      time: formatTime(hours, minutes),
      notes: notes,
      isDone: false,
      date: date
    };

    const savedTodoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    const updatedTodoItems = [...savedTodoItems, newTodoItem];

    localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));

    navigate('/');
  };

  const formatTime = (hours, minutes) => {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div id="createItemDiv">
      <button onClick={handleSave}>Save</button>
      <Link to="/">
        <span>&#215;</span>
      </Link>
      <div id="inputDiv">
        <label>Name</label>
        <input type="text" value={name} onChange={handleNameChange} />
        <label>Time Estimate</label>
        <label>Hours:</label>
        <input type="number" id="hours" name="hours" min="0" max="23" value={hours} onChange={handleHoursChange} />
        <label>Minutes:</label>
        <input type="number" id="minutes" name="minutes" min="0" max="59" value={minutes} onChange={handleMinutesChange} />
        <label>Date</label>
        <input type="datetime-local" value={date} onChange={handleDateChange} />
        <label>Notes</label>
        <textarea value={notes} onChange={handleNotesChange} />
      </div>
    </div>
  );
}

export default CreateItem;