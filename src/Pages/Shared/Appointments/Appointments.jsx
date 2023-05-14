import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import SingleAppointments from './SingleAppointments';

const Appointments = () => {

    const {user} = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    
    const url = `http://localhost:5000/bookings?email=${user.email}`
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('doc-appointment-token')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setAppointments(data);
        })
    }, [url])

    return (
        <div>
            <h1 className='text-2xl font-bold text-center p-4'>Appointments</h1>
            <div >
            {
                appointments.map(app => <SingleAppointments
                key={app._id}
                app = {app}
                ></SingleAppointments>)
            }
            </div>
        </div>
    );
};

export default Appointments;