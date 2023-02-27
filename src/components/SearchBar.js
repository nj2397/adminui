import { React, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { theme } from "./customStyles.js";

const SearchBar = ({ classes, handleChangePage, list, setList, usersList }) => {
  const [searchQuery, setSearchQuery] = useState("");

  //** --- Keystroke Debouncing --- */

  const handleQueryChange = (event) => {
    handleChangePage(event, 1);
    let timer;

    timer = setTimeout(() => {
      setSearchQuery(event.target.value);
    }, 800);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  };

  //** --- Method to filter users list --- */

  const filterList = () => {
    let newArr = [];

    newArr = usersList.filter(
      (ele) =>
        ele.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ele.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ele.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setList(newArr);
    return;
  };

  //** ---To initiate search regarding any input query--- */
  const findQueries = () => {
    // If search field empty
    if (!searchQuery) {
      setList(usersList);
    }

    // To list out the searched users
    if (searchQuery && usersList.length) {
      setList([]);
      filterList();
      return;
    }
  };

  useEffect(() => {
    findQueries(); //To initiate the query method
  }, [searchQuery, list.length]);

  //** --- Render Method --- */

  return (
    <ThemeProvider theme={theme}>
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        onChange={handleQueryChange}
        placeholder="Search"
        className={classes.root}
      />
    </ThemeProvider>
  );
};

export default SearchBar;
