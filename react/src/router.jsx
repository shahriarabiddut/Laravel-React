import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import UserForm from "./views/UserForm";
import Users from "./views/Users";

const router = createBrowserRouter([
    {
        path: '*',
        element: <NotFound />
    },{
        path: '/',
        element: <DefaultLayout />,
        children:[
            {
            path: '/',
            element: <Navigate to='/users'/>
            },{
                path: '/users',
                element: <Users />
            },{
                path: '/users/new',
                element: <UserForm />
            },{
                path: '/users/:id',
                element: <UserForm key='userCreate'/>
            },{
                path: '/users/:id',
                element: <UserForm key='userUpdate'/>
            },{
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },{
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
])

export default router;
