import React from "react";
import { Component } from "react";
import PropTypes from 'prop-types';
import css from "components/ImageGalleryItem/ImageGalleryItem.module.css"
import { API } from "components/API/API";
import { toast } from 'react-toastify';



export class ImageGalleryItem extends Component {
    state = {
        images: [],
        error: "",

    }

    async componentDidUpdate(pP) {
        if (pP.request !== this.props.request || pP.page !== this.props.page) {
        this.props.onLoading(true);
          await API(this.props.request, this.props.page, this.props.perPage)
    .then((pics) => {
          this.setState({ images: pics.hits, totalHits: pics.totalHits });
          this.props.fetchOnSubmit(pics.hits, pics.totalHits)
    })
    .catch((error) => {
      this.setState({error});
      toast.error("Something's wrong :( Try to reload the page!")
    })
    .finally(() => {
        this.props.onLoading(false);
        
    })    
    }    
    }

    render() {
      return (<>
            
            {this.state.images.map((image) =>
          <li className={css.ImageGalleryItem} key={image.id} >
          <img className={css.ImageGalleryItemImage} src={image.webformatURL} alt="" onClick={this.props.onClick} />
            </li>)}
            
            </>)
    }
}

ImageGalleryItem.propTypes = {
    request: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    fetchOnSubmit: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onLoading: PropTypes.func.isRequired,
}