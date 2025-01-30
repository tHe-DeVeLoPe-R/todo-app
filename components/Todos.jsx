import React, { useState, useEffect } from "react";
import styles from '../styles/Todo.module.css';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import loadingif from '../public/images/loading.gif';

export default function Todos() {
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [showUpdateTodo, setShowUpdateTodo] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [todoList, setTodoList] = useState([]); // Initialize as an empty array
    const [currentTodoId, setCurrentTodoId] = useState(null); // Track the current todo ID for update

    const username = useSelector((state) => state.auth.username);
    const router = useRouter();

    // Redirect to login if username is not set
    useEffect(() => {
        if (!username) {
            router.push("/");
        }
    }, [username]);

    // Fetch todos when the component loads
    useEffect(() => {
        if (username) {
            getTodos();
        }
    }, [username]);

    // Fetch Todos from API
    const getTodos = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/gettodos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch todos");
            }
            setIsLoading(false);
            const data = await response.json();  // Parse the response JSON
            console.log("Fetched Todos:", data);  // Log the entire response for debugging
            const allTodos = Array.isArray(data.message) ? data.message : [];  // Get the rows from the message property
            setTodoList(allTodos);  // Set the todo list
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const handleRemove = async (id) => {
        const response = await fetch("/api/removetodo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (response.ok) {
            getTodos(); // Refresh todos after removing
        }
    }

    const handleUpdate = async () => {
        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/updatetodo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: currentTodoId, title, desc, username }),
            });

            const responseData = await response.json();
            setIsLoading(false);

            if (response.ok) {
                setShowUpdateTodo(false);
                getTodos(); // Refresh todos after updating
            } else {
                setMessage(responseData.message);
            }
        } catch (error) {
            console.error("Error updating todo:", error);
            setIsLoading(false);
            setMessage("Failed to update todo.");
        }
    };

    const handleAddTodo = async () => {
        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/addtodo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, desc, username }),
            });

            const responseData = await response.json();
            setIsLoading(false);

            if (response.ok) {
                setShowAddTodo(false);
                getTodos(); // Refresh todos after adding
            } else {
                setMessage(responseData.message);
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            setIsLoading(false);
            setMessage("Failed to add todo.");
        }
    };

    const openUpdateModal = (todo) => {
        setCurrentTodoId(todo.id);
        setTitle(todo.title);
        setDesc(todo.description);
        setShowUpdateTodo(true);
    };

    return (
        <div className={styles.todoMain}>
            <h1>Welcome back {username}</h1>
            <a onClick={() => setShowAddTodo(true)} className={styles.addTodoLink} href="#">
                Click to add new todo
            </a>

            {(showAddTodo || showUpdateTodo) && (
                <div className={styles.addTodoModal}>
                    <h1>{showUpdateTodo ? "Update Todo" : "Add Todo"}</h1><br />
                    <div className={styles.todoForm}>
                        <label htmlFor="title">Enter Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="Todo Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="description">Enter Brief</label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            name="description"
                            required
                            placeholder="Enter Short Description"
                        ></textarea>

                        {isLoading ? (
                            <img className={styles.loadingbar} src={loadingif.src} alt="Loading..." />
                        ) : (
                            <button
                                onClick={showUpdateTodo ? handleUpdate : handleAddTodo}
                                className={styles.addbtn}
                            >
                                {showUpdateTodo ? "Update Todo" : "Add Todo"}
                            </button>
                        )}

                        <p>{message}</p>
                    </div>
                </div>
            )}

            <div className={styles.todoList}>
                {Array.isArray(todoList) && todoList.length === 0 ? (
                    <p>No todos found.</p>
                ) : (
                    todoList.map((todo) => (
                        <div key={todo.id} className={styles.todo}>
                            <h1>{todo.title}</h1>
                            <p>{todo.description}</p>
                            <strong>Created on {new Date(todo.created_on).toLocaleString()}</strong>
                            <div className={styles.todoActions}>
                                <button onClick={() => handleRemove(todo.id)}>Remove</button>
                                <button onClick={() => openUpdateModal(todo)}>Update</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
