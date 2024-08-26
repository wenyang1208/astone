import * as React from 'react';
import addNotification from 'react-push-notification';

const Notify = () => {

    // need to be changed, need to be dynamic and implement without button
    const clickToNotify = () => {
        addNotification({
            title: 'Oder Notification',
            subtitle: 'by Astone',
            message: 'Your product will be estimated to be delivered in 30-Aug-2021',
            theme: 'darkblue',
            duration: 3000,
            native: true, // when using native, OS will handle theming.
            onClick: () => console.alert('Notify.js is being used'),
          });
    }
    
    return (
    
    <div>
        <button style = {{margin: '10px', width: '50px', height: '20px', fontSize: '10px'}} onClick={clickToNotify}>
            Notify
        </button>
    </div>
    );
}

export default Notify;
