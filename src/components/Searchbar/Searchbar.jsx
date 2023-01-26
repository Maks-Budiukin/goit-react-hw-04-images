import React from "react";
import { Component } from "react";
import PropTypes from 'prop-types';
import css from "components/Searchbar/Searchbar.module.css"

import { BiSearch } from "react-icons/bi";
import styled from "styled-components";

const SearchIcon = styled(BiSearch)`
width: 80%;
height: 80%;
fill: blue;
`

export class Searchbar extends Component {
    state = {
    request: '',
  }

onInputChange = (event) => {

this.setState({
  [event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
      this.props.onSubmit(this.state.request)
      this.setState({
          request: '',
      })
}

render() {
  return (
    <>
    <header className={css.Searchbar}>
<form className={css.SearchForm} onSubmit={this.handleSubmit}>
  <button type="submit" className={css.SearchFormButton}>
            <SearchIcon/>
  </button>

          
            <input
    className={css.SearchFormInput}
    name="request"
    type="text"
    autoComplete="off"
    autoFocus
    placeholder="Search images and photos"
    value={this.state.request}
    onChange={this.onInputChange}
  />
    
  </form>
        </header>
        </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}