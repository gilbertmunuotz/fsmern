import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { credentials, selectUser } from '../auth/AuthSlice';
import { useGetUserProfileByIdQuery, useUpdateUserByIdMutation } from '../auth/APIslice';

function Profile() {

    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userInfo = useSelector(selectUser); // Access userInfo object directly
    const { data, error, refetch } = useGetUserProfileByIdQuery(userInfo?._id); //Use destructuring to access data, error, and isLoading from useGetUserProfileByIdQuery then Pass user ID conditionally from userInfo
    const [dispatchUpdateUserById] = useUpdateUserByIdMutation(); // Call the hook to update user Profile

    // Update state & Get UserData with fetched user data (if successful)
    useEffect(() => {
        if (data) {
            setUsername(data.username);
            setEmail(data.email);
        }
    }, [data]);

    // Handle errors and display user data
    useEffect(() => {
        if (error) {
            console.error('Error fetching user profile:', error);
            toast.error('An error occurred while fetching user data.');
        }
    }, [error]);

    // Asynchronous function to handle form submission
    async function handleUpdateProfile(event) {

        event.preventDefault();

        try {
            const updateFields = { id: userInfo._id, username, email, password };
            const response = await dispatchUpdateUserById({ body: updateFields }).unwrap(); //Dispatch Mutation
            dispatch(credentials({ ...response }));

            if (response.success) {
                toast.success('Profile updated successfully!'); //Toast Succesfully for success Operation
                refetch();  // Optionally refetch data to display latest changes
            } else {
                // Handle specific API errors based on response.message
                switch (response.message) {
                    case 'User Not Found':
                        toast.error('User not found. Please check your login credentials.');
                        break;
                    case 'Internal server Error':
                        toast.error('An internal server error occurred. Please try again later.');
                        break;
                    default:
                        toast.error(response.message || 'Failed to update profile.'); // Handle API errors
                        break;
                }
            }
        } catch (error) {
            console.error("Error Updating Profile:", error);
            toast.error("An Error Occured Please try Again Later");
        }
    }

    return (
        <div className='Profile'>
            <Navbar />
            <div className="container mx-auto max-w-sm flex items-center justify-center h-full">
                <form className="flex flex-col gap-4 my-36" onSubmit={handleUpdateProfile}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            User Name
                        </label>
                        <input type="text" id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={username}
                            placeholder="Type Username" onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input type="email" id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            placeholder="Type email" onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input type="password" id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            placeholder="Type New password Here" onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile