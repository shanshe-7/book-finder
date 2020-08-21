import React, { useState, useEffect } from "react";
import UseInputState from "../helpers/UseInputState";
import Books from "./books";
import axios from "axios";
import { Typography, CircularProgress } from "@material-ui/core";
import classes from "./searchField.module.scss";

const SearchField = () => {
  const [value, handleChange, reset] = UseInputState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [displayValue, setDisplayValue] = useState("Start Searching");

  useEffect(() => {
    if (value) {
      value.replace(/\s/g, "+");
      async function getData() {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${value}`
        );
        let newArr;
        if (response.data.items) {
          newArr = response.data.items.map((item) => item.volumeInfo);
          setBooksData(newArr);
          setLoading(false);
        } else {
          setDisplayValue("Results not found. try another variant");
          setLoading(false);
        }
      }
      getData();
    }
  }, [count]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (value) {
      setLoading(true);
      setCount((count) => count + 1);
      setDisplayValue("");
    }
    console.log(count);
  };

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (value) {
        setLoading(true);
        setCount((count) => count + 1);
        setDisplayValue("");
      }
    }
  };

  const handleXButtonClick = (e) => {
    e.preventDefault();
    reset();
    setBooksData([]);
    setDisplayValue("Start Searching");
    setCount(0);
  };

  const handleFocus = (e) => {
    e.target.placeholder = "";
  };

  const handleBlur = (e) => {
    e.target.placeholder = "Type - Author, Title, Subject...";
  };

  let XButton = (
    <Typography style={{ color: "white" }} onClick={handleXButtonClick}>
      X
    </Typography>
  );
  if (value) {
    XButton = (
      <Typography style={{ cursor: "pointer" }} onClick={handleXButtonClick}>
        <span style={{ fontSize: "1em" }}>X</span>
      </Typography>
    );
  }

  let display;

  if (displayValue) {
    display = (
      <Typography
        style={{ color: "#00f8fb", fontSize: "1.2em", marginBottom: "1em" }}
      >
        {displayValue}
      </Typography>
    );
  } else if (loading) {
    display = (
      <>
        <Typography
          style={{ color: "#00f8fb", fontSize: "1.3em", marginBottom: "1em" }}
        >
          Loading...
        </Typography>
        <CircularProgress style={{ color: "#00f8fb" }} />
      </>
    );
  } else {
    display = <Books booksData={booksData} />;
  }

  return (
    <>
      <div className={classes.search}>
        <Typography>
          <span className={classes.capitalText}>Find your book</span>
        </Typography>

        <form className={classes.form} onKeyDown={handleEnterPress}>
          <Typography>
            <input
              className={classes.input}
              onChange={handleChange}
              value={value}
              type='text'
              placeholder='Type - Author, Title, Subject...'
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete='off'
            />
            <button disabled className={classes.xButton}>
              {XButton}
            </button>
            <button className={classes.button} onClick={handleSearchClick}>
              search
            </button>
          </Typography>
        </form>
      </div>
      {display}
    </>
  );
};

export default SearchField;
