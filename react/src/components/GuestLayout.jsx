import { Navigate, Outlet } from 'react-router-dom';
import { userStateCOntext } from '../context/ContextProvider';


export default function GuestLayout() {
  const {token} = userStateCOntext
  if(!token){
    return <Navigate to="/" />
  }
  return (
    <div>
      GuestLayout
      <Outlet />
    </div>
  )
}
