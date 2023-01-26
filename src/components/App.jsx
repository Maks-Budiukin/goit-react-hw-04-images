import React from "react";

import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery.jsx";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem.jsx";
import { Button } from "./Button/Button";
import { ProgressBar } from "react-loader-spinner";
import { Modal } from "./Modal/Modal";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from "./App.module.css"




export class App extends Component {

  state = {
    request: '',
    page: 1,
    perPage: 12,
    images: [],
    totalHits: null,
    largeImage: null,
    isLoading: false,

  }

  onSearchSubmit = request => {
    if (request.trim() === "") {
      toast.info("What exactly do we search?")
      return;
    }
    this.setState(({ request, page: 1 }))
    
  }

  fetchOnSubmit = async (images, totalHits ) => {
    this.setState({ images, totalHits })
    if (totalHits === 0) {
      toast.info("No pics with this name!")
    }
  }

  fetchOnLoadMore =  () => {
    this.setState({page: this.state.page +1})
  }

  loadingHandler = (isLoading) => {
    this.setState({ isLoading })
  }

  getModalImage = (event) => {
    
     this.state.images.map(image => {
      image.webformatURL === event.target.src &&
      this.setState({largeImage: image.largeImageURL})
      }
    )
  }

  closeModal = () => {
    this.setState({largeImage: null})
  }

  render() {
    return (
      <div className={css.App}>

        <Searchbar onSubmit={this.onSearchSubmit} />

        <ImageGallery> 
          <ImageGalleryItem
            request={this.state.request}
            page={this.state.page}
            perPage={this.state.perPage}
            fetchOnSubmit={this.fetchOnSubmit}
            onClick={this.getModalImage}
            onLoading={this.loadingHandler} />
        </ImageGallery>

        {this.state.largeImage &&
          <Modal closeModal={this.closeModal} largeImage={this.state.largeImage} />}
         
        {this.state.isLoading && <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass={css.progressBar}
          borderColor = '#303f9f'
          barColor = '#3f51b5'
        />}
        
        {!this.state.isLoading && this.state.page * this.state.perPage < this.state.totalHits && <Button onClick={this.fetchOnLoadMore}/> }
        
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

}




