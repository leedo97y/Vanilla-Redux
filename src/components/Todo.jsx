import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../store";

const Todo = ({ text, deleteTodo, id }) => {
  return (
    <li>
      <Link to={`/${id}`}>
        {text} <button onClick={deleteTodo}>DEL</button>
      </Link>
    </li>
  );
};

function mapDispatchToProps(dispatch, ownProps) {
  return {
    deleteTodo: () => dispatch(actionCreators.deleteTodo(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(Todo);
