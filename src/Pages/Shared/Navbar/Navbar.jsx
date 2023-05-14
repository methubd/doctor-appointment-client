import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const Navbar = () => {
    const {user, setUser, userLogout} = useContext(AuthContext);

    const navigate = useNavigate();
    const handleLogout = () => {
        userLogout()
        .then(result => {
            setUser(null)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Logout',
                showConfirmButton: false,
                timer: 1500
              })
            navigate('/login')
        })
    }

    return (
        <nav>
            <div className="flex justify-between items-center bg-blue-500 px-10 text-white h-10">
                <div>
                    <Link className="text-sm px-2">FAQs</Link>
                    <Link className="text-sm px-2">About</Link>
                    <Link className="text-sm px-2">Contact</Link>
                </div>
                <div>
                    {
                        user ? 
                        <div>
                            
                            <Link to="/appointments">
                            <button className="text-sm px-2 bg-blue-800 rounded-md">Your Bookings</button>
                            </Link>
                            <button onClick={handleLogout} className="text-sm px-2">Logout</button>
                        </div>
                        :
                        <Link className="text-sm px-2" to='/login'>Login</Link>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;