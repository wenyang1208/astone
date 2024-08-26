import React from 'react';
import SearchBar from '../components/searchBar';
import OrderNotification from '../components/notification';
// import Notify from '../components/notification2';

const Unisex = () => {
  return (
    <div>
      <SearchBar>
      </SearchBar>
      <h1>Unisex</h1>
      <p>This is the page for unisex products.</p>
      <OrderNotification />
      {/* <Notify /> */}

    </div>
  );
};

export default Unisex;