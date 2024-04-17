import { useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { login } from '../auth/AuthSlice'
import { loginSchema } from '../userschema/LoginSchema';
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {

        const url = 'http://localhost:4000/api/login';

        const userData = { username, password };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData), // Stringify data into JSON
        };

        try {
            // Perform client-side validation using yup
            await loginSchema.validate({ username, password });

            const response = await fetch(url, requestOptions);
            const data = await response.json();
            // console.log(data)

            if (response.ok) {
                dispatch(login(data)); // Dispatch Login Action From Redux store
                navigate("/"); // Navigate to home After Registration
                toast.success('Login Succesfully'); // Toast a Successful Message Upon Successful Login
            } else {
                toast.error(data.error); // Display backend error message to the user
            }

        } catch (error) {
            console.error('Error sending data:', error);
            toast('An error occurred. Please try again later.'); // Display error toast
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-red-500 z-50"> {/* Merged classes */}
            <div className="container mx-auto max-w-sm flex items-center justify-center h-full"> {/* Merged classes */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-full px-8 py-10"> {/* Merged classes */}
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
                            Login
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
