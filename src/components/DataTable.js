import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, TableFooter, Button } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

import { useState, useEffect } from "react";

import { CreateOne } from "./DataTableComps/CreateOne.js";
import { AdminActions } from "./DataTableComps/AdminActions.js";
import { ModalPer } from "./DataTableComps/ModalPer.js";

import ApiConnection from "../Server.js";

const DataTable = ({ route, headers }) => {
  const [rows, setRows] = useState();
  const [modalNew, setModalNew] = useState();
  const [modalPreText, setModalPretext] = useState();
  const [modalPre, setModalPre] = useState();
  const isAdmin = process.env.REACT_APP_ROL.trim() === "ADMIN";
  const server = new ApiConnection(route);

  useEffect(() => {
    server.getAllData().then((data) => {
      console.log(data);
      setRows(data);
    });
  }, [route]);

  function getHeadVal() {
    return Object.values(headers);
  }

  function getHeadKeys() {
    return Object.keys(headers);
  }

  const cellStyle = {
    fontFamily: "Roboto Mono",
    fontWeight: "700",
  };

  const cStyel = {
    fontFamily: "Roboto Mono",
  };

  const stickStyle = {
    position: "sticky",
    bottom: 0,
  };

  function Row(props) {
    const { row, headers, labels, isAdmin, route } = props;
    const [open, setOpen] = useState();
    const [isIcon, hideIcon] = useState(isAdmin);

    return (
      <>
        <TableRow>
          <TableCell>
            {isIcon ? (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            ) : (
              <></>
            )}
          </TableCell>

          <TableCell style={cStyel}>{row[headers[0]]}</TableCell>
          {headers.map((head, i) => {
            if (i !== 0) {
              if (
                new Date(row[head]) != "Invalid Date" &&
                typeof row[head] != "number"
              ) {
                return (
                  <TableCell style={cStyel} align="right">
                    {new Date(row[head]).toLocaleDateString()}
                  </TableCell>
                );
              }

              return (
                <TableCell style={cStyel} align="right">
                  {row[head]}
                </TableCell>
              );
            }

            return <></>;
          })}
        </TableRow>

        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {isAdmin ? (
            <AdminActions
              row={row}
              route={route}
              labels={labels}
              open={open}
              headers={headers}
              instance={server}
              setRows={setRows}
            />
          ) : (
            () => hideIcon(false)
          )}
        </TableCell>
      </>
    );
  }

  return (
    <>
      <TableContainer
        className="ml-16 mt-8 shadow-lg shadow-gray-700 "
        style={{ height: "550px", width: "90%", borderRadius: "20px" }}>
        <Table sx={{ overflow: "scroll" }} aria-label="simple table">
          <TableHead className="font-sans font-bold">
            <TableRow>
              <TableCell />
              <TableCell style={cellStyle}>{getHeadVal()[0]}</TableCell>
              {getHeadVal().map((header, i) => {
                if (i !== 0) {
                  return (
                    <TableCell style={cellStyle} align="right">
                      {header}
                    </TableCell>
                  );
                }
                return null;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows !== undefined ? (
              rows.map((row) => (
                <Row
                  row={row}
                  headers={getHeadKeys()}
                  labels={getHeadVal()}
                  isAdmin={isAdmin}
                />
              ))
            ) : (
              <></>
            )}
          </TableBody>

          {isAdmin && rows !== undefined ? (
            <>
              <TableFooter sx={stickStyle}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      sx={{
                        padding: "10px",
                        paddingLeft: "20px",
                        fontSize: "45px",
                        boxShadow: 3,
                        borderRadius: "20px",
                        backgroundColor: "blue",
                      }}
                      onClick={() => setModalNew(true)}
                    />

                    <CreateOne
                      row={rows[0]}
                      headers={getHeadKeys()}
                      instance={server}
                      labels={getHeadVal()}
                      setRows={setRows}
                      setModalPre={setModalPre}
                      setModalPretext={setModalPretext}
                      setModalNew={setModalNew}
                      modalNew={modalNew}
                    />

                    <ModalPer opn={modalPre} text={modalPreText} />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </>
          ) : (
            <></>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
