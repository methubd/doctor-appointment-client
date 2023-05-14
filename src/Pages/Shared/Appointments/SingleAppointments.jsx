import React from 'react';
import Swal from 'sweetalert2';

const SingleAppointments = ({app}) => {

    const handleDelete = id => {
        fetch(`http://localhost:5000/services/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Deleted! Please refresh the page.',
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
        })
    }
    
    return (
        <div className='bg-blue-100 p-3 rounded-md flex justify-between my-3 text-gray-600'>
            <h2>Patient: <span className='font-bold'>{app.name}</span> </h2>
            <h2>Desired Service: <span className='font-bold'>{app.selectedService}</span></h2>
            <h2>Date: <span className='font-bold'>{app.date}</span></h2>
            <button onClick={() => handleDelete(app._id)} className='bg-red-500 px-5 rounded-full text-white rounded-'>X</button>
        </div>
    );
};

export default SingleAppointments;