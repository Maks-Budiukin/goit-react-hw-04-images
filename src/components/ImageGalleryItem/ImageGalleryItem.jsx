import React from "react";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import css from "components/ImageGalleryItem/ImageGalleryItem.module.css"
import { API } from "components/API/API";
import { toast } from 'react-toastify';


export const ImageGalleryItem = ({request, page, perPage, fetchOnSubmit, onClick, onLoading}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
      
    if (request.length > 0) {
      onLoading(true);
    API(request, page, perPage)
    .then((pics) => {
          setImages(pics.hits)
          fetchOnSubmit(pics.hits, pics.totalHits)
    })
    .catch((error) => {
      toast.error(`Something's wrong :( Try to reload the page! Error: ${error}`)
    })
    .finally(() => {
        onLoading(false);
        
    }) 
    }
  }, [request, page, perPage])


  return (<>
            
            {images.map((image) =>
          <li className={css.ImageGalleryItem} key={image.id} >
          <img className={css.ImageGalleryItemImage} src={image.webformatURL} alt="" onClick={onClick} />
            </li>)}
            
            </>)
}

ImageGalleryItem.propTypes = {
    request: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    fetchOnSubmit: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onLoading: PropTypes.func.isRequired,
}