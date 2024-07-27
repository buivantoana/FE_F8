import { useCoursesContext } from "@/App";
import { useLocalStorage } from "@/hooks/useStorage";
import { useTheme } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  CssBaseline,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import React, { useState } from "react";
import {
  RiArticleLine,
  RiBankCardFill,
  RiBardLine,
  RiContactsLine,
  RiFileListFill,
  RiGitBranchFill,
  RiLineChartFill,
  RiLogoutCircleRLine,
  RiMessage3Fill,
  RiOrganizationChart,
  RiPencilFill,
  RiPriceTag3Line,
  RiShuffleFill,
  RiSlideshow4Fill,
  RiTeamFill,
  RiUserAddFill,
} from "react-icons/ri";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import profile from "../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import logo from "../../images/logo4.png";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "end",
  gap: "40px",
}));

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#7ef2c2",
    color: "#0d8f50",
    "&:hover": {
      backgroundColor: "#a5f2d2",
    },
  },
}));

const LayoutAdmin = () => {
  const theme: any = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const location = useLocation();
  const [user, setUser] = useLocalStorage("user", {});
  const context: any = useCoursesContext();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (text: string) => {
    setSelectedItem(text);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [opened, setOpenEnd] = React.useState(false);

  const handleClickOpen = () => {
    setOpenEnd(true);
  };
  const handleClose = () => {
    setOpenEnd(false);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openned = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosed = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.setItem("user",JSON.stringify({}))
    context.dispatch({
      type: "LOGOUT",
    });
    navigate("/");
    handleClosed();
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          ".css-123k39-MuiPaper-root-MuiAppBar-root": {
            zIndex: 9,
          },
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ background: "#262b40", color: "black" }}
        >
          <Toolbar
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <ChevronLeftIcon sx={{ color: "white", fontSize: "30px" }} />
              </IconButton>
            </div>

            <Box>
              <IconButton onClick={handleClick}>
                <img
                  src={
                    user.data[0].image.url ? user.data[0].image.url : profile
                  }
                  width={34}
                  height={34}
                  style={{ borderRadius: "50%" }}
                  alt=""
                />
              </IconButton>
            </Box>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openned}
              onClose={handleClosed}
              sx={{padding:"5px"}}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Typography
                onClick={handleLogout}
                fontSize={"14px"}
                color={"#333"}
                sx={{ display: "flex",cursor:"pointer" }}
                alignItems={"center"}
                gap={"8px"}
                p={"5px"}
                
              >
                <RiLogoutCircleRLine size={20} /> Đăng xuất
              </Typography>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
              zIndex: 9,
            },
          }}
        >
          <Drawer
            sx={{
              width: drawerWidth,

              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
              ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
                background: "#262b40",
              },
              padding: "10px",
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <img
                src={logo}
                width={80}
                height={80}
                style={{ objectFit: "contain" }}
                alt=""
              />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon sx={{ color: "white", fontSize: "30px" }} />
                ) : (
                  <ChevronRightIcon sx={{ color: "white", fontSize: "30px" }} />
                )}
              </IconButton>
            </DrawerHeader>
            {user.data[0].role == "admin" && (
              <Box
                className="see-more-admin"
                sx={{ overflowY: "scroll", color: "white" }}
              >
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Thống kê
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard" ? "5px" : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiLineChartFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Thống kê"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />

                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Khóa học
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/courses"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/courses"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/courses"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/courses"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiSlideshow4Fill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Khóa học"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/lesson"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/lesson"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/lesson"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/lesson"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiFileListFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Chương"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/sublesson"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/sublesson"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/sublesson"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/sublesson"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiOrganizationChart color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Bài học"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Danh mục
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/categories"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/categories"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/categories"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/categories"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiGitBranchFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Danh mục"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Mã giảm giá
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/vouchers"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/vouchers"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/vouchers"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/vouchers"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiPriceTag3Line color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Mã giảm giá"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/user_vouchers"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/user_vouchers"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/user_vouchers"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/user_vouchers"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiBardLine color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Mã giảm giá người dùng"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Bài viết 
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/post"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/post"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/post" ? "5px" : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/post"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiArticleLine color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Bài viết "} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Ví
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/wallet"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/wallet"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/wallet"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/wallet"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiBankCardFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Ví"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Bình Luận
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/comment"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/comment"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/comment"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/comment"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiMessage3Fill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Bình Luận"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Liên Hệ
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/contact"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/contact"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/contact"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/contact"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiContactsLine color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Liên Hệ"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Người dùng 
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/user"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/user"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/user" ? "5px" : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/user"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiUserAddFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Người dùng "} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/permission"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/permission"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/permission"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/permission"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiTeamFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Chức năng"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/role"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/role"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/role" ? "5px" : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/role"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiPencilFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Vai trò"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/role_permission"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/role_permission"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/role_permission"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/role_permission"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiShuffleFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Quyền của vai trò"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </Box>
            )}
            {user.data[0].role == "interaction_management" && (
              <Box
                className="see-more-admin"
                sx={{ overflowY: "scroll", color: "white" }}
              >
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Post
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/post"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/post"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/post" ? "5px" : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/post"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiArticleLine color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Blog"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>

                <Divider />

                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Comment
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/comment"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/comment"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/comment"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/comment"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiMessage3Fill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Comment"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Contact
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/contact"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/contact"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/contact"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/contact"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiContactsLine color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Contact"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </Box>
            )}

            {user.data[0].role == "course_management" && (
              <Box
                className="see-more-admin"
                sx={{ overflowY: "scroll", color: "white" }}
              >
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Courses
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/courses"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/courses"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/courses"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/courses"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiSlideshow4Fill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Courses"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/lesson"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/lesson"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/lesson"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/lesson"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiFileListFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Lesson"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/sublesson"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/sublesson"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/sublesson"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/sublesson"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiOrganizationChart color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Sub Lesson"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
                <Divider />
                <List sx={{ px: "10px" }}>
                  <Typography ml={"5px"} fontWeight={"bold"}>
                    Category
                  </Typography>
                  <ListItem
                    sx={{
                      a: {
                        color: "white",
                        width: "100%",
                        textDecoration: "none",
                      },
                      background:
                        location.pathname == "/dashboard/categories"
                          ? "#2e3650"
                          : undefined,
                      border:
                        location.pathname == "/dashboard/categories"
                          ? "1px solid #4c5680"
                          : "none",
                      borderRadius:
                        location.pathname == "/dashboard/categories"
                          ? "5px"
                          : "none",
                    }}
                    disablePadding
                  >
                    <Link to={"/dashboard/categories"}>
                      <CustomListItemButton>
                        <ListItemIcon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <RiGitBranchFill color={"white"} />
                        </ListItemIcon>
                        <ListItemText primary={"Category"} />
                      </CustomListItemButton>
                    </Link>
                  </ListItem>
                </List>
              </Box>
            )}
          </Drawer>
        </Box>
        <Main sx={{ background: "#f5f8fb", minHeight: "100vh" }} open={open}>
          <DrawerHeader />
          <Box>
            <Outlet />
          </Box>
        </Main>
      </Box>
    </div>
  );
};

export default LayoutAdmin;