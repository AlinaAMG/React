import { Component } from 'react';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    }

    // handleChange Method
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
 
    // AddTask Mathod
  addTask(e) {
    console.log(this.state.task);
    e.preventDefault();

    const { task, description } = this.state;
    
    //   Validation
    if (task.trim() === '' || description.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    this.props.onAdd({
      task,
      description,
    });
      
    this.setState({
      task: '',
      description: '',
    });
  }

  render() {
    return (
      <div >
        <h3 className="title">New Task:</h3>
        <form className="form" onSubmit={this.addTask}>
          <input
            type="text"
            placeholder="Your task"
            name="task"
            value={this.state.task}
            onChange={this.handleChange}
          ></input>
          <textarea
            placeholder="Describe it"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          ></textarea>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default FormComponent;
