import React from 'react'
import styles from '../styles/Signup.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router';
import loadingbar from '../public/images/loading.gif';

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const createUser = async () => {
    setLoading(true);
    setError("");
    const response = await fetch("api/signup", {
      method: "POST",
      headers : {"Content-Type":"application/json"},
      body: JSON.stringify({username, password}),
    });
    setLoading(false)
  const errorData = await response.json();
    if(response.ok){
     router.push('/login')
    }else{
     setError(errorData.message);
    }
  }

  return (
    <div className={styles.signupMain}>
      <div className={styles.signup}>
        <h1>Create Account</h1>
        <div onSubmit={createUser} className={styles.signupForm} action="">

          <label htmlFor="username">Create username</label>
          <input name='username' type="text" required placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password">Create password</label>
          <input name='password' type="password" required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

         {loading ? <img className = {styles.loadingimg} src={loadingbar.src} alt="loading" />:  <button onClick={createUser} className={styles.btn}>Signup</button>}

          <a href="/login">Already have account?</a>

          <small className = {styles.error}>{error}</small>
        </div>
      </div>
    </div>
  )
}
