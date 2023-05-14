import { Link } from "react-router-dom";


const Services = ({service}) => {
    const {_id, name, price, description} = service;
    // console.log(service);

    return (
        <div className="bg-blue-200 p-5 rounded-lg">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-lg font-bold border border-slate-900 px-2 w-16">{price}</p>
            <p className="text-gray-500">{description}</p>
            <Link to={`/booking/${_id}`}>
            <button className="bg-blue-500 text-white px-3 py-1 my-2 rounded-md">Book Now</button>
            </Link>
            
        </div>
    );
};

export default Services;