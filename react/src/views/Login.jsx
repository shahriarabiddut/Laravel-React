import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function Login() {
  const emailRef = useRef(); 
  const passwordRef = useRef(); 
  const [errors,setErrors] = useState(null) ; 
  const {setUser,setToken} = useStateContext()
  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setErrors({})
    // debugger
    axiosClient.post('/login',payload)
               .then(({data})=>{
                setUser(data.user); 
                setToken(data.token); 
               })
               .catch(err=>{
                const response = err.response; 
                if(response && response.status === 422){
                  if(response.data.errors){
                      setErrors( {email : ['Invalid Email or Password!']});
                    }else{
                      setErrors({
                      email : [response.data.message]});
                  }
                }
               })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className='title'>Login into your account</h1>
          {errors && <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}> {errors[key][0]} </p>
              ))}
            </div>
            } 
            <input ref={emailRef} required type="email" placeholder='Email' />
            <input ref={passwordRef} required type="password" placeholder='Password' />
          <button type="submit" className='btn btn-block'>Login</button>
        </form>
        <p className="message">
          Not Registered ? <Link to='/signup'>Create An Account</Link>
        </p>
      </div>
    </div>
  )
}
