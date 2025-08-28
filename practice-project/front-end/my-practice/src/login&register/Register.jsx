import React from "react";
import styles from './LR.module.css'
import axios from "axios";
import { useState } from "react";
import {useNavigate, Link} from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(("http://localhost:5000/register"), {username, email, password} )
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log("Error registering:", error); 
    }

  }

  return (
    <>
      <div className={styles.loginFormContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Register</h2>
                    <span className={styles.inputSpan}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username"
            /></span>
          <span className={styles.inputSpan}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email"
            /></span>
          <span className={styles.inputSpan}>
    <label htmlFor="password" className={styles.label}>Password</label>
    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password"
  /></span>
  {/* <span className={styles.span}><a href="#">Forgot password?</a></span> */}
  <input className={styles.submit} type="submit" value="Log in" />
  <span className={styles.span}>Already have an account? <Link to="/login">Log in</Link></span>
</form>

      </div>
    </>
  )
}

export default Register;
