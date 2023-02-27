import { React, useState, useRef } from "react";
import PropTypes from "prop-types";
import { IconButton, Stack, TableCell, TextField } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const User = (props) => {
  const {
    row,
    isCheck,
    selectDelete,
    usersList,
    setList,
    setUsersList
  } = props;

  const [editOn, setEditOn] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  //** --- Edit Row Method --- */
  const editRow = (row) => {
    usersList.find((ele) => {
      if (ele.id === row.id) {
        ele.name = nameRef.current.value;
        ele.email = emailRef.current.value;
        ele.role = roleRef.current.value;
      }
    });
    setList(usersList);
    setUsersList(usersList);
  };

  //** --- Render Method --- */
  return (
    <>
      <TableCell style={{ width: 160 }} align="left">
        {editOn ? (
          <TextField
            size="small"
            variant="outlined"
            type="text"
            name="name"
            inputRef={nameRef}
            defaultValue={row.name}
          />
        ) : (
          row.name
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="left">
        {editOn ? (
          <TextField
            size="small"
            variant="outlined"
            type="email"
            name="email"
            inputRef={emailRef}
            defaultValue={row.email}
          />
        ) : (
          row.email
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="left">
        {editOn ? (
          <TextField
            size="small"
            variant="outlined"
            type="text"
            name="role"
            inputRef={roleRef}
            defaultValue={row.role}
          />
        ) : (
          row.role
        )}
      </TableCell>

      <TableCell style={{ width: 50 }} align="left">
        <Stack direction="row" spacing={1}>
          <IconButton sx={{ marginLeft: -2 }}>
            {editOn ? (
              <SaveOutlinedIcon
                sx={{ fontSize: 19, cursor: "pointer" }}
                onClick={() => {
                  editRow(row);
                  setEditOn(!editOn);
                }}
              />
            ) : (
              <BorderColorOutlinedIcon
                sx={{ fontSize: 19, cursor: "pointer" }}
                onClick={() => setEditOn(!editOn)}
              />
            )}
          </IconButton>
          <IconButton>
            <DeleteForeverIcon
              sx={{ fontSize: 20, cursor: "pointer", color: "red" }}
              onClick={(e) => {
                isCheck.push(row.id);
                selectDelete(e, isCheck);
              }}
            />
          </IconButton>
        </Stack>
      </TableCell>
    </>
  );
};

User.propTypes = {
  row: PropTypes.func.isRequired,
  isCheck: PropTypes.array.isRequired,
  selectDelete: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired,
  usersList: PropTypes.array.isRequired,
  setUsersList: PropTypes.func.isRequired
};

export default User;
