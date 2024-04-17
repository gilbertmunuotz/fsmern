import { logout } from '../auth/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux'
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-md"> {/* Merged classes */}
      <div className="container mx-auto px-4 flex h-16 justify-between items-center">  {/* Merged classes */}
        <Link to="/" className="text-red-500 font-bold text-xl">WebDevMania</Link>

        <ul className="hidden md:flex flex-row space-x-8"> {/* Tailwind classes for list */}
          <li className="hover:text-gray-500"><Link to="/">Home</Link></li>
          <li className="hover:text-gray-500"><a href="#contacts">Contacts</a></li>
          <li className="hover:text-gray-500"><a href="#foods">Foods</a></li>
          <li className="hover:text-gray-500"><a href="#faq">FAQ</a></li>
          <li className="hover:text-gray-500"><Link to="/create">Create</Link></li>
        </ul>

        <div className="flex items-center space-x-4"> {/* Tailwind classes for right side */}
          <AiOutlineUser className="text-gray-700 cursor-pointer text-xl" />
          <Link to="/cart" className="flex items-center text-gray-700">
            <AiOutlineShoppingCart className="text-xl" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {/* Dynamic product count (replace with your logic) */}
              { /* products.length */}
            </span>
          </Link>
          <button onClick={handleLogout} className="text-gray-700 font-medium text-base">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
