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
    const [anchorElNotify, setAnchorElNotify] =
      useState<HTMLButtonElement | null>(null);
    const [anchorElProfile, setAnchorElProfile] =
      useState<HTMLButtonElement | null>(null);
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
    const { register, reset, handleSubmit, onFinish, errors }: any =
    useAuthMutation({
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
    
  }
  export default Header;