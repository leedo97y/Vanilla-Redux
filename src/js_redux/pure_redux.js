// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import { legacy_createStore as createStore } from "redux";

const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const text = document.querySelector(".text");

// const reducer = (count = 0, action) => {
//   if (action.type === "ADD") {
//     count++;
//   } else if (action.type === "MINUS") {
//     count--;
//   }
//   return count;
// };

const ADD = "ADD";
const MINUS = "MINUS";

const reducer = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const store = createStore(reducer);

function changeText() {
  text.innerHTML = store.getState();
}

store.subscribe(changeText);

function handleAdd() {
  store.dispatch({ type: "ADD" });
}

function handleMinus() {
  store.dispatch({ type: "MINUS" });
}

// console.log(store.getState());

plus.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);

// add todos
const input = document.querySelector("input");
const form = document.querySelector("form");

const ul = document.querySelector("ul");

const addTodo = (text) => {
  return {
    type: "ADD_TODO",
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id,
  };
};

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [{ text: action.text, id: Date.now() }, ...state];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const todoStore = createStore(todoReducer);

todoStore.subscribe(() => {
  console.log(todoStore.getState());
});

const dispatchAddTodos = (text) => {
  todoStore.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch(deleteTodo(id));
};

const paintTodo = () => {
  const todos = todoStore.getState();
  ul.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.id = todo.id;
    li.innerText = todo.text;
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

todoStore.subscribe(paintTodo);

function onSubmit(e) {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  dispatchAddTodos(todo);
}

form.addEventListener("submit", onSubmit);
