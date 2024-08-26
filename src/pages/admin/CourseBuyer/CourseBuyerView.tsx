import { convertToVND, formatDate } from "@/utils/utils";
import {
  Box,
  Button,
  Modal,
  Paper,
  Popover,
  Skeleton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import { RiQrCodeLine } from "react-icons/ri";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff5117",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
type Props = {
  order: any;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const CourseBuyerView = ({ order }: Props) => {
  console.log(order);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedRows, setPaginatedRows] = useState([]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (order) {
      setPaginatedRows(
        order.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [page, rowsPerPage, order]);
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
        <Typography variant='h5'>Danh sách người mua khóa học</Typography>
      </Stack>
      <Stack direction={"column"} justifyContent={"center"}>
        <>
          <TableContainer sx={{ mt: "30px" }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Tên</StyledTableCell>
                  <StyledTableCell>Ảnh</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Số tiền</StyledTableCell>
                  <StyledTableCell>Trạng thái</StyledTableCell>
                </TableRow>
              </TableHead>
              {order.length == 0 ? (
                <TableBody>
                  {Array.from({ length: 5 }, (value, index) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}>
                      <TableCell>
                        <Skeleton height={"35px"} width='150px' />
                      </TableCell>
                      <TableCell>
                        <Skeleton height={"25px"} width='200px' />
                      </TableCell>
                      <TableCell>
                        <Skeleton height={"25px"} width='200px' />
                      </TableCell>
                      <TableCell>
                        <Skeleton height={"25px"} width='200px' />
                      </TableCell>
                      <TableCell>
                        <Skeleton height={"25px"} width='200px' />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {paginatedRows &&
                    paginatedRows.length > 0 &&
                    paginatedRows.map((row: any) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}>
                          <TableCell component='th' scope='row'>
                            {row.courses_id[0].title}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            <img
                              src={row.courses_id[0].image.url}
                              alt=''
                              width={70}
                              height={70}
                              style={{
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {row.user_id[0].email}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {convertToVND(row.price)}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {row.status ? "Thành công" : "Thất bại"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={order.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      </Stack>
    </div>
  );
};

export default CourseBuyerView;
