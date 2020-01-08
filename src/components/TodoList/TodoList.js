import React from "react";
import TodoListItems from "../TodoListItems/TodoListItems";
import "./TodoList.css";
const TodoList = ({ todos, onDeleted, onToggleDone, onToggleImportant }) => {
  const elems = todos.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItems
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleImportant={() => onToggleImportant(id)}
        />
      </li>
    );
  });

  return <ul className="list-group todo-list">{elems}</ul>;
};

export default TodoList;
