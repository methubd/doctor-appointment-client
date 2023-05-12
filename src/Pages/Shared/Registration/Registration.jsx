import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const Registration = () => {
    const {setUser, userRegistration} = useContext(AuthContext);
    const handleRegistration = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if(password !== confirm){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Please check your confirm password field',
                showConfirmButton: false,
                timer: 1500
              })
            return;
        }
        
        userRegistration(email, password)
        .then(result => {
            const newUser = result.user;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'New user account successfully created',
                showConfirmButton: false,
                timer: 1500
              })
            console.log(newUser);
            setUser(null);
            form.reset()
        })
        .catch(error => console.log(error))

        
    }
    return (
        <div className="text-center">
            <form onSubmit={handleRegistration} className="w-1/3 mx-auto mt-10">
                <input className="bg-blue-100 w-full p-2 rounded-md my-2" type="text" name="name" placeholder="Your Name" />
                <input className="bg-blue-100 w-full p-2 rounded-md my-2" type="email" name="email" placeholder="Email" />
                <input className="bg-blue-100 w-full p-2 rounded-md my-2" type="password" name="password" placeholder="Password" />
                <input className="bg-blue-100 w-full p-2 rounded-md my-2" type="password" name="confirm" placeholder="Confirm Password" />
                <input className="bg-blue-500 text-white px-3 py-1 my-2 rounded-md" type="submit" value="Registration" />
            </form>
            <p className="my-2"><small>Already have an account? <Link className="text-blue-600" to="/login">Please Login</Link></small></p>
        </div>
    );
};

export default Registration;