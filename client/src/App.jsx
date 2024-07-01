import { useEffect, useState } from "react";
import Todo from "./Todo";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  // We will make useEffect run a function as soon as our page loads
  useEffect(() =>{
    async function getTodos(){
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setTodos(todos);
      console.log(todos);
    }
    getTodos();
    // It will fail to fetch because of CORS policy basically it is not letting us talk to our backend because they are on different ports
  }, [])
  // Keeping the dependency array empty means it runs one time

  const createNewTodo = async (e) =>{
    e.preventDefault();
    if(content.length > 3){
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({todo: content}),
        headers:{
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setTodos([...todos, newTodo]);
    }
  }
  
  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>
      <form action="" className="form" onSubmit={createNewTodo}>
        <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a new ToDo..."
        className="form__input"
        required
        />
        <button type="submit" className="form__button">Create Todo</button>
      </form>
      <div className="todos">
      {(todos.length > 0) && todos.map((todo) =>{
        return(
          <Todo key={todo._id} todo={todo} setTodos={setTodos}/>
        );
      })}
      </div>
    </main>
  );
}

// Our Endpoints are Responsible for making our frontend being able to talk to our backend