import * as React from 'react';
// install react-toastify and import it 
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderNotification = () => {

    // create a function to show notification
    // Function to show the notification
    const showNotification = () => {
        toast.success('Your product has been delivered!', 
        {
            position:"top-right",
            // autoClose: 30000
        });
    };

    return (
        <div>
        <button onClick={showNotification}> Simulate Delivery       Notification </button>
        <ToastContainer />
            {/* // autoClose = {30000} /> */}
        </div>
    );
};

export default OrderNotification;


