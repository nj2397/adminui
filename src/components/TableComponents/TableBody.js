import { React, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { useStyles } from "../customStyles.js";
import ListBody from "./ListBody.js";
import SearchBar from "../SearchBar.js";
import Pagination from "../Pagination.js";

const TheTable = ({
  columns,
  page,
  list,
  setList,
  usersList,
  setUsersList,
  rowsPerPage,
  setRowsPerPage,
  handleChangePage,
  handleIsChecked,
  handleIsCheckedAll,
  isCheck,
  selectAll,
  setSelectAll,
  selectDelete
}) => {
  const classes = useStyles();

  //** --- To calculate the number of empty rows of a page --- */

  const emptyRowsPerPage =
    page > 1 ? Math.max(0, page * rowsPerPage - list.length) : 0;

  //** --- UseEffects --- */

  // this useEffect used specifically for event triggers //

  useEffect((event) => {
    //** To switch to previous page of all rows are deleted at last page */
    if (
      rowsPerPage === emptyRowsPerPage &&
      page > Math.ceil(list.length / rowsPerPage)
    ) {
      handleChangePage(event, page - 1);
    }
  });

  //** To monitor and update rowsPerPage state */

  useEffect(() => {
    setSelectAll(isCheck.length === rowsPerPage - emptyRowsPerPage);
    if (list.length < rowsPerPage) {
      setRowsPerPage(list.length);
      return;
    }
    if (!list.length) {
      setSelectAll(false);
      return;
    }
    if (list.length > rowsPerPage) {
      setRowsPerPage(10);
      return;
    }
  }, [isCheck, selectAll, list.length]);

  //** ---Render Method --- */

  return (
    <Container maxWidth="lg">
      {/* --- SearchBar Component --- */}
      <SearchBar
        classes={classes}
        list={list}
        setList={setList}
        usersList={usersList}
        handleChangePage={handleChangePage}
      />

      {/* --- Body Implementation --- */}

      {list.length > 0 ? ( //conditional body
        <>
          <TableContainer>
            <Table sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {/* ---Checkbox Component---  */}
                    <Checkbox
                      type="checkbox"
                      sx={{
                        color: pink[700],
                        "&.Mui-checked": {
                          color: pink[600]
                        }
                      }}
                      checked={selectAll}
                      onChange={handleIsCheckedAll}
                    />
                  </TableCell>

                  {/* ---Mapping up the Header Titles (Name, Email, ...)--- */}

                  {columns.map((row) => (
                    <TableCell
                      key={row.field}
                      style={{ width: 160 }}
                      align="justify"
                    >
                      <strong>{row.headerName}</strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {/* ---Listing out users in row--- */}

                <ListBody
                  rowsPerPage={rowsPerPage}
                  page={page}
                  list={list}
                  setList={setList}
                  usersList={usersList}
                  setUsersList={setUsersList}
                  isCheck={isCheck}
                  handleIsChecked={handleIsChecked}
                  classes={classes}
                  selectDelete={selectDelete}
                />

                {/* --- To calculate empty rows ---*/}

                {emptyRowsPerPage > 0 && ( //<-- 0
                  <TableRow style={{ height: 75 * emptyRowsPerPage }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}

                {/* ---------------------------- */}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ---Delete Selected Button--- */}

          <Button
            variant="contained"
            className={classes.button}
            onClick={(e) => {
              selectDelete(e, isCheck);
            }}
          >
            Delete Selected
          </Button>

          {/* ---Pagination--- */}

          <Pagination
            classes={classes}
            count={list.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
          />
        </>
      ) : (
        // To display "No Users Found" in case of No Match
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%"
          }}
          my={5}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="subtitle1" my={3}>
              No users found
            </Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
};

TheTable.propTypes = {
  columns: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  setList: PropTypes.func.isRequired,
  usersList: PropTypes.array.isRequired,
  setUsersList: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleIsChecked: PropTypes.func.isRequired,
  handleIsCheckedAll: PropTypes.func.isRequired,
  isCheck: PropTypes.array.isRequired,
  selectAll: PropTypes.array.isRequired,
  setSelectAll: PropTypes.func.isRequired,
  selectDelete: PropTypes.func.isRequired
};

export default TheTable;
