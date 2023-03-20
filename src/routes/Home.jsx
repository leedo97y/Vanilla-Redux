import { React, useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Todo from "../components/Todo";

const Home = ({ todos, addTodo }) => {
  const [text, setText] = useState("");

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    addTodo(text);
    setText("");
  }

  return (
    <div>
      <h1>ToDo</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="please type something"
          value={text}
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo {...todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    todos: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (text) => dispatch(actionCreators.addTodo(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
