import React from "react";

import { useState} from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery.jsx";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem.jsx";
import { Button } from "./Button/Button";
import { ProgressBar } from "react-loader-spinner";
import { Modal } from "./Modal/Modal";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from "./App.module.css"


export const App = () => {
  const [request, setRequest] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [largeImage, setLargeImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const perPage = 12;

  const onSearchSubmit = request => {
    if (request.trim() === "") {
      toast.info("What exactly do we search?")
      return;
    }
    setRequest(request);
    setPage(1)
  }

  const fetchOnSubmit = async (images, totalHits) => {
    setImages(images)
    setTotalHits(totalHits)
    if (totalHits === 0) {
      toast.info("No pics with this name!")
    }
  }

  const fetchOnLoadMore = () => {
    setPage(page => page + 1);
  }

  const loadingHandler = (loadingState) => {
    setIsLoading(loadingState);
  }

  const getModalImage = (event) => {
      images.map(image => {
      image.webformatURL === event.target.src &&
      setLargeImage(image.largeImageURL)
      }
    )
  }

  const closeModal = () => {
    setLargeImage(null);
  }

  return (
      <div className={css.App}>

        <Searchbar onSubmit={onSearchSubmit} />

        <ImageGallery> 
          <ImageGalleryItem
            request={request}
            page={page}
            perPage={perPage}
            fetchOnSubmit={fetchOnSubmit}
            onClick={getModalImage}
            onLoading={loadingHandler} />
        </ImageGallery>

        {largeImage &&
          <Modal closeModal={closeModal} largeImage={largeImage} />}
         
        {isLoading && <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass={css.progressBar}
          borderColor = '#303f9f'
          barColor = '#3f51b5'
        />}
        
        {!isLoading && page * perPage < totalHits && <Button onClick={fetchOnLoadMore}/> }
        
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
}




