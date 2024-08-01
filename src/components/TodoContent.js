import React from 'react';
import TaskCountdown from './TaskCountdown';

function TodoItem(props) {
  const handleMoveUp = () => {
    props.moveTodoUp(props.item.id);
  };

  const handleMoveDown = () => {
    props.moveTodoDown(props.item.id);
  };

  const handleToggle = () => {
    props.toggleTodo(props.item.id);
  };
  const handleDelete = () => {
    props.deleteTodo(props.item.id);
  };

  const textStyle = {
    textDecoration: props.item.isDone ? 'line-through' : 'none'
  };

  return (
    <div className="todoDiv">
      <input type="checkbox" checked={props.item.isDone} onChange={handleToggle} />
      <p style={textStyle} className="TodoName">{props.item.name}</p>
      <p className="TodoCategory">{props.item.category.value}</p>
      <TaskCountdown  task={props.item}/>
      <span className="moveUp" onClick={handleMoveUp}>⬆️</span>
      <span className="moveDown" onClick={handleMoveDown}>⬇️</span>
      <span className="deleteItem" onClick={handleDelete}>&#10060;</span>
    </div>
  );
}
export default TodoItem;