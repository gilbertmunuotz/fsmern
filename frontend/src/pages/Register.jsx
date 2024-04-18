import { useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { registers } from '../auth/AuthSlice'
import { registerSchema } from '../userschema/RegisterSchema';
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';


const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(registerSchema) });


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = async () => {

        const url = 'http://localhost:4000/api/register';

        const userData = { username, email, password };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData), // Stringify data into JSON
        };

        try {
            // Perform client-side validation using yup
            await registerSchema.validate({ username, email, password });

            const response = await fetch(url, requestOptions);
            const data = await response.json();

            if (response.ok) {
                const token = data.Token; // Extract the token
                dispatch(registers({ token })); // Dispatch registers action with token only
                navigate("/login"); // Navigate to login after registration
                toast.success('Registered Succesfully'); // Toast success message

                // Delayed Toast for Login Success Message (using Promise.resolve)
                Promise.resolve()
                    .then(() => new Promise(resolve => setTimeout(resolve, 2000))) // Delay for 2 seconds
                    .then(() => toast.success('Login To Continue Using Your Account'));
            } else {
                toast.error(data.error); // Display backend error message to the user
            }

        } catch (error) {
            console.error('Error sending data:', error); //Console log the Error Occurred
            toast.error('An error occurred. Please try again later.'); // Display error toast
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
                        <button type="submit" className="bg-red-500 text-white rounded-md py-2 px-4 font-medium hover:bg-opacity-75">
                            Register
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
