import Home from "./components/Home";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
    ],
  },

  { path: "/login", element: <Login /> },

  { path: "/signup", element: <Signup /> },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
};

export default App;
