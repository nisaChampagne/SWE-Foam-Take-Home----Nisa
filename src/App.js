import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './Components/navbar/navbar';
import Pagination from './Components/pagination/pagination';
import Photos from './Components/photos/photos';



function App() {
  // loading initial state
  const [loading, setLoading] = useState(true);
  const [dbData, setDbData] = useState([]);
  // images for all tab
  let [images, setImages] = useState([]);
  // keeping track of the active page
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(50);

  useEffect(() => {
    fetchData();
  }, []);

  // FETCHING DATA FROM DATABASE
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get('http://localhost:3200/allImagesFromDB');
      for (let photo of response) {
        dbData.push({ "id": photo._id, "url": photo.url, "foamy": photo.foamy });
      }
      images = [...dbData];
      setImages(images);
      setDbData(dbData);
    } catch (error) {
      console.error(error.message);
    }

    setLoading(false);
  }

  // look at photo.foamy for filtering
  const foamyPhotos = images.filter(photo => photo.foamy === true);
  const nonFoamyPhotos = images.filter(photo => photo.foamy === false);

  // pagination needs to be done here
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = dbData.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }


  return (
    <><NavBar />
    <div className='button-container'>
        <button className="btn btn-primary" onClick={() => setDbData(images)}>All</button>
        <button className="btn btn-primary" onClick={() => setDbData(foamyPhotos)}>Foamy</button>
        <button className="btn btn-primary" onClick={() => setDbData(nonFoamyPhotos)}>Non-Foamy</button>
    </div>
    <Photos 
        photos={currentPhotos} 
        loading={loading} />
    <Pagination
        photosPerPage={photosPerPage}
        totalphotos={dbData.length}
        paginate={paginate}
        activePage={currentPage}
        currentPhotos={currentPhotos} />
    </>
  );
};

export default App;
