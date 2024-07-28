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

  }
  export default Header;