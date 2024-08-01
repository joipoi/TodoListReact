import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

function CreateItem() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(savedCategories.map(category => ({ value: category, label: category })));
  }, []); // Load categories on component mount

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSave = () => {
    const newTodoItem = {
      id: Date.now(),
      name: name,
      isDone: false,
      date: date,
      category: selectedCategory 
    };
    if(date == "" || name == "" || selectedCategory == null){
      document.getElementById("alert").innerHTML = "Please Select All Information";
    }else{

   
    const savedTodoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    const updatedTodoItems = [...savedTodoItems, newTodoItem];
    localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));

    navigate('/');
  }
  };

  const handleCreate = (category) => {
    const updatedCategories = [...categories, { value: category, label: category }];
    setCategories(updatedCategories);
    
    setSelectedCategory({ value: category, label: category });
    
    localStorage.setItem('categories', JSON.stringify(updatedCategories.map(cat => cat.value)));
  };

  return (
    <div id="createItemDiv">
      <button onClick={handleSave}>Save</button>
      <Link to="/">
        <span id="xIcon">&#215;</span>
      </Link>
      <div id="inputDiv">
        <label>Name</label>
        <input type="text" value={name} onChange={handleNameChange} />
        <label>Date</label>
        <input type="datetime-local" value={date} onChange={handleDateChange} />
        <label>Category</label>
        <CreatableSelect 
          options={categories} 
          onCreateOption={handleCreate}
          onChange={(selectedOption) => setSelectedCategory(selectedOption)}
          value={selectedCategory} // Set the selected category value
        />
        <h1 id="alert"></h1>
      </div>
    </div>
  );
}

export default CreateItem;