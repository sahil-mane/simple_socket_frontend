import { useEffect, useState } from "react";
import { useGetAllTodos } from "../api/todo";
import socket from "../config/socket"

const Home = () => {
  const { data, isLoading, isError, error } = useGetAllTodos();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  useEffect(() => {
    socket.on("todoCreated", (newTodo) => {
      setTodos((prev) => [...prev, newTodo])
    })

    return () => {
      socket.off("todoCreated");
    }

  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.message || "Something went wrong"}</h2>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f4f4",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "black", marginBottom: "20px" }}>
        Todo List
      </h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        {todos?.toReversed()?.map((todo) => (
          <div
            key={todo.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "black" }}>{todo.title}</h2>

            <p style={{ color: "#555", marginTop: "10px" }}>
              {todo.description}
            </p>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: "5px",
                  background:
                    todo.status === "PENDING"
                      ? "orange"
                      : "green",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                {todo.status}
              </span>

              <span style={{ color: "#666", fontSize: "14px" }}>
                Due:{" "}
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;