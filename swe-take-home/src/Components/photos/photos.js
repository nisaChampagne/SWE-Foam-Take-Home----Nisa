import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';



function Photos ({ photos, loading }) {


  if (loading) {
    return <h2>Loading...</h2>;
  }


  const handleClick = (photo, value) => {
    try {
      axios.post('http://localhost:3200/photo/' + photo.id + '/' + value);
      // refresh the the page
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className='grid'>
      {photos.map(photo => (
        <li key={photo.id} className='list-group-item'>
          <img src={photo.url} alt="Image from the reactor run" />
          <Popup 
            trigger={<button  className='btn btn-primary btn-sm'>Classify Image</button>}
            modal
            closeOnDocumentClick
            >
            <div className='modal-content'>
                <div className='modal-body'>
                    <p>Do you want to mark this photo as foaming or non-foaming?</p>
                  </div>
                  <div className='modal-footer'>
                    <button className='btn btn-primary' onClick={() => handleClick(photo, true)}>Foamy</button>
                    <button className='btn btn-primary' onClick={() => handleClick(photo, false)}>Non-foamy</button>
                  </div>
            </div>
          </Popup>
        </li>
      ))}
    </ul>
  );
};
export default Photos;