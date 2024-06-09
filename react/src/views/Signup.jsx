import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function Signup() {
  const nameRef = useRef(); 
  const emailRef = useRef(); 
  const passwordRef = useRef(); 
  const passwordConfirmationRef = useRef(); 
  const [errors,setErrors] = useState(null) ; 
  const {setUser,setToken} = useStateContext()
  const onSubmit = (ev) =>{
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    };
    axiosClient.post('/signup',payload)
               .then(({data})=>{
                setUser(data.user); 
                setToken(data.token); 
               })
               .catch((err)=>{
                const response = err.response; 
                if(response && response.status === 422){
                  setErrors(response.data.errors);
                }
               })
  }
  return (
    
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className='title'>Create an Account</h1>
          {errors && <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}> {errors[key][0]} </p>
              ))}
            </div>
          } 
          <input ref={nameRef} required type="text" placeholder='Name' />
          <input ref={emailRef} required type="email" placeholder='Email' />
          <input ref={passwordRef} required type="password" placeholder='Password' />
          <input ref={passwordConfirmationRef} required type="password" placeholder='Confirm Password' />
          <button type="submit" className='btn btn-block'>Sign Up</button>
        </form>
        <p className="message">
          Already Registered ? <Link to='/login'>Sign In</Link>
        </p>
      </div>
    </div>
  )
}
