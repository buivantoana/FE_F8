import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Popover,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../images/logo4.png";
import user from "../images/personal-18px.svg";
import google from "../images/google-18px.svg";
import github from "../images/github-18px.svg";
import fb from "../images/facebook-18px.svg";

import {
  RiAccountCircleLine,
  RiAdminLine,
  RiArrowLeftSLine,
  RiArticleLine,
  RiCloseLine,
  RiLogoutCircleRLine,
  RiSearchLine,
  RiSettings2Line,
  RiWalletLine,
} from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import profile from "../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import product from "../images/product.png";
import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useCoursesContext } from "@/App";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getUserProgress } from "@/service/progress";
import { getCourses, getMyCourses, searchCourses } from "@/service/courses";
import { useLocalStorage } from "@/hooks/useStorage";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "@/core/firebase";
import { calculateProgress } from "@/utils/utils";
import { getUserPost, updatePost } from "@/service/post";
import { getUserNotify, updateUserReadNotify } from "@/service/notify";
import { forgotPassword, otpEmail } from "@/service/auth";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { debounce } from "lodash";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [
    anchorElNotify,
    setAnchorElNotify,
  ] = useState<HTMLButtonElement | null>(null);
  const [
    anchorElProfile,
    setAnchorElProfile,
  ] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [disableForgot, setDisableForgot] = useState(true);
  const [check, setCheck] = useState("");
  const [tokenOtp, setTokenOtp]: any = useState("");
  const [email, setEmail] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [confirmPasswordNew, setConfirmPasswordNew] = useState("");
  const [otp, setOtp] = useState("");
  const [select, setSelect] = useState(true);
  const [registerType, setRegisterType] = useState(false);
  const openCourses = Boolean(anchorEl);
  const id = openCourses ? "simple-popover" : undefined;
  const openNotify = Boolean(anchorElNotify);
  const idNotify = openNotify ? "simple-popover" : undefined;
  const openProfile = Boolean(anchorElProfile);
  const idProfile = openProfile ? "simple-popover" : undefined;
  const navigate = useNavigate();
  const context: any = useCoursesContext();
  const [userLocal, setUser] = useLocalStorage("user", {});
  const queryClient = useQueryClient();
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [courses, setCourses] = useState([]);
  const [dataNotify, setDataNotify] = useState([]);
  const [progressBar, setProgressBar] = useState([]);
  const [loading, setLoading] = useState(false);
  const socket = io("http://localhost:4000");
  const [isFocused, setIsFocused] = useState(false);
  const handleClose = () => {
    setCheck("");
    setSelect(true);
    setRegisterType(false);
    setOpen(false);
  };

  const [changeSearch, setChangeSearch] = useState("");

  const [dataSearch, setDataSearch]: any = useState({
    dataCourses: [],
    dataPost: [],
  });
  const [isTyping, setIsTyping] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  useEffect(() => {
    const debouncedSearch = debounce(async () => {
      if (!isTyping && changeSearch.length > 0) {
        try {
          let data: any = await searchCourses(changeSearch);
          if (data?.status == 0) {
            console.log(data);
            setDataSearch([]);
            setLoadingSearch(true);
            setDataSearch({
              dataCourses: data.dataCourses,
              dataPost: data.dataPost,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, 100);

    debouncedSearch();
  }, [changeSearch, isTyping]);
  const handleChangrSearch = (e: any) => {
    setIsFocused(true);
    setLoadingSearch(false);
    setChangeSearch(e);
    setIsTyping(true);
    setDataSearch({ dataCourses: [], dataPost: [] });
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };
  const {
    register,
    reset,
    handleSubmit,
    onFinish,
    errors,
  }: any = useAuthMutation({
    action: check == "login" ? "SIGNIN" : "SIGNUP",
    onSuccess: async (data) => {
      if (check !== "login") {
        if (data.token && data.refeshToken) {
          if (data.status == 0) {
            queryClient.invalidateQueries({
              queryKey: ["my_courses"],
            });
            handleClose();
            context.dispatch({
              type: "LOGIN",
              payload: {
                ...context.state,
                user: [data.data[0]],
              },
            });
            let res: any = await getUserProgress(data.data[0]._id);
            context.dispatch({
              type: "PROGRESS",
              payload: {
                ...context.state,
                progress: res.data,
              },
            });
          }
        } else {
          if (data.status == 1) {
            alert(data.message);
          } else {
            reset();
            setCheck("login");
            setSelect(true);
            setRegisterType(false);
          }
        }
      } else {
        if (data.status == 0) {
          queryClient.invalidateQueries({
            queryKey: ["my_courses"],
          });
          handleClose();
          context.dispatch({
            type: "LOGIN",
            payload: {
              ...context.state,
              user: data.data,
            },
          });
          let res: any = await getUserProgress(data.data[0]._id);
          context.dispatch({
            type: "PROGRESS",
            payload: {
              ...context.state,
              progress: res.data,
            },
          });
        }
      }
    },
  });
  const signInWithGoogle = async () => {
    try {
      setCheck("register");
      const result: any = await signInWithPopup(auth, googleProvider);
      if (Object.keys(result)[0]) {
        onFinish({
          email: result.user.email,
          user_name: result.user.displayName,
          uid: result.user.uid,
          type: "google",
        });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleCheck = (type: string) => {
    if (type == "login") {
      setCheck(type);
      setOpen(true);
    } else {
      setCheck(type);
      setOpen(true);
    }
  };

  const handleClickCourses = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLoadingCourses(true);
    setAnchorEl(event.currentTarget);
    try {
      let data: any = await getCourses();
      let progress: any = await getUserProgress(context.state.user[0]._id);
      if (data[0] && progress.status == 0) {
        let arr = calculateProgress(progress.data);
        let checkRegisterCourses = progress.data.map(
          (item: any) => item.courses_id[0]
        );

        data = data.filter((item: any) =>
          checkRegisterCourses.includes(item._id)
        );
        console.log(data);
        setProgressBar(arr);
        setCourses(data);
        setLoadingCourses(false);
      }
    } catch (error) {
      setLoadingCourses(false);
    }
  };

  const handleClickNotify = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNotify(event.currentTarget);
  };
  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseCourses = () => {
    setAnchorEl(null);
  };
  const handleCloseNotify = () => {
    setAnchorElNotify(null);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  const handleLogout = () => {
    setUser({});
    context.dispatch({
      type: "LOGOUT",
    });
    setAnchorElProfile(null);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const {} = useQuery(["notify", context.state.user[0]], {
    queryFn: () => {
      return getUserNotify(context.state.user[0]._id);
    },
    onSuccess(data) {
      if (data?.status == 0) {
        setDataNotify(data.data);
      }
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1500);
    socket.on("notifyNew", (res) => {
      if (res.user_id == userLocal.data[0]._id) {
        console.log("tona");
        setDataNotify(res.data);
      }
    });
  }, []);
  const handleNotify = async (data: any) => {
    try {
      if (data.read) {
        if (!(data.url == " ")) {
          navigate(data.url);
        }
        handleCloseNotify();
      } else {
        await updateUserReadNotify(data._id);
        queryClient.invalidateQueries({
          queryKey: ["notify"],
        });
        if (!(data.url == " ")) {
          navigate(data.url);
        }
        handleCloseNotify();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpForgotPassword = async (type: any) => {
    try {
      if (type == 0) {
        let data: any = await otpEmail({ email: email });
        if (data?.status == 0) {
          setDisableForgot(false);
          setTokenOtp(data.otp);
          toast.success(data.message);
        } else {
          toast.warning(data.message);
        }
      } else {
        const decodedToken: any = jwtDecode(tokenOtp);

        if (decodedToken.password == otp.trim()) {
          setTokenOtp(null);
          toast.success("Mời bạn tạo mật khẩu mới.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleForgotPassword = async () => {
    try {
      if (passwordNew == confirmPasswordNew) {
        let data = await forgotPassword({
          email: email,
          passwordNew: passwordNew,
        });
        if (data?.status == 0) {
          toast.success("Đổi mật khẩu thành công");
          setCheck("login");
          setSelect(true);
          setRegisterType(false);
        }
      } else {
        toast.warning("Mật khẩu không trùng khớp.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchBoxRef: any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleFocus = () => {
    setIsFocused(true);
  };
  return (
    <Box
      padding={"10px 20px 15px 20px"}
      position={"fixed"}
      width={"100%"}
      zIndex={100}
      top={0}
      left={0}
      bgcolor={"white"}
      borderBottom={"1px solid #dddddd"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}>
        <Stack direction={"row"} gap={5} alignItems={"center"}>
          <Box width={"50px"} height={"40px"}>
            <Link to={""}>
              <img
                src={logo}
                width={85}
                height={85}
                style={{
                  borderRadius: "8px",
                  objectFit: "contain",
                  marginTop: "-20px",
                  marginLeft: "-10px",
                }}
                alt='logo'
              />
            </Link>
          </Box>
          <Typography fontWeight={700}>Học Lập Trình Để Đi Làm</Typography>
        </Stack>
        <Box position={"relative"}>
          <TextField
            autoComplete='off'
            value={changeSearch}
            onFocus={handleFocus}
            onChange={(e) => handleChangrSearch(e.target.value)}
            type={"text"}
            sx={{
              width: "420px",

              ".css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input": {
                padding: "5px",
              },
              ".css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "20px",
                height: "40px",
              },
            }}
            placeholder='Tìm kiếm khóa học, bài viết, video, ...'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <RiSearchLine />
                </InputAdornment>
              ),
            }}
          />
          {isFocused && changeSearch.length > 0 && (
            <div
              ref={searchBoxRef}
              style={{
                position: "absolute",
                width: "100%",
                padding: "20px",
                background: "white",
                border: "1px solid #dddddd",
                borderRadius: "15px",
                left: 0,
                top: 42,
                cursor: "pointer",
              }}>
              <Box
                fontSize={"15px"}
                color={"#0000008a"}
                display={"flex"}
                alignItems={"center"}
                gap={"8px"}>
                {loadingSearch ? (
                  <RiSearchLine />
                ) : (
                  <CircularProgress size={15} color='inherit' />
                )}{" "}
                {!loadingSearch ? (
                  "Kết quả"
                ) : (
                  <>
                    {dataSearch.dataCourses[0] || dataSearch.dataPost[0]
                      ? "Kết quả"
                      : "Không có kết quả"}
                  </>
                )}{" "}
                tìm kiếm cho “{changeSearch}”
              </Box>
              <>
                {dataSearch.dataCourses[0] && (
                  <Box mt={"15px"}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"end"}
                      paddingBottom={"12px"}
                      borderBottom={"1px dashed #0000008a"}>
                      <Typography color={"#333"}>Khóa học</Typography>
                      <Typography fontSize={"13px"} color={"#0000008a"}>
                        Xem thêm
                      </Typography>
                    </Stack>
                    <Stack mt={"15px"} direction={"column"} gap={"8px"}>
                      {dataSearch.dataCourses.map((item: any) => {
                        return (
                          <Stack
                            direction={"row"}
                            onClick={() => {
                              setDataSearch({ dataCourses: [], dataPost: [] });
                              setChangeSearch("");
                              navigate(`/courses/${item._id}`);
                            }}
                            alignItems={"center"}
                            gap={"12px"}>
                            <img
                              src={item.image.url}
                              width={33}
                              height={33}
                              style={{ borderRadius: "50%" }}
                              alt=''
                            />
                            <Typography fontSize={"14px"}>
                              {item.title}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Box>
                )}
                {dataSearch.dataPost[0] && (
                  <Box mt={"15px"}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"end"}
                      paddingBottom={"12px"}
                      borderBottom={"1px dashed #0000008a"}>
                      <Typography color={"#333"}>Bài viết</Typography>
                      <Typography fontSize={"13px"} color={"#0000008a"}>
                        Xem thêm
                      </Typography>
                    </Stack>
                    <Stack mt={"15px"} direction={"column"} gap={"8px"}>
                      {dataSearch.dataPost.map((item: any) => {
                        return (
                          <Stack
                            direction={"row"}
                            onClick={() => {
                              setDataSearch({ dataCourses: [], dataPost: [] });
                              setChangeSearch("");
                              navigate(`/detail_blog/${item._id}`);
                            }}
                            alignItems={"center"}
                            gap={"12px"}>
                            <img
                              src={item.image.url}
                              width={33}
                              height={33}
                              style={{ borderRadius: "50%" }}
                              alt=''
                            />
                            <Typography fontSize={"14px"}>
                              {item.title}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Box>
                )}
              </>
            </div>
          )}
        </Box>
        {loading ? (
          <>
            {Object.keys(context.state.user)[0] ? (
              <Stack
                direction={"row"}
                sx={{ cursor: "pointer" }}
                gap={"30px"}
                alignItems={"center"}>
                <Box>
                  <Typography
                    aria-describedby={id}
                    onClick={handleClickCourses}
                    fontSize={"14px"}>
                    Khóa học của tôi
                  </Typography>
                  <Popover
                    id={id}
                    open={openCourses}
                    anchorEl={anchorEl}
                    onClose={handleCloseCourses}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}>
                    <Box p={"15px"} width={"380px"}>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}>
                        <Typography fontWeight={"600"}>
                          Khóa học của tôi
                        </Typography>
                        <Typography
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleCloseCourses();
                            setTimeout(() => {
                              navigate("/my_courses");
                            }, 500);
                          }}
                          fontSize={"13px"}
                          color={"#ff5117"}>
                          {" "}
                          Xem tất cả
                        </Typography>
                      </Stack>
                      <Stack
                        className='see-more'
                        mt={"20px"}
                        direction={"column"}
                        gap={"14px"}
                        maxHeight={"400px"}
                        sx={{ overflowY: "scroll" }}>
                        {loadingCourses && (
                          <Box
                            height={40}
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}>
                            <CircularProgress size={"20px"} />
                          </Box>
                        )}
                        {!loadingCourses && (
                          <>
                            {" "}
                            {courses == undefined || courses.length == 0 ? (
                              <>
                                <Typography textAlign={"center"}>
                                  Not found data
                                </Typography>
                              </>
                            ) : (
                              <>
                                {courses &&
                                  courses.map((item: any, index) => {
                                    return (
                                      <Stack
                                        direction={"row"}
                                        p={"5px"}
                                        borderRadius={"5px"}
                                        sx={{
                                          "&:hover": {
                                            backgroundColor: "#dddddd",
                                          },
                                        }}
                                        gap={"20px"}>
                                        <Box>
                                          <img
                                            src={item.image.url}
                                            width={120}
                                            height={67}
                                            style={{ borderRadius: "6px" }}
                                            alt=''
                                          />
                                        </Box>
                                        <Box>
                                          <Typography
                                            fontSize={"14px"}
                                            fontWeight={"bold"}>
                                            {item.title}
                                          </Typography>

                                          <ProgressBar
                                            percentage={progressBar[index]}
                                          />
                                        </Box>
                                      </Stack>
                                    );
                                  })}
                              </>
                            )}
                          </>
                        )}
                      </Stack>
                    </Box>
                  </Popover>
                </Box>
                <Box
                  onClick={() => {
                    navigate("/my_wallet");
                  }}>
                  <RiWalletLine size={22} />
                </Box>
                <Box>
                  <Typography
                    aria-describedby={idNotify}
                    onClick={handleClickNotify}>
                    <Badge
                      badgeContent={
                        dataNotify &&
                        dataNotify.filter((item: any) => item.read == false)
                          .length
                      }
                      color='primary'>
                      <NotificationsIcon />
                    </Badge>
                  </Typography>
                  <Popover
                    id={idNotify}
                    open={openNotify}
                    anchorEl={anchorElNotify}
                    onClose={handleCloseNotify}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}>
                    <Box p={"15px"} width={"450px"}>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}>
                        <Typography fontWeight={"600"}>Thông báo</Typography>
                        <Typography fontSize={"13px"} color={"#ff5117"}>
                          {" "}
                          Đánh dấu đã đọc
                        </Typography>
                      </Stack>
                      <Stack
                        className='see-more'
                        mt={"20px"}
                        direction={"column"}
                        gap={"14px"}
                        maxHeight={"400px"}
                        sx={{ overflowY: "scroll" }}>
                        {dataNotify &&
                          dataNotify.length &&
                          dataNotify.map((item: any) => {
                            return (
                              <Stack
                                direction={"row"}
                                onClick={() => handleNotify(item)}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "#dddddd",
                                  },
                                }}
                                borderBottom={"1px dashed #dddddd"}
                                p={"5px"}
                                borderRadius={"5px"}
                                gap={"15px"}>
                                <Box p={"5px"}>
                                  <Badge
                                    color='secondary'
                                    invisible={item.read}
                                    variant='dot'>
                                    <Box>
                                      <Typography
                                        fontWeight={"bold"}
                                        sx={{ width: "100%" }}>
                                        {item.title}
                                      </Typography>
                                      <Typography
                                        mt={"5px"}
                                        fontSize={"14px"}
                                        color={"#333"}
                                        sx={{ width: "100%" }}>
                                        {item.message}
                                      </Typography>
                                    </Box>
                                  </Badge>
                                </Box>
                              </Stack>
                            );
                          })}
                      </Stack>
                    </Box>
                  </Popover>
                </Box>

                <Box>
                  <Typography
                    aria-describedby={id}
                    onClick={handleClickProfile}>
                    <img
                      src={
                        context.state.user[0].image.url
                          ? context.state.user[0].image.url
                          : profile
                      }
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                      alt=''
                    />
                  </Typography>
                  <Popover
                    id={idProfile}
                    open={openProfile}
                    anchorEl={anchorElProfile}
                    onClose={handleCloseProfile}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}>
                    <Box p={"20px"} sx={{ cursor: "pointer" }} width={"200px"}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"15px"}>
                        <Box>
                          <img
                            src={
                              context.state.user[0].image.url
                                ? context.state.user[0].image.url
                                : profile
                            }
                            width={40}
                            height={40}
                            style={{ borderRadius: "50%" }}
                            alt=''
                          />
                        </Box>
                        <Box>
                          <Typography fontSize={"14px"} fontWeight={"bold"}>
                            {context.state.user[0].user_name}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction={"column"} mt={"20px"} gap={"18px"}>
                        <Box
                          borderBottom={"1px dashed #dddddd"}
                          paddingBottom={"8px"}>
                          <Typography
                            fontSize={"14px"}
                            color={"#333"}
                            onClick={() => {
                              handleCloseProfile();
                              navigate("/profile");
                            }}
                            sx={{ display: "flex" }}
                            alignItems={"center"}
                            gap={"8px"}>
                            <RiAccountCircleLine size={18} /> Trang cá nhân
                          </Typography>
                        </Box>
                        {context.state.user[0].role !== "member" && (
                          <Box
                            borderBottom={"1px dashed #dddddd"}
                            paddingBottom={"8px"}>
                            <Typography
                              fontSize={"14px"}
                              color={"#333"}
                              onClick={() => {
                                handleCloseProfile();
                                navigate("/dashboard");
                              }}
                              sx={{ display: "flex" }}
                              alignItems={"center"}
                              gap={"8px"}>
                              <RiAdminLine size={18} /> Quản trị
                            </Typography>
                          </Box>
                        )}
                        <Box
                          borderBottom={"1px dashed #dddddd"}
                          paddingBottom={"8px"}>
                          <Typography
                            fontSize={"14px"}
                            color={"#333"}
                            onClick={() => {
                              handleCloseProfile();
                              navigate("/my_article");
                            }}
                            sx={{ display: "flex" }}
                            alignItems={"center"}
                            gap={"8px"}>
                            <RiArticleLine size={18} /> Bài viết của tôi
                          </Typography>
                        </Box>
                        <Box
                          borderBottom={"1px dashed #dddddd"}
                          onClick={() => {
                            handleCloseProfile();
                            navigate("/setting");
                          }}
                          paddingBottom={"8px"}>
                          <Typography
                            fontSize={"14px"}
                            color={"#333"}
                            sx={{ display: "flex" }}
                            alignItems={"center"}
                            gap={"8px"}>
                            <RiSettings2Line size={20} /> Cài đặt
                          </Typography>
                        </Box>

                        <Typography
                          onClick={handleLogout}
                          fontSize={"14px"}
                          color={"#333"}
                          sx={{ display: "flex" }}
                          alignItems={"center"}
                          gap={"8px"}>
                          <RiLogoutCircleRLine size={20} /> Đăng xuất
                        </Typography>
                      </Stack>
                    </Box>
                  </Popover>
                </Box>
              </Stack>
            ) : (
              <Stack direction={"row"} gap={2}>
                <Button
                  onClick={() => handleCheck("login")}
                  sx={{ color: "black" }}>
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => handleCheck("register")}
                  sx={{
                    background:
                      "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                    color: "white",
                    borderRadius: "99px",
                    width: "92px",
                    height: "34px",
                  }}>
                  Đăng Ký
                </Button>
              </Stack>
            )}
          </>
        ) : (
          <>
            <Stack direction={"row"} alignItems={"center"} gap={"12px"}>
              <Skeleton width='50px' />
              <Skeleton width='30px' height={"30px"} />
              <Skeleton width='30px' height={"30px"} />
              <Skeleton
                animation='wave'
                variant='circular'
                width={40}
                height={40}
              />
            </Stack>
          </>
        )}
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{ borderRadius: "15px" }}>
        <Box sx={{ position: "relative", width: "540px", maxHeight: "750px" }}>
          <Box
            onClick={handleClose}
            sx={{
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              background: "rgba(22, 24, 35, .03)",
              position: "absolute",
              top: "15px",
              right: "15px",
              zIndex: 1,
            }}>
            <RiCloseLine size={"20px"} />
          </Box>
          {check === "login" && (
            <Box
              sx={{
                textAlign: "center",
                padding: "80px 20px 60px",
                position: "relative",
              }}>
              {!select ? (
                <Box
                  onClick={() => setSelect(!select)}
                  sx={{ position: "absolute", top: "14%", left: "25px" }}>
                  <RiArrowLeftSLine size={"30px"} />
                </Box>
              ) : (
                ""
              )}

              <Box>
                <img
                  width={100}
                  height={100}
                  style={{ borderRadius: "10px", objectFit: "contain" }}
                  src={logo}
                  alt=''
                />
              </Box>
              <Typography
                my={"10px"}
                fontWeight={"700"}
                variant='h5'
                fontSize={"27px"}>
                Đăng nhập tài khoản FDemy
              </Typography>
              <Typography my={"10px"} fontSize={"13px"} color={"#f33a58"}>
                Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người
                sử <br></br>dụng chung có thể sẽ bị khóa.
              </Typography>
              {select ? (
                <Stack
                  direction={"column"}
                  alignItems={"center"}
                  gap={"20px"}
                  my={"20px"}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={user} width={20} height={20} alt='' />
                    </Box>
                    <Box onClick={() => setSelect(!select)} width={"80%"}>
                      <Typography fontSize={"13px"} fontWeight={"600"}>
                        Sử dụng email / số điện thoại
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={google} width={20} height={20} alt='' />
                    </Box>
                    <Box width={"80%"} onClick={signInWithGoogle}>
                      <Typography fontSize={"13px"} fontWeight={"600"}>
                        Đăng nhập với Google
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ) : (
                <Box my={"20px"}>
                  <form onSubmit={handleSubmit(onFinish)}>
                    <Box padding={"0 65px"}>
                      <Box mt={"10px"}>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          alignItems={"flex-end"}>
                          <Typography
                            marginLeft={"15px"}
                            textAlign={"left"}
                            fontSize={"14px"}
                            fontWeight={"600"}>
                            {registerType ? " Số điện thoại" : "Email"}
                          </Typography>
                          <Typography
                            sx={{ position: "relative", zIndex: 10 }}
                            onClick={() => setRegisterType(!registerType)}
                            fontSize={"12px"}
                            color={"#666"}>
                            Đăng nhập với Email
                          </Typography>
                        </Stack>
                        <TextField
                          {...register("email")}
                          error={errors.email}
                          sx={{
                            width: "100%",
                            height: "42px",

                            mt: "5px",
                            borderRadius: "30px",
                            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ": {
                              borderRadius: "30px",
                            },
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
                              height: "28px",
                            },
                          }}
                          helperText=' '
                          placeholder={"Email"}
                          id='demo-helper-text-aligned-no-helper'
                          size='small'
                        />
                        <TextField
                          {...register("password")}
                          error={errors.password}
                          sx={{
                            width: "100%",
                            height: "42px",
                            mt: "10px",
                            borderRadius: "30px",
                            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ": {
                              borderRadius: "30px",
                            },
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
                              height: "28px",
                            },
                          }}
                          helperText=' '
                          type='password'
                          placeholder={"Password"}
                          id='demo-helper-text-aligned-no-helper'
                          size='small'
                        />
                      </Box>
                      <Box>
                        <Button
                          type='submit'
                          sx={{
                            width: "100%",
                            height: "44px",
                            background:
                              "linear-gradient(70.06deg, #2cccff -5%, #22dfbf 106%)",
                            color: "white",
                            borderRadius: "30px",
                            mt: "20px",
                            fontWeight: "700",
                          }}>
                          Đăng nhập
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </Box>
              )}
              <Typography fontSize={"14px"} color={"#333"}>
                Bạn chưa có tài khoản?{" "}
                <b
                  onClick={() => {
                    setCheck("register");
                    setSelect(true);
                    setRegisterType(false);
                  }}
                  style={{ color: "#f05123" }}>
                  Đăng ký
                </b>
                <br></br>
                <b
                  onClick={() => {
                    setCheck("forgotpassword");
                  }}
                  style={{ color: "#f05123" }}>
                  Quên mật khẩu
                </b>
              </Typography>
              <Typography fontSize={"11px"} color={"#666"} mt={"20px"}>
                Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý
                <br></br> với{" "}
                <a style={{ textDecoration: "underline" }}>
                  điều khoản sử dụng
                </a>{" "}
                của chúng tôi.
              </Typography>
            </Box>
          )}

          {check === "register" && (
            <Box sx={{ textAlign: "center", padding: "80px 20px 60px" }}>
              {!select ? (
                <Box
                  onClick={() => setSelect(!select)}
                  sx={{ position: "absolute", top: "14%", left: "25px" }}>
                  <RiArrowLeftSLine size={"30px"} />
                </Box>
              ) : (
                ""
              )}
              <Box>
                <img
                  width={100}
                  height={100}
                  style={{ borderRadius: "10px", objectFit: "contain" }}
                  src={logo}
                  alt=''
                />
              </Box>
              <Typography
                my={"10px"}
                fontWeight={"700"}
                variant='h5'
                fontSize={"27px"}>
                Đăng ký tài khoản FDemy
              </Typography>
              <Typography my={"10px"} fontSize={"13px"} color={"#f33a58"}>
                Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người
                sử <br></br>dụng chung có thể sẽ bị khóa.
              </Typography>
              {select ? (
                <Stack
                  direction={"column"}
                  alignItems={"center"}
                  gap={"20px"}
                  my={"20px"}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    width={"320px"}
                    border={"2px solid #ddd"}
                    borderRadius={"30px"}
                    padding={"10px 0"}>
                    <Box width={"15%"}>
                      <img src={user} width={20} height={20} alt='' />
                    </Box>
                    <Box width={"80%"}>
                      <Typography
                        onClick={() => setSelect(!select)}
                        fontSize={"13px"}
                        fontWeight={"600"}>
                        Sử dụng email / số điện thoại
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              ) : (
                <Box my={"20px"}>
                  <form onSubmit={handleSubmit(onFinish)}>
                    <Box padding={"0 65px"}>
                      <Box>
                        <Typography
                          marginLeft={"15px"}
                          textAlign={"left"}
                          fontSize={"14px"}
                          fontWeight={"600"}>
                          Tên của bạn?
                        </Typography>
                        <TextField
                          error={errors.user_name}
                          sx={{
                            width: "100%",
                            height: "42px",
                            mt: "5px",
                            borderRadius: "30px",
                            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ": {
                              borderRadius: "30px",
                            },
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
                              height: "28px",
                            },
                          }}
                          {...register("user_name")}
                          helperText=' '
                          placeholder='Họ và tên của bạn'
                          id='demo-helper-text-aligned-no-helper'
                          size='small'
                        />
                      </Box>
                      <Box mt={"10px"}>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          alignItems={"flex-end"}>
                          <Typography
                            sx={{ position: "relative", zIndex: 10 }}
                            onClick={() => setRegisterType(!registerType)}
                            fontSize={"12px"}
                            color={"#666"}>
                            Đăng ký với Email
                          </Typography>
                        </Stack>

                        <TextField
                          {...register("email")}
                          error={errors.email}
                          sx={{
                            width: "100%",
                            height: "42px",
                            mt: "5px",
                            borderRadius: "30px",
                            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ": {
                              borderRadius: "30px",
                            },
                            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
                              height: "28px",
                            },
                          }}
                          helperText=' '
                          placeholder={"Email"}
                          id='demo-helper-text-aligned-no-helper'
                          size='small'
                        />
                      </Box>
                      <Box>
                        <Button
                          type='submit'
                          sx={{
                            width: "100%",
                            height: "44px",
                            background:
                              "linear-gradient(70.06deg, #2cccff -5%, #22dfbf 106%)",
                            color: "white",
                            borderRadius: "30px",
                            mt: "20px",
                            fontWeight: "700",
                          }}>
                          Đăng ký
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </Box>
              )}
              <Typography fontSize={"14px"} color={"#333"}>
                Bạn đã có tài khoản?{" "}
                <b
                  onClick={() => {
                    setCheck("login");
                    setSelect(true);
                    setRegisterType(false);
                  }}
                  style={{ color: "#f05123" }}>
                  Đăng nhập
                </b>
              </Typography>
              <Typography fontSize={"11px"} color={"#666"} mt={"20px"}>
                Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý
                <br></br> với{" "}
                <a style={{ textDecoration: "underline" }}>
                  điều khoản sử dụng
                </a>{" "}
                của chúng tôi.
              </Typography>
            </Box>
          )}
          {check === "forgotpassword" && (
            <Box sx={{ textAlign: "center", padding: "80px 20px 60px" }}>
              <Box
                onClick={() => setSelect(!select)}
                sx={{ position: "absolute", top: "14%", left: "25px" }}>
                <RiArrowLeftSLine size={"30px"} />
              </Box>

              <Box>
                <img
                  width={100}
                  height={100}
                  style={{ borderRadius: "10px", objectFit: "contain" }}
                  src={logo}
                  alt=''
                />
              </Box>
              <Typography
                my={"10px"}
                fontWeight={"700"}
                variant='h5'
                fontSize={"27px"}>
                Lấy lại mật khẩu
              </Typography>
              <Typography my={"10px"} fontSize={"13px"} color={"#f33a58"}>
                Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người
                sử <br></br>dụng chung có thể sẽ bị khóa.
              </Typography>

              <Box my={"20px"}>
                <form onSubmit={handleSubmit(onFinish)}>
                  <Box padding={"0 65px"}>
                    <Box mt={"10px"}>
                      <TextField
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        sx={{
                          width: "100%",
                          height: "42px",
                          mt: "5px",
                          borderRadius: "30px",
                          ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ": {
                            borderRadius: "30px",
                          },
                          ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
                            height: "28px",
                          },
                        }}
                        helperText=' '
                        placeholder={"Email"}
                        id='demo-helper-text-aligned-no-helper'
                        size='small'
                      />
                    </Box>
                    <Box
                      mt={"10px"}
                      sx={{
                        ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
                          borderRadius: "25px",
                          py: "3px",
                        },
                        ".css-1e6y48t-MuiButtonBase-root-MuiButton-root": {
                          width: "115px",
                        },
                      }}>
                      <TextField
                        disabled={disableForgot}
                        value={otp}
                        onChange={(e: any) => setOtp(e.target.value)}
                        sx={{
                          width: "100%",
                          height: "42px",
                          mt: "5px",
                          borderRadius: "30px",
                          ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ": {
                            borderRadius: "30px",
                            paddingRight: "4px",
                          },
                          ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
                            height: "28px",
                          },
                        }}
                        helperText=' '
                        placeholder={"Nhập mã OTP"}
                        id='demo-helper-text-aligned-no-helper'
                        size='small'
                        InputProps={{
                          endAdornment: (
                            <>
                              {disableForgot ? (
                                <Button
                                  onClick={() => handleOtpForgotPassword(0)}
                                  disabled={!email}
                                  sx={{
                                    background:
                                      "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                                    color: "white",
                                    borderRadius: "99px",
                                    width: "92px",
                                    height: "38px",
                                  }}>
                                  Gửi mã
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleOtpForgotPassword(1)}
                                  disabled={!email}
                                  sx={{
                                    background:
                                      "linear-gradient(to right bottom, #ff8f26, #ff5117)",
                                    color: "white",
                                    borderRadius: "99px",
                                    width: "200px",
                                    height: "38px",
                                  }}>
                                  Kiểm tra mã
                                </Button>
                              )}
                            </>
                          ),
                        }}
                      />
                    </Box>

                    {tokenOtp == null && (
                      <>
                        <Box mt={"10px"}>
                          <TextField
                            type='password'
                            value={passwordNew}
                            onChange={(e: any) =>
                              setPasswordNew(e.target.value)
                            }
                            sx={{
                              width: "100%",
                              height: "42px",
                              mt: "5px",
                              borderRadius: "30px",
                              ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ": {
                                borderRadius: "30px",
                              },
                              ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
                                height: "28px",
                              },
                            }}
                            helperText=' '
                            placeholder={"Mật khẩu mới"}
                            id='demo-helper-text-aligned-no-helper'
                            size='small'
                          />
                        </Box>
                        <Box mt={"10px"}>
                          <TextField
                            type='password'
                            value={confirmPasswordNew}
                            onChange={(e: any) =>
                              setConfirmPasswordNew(e.target.value)
                            }
                            sx={{
                              width: "100%",
                              height: "42px",
                              mt: "5px",
                              borderRadius: "30px",
                              ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root ": {
                                borderRadius: "30px",
                              },
                              ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
                                height: "28px",
                              },
                            }}
                            helperText=' '
                            placeholder={"Nhập lại mật khẩu mới"}
                            id='demo-helper-text-aligned-no-helper'
                            size='small'
                          />
                        </Box>
                      </>
                    )}
                    <Box>
                      <Button
                        onClick={handleForgotPassword}
                        disabled={!passwordNew || !confirmPasswordNew}
                        sx={{
                          width: "100%",
                          height: "44px",
                          background:
                            "linear-gradient(70.06deg, #2cccff -5%, #22dfbf 106%)",
                          color: "white",
                          borderRadius: "30px",
                          mt: "20px",
                          fontWeight: "700",
                        }}>
                        Đặt lại mật khẩu
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>

              <Typography fontSize={"14px"} color={"#333"}>
                Quay lại trang
                <b
                  onClick={() => {
                    setCheck("login");
                    setSelect(true);
                    setRegisterType(false);
                  }}
                  style={{ color: "#f05123" }}>
                  Đăng nhập
                </b>
              </Typography>
              <Typography fontSize={"11px"} color={"#666"} mt={"20px"}>
                Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý
                <br></br> với{" "}
                <a style={{ textDecoration: "underline" }}>
                  điều khoản sử dụng
                </a>{" "}
                của chúng tôi.
              </Typography>
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Header;
const ProgressBar = ({ percentage }: any) => {
  return (
    <div
      className='progress-bar-container'
      style={{
        width: "90%",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        overflow: "hidden",
        marginTop: "10px",
      }}>
      <div
        className='progress-bar'
        style={{
          height: "9px",
          backgroundColor: "#007bff",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 0.5s ease",
          width: `${percentage}%`,
        }}></div>
    </div>
  );
};
