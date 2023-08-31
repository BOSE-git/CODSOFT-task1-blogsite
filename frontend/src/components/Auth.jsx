import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useDispatch } from 'react-redux';
import { authActions } from "../store";
import { useNavigate } from 'react-router-dom';




function Auth() {
  const disPatch = useDispatch();
  const navigate = useNavigate();


  const [isSignUp, setIsSignUp] = useState(false);
  const [input, setInput] = useState({
    name: "", email: "", password: ""
  })

  function handleChange(ev) {
    setInput((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  }

  async function sendRequest(type = "login") {
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: input.name,
        email: input.email,
        password: input.password
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(input);
    if (isSignUp) {
      sendRequest("signup")
        .then(data => {
  
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("userName", data.user.name);
          return data; 
        })
        .then(data => {
          disPatch(authActions.login());
          return data; 
        })
        .then(data => {
          navigate("/blogs");
          return data; 
        })
        .then(data => {
          console.log(data); 
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      sendRequest()
        .then((data) => { localStorage.setItem("userId", data.user._id); localStorage.setItem("userName", data.user.name); })
        .then(() => disPatch(authActions.login())).then(() => navigate("/blogs"))
        .then(data => console.log(data));
    }
  }

  return (
    <div className="login-container">

      <div className="outline">
        <div className="login-logo"><h1>{isSignUp ? "SignUp" : "Login"}</h1></div>

        <div className="form">
          <form onSubmit={handleSubmit}>
            {isSignUp && <input name='name' className='inputarea' type="text" placeholder='Name' value={input.name} onChange={handleChange} />}

            <input name='email' className='inputarea' type="email" placeholder='Email' value={input.email} onChange={handleChange} />

            <input name='password' className='inputarea' type="password" placeholder='Password' value={input.password} onChange={handleChange} />

            <input className='submit' type="submit" />

            <div className="Auth" onClick={() => setIsSignUp(!isSignUp)} >{isSignUp ? "Login?" : "SignUp?"}</div>
          </form>
        </div>
      </div>
    
    </div>

  )
}

export default Auth;