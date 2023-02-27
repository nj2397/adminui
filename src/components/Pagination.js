import { React, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

const Pagination = (props) => {
  const [buttons, setButtons] = useState([]);
  const { classes, count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 1);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(1, Math.ceil(count / rowsPerPage)));
  };

  const handlePageButtonsClick = (event, id) => {
    onPageChange(event, id);
  };

  const generatePages = () => {
    setButtons([]);
    let pages = [];
    for (let i = 1; i <= Math.ceil(count / 10); i++) {
      pages.push(
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          className={
            page === i ? classes.activePageButtons : classes.normalPageButtons
          }
          onClick={(e) => handlePageButtonsClick(e, i)}
        >
          {i}
        </Button>
      );
    }
    setButtons(pages);
  };

  useEffect(() => {
    generatePages();
  }, [count, page]);

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, marginTop: "1%", marginLeft: "40%" }}>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        className={classes.navButtons}
        onClick={handleFirstPageButtonClick}
        disabled={page === 1}
        aria-label="first page"
      >
        <KeyboardDoubleArrowLeftOutlinedIcon />
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        className={classes.navButtons}
        onClick={handleBackButtonClick}
        disabled={page === 1}
        aria-label="previous page"
      >
        <NavigateBeforeIcon />
      </Button>

      {buttons}

      <Button
        size="small"
        variant="outlined"
        color="secondary"
        className={classes.navButtons}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage)}
        aria-label="next page"
      >
        <NavigateNextIcon />
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        className={classes.navButtons}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage)}
        aria-label="last page"
      >
        <KeyboardDoubleArrowRightOutlinedIcon />
      </Button>
    </Box>
  );
};

Pagination.propTypes = {
  classes: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
