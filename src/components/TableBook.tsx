import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./AuthProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const TableBook = () => {
  const [books, setBooks] = useState<
    {
      title: string;
      subject: string;
      author: string;
      publisher: string;
      status: string;
    }[]
  >([]);
  function createData(
    title: string,
    subject: string,
    author: string,
    publisher: string,
    status: string
  ) {
    return { title, subject, author, publisher, status };
  }

  const handleDataBook = useCallback((data: any[]) => {
    return data.map((item) => {
      return createData(
        item.Sach.title,
        item.Sach.Mon.title,
        item.Sach.NhaXuatBan.title,
        item.Sach.author,
        item.status
      );
    });
  }, []);
  const fetchBook = useCallback(async () => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const url =
      user?.user?.role === "USER" ? "book-index-user" : "book-index-admin";
    const data = await axios.get(`http://localhost:4001/qltv/api/v1/${url}`, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });

    setBooks(handleDataBook(data.data.books));
  }, [handleDataBook]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên sách</StyledTableCell>
            <StyledTableCell align="right">Môn</StyledTableCell>
            <StyledTableCell align="right">Nhà xuất bản</StyledTableCell>
            <StyledTableCell align="right">Tác giả</StyledTableCell>
            <StyledTableCell align="right">Tình trạng</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{row.subject}</StyledTableCell>
              <StyledTableCell align="right">{row.author}</StyledTableCell>
              <StyledTableCell align="right">{row.publisher}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
