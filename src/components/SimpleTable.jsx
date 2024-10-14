import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const SimpleTable = ({ title, headers, data }) => {
  return (
    <TableContainer component={Paper}>
      <Typography sx={{ flex: "1 1 100%", color: "#029597" }} variant="h4">
        {title}
      </Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {headers?.map((h, index) => (
              <TableCell key={index}> {h} </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              {row?.map((e, index) => (
                <TableCell key={index} align="center">
                  {e}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
