import React from 'react'
import styles from '../styles/Signup.module.css'

export default function SignUp() {
  return (
    <div className = {styles.signupMain}>
         <div className = {styles.signup}>
         <h1>Create Account</h1>
          <form className = {styles.signupForm} action="">
           
            <label htmlFor="username">Create username</label>
            <input name='username' type="text" required placeholder='Username' />
            <label htmlFor="password">Create password</label>
            <input name='password' type="password" required placeholder='Password' />
            <button className = {styles.btn}>Signup</button>
            <a href="/login">Already have account?</a>
          </form>
         </div>
    </div>
  )
}
