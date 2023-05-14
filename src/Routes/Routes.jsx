import { createBrowserRouter } from "react-router-dom";

import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Shared/Login/Login";
import Registration from "../Pages/Shared/Registration/Registration";
import Booking from "../Pages/Home/Services/Booking/Booking";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Appointments from "../Pages/Shared/Appointments/Appointments";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
          loader: () => fetch('http://localhost:5000/services')
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Registration></Registration>
        },
        {
          path: '/booking/:id',
          element: <PrivateRoute><Booking></Booking></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        }, 
        {
          path: '/appointments',
          element: <Appointments></Appointments>
        }
      ]
    },
  ]);

export default router;