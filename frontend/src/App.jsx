import Login from './pages/Login';
import Profile from "./pages/Profile";
import Index from "./components/Index";
import Register from "./pages/Register";
import NotFound from "./components/Notfound";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Index />, errorElement: <NotFound /> },
  { path: "/login", element: <Login />, errorElement: <NotFound /> },
  { path: "/profile", element: <Profile />, errorElement: <NotFound /> },
  { path: "/register", element: <Register />, errorElement: <NotFound /> },
])

function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
