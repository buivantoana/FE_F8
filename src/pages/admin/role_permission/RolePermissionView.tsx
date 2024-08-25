import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Popover,
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
  data: typeRole[];
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
  deleteRole: any;
  role: typeRole[];
  permission: typePermission[];
  setValueRole: any;
  valueRole: any;
  handleChange: any;
  personName: any;
};
const RolePermissionView = ({
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
  deleteRole,
  role,
  permission,
  valueRole,
  setValueRole,
  handleChange,
  personName,
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
        <Typography variant="h5">Quyền của vai trò</Typography>
        <Button onClick={() => handleOpenModal("CREATE")} variant="contained">
          Thêm quyền của vai trò
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Vai trò</StyledTableCell>
              <StyledTableCell>Chức năng</StyledTableCell>
              <StyledTableCell align="left">Hành động</StyledTableCell>
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
                    <Skeleton height={"25px"} width="200px" />
                  </TableCell>
                 
                  
                </TableRow>
              ))}
            </TableBody>
          ) :
          <TableBody>
            {data &&
              data.length &&
              data.map((row: any) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.role_id[0].name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: "flex", gap: "10px",flexWrap:"wrap",width:"60%" }}>
                      {row.permission.map((i: any) => {
                        return (
                          <Button
                            sx={{
                              height: "30px",
                              color: "green",
                              border: "1px solid green",
                              borderRadius: "20px",
                              fontSize: "13px",
                            }}
                          >
                            {i.name}
                          </Button>
                        );
                      })}
                    </Box>
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
          </TableBody>}
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
              onClick={() => handleDelete(deleteRole)}
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
        role={role}
        permission={permission}
        setValueRole={setValueRole}
        valueRole={valueRole}
        handleChange={handleChange}
        personName={personName}
      />
    </>
  );
};

export default RolePermissionView;
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
            ? "Thêm quyền của vai trò"
            : "Sửa quyền của vai trò"}
        </Typography>
        <form onSubmit={props.handleSubmit(props.onFinish)}>
          {props.role && props.role[0] ? (
            <Stack
              width={"100%"}
              mt={"20px"}
              gap={"15px"}
              direction={"row"}
              flexWrap={"wrap"}
            >
              <FormControl
                disabled={props.action == "CREATE" ? false : true}
                fullWidth
                size="small"
              >
                <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>

                <Select
                  {...props.register("role_id")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.valueRole}
                  label="Role"
                  onChange={(e) => props.setValueRole(e.target.value)}
                >
                  {props.role &&
                    props.role.length &&
                    props.role.map((item: any) => {
                      return <MenuItem value={item._id}>{item.name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
              <FormControl sx={{ mt: "10px", width: "100%" }} size="small">
                <InputLabel id="demo-multiple-name-label">Chức năng</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={props.personName}
                  onChange={props.handleChange}
                  input={<OutlinedInput label="Name" />}
                >
                  {props.permission &&
                    props.permission.map((name: any) => (
                      <MenuItem value={name._id}>{name.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>

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
          ) : (
            <>
              <Typography mt={"20px"} textAlign={"center"}>
                Bạn đã thêm hết{" "}
              </Typography>

              <Box
                mt={"30px"}
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
              </Box>
            </>
          )}
        </form>
      </Box>
    </Modal>
  );
};
