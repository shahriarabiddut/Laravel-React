import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';

export default function Users() {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    getUsers();
  },[])
  const getUsers = () =>{
    setLoading(true)
    axiosClient.get('/users')
    .then(({data})=>{
      setLoading(false)
      setUsers(data.data)
      (false)
      console.log(data);
    })
    .catch(()=>{
      setLoading(false)
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
            {users.map(u=>(
              <tr>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.created_at}</td>
              <td>
              <Link to={'/users/'+u.id} className='btn-edit'>Edit</Link> &nbsp;
              <button className='btn-delete'>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
