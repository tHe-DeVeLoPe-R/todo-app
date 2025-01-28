import React from "react"
import styles from '../styles/Todo.module.css'

export default function Todos() {
    const todos = [
        {
            'title': 'Buy Groceries',
            'desc': 'Purchase milk, eggs, bread, and vegetables from the supermarket.',
            'status': 'Pending',
            'creation': '25-01-2025'
        },
        {
            'title': 'Morning Workout',
            'desc': 'Complete a 30-minute cardio session followed by strength training.',
            'status': 'Completed',
            'creation': '24-01-2025'
        },
        {
            'title': 'Team Meeting',
            'desc': 'Discuss project deadlines and assign tasks during the 11 AM meeting.',
            'status': 'Completed',
            'creation': '22-01-2025'
        },
        {
            'title': 'Doctor Appointment',
            'desc': 'Visit Dr. Smith for a routine check-up at 3 PM.',
            'status': 'Pending',
            'creation': '25-01-2025'
        },
        {
            'title': 'Finish Presentation',
            'desc': 'Prepare the slides for the upcoming client presentation on Monday.',
            'status': 'In Progress',
            'creation': '23-01-2025'
        },
        {
            'title': 'Read a Book',
            'desc': 'Read at least two chapters of "Atomic Habits" before bedtime.',
            'status': 'Completed',
            'creation': '21-01-2025'
        },
       
        {
            'title': 'Pay Utility Bills',
            'desc': 'Pay the electricity, internet, and water bills for the month.',
            'status': 'Pending',
            'creation': '25-01-2025'
        },
        {
            'title': 'Plan Weekend Trip',
            'desc': 'Research and finalize details for a weekend getaway to the mountains.',
            'status': 'In Progress',
            'creation': '24-01-2025'
        }
    ];
    
    return (
        <div className={styles.todoMain}>
            <h1>Todo List</h1>
            <div className = {styles.todoList}>
            {
                todos.map((todo, index)=>{
                    return <div className = {styles.todo}>
                          <h1>{todo.title}</h1>
                          <p>{todo.desc}</p>
                          <strong className = {`${todo.status == 'Completed' ? styles.todoCompleted : styles.todoPending}`} >{todo.status}</strong>
                          <strong>Created on {todo.creation}</strong>
                          <div className = {styles.todoActions}>
                            <button>Remove</button>
                            <button>Update</button>
                           
                          </div>
                    </div>
                })
            }
            </div>
        </div>
    )
}