import React from 'react'
import styles from '../styles/Login.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import loadingbar from '../public/images/loading.gif';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/authSlice';

export default function LoginAccount() {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch()

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const response = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    const errorData = await response.json();
     
    if (response.ok) {
      dispatch(login(username))
      router.push('/dashboard')
    } else {
      setError(errorData.message);
    }
  }
  return (
    <div className={styles.loginMain}>
      <div className={styles.login}>
        <h1>Login Account</h1>
        <div className={styles.loginForm} action="">

          <label htmlFor="username">Enter username</label>
          <input name='username' type="text" required placeholder='Username' value={username} onChange={(e) => setUserName(e.target.value)} />
          <label htmlFor="password">Enter password</label>
          <input name='password' type="password" required placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />

         {loading ? <img className = {styles.loadingBarImg} src={loadingbar.src} alt="loading" />:  <button onClick={handleLogin} className={styles.btn}>Login</button>}
          <a href="/signup">Create new account?</a>

          <small className = {styles.error}>{error}</small>
        </div>
      </div>
    </div>
  )
}
