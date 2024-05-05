import { useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { credentials } from '../auth/AuthSlice';
import { useLoginMutation } from "../auth/APIslice";
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../userschema/LoginSchema';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [loginUser, { isLoading }] = useLoginMutation();

    const handleLogin = async () => {
        try {
            // Perform client-side validation using yup
            await loginSchema.validate({ username, password });

            // Trigger the registerUser mutation with user data
            const response = await loginUser({ username, password });

            if (response.error) { // Handle RTK Query error (if any)
                toast.error(response.error.data.message); // Display backend error message
            } else if (response.data.status === 'error') { // Handle specific backend errors
                toast.error(response.data.message); // Display backend error message
            } else {
                navigate("/"); // Navigate to home after login
                toast.success('Login Succesfully'); // Toast success message
                dispatch(credentials(response.data.user)); // Dispatch credentials action with user data
            }

        } catch (error) {
            console.error('Error sending data:', error);
            toast.error('An error occurred. Please try again later.'); // Display error toast
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-red-500 z-50"> 
            <div className="container mx-auto max-w-sm flex items-center justify-center h-full"> 
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-full px-8 py-10"> 
                    <h2 className="text-2xl font-bold text-red-500 text-center mb-8">Login</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
                        <input
                            type="text"
                            name='username'
                            value={username}
                            {...register("username")}
                            placeholder="Type Username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        <p className="text-red-600 text-sm">{errors.username?.message}</p>
                        <input
                            type="password"
                            name='password'
                            value={password}
                            {...register("password")}
                            placeholder="Type password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        <p className="text-red-600 text-sm">{errors.password?.message}</p>
                        <button type="submit" className="bg-red-500 text-white rounded-md py-2 px-4 font-medium hover:bg-opacity-75">
                            {isLoading ? "Logging In...." : " Login"}
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-500">
                        No account? <Link to="/register" className="text-red-500 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
