import React, { useState, useEffect, useRef } from 'react';
import TodoContent from './TodoContent';
import { Link } from 'react-router-dom';

// TODO There is a bug that treats invisible finished tasks as part of the list and messes with the moveup and movedown functions
function MainContainer({ selectedItemText }) {
  const [todoItems, setTodoItems] = useState([]);
  const [showUnfinishedOnly, setShowUnfinishedOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredItems = () => {
    return todoItems.filter(item => 
      (!showUnfinishedOnly || !item.isDone) && 
      (selectedCategory === "All Categories" || item.category.value === selectedCategory)
    );
  };

  const toggleTodo = (id) => {
    setTodoItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      });
    });
  };

  const moveTodoUp = (id) => {
    const index = todoItems.findIndex((item) => item.id === id);
    if (index > 0) {
      const updatedItems = [...todoItems];
      [updatedItems[index], updatedItems[index - 1]] = [
        updatedItems[index - 1],
        updatedItems[index],
      ];
      setTodoItems(updatedItems);
    }
  };

  const moveTodoDown = (id) => {
    const index = todoItems.findIndex((item) => item.id === id);
    if (index < todoItems.length - 1) {
      const updatedItems = [...todoItems];
      [updatedItems[index], updatedItems[index + 1]] = [
        updatedItems[index + 1],
        updatedItems[index],
      ];
      setTodoItems(updatedItems);
    }
  };

  useEffect(() => {
    const savedTodoItems = getSavedTodoItems();
    if (savedTodoItems.length > 0) {
      setTodoItems(savedTodoItems);
    }
  }, []);

  useEffect(() => {
    saveTodoItems(todoItems);
  }, [todoItems]);

  const saveTodoItems = (todoItems) => {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  };

  const getSavedTodoItems = () => {
    const savedTodoItems = localStorage.getItem('todoItems');
    return savedTodoItems ? JSON.parse(savedTodoItems) : [];
  };

  const handleShowUnfinishedOnly = (event) => {
    setShowUnfinishedOnly(event.target.checked);
  };

  const deleteTodo = (id) => {
    const updatedTodoItems = todoItems.filter(item => item.id !== id);
    setTodoItems(updatedTodoItems);
  };

  const prevSelectedItemText = useRef(selectedItemText);

  useEffect(() => {
    if (prevSelectedItemText.current !== selectedItemText) {
      setSelectedCategory(selectedItemText);
      prevSelectedItemText.current = selectedItemText;
    }
  }, [selectedItemText]);

  return (
    <div id="mainContDiv">
      <h1>{selectedItemText || 'All Categories'}</h1>
      <input type="checkbox" checked={showUnfinishedOnly} onChange={handleShowUnfinishedOnly} />
      <label>Hide Finished</label>
      <hr />
      <ul className="todoList">
        {filteredItems().map((item) => (
          <TodoContent
            key={item.id}
            item={item}
            toggleTodo={toggleTodo}
            moveTodoUp={moveTodoUp}
            moveTodoDown={moveTodoDown}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      <Link to="/create">Create Item <span>&#43;</span></Link>
    </div>
  );
}

export default MainContainer;