import React, { useState, useEffect } from 'react';
import TodoContent from './TodoContent';
import { Link } from 'react-router-dom';

//TODO There is a bug that treats invisble finished tasks as part of the list and messes with the moveup and movedown functions
function MainContainer() {
  const [todoItems, setTodoItems] = useState([]);

  const [showAllItems, setShowAllItems] = useState(false);

  const unfinishedTodoItems = todoItems.filter((item) => !item.isDone);

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

  const handleShowAllItems = (event) => {
    setShowAllItems(event.target.checked);
  };

  const deleteTodo = (id) => {
    const updatedTodoItems = todoItems.filter(item => item.id !== id);
    setTodoItems(updatedTodoItems);
  };

  const filteredItems = showAllItems ? todoItems : unfinishedTodoItems;

  return (
    <div id="mainContDiv">
      <h1>Idag</h1>
      <h2>Mina Projekt</h2>
      <input type="checkbox" checked={showAllItems} onChange={handleShowAllItems} />
      <label>Visa Strukna</label>
      <hr></hr>
      <ul className="todoList">
        {filteredItems.map((item) => (
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