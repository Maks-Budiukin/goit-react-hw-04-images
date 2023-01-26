import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
import css from "components/Searchbar/Searchbar.module.css"

import { BiSearch } from "react-icons/bi";
import styled from "styled-components";

const SearchIcon = styled(BiSearch)`
width: 80%;
height: 80%;
fill: blue;
`

export const Searchbar = ({onSubmit}) => {
  const [request, setRequest] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
      onSubmit(request)
      setRequest("")
  }

  return (
    <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
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
              value={request}
              onChange={(event) => setRequest(event.target.value)}
            />
      
        </form>
      </header>
    </>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}