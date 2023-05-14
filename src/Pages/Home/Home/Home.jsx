import { useLoaderData } from "react-router-dom";
import SecondNav from "../../Shared/Navbar/SecondNav";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import Swal from "sweetalert2";


const Home = () => {
    const services = useLoaderData()
    
    const handleAppointment = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const number = form.number.value;
        const doctor = form.doctor.value;
        const date = form.date.value; 
        const newAppointment = {name, number, doctor, date};
        // console.log(newAppointment);

        fetch('http://localhost:5000/appointments', {
            method: 'POST',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(newAppointment)
        })

        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully Submitted, You will get a phone call for re confirmation',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  form.reset()
            }
        })
    }
    return (
        <div>
            <SecondNav></SecondNav>
            <Banner></Banner>
            <div className="md:flex bg-blue-100 p-6 rounded-md mt-10">
                <div>
                    <h1 className="font-bold pb-5">EMERGENCY CONSULTAION</h1>
                    <h2 className="font-bold">Call Now:</h2>
                    <h1>+88 02 49357766</h1>
                    <p><span className="font-bold">Address:</span> 209, Outer Circular Road, Wireless, Moghbazar, Dhaka- 1217</p>
                    <p><span className="font-bold">Working Time:</span> 05:00AM to 10:00PM </p>
                    <p><span className="font-bold">Mail:</span> info@rushmono.com</p>
                </div>
                <div>
                    <h1 className="font-bold">REQUEST APPOINTMENT</h1>
                    <form onSubmit={handleAppointment}>
                        <input className="p-2 w-full my-2 rounded" type="text" name="name" id="name" placeholder="Patient Name *" required />
                        <input className="p-2 w-full my-2 rounded" type="number" name="number" id="number" placeholder="Number *" required />
                        <select className="p-2 my-2 rounded" name="doctor">
                            <option value="">Select Doctor</option>
                            <option value="Dr Ganesh">Dr Ganesh</option>
                            <option value="Dr Vabesh">Dr Vabesh</option>
                        </select> 
                        <input className="p-2 my-2 rounded ml-5" type="date" name="date" id="date" placeholder="Date *" required /> <br />
                        <input className="bg-blue-500 py-1 px-3 text-white rounded-md" type="submit" value="Make Appointment" />
                    </form>
                </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10" >
                {
                    services.map(service => <Services
                    key={service._id}
                    service={service}
                    ></Services>)
                }
            </div>
        </div>
    );
};

export default Home;