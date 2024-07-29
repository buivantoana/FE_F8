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
  
  }
  export default Header;