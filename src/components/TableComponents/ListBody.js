import PropTypes from "prop-types";
import { Checkbox, TableRow, TableCell } from "@mui/material";
import User from "./UserBody.js";

//** ----Table Body for Users List----- */

const ListBody = (props) => {
  const {
    rowsPerPage,
    page,
    list,
    setList,
    usersList,
    setUsersList,
    isCheck,
    handleIsChecked,
    classes,
    selectDelete
  } = props;

  return (rowsPerPage > 0
    ? list.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      )
    : list
  ).map((row) => (
    <TableRow
      hover
      key={row.id}
      className={isCheck.includes(row.id) && classes.row}
    >
      <TableCell style={{ width: 100 }} align="justify">
        <Checkbox
          type="checkbox"
          id={row.id}
          color="default"
          checked={isCheck.includes(row.id)}
          onChange={handleIsChecked}
        />
      </TableCell>

      <User
        row={row}
        isCheck={isCheck}
        selectDelete={selectDelete}
        setList={setList}
        usersList={usersList}
        setUsersList={setUsersList}
      />
    </TableRow>
  ));
};

ListBody.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  setList: PropTypes.func.isRequired,
  usersList: PropTypes.array.isRequired,
  setUsersList: PropTypes.func.isRequired,
  handleIsChecked: PropTypes.func.isRequired,
  classes: PropTypes.func.isRequired,
  selectDelete: PropTypes.func.isRequired
};

export default ListBody;
