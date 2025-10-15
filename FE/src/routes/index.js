import Home from "../pages/home";
import Login from "../pages/login";
import Layout from "../layout";
import PrivateRoutes from "../components/privateRoutes";
import PrivateRoutesAdmin from "../components/privateRoutesAdmin"
import Register from "../pages/register";
import GameRoom from "../pages/gameRoom";
import AdminHome from "../pages/adminHome";
import UserManagement from "../pages/user";
import CardManagement from "../pages/card";
import RoomManagement from "../pages/roomAdmin";
import Profile from "../pages/profile";
import Room from "../pages/room";
// import UpdateProfile from "../pages/updateProfile";
// import OAuth2RedirectHandler from "../pages/oAuth2RedirectHandler";
import ForgotPassword from "../pages/forgotPassword";

const Routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      // Route mặc định cho trang chủ
      {
        path: "",
        element: <Home />,
      },
      // Các route công khai
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "game",
        element: <GameRoom />,
      },
      {
        path: "room",
        element: <Room />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // {
      //   path: "auth/signingoogle",
      //   element: <OAuth2RedirectHandler />,
      // },

      // Các route yêu cầu đăng nhập
      {
        element: <PrivateRoutes />,
        children: [
          // { path: "", element: <Home /> },
          // { path: "home", element: <Home /> },
          // { path: "profile", element: <Profile /> },
          // { path: "profile/:userId", element: <InforUser /> },
          // { path: "update-profile", element: <UpdateProfile /> },
          // { path: "posts", element: <Post /> },
          // { path: "posts/:userId", element: <PostUser /> },
          // { path: "chat", element: <Chat /> },
          // { path: "friends", element: <Friendship /> },
        ],
      },

      // Admin-only routes
      {
        element: <PrivateRoutesAdmin />,
        children: [
          { path: "admin", element: <AdminHome /> },
          { path: "admin/user", element: <UserManagement /> },
          { path: "admin/card", element: <CardManagement /> },
          { path: "admin/room", element: <RoomManagement /> },
        ],
      },
    ],
  },
];

export default Routes;