import React from 'react';

function ToDoList(props) {
  return (
    <div>
      <h2 className="todo-list">My todo list:</h2>
          {props.todos.map((todo, index) => {
          
        // defining the handleClickDone function to delete a task
        const handleClickDone = () => {
          props.onDone(index);
        };

        return (
          // Rendering each todo item
          <div className="list-container" key={index}>
            <ul>
              <li className="list">
                <h2>
                  <strong>{todo.task}</strong>:{todo.description}
                </h2>
              </li>
            </ul>
            <a href="#" onClick={handleClickDone}>
              Done
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default ToDoList;
