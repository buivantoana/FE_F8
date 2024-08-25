import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  TablePagination,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ff5117",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
type typeProps = {
  data: typeCategories[];
  register: any;
  handleSubmit: any;
  onFinish: any;
  errors: any;
  handleOpenModal: any;
  handleCloseModal: any;
  openModal: boolean;
  onSubmit: any;
  handleDelete: any;
  handleClick: any;
  handleClose: any;
  id: any;
  anchorEl: any;
  open: any;
  action: string;
  deleteCategory: any;
  vouchers: any;
  user: any;
  valueUser: any;
  setValueUser: any;
  valueVouchers: any;
  setValueVouchers: any;
  setSelect: any;
  select: any;
  checkUpdate: any;
};
const UserVouchersView = ({
  data,
  register,
  handleSubmit,
  errors,
  onFinish,
  handleCloseModal,
  handleOpenModal,
  openModal,
  onSubmit,
  handleDelete,
  handleClick,
  handleClose,
  id,
  anchorEl,
  open,
  action,
  deleteCategory,
  vouchers,
  user,
  valueUser,
  setValueUser,
  valueVouchers,
  setValueVouchers,
  select,
  setSelect,
  checkUpdate
}: typeProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedRows, setPaginatedRows]: any = useState([]);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (data) {
      setPaginatedRows(
        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [page, rowsPerPage, data]);
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">Tặng phiếu quà tặng</Typography>
        <Button onClick={() => handleOpenModal("CREATE")} variant="contained">
          Thêm Tặng phiếu quà tặng
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Email</StyledTableCell>

              <StyledTableCell>Mã </StyledTableCell>
              <StyledTableCell>Trạng thái</StyledTableCell>
              <StyledTableCell>Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          {data.length == 0 ? (
            <TableBody>
              {Array.from({ length: 5 }, (value, index) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <Skeleton height={"35px"} width="150px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={"25px"} width="200px" />
                  </TableCell>

                  <TableCell>
                    <Skeleton height={"25px"} width="80px" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {paginatedRows &&
                paginatedRows.length &&
                paginatedRows.map((row: any) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.user_id[0].email}</TableCell>
                    <TableCell align="left">
                      {row.vouchers_id[0].code}
                    </TableCell>
                    <TableCell align="left">
                      {row.status ? "Đã dùng" : "Chưa dùng"}
                    </TableCell>

                    <TableCell align="left">
                      <Button onClick={() => handleOpenModal("UPDATE", row)}>
                        Sửa
                      </Button>
                      <Button
                        aria-describedby={id}
                        onClick={(e) => handleClick(e, row)}
                        sx={{ color: "red" }}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box padding={"10px"}>
          <Typography>Bạn có muốn xóa không?</Typography>
          <Stack direction={"row"} mt={"15px"} justifyContent={"end"}>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              onClick={() => handleDelete(deleteCategory)}
              sx={{ color: "red" }}
            >
              Xóa
            </Button>
          </Stack>
        </Box>
      </Popover>
      <ModalForm
        open={openModal}
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
        errors={errors}
        handleClose={handleCloseModal}
        onSubmit={onSubmit}
        action={action}
        user={user}
        vouchers={vouchers}
        valueUser={valueUser}
        setValueUser={setValueUser}
        valueVouchers={valueVouchers}
        setValueVouchers={setValueVouchers}
        setSelect={setSelect}
        select={select}
        checkUpdate={checkUpdate}
      />
    </>
  );
};

export default UserVouchersView;
const ModalForm = (props: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" textAlign={"center"}>
          {props.action == "CREATE"
            ? "Tạo phiếu quà tặng"
            : "Sửa phiếu quà tặng"}
        </Typography>
        <form onSubmit={props.handleSubmit(props.onFinish)}>
          <Stack
            width={"100%"}
            mt={"20px"}
            gap={"15px"}
            direction={"row"}
            flexWrap={"wrap"}
          >
            {props.checkUpdate?<>
              <Box width={"100%"}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Mã giảm giá</InputLabel>
                <Select
                  {...props.register("vouchers_id")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Mã giảm giá"
                  value={props.valueVouchers}
                  onChange={(e) => props.setValueVouchers(e.target.value)}
                >
                  {props.vouchers.map((item: any) => {
                    return <MenuItem value={item._id}>{item.code}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Box>
            </>:
            <>
            <Box width={"100%"}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Mã giảm giá</InputLabel>
                <Select
                  {...props.register("vouchers_id")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Mã giảm giá"
                  value={props.valueVouchers}
                  onChange={(e) => props.setValueVouchers(e.target.value)}
                >
                  {props.vouchers.map((item: any) => {
                    return <MenuItem value={item._id}>{item.code}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Box>
            {props.valueVouchers !== "" && (
              <Box width={"100%"}>
                <FormControl fullWidth size="small">
                  <RadioGroup
                    value={props.select}
                    onChange={(e) => props.setSelect(e.target.value)}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="Tặng cho tất cả"
                    />
                    <FormControlLabel
                      value="one"
                      control={<Radio />}
                      label="Tặng từng người"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}
            {props.select == "one" && (
              <Box width={"100%"}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Người dùng
                  </InputLabel>
                  <Select
                    {...props.register("user_id")}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Người dùng"
                    value={props.valueUser}
                    onChange={(e) => props.setValueUser(e.target.value)}
                  >
                    {props.user.map((item: any) => {
                      return <MenuItem value={item._id}>{item.email}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Box>
            )}
            
            </>}
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"end"}
              gap={"10px"}
            >
              <Button
                onClick={props.handleClose}
                sx={{
                  color: "black",
                  borderRadius: "99px",
                  width: "82px",
                  height: "34px",
                  border: "1px solid #333",
                }}
              >
                Đóng
              </Button>
              <Button
                onClick={props.onSubmit}
                type="submit"
                sx={{
                  background:
                    "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                  color: "white",
                  borderRadius: "99px",
                  width: "92px",
                  height: "34px",
                }}
              >
                Thêm
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
