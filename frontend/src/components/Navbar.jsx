import { toast } from 'react-toastify';
import { AiOutlineUser } from 'react-icons/ai';
import { useLogoutMutation } from '../auth/APIslice';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearPersistedState, selectIsLoggedIn } from '../auth/AuthSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logOut] = useLogoutMutation(); // Get logout mutation hook from (RTK Query)
  const isLoggedIn = useSelector(selectIsLoggedIn); // Access isLoggedIn state
  const userInfo = useSelector(state => state.auth.userInfo);  // Access userInfo object from Redux state
  const username = userInfo?.username;  // Access username directly from userInfo object


  const handleLogout = async () => {
    try {
      // Call the logout mutation (RTK Query)
      await logOut();

      // Clear persisted state and local storage & logout
      dispatch(clearPersistedState());

      // Update the existing toast with success message
      toast.success('Logged out successfully!');
      navigate('/login'); // Navigate to Login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      // Update the existing toast with error message
      toast.error('An error occurred while logging out.');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <div className="container mx-auto px-4 flex h-16 justify-between items-center">
        <Link to="#" className="text-red-500 font-bold text-xl">WebDevMania</Link>
        {isLoggedIn ? (
          <div className="flex items-center">
            <h1 className='m-4 font-bold'> {isLoggedIn ? `Welcome ${username}` : 'Profile Page'}</h1>
            <Link to="/myprofile">Profile</Link>
            <button className="text-gray-700 font-medium text-base rounded-full m-3 p-2" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <AiOutlineUser className="text-gray-700 cursor-pointer text-xl" />
            <Link to={"/login"}>
              <button className="text-gray-700 font-medium text-base rounded-full p-2">Log In</button>
            </Link>
            <Link to={"/register"}>
              <button className="text-gray-700 font-medium text-base rounded-full">Register</button>
            </Link>
          </div>
        )}
      </div>
    </nav >
  );
};

export default Navbar;