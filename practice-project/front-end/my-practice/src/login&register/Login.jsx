import axios from 'axios';
import styles from './LR.module.css'
import { useState } from "react";
import { useEffect } from 'react';
function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get user information
      const decodedUser = jwt_decode(token);
      setUser(decodedUser);
    }
  }, [user]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const response = axios.post("http://localhost:5000/login", { email, password },        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem( `token`)}`,
          },
        })
      console.log(response.data);
    } catch (error) {
      console.log("error logging in:", error);
    }
  }
  return (
    <>
      <div className={styles.loginFormContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>
          <span className={styles.inputSpan}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input  onChange={(e) => {setEmail(e.target.value)}} type="email" name="email" id="email"
            /></span>
          <span className={styles.inputSpan}>
    <label htmlFor="password" className={styles.label}>Password</label>
    <input onChange={(e) => {setPassword(e.target.value)}} type="password" name="password" id="password"
  /></span>
  <span className={styles.span}><a href="#">Forgot password?</a></span>
  <input className={styles.submit} type="submit" value="Log in" />
  <span className={styles.span}>Don't have an account? <a href="#">Sign up</a></span>
</form>

      </div>
    </>
  )
}

export default Login;
