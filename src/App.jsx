import "./App.css";
import Header from "./MyComponents/Header";
import Todos from "./MyComponents/Todos";
import { AddTodos } from "./MyComponents/AddTodos";
import Footer from "./MyComponents/Footer";
import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from "./MyComponents/About";

function App() {
  let initTodo;
  if (localStorage.getItem("todos")===null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am onDelete of todo:", todo);
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      }),
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("I am adding this title:", title, desc);
    let sno = todos.length === 0 ? 1 : [todos.length - 1].sno + 1;
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);

    }
  
  const [todos, setTodos] = useState(initTodo);

  useEffect(()=>{
      localStorage.setItem("todos", JSON.stringify(todos));
      },[todos])
  return (
    <>
    <Router>
      <Header title="My todos List" searchBar={false} />
      <Routes>
          <Route path="/" element={
            <>
            <AddTodos addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
            </>
          }>
          </Route>
          <Route path="/about" element={<About/>}>
          </Route>
      </Routes>
      
      <Footer />

    </Router>
    </>
  );
}

export default App;
