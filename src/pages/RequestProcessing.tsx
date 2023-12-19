import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import axios from "axios";
import dateFormat from "dateformat";
import { EnhancedTableHead } from "../components/EnhancedTableHead";
import { EnhancedTableToolbar } from "../components/EnhancedTableToolbar";
import {
  RequestModal,
  useRequestModal,
} from "../components/request/RequestModal";
import { useAppContext } from "../components/AppProvider";

interface Data {
  id: string;
  quantity: number;
  type: string;
  request_date: string;
  title: string;
}

function createData(
  id: string,
  title: string,
  quantity: number,
  request_date: string,
  type: string
): Data {
  return {
    id,
    title,
    quantity,
    request_date,
    type,
  };
}

export const RequestProcessing = () => {
  const { open, handleToggle } = useRequestModal();

  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const [rows, setRows] = React.useState<Data[]>([]);
  const { setDataUpdate, dataUpdate } = useAppContext();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataUpdate?.map((n) => n.id);
      setSelected(newSelected || []);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const onApprove = async () => {
    const requestDetail = dataUpdate?.filter((item) =>
      selected.includes(item.id)
    );
    const books = requestDetail
      ?.map((item: any) => {
        return item.NhanBanSach.map((book: any) => {
          if (item.PhieuYeuCau?.type === "BORROW") {
            return {
              ...book,
              status: "BORROWED",
            };
          }
          if (item.PhieuYeuCau?.type === "RETURN") {
            return {
              ...book,
              status: "AVAILABLE",
            };
          }
          if (item.PhieuYeuCau?.type === "PAY") {
            return {
              ...book,
              status: "LOST",
            };
          }
        });
      })
      .flatMap((item) => item);

    await axios
      .patch(
        "http://localhost:4001/qltv/api/v1//accept-update",
        {
          books,
          requestDetail,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      )
      .then((res) => {
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const handleRequest = (data: any[]) => {
    return data.map((item) => {
      return createData(
        item.id,
        item.title,
        item.quantity,
        dateFormat(item.PhieuYeuCau?.request_date, "fullDate"),
        item.PhieuYeuCau?.type
      );
    });
  };

  const onCreateRequest = () => {
    handleToggle();
  };

  const fetchData = React.useCallback(async () => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const url =
      user?.user?.role === "SUPER_ADMIN"
        ? "request-index-admin"
        : "request-index-user";
    const data = await axios.get(`http://localhost:4001/qltv/api/v1/${url}`, {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
      params: { id: user?.user?.id },
    });

    setDataUpdate?.(data.data.results);
  }, [setDataUpdate]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData, dataUpdate?.length]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={dataUpdate?.length as number}
              />
              <TableBody>
                {handleRequest(dataUpdate ?? [])?.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.request_date}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {user?.user?.role === "SUPER_ADMIN" ? (
          <Button variant="contained" onClick={onApprove}>
            <Typography>Xử lí</Typography>
          </Button>
        ) : (
          <Button variant="contained" onClick={onCreateRequest}>
            <Typography>Tạo đơn</Typography>
          </Button>
        )}
      </Box>
      <RequestModal open={open} handleToggle={handleToggle} />
    </>
  );
};
