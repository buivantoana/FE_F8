import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
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

import { RiUploadCloudFill } from "react-icons/ri";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { limitDescription } from "@/utils/utils";
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
  data: typeCourses[];
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
  setFile: any;
  action: string;
  category: typeCategories[];
  deleteCourses: any;
  valueCategory: any;
  setImageUrl: any;
  imageUrl: any;
  setValueCategory: any;
  setTextResultCourses: any;
  textResultCourses: any;
  handleResultCourses: any;
  resultCourses: any;
  handleDeleteResultCourses: any;
  handleEditResultCourses: any;
  resultCoursesEdit: any;
  setTextCoursesRequirements: any;
  textCoursesRequirements: any;
  handleCoursesRequirements: any;
  coursesRequirements: any;
  handleDeleteCoursesRequirements: any;
  handleEditCoursesRequirements: any;
  CoursesRequirementsEdit: any;
};

const CoursesView = ({
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
  setFile,
  category,
  deleteCourses,
  valueCategory,
  setImageUrl,
  imageUrl,
  setValueCategory,
  textResultCourses,
  setTextResultCourses,
  handleResultCourses,
  resultCourses,
  handleDeleteResultCourses,
  handleEditResultCourses,
  resultCoursesEdit,
  setTextCoursesRequirements,
  textCoursesRequirements,
  handleCoursesRequirements,
  coursesRequirements,
  handleDeleteCoursesRequirements,
  handleEditCoursesRequirements,
  CoursesRequirementsEdit,
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
        <Typography variant="h5">Courses</Typography>
        <Button onClick={() => handleOpenModal("CREATE")} variant="contained">
          Add Courses
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {data && data[0] ? (
            <TableBody>
              <>
                {paginatedRows &&
                  paginatedRows.length &&
                  paginatedRows.map((row: any) => (
                    <TableRow
                      key={row.title}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell component="th" scope="row">
                        <img
                          src={row.image.url}
                          width={50}
                          height={50}
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="left">
                        {row.category_id.length && row.category_id[0].name}
                      </TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
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
              </>
            </TableBody>
          ) : (
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
                    <Skeleton height={"35px"} width="150px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={"35px"} width="150px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={"25px"} width="200px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={"25px"} width="300px" />
                  </TableCell>
                  <TableCell>
                    <Skeleton height={"25px"} width="80px" />
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
              onClick={() => handleDelete(deleteCourses)}
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
        setFile={setFile}
        category={category}
        valueCategory={valueCategory}
        setImageUrl={setImageUrl}
        imageUrl={imageUrl}
        setValueCategory={setValueCategory}
        setTextResultCourses={setTextResultCourses}
        textResultCourses={textResultCourses}
        handleResultCourses={handleResultCourses}
        resultCourses={resultCourses}
        handleDeleteResultCourses={handleDeleteResultCourses}
        handleEditResultCourses={handleEditResultCourses}
        resultCoursesEdit={resultCoursesEdit}
        setTextCoursesRequirements={setTextCoursesRequirements}
        textCoursesRequirements={textCoursesRequirements}
        handleCoursesRequirements={handleCoursesRequirements}
        coursesRequirements={coursesRequirements}
        handleDeleteCoursesRequirements={handleDeleteCoursesRequirements}
        handleEditCoursesRequirements={handleEditCoursesRequirements}
        CoursesRequirementsEdit={CoursesRequirementsEdit}
      />
    </>
  );
};

export default CoursesView;
const ModalForm = (props: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

  const handleImageChange = (e: any) => {
    let file = e.target.files[0];

    props.setFile(file);
    if (!file) return;

    const reader: any = new FileReader();
    reader.onload = () => {
      props.setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" textAlign={"center"}>
          {props.action == "CREATE" ? "Add Courses" : "Update Courses"}
        </Typography>
        <form onSubmit={props.handleSubmit(props.onFinish)}>
          <Stack
            width={"100%"}
            mt={"20px"}
            gap={"15px"}
            direction={"row"}
            flexWrap={"wrap"}
          >
            <Box width={"24%"}>
              <TextField
                {...props.register("title")}
                fullWidth
                id="outlined-basic"
                label="Title"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"24%"}>
              <TextField
                type="number"
                {...props.register("price")}
                fullWidth
                id="outlined-basic"
                label="Price"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"24%"}>
              <TextField
                {...props.register("instructor")}
                fullWidth
                id="outlined-basic"
                label="Instructor"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box width={"24%"}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  {...props.register("category_id")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.valueCategory}
                  label="Category"
                  onChange={(e) => props.setValueCategory(e.target.value)}
                >
                  {props.category &&
                    props.category.length &&
                    props.category.map((item: any) => {
                      return <MenuItem value={item._id}>{item.name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Box>
            <Box width={"24%"}>
              <div
                className="container"
                style={{
                  width: "100%",
                }}
              >
                <label
                  htmlFor="input-img"
                  className="preview"
                  style={{
                    border: "2px dashed  #ff5117",
                    width: "100%",
                    height: "250px",
                    color: " #ff5117",
                    fontSize: "22px",
                    position: "relative",
                    borderRadius: "6px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                >
                  {props.imageUrl ? (
                    <img
                      src={props.imageUrl}
                      width={"100%"}
                      height={250}
                      style={{
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  <RiUploadCloudFill size={"37px"} />
                  <Typography fontSize={"14px"}>
                    Upload to preview image
                  </Typography>
                </label>
                <input
                  onChange={handleImageChange}
                  type="file"
                  hidden
                  id="input-img"
                />
              </div>
            </Box>
            <Box width={"24%"}>
              <TextField
                {...props.register("description")}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={9.5}
                fullWidth
              />
            </Box>
            <Box width={"24%"}>
              <TextField
                id="outlined-multiline-static"
                label="Result Courses"
                fullWidth
                size="small"
                value={props.textResultCourses}
                onChange={(e) => props.setTextResultCourses(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        onClick={props.handleResultCourses}
                        width={30}
                        sx={{
                          background:
                            "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        height={30}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {props.resultCoursesEdit !== null ? (
                          <EditIcon sx={{ color: "white" }} />
                        ) : (
                          <AddIcon sx={{ color: "white" }} />
                        )}
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                mt={"10px"}
                className="resultCourses"
                height={"190px"}
                sx={{ overflowY: "scroll" }}
              >
                {props.resultCourses &&
                  props.resultCourses.map((item: any, index: any) => {
                    return (
                      <Paper
                        sx={{ width: "100%", padding: "9px", mt: "8px" }}
                        elevation={1}
                      >
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          gap={"10px"}
                        >
                          <Typography>{limitDescription(item, 23)}</Typography>
                          <Stack
                            sx={{ cursor: "pointer" }}
                            direction={"row"}
                            gap={"10px"}
                            alignItems={"center"}
                          >
                            <Box
                              onClick={() =>
                                props.handleEditResultCourses(index)
                              }
                            >
                              <EditIcon
                                sx={{ fontSize: "16px", color: "green" }}
                              />
                            </Box>
                            <Box
                              onClick={() =>
                                props.handleDeleteResultCourses(index)
                              }
                            >
                              <ClearIcon
                                sx={{ fontSize: "20px", color: "red" }}
                              />
                            </Box>
                          </Stack>
                        </Box>
                      </Paper>
                    );
                  })}
              </Box>
            </Box>
            <Box width={"24%"}>
              <TextField
                id="outlined-multiline-static"
                label="Courses Requirements"
                fullWidth
                size="small"
                value={props.textCoursesRequirements}
                onChange={(e) =>
                  props.setTextCoursesRequirements(e.target.value)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        onClick={props.handleCoursesRequirements}
                        width={30}
                        sx={{
                          background:
                            "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        height={30}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {props.CoursesRequirementsEdit !== null ? (
                          <EditIcon sx={{ color: "white" }} />
                        ) : (
                          <AddIcon sx={{ color: "white" }} />
                        )}
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                mt={"10px"}
                className="resultCourses"
                height={"190px"}
                sx={{ overflowY: "scroll" }}
              >
                {props.coursesRequirements &&
                  props.coursesRequirements.map((item: any, index: any) => {
                    return (
                      <Paper
                        sx={{ width: "100%", padding: "9px", mt: "8px" }}
                        elevation={1}
                      >
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          gap={"10px"}
                        >
                          <Typography>{limitDescription(item, 23)}</Typography>
                          <Stack
                            sx={{ cursor: "pointer" }}
                            direction={"row"}
                            gap={"10px"}
                            alignItems={"center"}
                          >
                            <Box
                              onClick={() =>
                                props.handleEditCoursesRequirements(index)
                              }
                            >
                              <EditIcon
                                sx={{ fontSize: "16px", color: "green" }}
                              />
                            </Box>
                            <Box
                              onClick={() =>
                                props.handleDeleteCoursesRequirements(index)
                              }
                            >
                              <ClearIcon
                                sx={{ fontSize: "20px", color: "red" }}
                              />
                            </Box>
                          </Stack>
                        </Box>
                      </Paper>
                    );
                  })}
              </Box>
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
                Close
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
                Add
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
