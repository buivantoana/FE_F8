import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Popover,
  Select,
  SelectChangeEvent,
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
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from "react";
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
  data: typeLesson[];
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
  courses: typeCourses[];
  deleteLesson: any;
  valueCourses: any;
  setValueCourses: any;
  toggleDrawer: any;
  openDrawer: any;
  arrange: any;
  handleArrange: any;
};
const LessonView = ({
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
  deleteLesson,
  valueCourses,
  setValueCourses,
  courses,
  toggleDrawer,
  openDrawer,
  arrange,
  handleArrange,
}: typeProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedRows, setPaginatedRows]: any = useState([]);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (courses) {
      setPaginatedRows(
        courses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [page, rowsPerPage, courses]);
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
      <Drawer
        anchor={"right"}
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
        <Box width={"500px"} padding={"40px"}>
          <Typography fontSize={"25px"}>Sắp xếp thứ tự bài học</Typography>
          <Typography fontSize={"14px"} color={"#333"}>
            Chọn select để sắp xếp thứ tự sắp xếp được hiển thị bên dưói select
          </Typography>
          <MultipleSelect handleArrange={handleArrange} arrange={arrange} />
        </Box>
      </Drawer>
      <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5">Chương</Typography>
        <Button onClick={() => handleOpenModal("CREATE")} variant="contained">
          Thêm Chương
        </Button>
      </Stack>
      {courses.length == 0 ? (
        <Box display={"flex"} flexDirection={"column"} gap={"5px"} >
          {Array.from({ length: 5 }, (value, index) => (
            <Skeleton sx={{borderRadius:"5px"}} variant="rectangular" height={"50px"} width="100%" />
          ))}
        </Box>
      ) : (
        <>
          {paginatedRows &&
            paginatedRows.length &&
            paginatedRows.map((item_courses: any) => {
              return (
                <Accordion
                  expanded={expanded === item_courses._id}
                  onChange={handleChange(item_courses._id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      {item_courses.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item_courses.lesson.length > 1 && (
                      <Button
                        onClick={() => toggleDrawer(true, item_courses.lesson)}
                        sx={{ height: "40px", float: "right" }}
                      >
                        Sắp sếp lại bài học
                      </Button>
                    )}
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="left">
                              Tên
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Mô tả
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Thời gian
                            </StyledTableCell>

                            <StyledTableCell align="left">
                              Hành động
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {item_courses.lesson[0] ? (
                            <>
                              {item_courses.lesson &&
                                item_courses.lesson.length &&
                                item_courses.lesson.map((row: any) => {
                                  return (
                                    <TableRow
                                      key={row.title}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell align="left">
                                        {row.title}
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {row.description}
                                      </TableCell>

                                      <TableCell align="left">
                                        {row.duration}
                                      </TableCell>

                                      <TableCell align="left">
                                        <Button
                                          onClick={() =>
                                            handleOpenModal("UPDATE", row)
                                          }
                                        >
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
                                  );
                                })}
                            </>
                          ) : (
                            <TableRow>
                              {" "}
                              <TableCell>Không có dữ liệu</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={courses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Duration</TableCell>

              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length &&
              data.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>

                  <TableCell align="left">{row.duration}</TableCell>

                  <TableCell align="left">
                    <Button onClick={() => handleOpenModal("UPDATE", row)}>
                      Edit
                    </Button>
                    <Button
                      aria-describedby={id}
                      onClick={(e) => handleClick(e, row)}
                      sx={{ color: "red" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}
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
              onClick={() => handleDelete(deleteLesson)}
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
        valueCourses={valueCourses}
        setValueCourses={setValueCourses}
        courses={courses}
      />
    </>
  );
};

export default LessonView;
const ModalForm = (props: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
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
          {props.action == "CREATE" ? "Thêm chương" : "Sửa chương"}
        </Typography>
        <form onSubmit={props.handleSubmit(props.onFinish)}>
          <Stack
            width={"100%"}
            mt={"20px"}
            gap={"15px"}
            direction={"row"}
            flexWrap={"wrap"}
          >
            <Box width={"48%"}>
              <TextField
                {...props.register("title")}
                fullWidth
                id="outlined-basic"
                label="Tên"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"48%"}>
              <TextField
                {...props.register("duration")}
                type="number"
                fullWidth
                id="outlined-basic"
                label="Thời gian"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"98%"}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Khóa học</InputLabel>
                <Select
                  {...props.register("courses_id")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.valueCourses}
                  label="Khóa học"
                  onChange={(e) => props.setValueCourses(e.target.value)}
                >
                  {props.courses &&
                    props.courses.length &&
                    props.courses.map((item: any) => {
                      return <MenuItem value={item._id}>{item.title}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Box>
            <Box width={"98%"}>
              <TextField
                {...props.register("description")}
                id="outlined-multiline-static"
                label="Mô tả"
                multiline
                rows={9.5}
                fullWidth
              />
            </Box>

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

function MultipleSelect({ arrange, handleArrange }: any) {
  const [personName, setPersonName]: any = React.useState([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const sortedData = personName.map((id: any) => {
    return arrange.find((item: any) => item._id === id);
  });

  return (
    <div>
      <FormControl sx={{ mt: "30px", width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">Select</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
        >
          {arrange.map((name: any) => (
            <MenuItem value={name._id}>{name.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography my={"20px"} fontSize={"14px"} color={"#333"}>
        Thư tự bài học hiển thị
      </Typography>
      {sortedData &&
        sortedData.map((item: any, index: number) => {
          return (
            <Paper
              sx={{ width: "100%", padding: "10px", mt: "10px" }}
              elevation={3}
            >
              <Box display={"flex"} gap={"10px"}>
                <Typography>Bài {index + 1}</Typography> :{" "}
                <Typography>{item.title}</Typography>
              </Box>
            </Paper>
          );
        })}

      <Button
        disabled={sortedData.length == arrange.length ? false : true}
        onClick={() => handleArrange(sortedData)}
        sx={{
          background: "linear-gradient(to right bottom, #ff8f26, #ff5117)",
          color: "white",
          borderRadius: "10px",
          width: "92px",
          height: "34px",
          mt: "30px",
          opacity: sortedData.length == arrange.length ? 1 : 0.5,
        }}
      >
        Submit
      </Button>
    </div>
  );
}
