import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const Booking = () => {
    const service = useLoaderData();
    const {user} = useContext(AuthContext);

    const navigate = useNavigate()
    
    const handleSubmitBooking = event => {
        event.preventDefault();
        const form = event.target;
        const selectedService = service.name;
        const name = form.name.value;
        const number = form.number.value;
        const email = user.email;
        const date = form.date.value;
        const newBooking = {selectedService, name, number, email, date}
        // console.log(newBooking);
        fetch('http://localhost:5000/services', {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            }, 
            body: JSON.stringify(newBooking)
        })
        .then (res => res.json())
        .then (data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'You will get a phone call for re confirmation',
                    showConfirmButton: false,
                    timer: 2000
                  })
                  navigate('/')
            }
        })
    }
    return (
        <div className="mx-auto w-1/2 text-center">
            <h1 className="text-2xl font-bold py-3 text-gray-600 m-1">Please fillup the form for : <span className="text-red-800">{service.name}</span></h1>
            <form onSubmit={handleSubmitBooking}>
                <input className="bg-blue-100 p-2 w-1/2 m-1" type="text" name="name" placeholder="Patient Name" required />
                <input className="bg-blue-100 p-2 w-1/2 m-1" type="text" name="number" placeholder="Contact Number" required />
                <input className="bg-red-100 p-2 w-1/2 m-1" type="email" name="email" defaultValue={user?.email} disabled required />
                <input className="bg-blue-100 p-2 w-1/2 m-1" type="date" name="date" required /> <br />
                <input className="bg-blue-500 text-white px-8 py-1 m-5 rounded-md" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Booking;