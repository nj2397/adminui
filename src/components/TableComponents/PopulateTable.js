import { React, useState, useEffect } from "react";
import { fetchList } from "../FetchList.js";
import TheTable from "./TableBody.js";
import { Container } from "@mui/material";

const PopulateTable = () => {
  const [usersList, setUsersList] = useState([]); // for generating all users
  const [list, setList] = useState(usersList); // for maintaining desired users
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  //** --- Table Header Fields --- */
  const columns = [
    { field: "name", headerName: "Name", width: "200" },
    { field: "email", headerName: "Email", width: "200" },
    { field: "role", headerName: "Role", width: "200" },
    { field: "actions", headerName: "Actions", width: "200" }
  ];

  //** --- Page Switch method --- */

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelectAll(false);
    setIsCheck([]);
  };

  //** --- Checkbox Select Methods--- */

  const handleIsCheckedAll = (event) => {
    setSelectAll(!selectAll);
    if (list.length) {
      setIsCheck(
        list
          .slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage
          )
          .map((item) => item.id)
      );
    }
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleIsChecked = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setIsCheck([...isCheck, id]);
    } else {
      if (selectAll) setSelectAll(false);
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  //** --- Delete Method --- */

  const selectDelete = (event, isCheck) => {
    if (!isCheck) return;

    let newList = [];
    newList = usersList.filter((ele) => !isCheck.includes(ele.id));

    setList(newList);
    setUsersList(newList);

    if (page === 1) handleChangePage(event, 1);
  };

  //** --- Fetch Users Method --- */

  const fetchMethod = async () => {
    setUsersList(await fetchList());
  };

  useEffect(() => {
    fetchMethod();
  }, []);

  //** ---Render Method --- */
  return (
    <Container className="App">
      {usersList.length > 0 ? (
        <TheTable
          columns={columns}
          page={page}
          list={list}
          setList={setList}
          usersList={usersList}
          setUsersList={setUsersList}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          handleChangePage={handleChangePage}
          handleIsChecked={handleIsChecked}
          handleIsCheckedAll={handleIsCheckedAll}
          isCheck={isCheck}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
          selectDelete={selectDelete}
        />
      ) : (
        <Container>No Users Found</Container>
      )}{" "}
    </Container>
  );
};

export default PopulateTable;
