import { Link } from "react-router-dom";


const SecondNav = () => {
    return (
        <div className="flex items-center justify-between px-10 py-6">
            <img className="w-28" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTha83GdoWkcRqOGaZb3bG7pd8Ni9FCfXQkrw&usqp=CAU" alt="" />
            <div>
                <Link className="text-sm px-2">Home</Link>
                <Link className="text-sm px-2">Features</Link>
                <Link className="text-sm px-2">Departments</Link>
                <Link className="text-sm px-2">Our Doctors</Link>
                <Link className="text-sm px-2">Timetable</Link>
                <Link className="text-sm px-2">New</Link>
            </div>
        </div>
    );
};

export default SecondNav;