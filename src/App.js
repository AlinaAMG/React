import logo from './logo.svg';
import React, { Component} from "react";
import './App.css';
import FormComponent from "./FormComponent";
import ToDoList from "./ToDoList";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // This state will hold the list of todos
      todos: []
    };

    // bounding the methods
    this.handleAddToDo = this.handleAddToDo.bind(this);
    this.handleDeleteToDo = this.handleDeleteToDo.bind(this);
  }

  // handleAddToDo Method

handleAddToDo(newTodo){
  this.setState({
    todos: [...this.state.todos, newTodo],
  });
}
    //  handleDeleteToDo  Method
    handleDeleteToDo(index) {
      const updatedTodos = this.state.todos.filter((_, i) =>i !== index);
      this.setState({
        todos: updatedTodos
      });

}
 
  render() { 
      return (
        <div className="App">
          <FormComponent onAdd={this.handleAddToDo} />,
          <ToDoList todos={this.state.todos} onDone={this.handleDeleteToDo} />
        </div>
      );
  }
}
 

export default App;
