import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const Login = () => {
    
    const {userLogin} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleUserLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        userLogin(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            navigate('/')
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Logged In',
                showConfirmButton: false,
                timer: 1500
              })
        })
    }

    return (
        <div className="text-center mt-10">
            <form onSubmit={handleUserLogin} className="w-1/3 mx-auto">
                <input className="bg-blue-100 w-full p-2 rounded-md my-2" type="email" name="email" placeholder="Email" />
                <input className="bg-blue-100 w-full p-2 rounded-md my-2" type="password" name="password" placeholder="Password" />
                <input className="bg-blue-500 text-white px-3 py-1 rounded-md" type="submit" value="Login" />
            </form>
            <p className="my-2"><small>New to Our Website? <Link className="text-blue-600" to="/register">Please Register</Link></small></p>
            <button className="bg-red-400 text-white px-3 py-1 my-2 rounded-md">Login with Google</button>
        </div>
    );
};

export default Login;