import React from "react";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import css from "components/Modal/Modal.module.css"

export const Modal = ({ closeModal, largeImage }) => {
    const handleESC = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }
        useEffect(() => {
            window.addEventListener('keydown', handleESC)
            return () => {window.removeEventListener('keydown', handleESC)}
        }, []);
        
        return (<div className={css.Overlay} onClick={handleBackdropClick}>
            <div className={css.Modal}>
                <img src={largeImage} alt="" />
            </div>
        </div>)
    }

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
}