import { useState } from 'react'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { credentials } from '../auth/AuthSlice';
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import { useRegisterMutation } from '../auth/APIslice';
import { registerSchema } from '../userschema/RegisterSchema';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(registerSchema) });

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [registerUser, { isLoading, }] = useRegisterMutation(); // Get isLoading and error from useRegisterMutation

    const handleRegister = async () => {
        try {
            // Perform client-side validation using yup
            await registerSchema.validate({ username, email, password });

            // Trigger the registerUser mutation with user data
            const response = await registerUser({ username, email, password });

            if (response.error) { // Handle RTK Query error (if any)
                toast.error(response.error.data.message); // Display backend error message
            } else if (response.data.status === 'error') { // Handle specific backend errors
                toast.error(response.data.message); // Display backend error message
            } else {
                navigate('/login');
                toast.success('Registered Successfully!');
                setTimeout(() => toast.success('Login To Continue Using Your Account'), 2000);
                dispatch(credentials(response.data.user)); // Dispatch credentials action with user data
            }
            // Handle other potential errors
        } catch (error) {
            console.error('Error sending data:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-red-500 z-50">
            <div className="container mx-auto max-w-sm flex items-center justify-center h-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-full px-8 py-10">
                    <h2 className="text-2xl font-bold text-red-500 text-center mb-8">Register</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
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
                            type="email"
                            name='email'
                            value={email}
                            {...register("email")}
                            placeholder="Type email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        <p className="text-red-600 text-sm">{errors.email?.message}</p>
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
                        <button type="submit" disabled={isLoading} className="bg-red-500 text-white rounded-md py-2 px-4 font-medium hover:bg-opacity-75">
                            {isLoading ? "Registering...." : "Register"}
                        </button>
                    </form>
                    <p className="text-center mt-4 text-gray-500">
                        Already Have an  account? <Link to="/login" className="text-red-500 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
