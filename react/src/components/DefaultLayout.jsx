import { Navigate, Outlet } from 'react-router-dom';
import { userStateCOntext } from '../context/ContextProvider';

export default function DefaultLayout() {
  const {user,token} = userStateCOntext()
  if(!token){
    return <Navigate to="/login" />
  }
  return (
    <div>
      DefaultLayout
      
      <Outlet />
    </div>
  )
}
