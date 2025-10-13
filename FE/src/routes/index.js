import Home from '../pages/home'
import Login from '../pages/login'
import Layout from '../components/layout'
import PrivateRoutes from './PrivateRoutes'
import PrivateRoutesAdmin from './PrivateRoutesAdmin'


const Routes = [
    {
    path: "/",
    element: <Layout />,
    children: [
      // Các route công khai
      {
        path: "login",
        element: <Login />,
      },
    //   {
    //     path: "/forgot-password",
    //     element: <ForgotPassword />,
    //   },
    //   {
    //     path: "register",
    //     element: <Register />,
    //   },
    //   {
    //     path: "auth/signingoogle",
    //     element: <OAuth2RedirectHandler />,
    //   },
      // Các route yêu cầu đăng nhập
      {
        element: <PrivateRoutes />,
        children: [
        //   { path: "", element: <Home /> },
        //   { path: "home", element: <Home /> },
        //   { path: "profile", element: <Profile /> },
        //   { path: "profile/:userId", element: <InforUser /> },
        //   { path: "update-profile", element: <UpdateProfile /> },
        //   { path: "posts", element: <Post /> },
        //   { path: "posts/:userId", element: <PostUser /> },
        //   { path: "chat", element: <Chat /> },
        //   { path: "friends", element: <Friendship /> },
        ],
      },

      // Admin-only routes
      {
        element: <PrivateRoutesAdmin />,
        children: [
          { path: "admin", element: <AdminHome /> },
        ],
      },
    ],
  },
]

export default Routes;