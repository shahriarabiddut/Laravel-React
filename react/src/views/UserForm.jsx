import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function UserForm() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [errors,setErrors] = useState(null) ; 
  const {setNotification} = useStateContext(); 
  const [user,setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  if(id){
    useEffect(()=>{
      setLoading(true)
      axiosClient.get(`/users/${id}`)
      .then(({data})=>{
        setLoading(false)
        setUser(data)
      })
      .catch(()=>{
        setLoading(false)
      })
    },[])
  }

  const onSubmit =  (ev) => {
    ev.preventDefault();
    if(user.id){
        axiosClient.put(`/users/${user.id}`,user)
          .then(()=>{
            setNotification('User Updated Successfully!');
            navigate('/users');
          }).catch((err)=>{
              const response = err.response; 
              if(response && response.status === 422){
                setErrors(response.data.errors);
              }
            })
      }else{
        axiosClient.post(`/users`,user)
          .then(()=>{
            setNotification('User Added Successfully!');
            navigate('/users');
          }).catch((err)=>{
              const response = err.response; 
              if(response && response.status === 422){
                setErrors(response.data.errors);
              }
            })
      }
  }
  return (
    <>
      {user.id && <h1> Update User : {user.name}</h1>} 
      {!user.id && <h1> New User </h1>} 
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center"> Loading .... </div>
        )}
        {errors && <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}> {errors[key][0]} </p>
              ))}
            </div>
        } 
        {!loading && (
          <form onSubmit={onSubmit}> 
            <input value={user.name} onChange={ev=> setUser({...user,name:ev.target.value})} type="text" placeholder='Name' />
            <input value={user.email} onChange={ev=> setUser({...user,email:ev.target.value})} type="email" placeholder='Email' />
            <input onChange={ev=> setUser({...user,password:ev.target.value})} type="password" placeholder='Password' />
            <input onChange={ev=> setUser({...user,password_confirmation:ev.target.value})} type="password" placeholder='Confirm Password' />
            <button type="submit" className='btn btn-block'>Save</button>
          </form>
        )}
      </div>
    </>
  )
}
