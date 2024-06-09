import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function Users() {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);
  const {setNotification} = useStateContext();
  useEffect(()=>{
    getUsers();
  },[])
  const getUsers = () =>{
    setLoading(true)
    axiosClient.get('/users')
    .then(({data})=>{
      setLoading(false)
      setUsers(data.data)
      console.log(data);
    })
    .catch(()=>{
      setLoading(false)
    })
  }
  const onDelete = (u)=>{
    if(!window.confirm('Are you sure you want to delete this data?')){
      return
    }
    axiosClient.delete(`/users/${u.id}`)
    .then(()=>{
      setNotification('User Deleted Successfully!');
      getUsers()
    })
  }
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between',alignItems:'center' }}>
        <h1>Users</h1>
        <Link to='/users/new' className='btn-add'>Add New</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {loading &&
            <tr>
              <td colSpan='5' className="text-center"> Loading...... </td>
            </tr> }
            {!loading && users.map(u=>(
              <tr>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.created_at}</td>
              <td>
              <Link to={'/users/'+u.id} className='btn-edit'>Edit</Link> &nbsp;
              <button onClick={ev=>onDelete(u)} className='btn-delete'>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
