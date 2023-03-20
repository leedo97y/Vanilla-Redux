import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const Detail = ({ todos }) => {
  const paramsId = useParams().id;
  const todo = todos.find((todo) => todo.id === parseInt(paramsId));
  return (
    <>
      <h1>{todo?.text}</h1>
      <h3>Created at: {todo?.id}</h3>
    </>
  );
};

function mapStateToProps(state) {
  return { todos: state };
}

export default connect(mapStateToProps)(Detail);
