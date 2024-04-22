import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../auth/AuthSlice';
import { useUpdateUserMutation } from '../auth/APIslice';


function Profile() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [updateUser, { error, isLoading }] = useUpdateUserMutation();
  
    // Fetch user profile data on component mount (assuming logged in)
    useEffect(() => {
        if (isLoggedIn) {
          // Dispatch action to fetch data
        }
    }, [dispatch, isLoggedIn]);



    async function handleRegister(event) {
        event.preventDefault();
        try {
            const updatedUser = { username, email, password };
            const response = await updateUser(updatedUser);
            if (response.ok) {
                toast.success('Profile updated successfully!');
                // Optionally, update local user data in Redux store
            } else {
                throw new Error('Failed to update profile');
            }
        }
        // Handle other potential errors
        catch (error) {
            console.error('Error updating profile', error);
            toast.error('An error occurred. Please try again later.');
        }
    }

    return (
        <div className='Profile'>
            <Navbar />
            <div className="container mx-auto max-w-sm flex items-center justify-center h-full">
                <form className="flex flex-col gap-4 my-36" onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={username}
                            placeholder="Type Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            placeholder="Type email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            placeholder="Type password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Update
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Profile