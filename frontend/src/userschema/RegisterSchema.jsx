import * as yup from 'yup';

const registerSchema = yup.object().shape({
    username: yup
        .string("")
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must not exceed 20 characters")
        .required("Username is Required"),
    email: yup
        .string("Email should Be String")
        .email()
        .required("A Valid Email is required"),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(20, 'Password must not exceed 20 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/, 'Password Must contain Upper& lower cases, letters and a Number')
        .required('Password is required'),
});


export { registerSchema }