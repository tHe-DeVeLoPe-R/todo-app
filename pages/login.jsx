import React from 'react'
import styles from '../styles/Login.module.css'
export default function login() {
    return (
        <div className = {styles.loginMain}>
             <div className = {styles.login}>
             <h1>Login Account</h1>
              <form className = {styles.loginForm} action="">
               
                <label htmlFor="username">Enter username</label>
                <input name='username' type="text" required placeholder='Username' />
                <label htmlFor="password">Enter password</label>
                <input name='password' type="password" required placeholder='Password' />
                <button className = {styles.btn}>Login</button>
                <a href="/">Create new account?</a>
              </form>
             </div>
        </div>
      )
}
