import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
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
import React, { useEffect, useState } from "react";
import bg from "../../../images/cong-thanh-toan-vnpay-va-cach-tich-hop-vao-website-wordpress.jpg";
import vnpay from "../../../images/vnp.png";
import {
  RiArrowLeftRightFill,
  RiArrowRightSLine,
  RiBankCardFill,
  RiDownload2Line,
  RiGift2Line,
  RiSearchLine,
  RiSparkling2Line,
  RiWalletLine,
} from "react-icons/ri";
import { convertToVND, formatDate, getStartOfMonth } from "@/utils/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import profile from "../../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import { useLocalStorage } from "@/hooks/useStorage";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { SendOtp } from "@/service/otp";
import { createWalletPinCode } from "@/service/wallet";
import OTPInput from "react-otp-input";
import { otpEmail } from "@/service/auth";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
type Props = {
  handleChangeTabs: any;
  value: any;
  handleChange: any;
  expanded: any;
  toggleDrawer: any;
  open: any;
  wallet: any;
  handleRechanrge: any;
  setRechanrge: any;
  rechanrge: any;
  transtions: any;
  setSearchEmail: any;
  searchEmail: any;
  handleSearchEmail: any;
  dataEmail: any;
  setTransfer: any;
  transfer: any;
  handleTrander: any;
  stk: any;
  setStk: any;
  amount: any;
  setAmount: any;
  bank: any;
  setBank: any;
  handleWithdraw: any;
  statistical: any;
  optionBank: any;
  setShowProgress: any;
  setNameBank: any;
  nameBank: any;
  queryClient: any;
  isSendPinCode: any;
  setIsSendPinCode: any;
  otp: any;
  handleChangeOtp: any;
  handleSubmitPin: any;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1250dc",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const MyWalletView = ({
  handleChangeTabs,
  value,
  handleChange,
  expanded,
  toggleDrawer,
  open,
  wallet,
  handleRechanrge,
  setRechanrge,
  rechanrge,
  transtions,
  setSearchEmail,
  searchEmail,
  handleSearchEmail,
  dataEmail,
  transfer,
  setTransfer,
  handleTrander,
  stk,
  setStk,
  amount,
  setAmount,
  bank,
  setBank,
  handleWithdraw,
  statistical,
  optionBank,
  setShowProgress,
  setNameBank,
  nameBank,
  queryClient,
  isSendPinCode,
  setIsSendPinCode,
  otp,
  handleChangeOtp,
  handleSubmitPin,
}: Props) => {
  const [user, setUser]: any = useLocalStorage("user", {});
  const [page, setPage] = useState(0);
  const [openAuthen, setOpenAuthen] = useState(false);
  const [typeAuthen, setTypeAuthen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedRows, setPaginatedRows] = useState([]);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
  const toggleDrawerAuthen = (newOpen: boolean) => () => {
    setOpenAuthen(newOpen);
  };
  useEffect(() => {
    if (transtions) {
      setPaginatedRows(
        transtions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
    }
  }, [page, rowsPerPage, transtions]);
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFocus = async () => {
    setShowProgress(true);
    try {
      if (stk.length > 0) {
        var data = JSON.stringify({
          bin: `${bank.bin}`,
          accountNumber: `${stk}`,
        });

        var config = {
          method: "post",
          url: "https://api.vietqr.io/v2/lookup",
          headers: {
            "x-client-id": "e32a70a5-3e34-43b6-8a93-372e3a8dc4e3",
            "x-api-key": "6d1b178c-8a60-47a1-821b-0e1c69417007",
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function(response: any) {
            console.log(response.data);
            if (response.data.data != null) {
              setNameBank({
                isCheck: true,
                message: response.data.data.accountName,
              });
            } else {
              setNameBank({
                isCheck: false,
                message: response.data.desc,
              });
            }
            setShowProgress(false);
          })
          .catch(function(error: any) {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // authen
  const [disableForgot, setDisableForgot] = useState(true);
  const [email, setEmail] = useState(
    Object.keys(user).length > 0 && user.data[0].email
  );
  const [otpForgot, setOtpForgot] = useState("");
  const [tokenOtp, setTokenOtp]: any = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [confirmPasswordNew, setConfirmPasswordNew] = useState("");

  const handleForgotPassword = async () => {
    setShowProgress(true);
    try {
      if (tokenOtp == null) {
        if (passwordNew == confirmPasswordNew) {
          let data = await createWalletPinCode({
            _id: wallet[0]._id,
            pin_code: passwordNew,
            type: "CREATE",
          });
          if (data?.status == 0) {
            setTypeAuthen(false);
            setTokenOtp("");
            setPasswordNew("");
            setConfirmPasswordNew("");
            setOpenAuthen(false);
            toast.success("Đặt mã pin thành công ");
            queryClient.invalidateQueries({
              queryKey: ["wallet"],
            });
          }
        } else {
          toast.warning("Mật khẩu không trùng khớp.");
        }
      }
      if (wallet && wallet.length > 0 && wallet[0].pin_code) {
        if (
          passwordNew.length == 6 &&
          passwordOld.length == 6 &&
          confirmPasswordNew.length == 6
        ) {
          if (passwordNew == confirmPasswordNew) {
            let data: any = await createWalletPinCode({
              _id: wallet[0]._id,
              pin_code: passwordNew,
              pin_code_new: passwordOld,
              pin_code_old: wallet[0].pin_code,
              type: "UPDATE",
            });
            if (data?.status == 0) {
              setOpenAuthen(false);
              setPasswordOld("");
              setPasswordNew("");
              setConfirmPasswordNew("");
              toast.success("Đổi mã pin thành công ");
              queryClient.invalidateQueries({
                queryKey: ["wallet"],
              });
            } else {
              toast.error(data.message);
            }
          } else {
            toast.warning("Mật khẩu không trùng khớp.");
          }
        }
      } else {
        if (passwordNew == confirmPasswordNew) {
          let data = await createWalletPinCode({
            _id: wallet[0]._id,
            pin_code: passwordNew,
            type: "CREATE",
          });
          if (data?.status == 0) {
            setOpenAuthen(false);
            setPasswordNew("");
            setConfirmPasswordNew("");
            toast.success("Đặt mã pin thành công ");
            queryClient.invalidateQueries({
              queryKey: ["wallet"],
            });
          }
        } else {
          toast.warning("Mật khẩu không trùng khớp.");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setShowProgress(false);
  };
  const handleChangePassword = (e: any) => {
    const inputValue = e.target.value;

    // Kiểm tra nếu input chỉ chứa các ký tự số và độ dài <= 6
    if (/^\d*$/.test(inputValue)) {
      if (inputValue.length <= 6) {
        setPasswordNew(inputValue);
      } else {
        toast.warning("Tối đa 6 ký tự");
      }
    } else {
      toast.warning("Mã Pin phải là số");
    }
  };
  const handleChangePasswordOld = (e: any) => {
    const inputValue = e.target.value;

    // Kiểm tra nếu input chỉ chứa các ký tự số và độ dài <= 6
    if (/^\d*$/.test(inputValue)) {
      if (inputValue.length <= 6) {
        setPasswordOld(inputValue);
      } else {
        toast.warning("Tối đa 6 ký tự");
      }
    } else {
      toast.warning("Mã Pin phải là số");
    }
  };
  const handleChangeConfirmPassword = (e: any) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      if (inputValue.length <= 6) {
        setConfirmPasswordNew(inputValue);
      } else {
        toast.warning("Tối đa 6 ký tự");
      }
    } else {
      toast.warning("Mã Pin phải là số");
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleOtpForgotPassword = async (type: any) => {
    setShowProgress(true);
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
        console.log(decodedToken);
        if (decodedToken.password == otpForgot.trim()) {
          setTokenOtp(null);
          toast.success("Mời bạn tạo mật khẩu mới.");
        } else {
          toast.warning("Mã OTP không đúng.");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setShowProgress(false);
  };
  return (
    <Box>
      <Modal
        onClose={() => setIsSendPinCode(false)}
        open={isSendPinCode}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Box
            textAlign={"center"}
            width={"430px"}
            padding={"20px"}
            height={300}>
            <Typography my={"20px"} variant='h4'>
              Xác thực mã Pin
            </Typography>
            <OTPInput
              inputStyle='inputStyle'
              value={otp}
              onChange={handleChangeOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} type='password' />}
            />
            <Button
              sx={{
                mt: "30px",
                width: "100%",
                height: "44px",
                background: "#1250dc",
                color: "white",
                borderRadius: "30px",
                fontWeight: "700",
              }}
              onClick={handleSubmitPin}>
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Modal>

      <Drawer open={open} anchor='right' onClose={toggleDrawer(false)}>
        <Box width={"600px"} padding={"60px 30px"}>
          <img src={vnpay} width={"90%"} alt='' />

          <TextField
            value={rechanrge}
            onChange={(e) => setRechanrge(e.target.value)}
            sx={{ mt: "20px" }}
            id='outlined-basic'
            fullWidth
            label='Nhập số tiền'
            variant='outlined'
          />
          <FormControl sx={{ mt: "20px", display: "block" }}>
            <FormLabel id='demo-radio-buttons-group-label'>
              Cổng thanh toán trực tuyến
            </FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='vnpay'
              name='radio-buttons-group'>
              <FormControlLabel
                value='vnpay'
                control={<Radio />}
                label='VNPAY'
              />
            </RadioGroup>
          </FormControl>
          <Box p={"15px"} border={"1px solid #dddddd"} borderRadius={"10px"}>
            <Typography fontWeight={"bold"}>Ghi chú</Typography>
            <Typography fontSize={"14px"}>
              Số tiền nạp không dưới 10.000Đ
            </Typography>
          </Box>
          <Button
            onClick={handleRechanrge}
            sx={{
              color: "#1250dc",
              border: "2px solid #1250dc",
              height: "35px",
              px: "15px",
              mt: "20px",
            }}>
            Nạp tiền
            <RiWalletLine style={{ marginLeft: "5px" }} size={20} />
          </Button>
        </Box>
      </Drawer>
      <Drawer
        open={openAuthen}
        anchor='right'
        onClose={toggleDrawerAuthen(false)}>
        <Box width={"600px"} padding={"60px 30px"}>
          <Box>
            <Typography variant='h5' my={"15px"} textAlign={"center"}>
              {wallet && wallet.length > 0 && wallet[0].pin_code
                ? typeAuthen
                  ? "Quên mã Pin"
                  : "Đổi mã PIN"
                : "Bật xác thực bằng mã PIN"}
            </Typography>
            <Box padding={"0 65px"}>
              <>
                {!typeAuthen ? (
                  <>
                    {wallet && wallet.length > 0 && wallet[0].pin_code && (
                      <Box mt={"10px"}>
                        <TextField
                          type='password'
                          value={passwordOld}
                          onChange={(e: any) => handleChangePasswordOld(e)}
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
                          placeholder={"Mật khẩu cũ"}
                          id='demo-helper-text-aligned-no-helper'
                          size='small'
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <>
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
                        value={otpForgot}
                        onChange={(e: any) => setOtpForgot(e.target.value)}
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
                  </>
                )}
                {wallet && wallet.length > 0 && wallet[0].pin_code ? (
                  typeAuthen ? (
                    tokenOtp == null && (
                      <Box>
                        <Box mt={"10px"}>
                          <TextField
                            type='password'
                            value={passwordNew}
                            onChange={(e: any) => handleChangePassword(e)}
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
                              handleChangeConfirmPassword(e)
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
                      </Box>
                    )
                  ) : (
                    <Box>
                      <Box mt={"10px"}>
                        <TextField
                          type='password'
                          value={passwordNew}
                          onChange={(e: any) => handleChangePassword(e)}
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
                          onChange={(e: any) => handleChangeConfirmPassword(e)}
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
                    </Box>
                  )
                ) : (
                  <Box>
                    <Box mt={"10px"}>
                      <TextField
                        type='password'
                        value={passwordNew}
                        onChange={(e: any) => handleChangePassword(e)}
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
                        onChange={(e: any) => handleChangeConfirmPassword(e)}
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
                  </Box>
                )}
              </>
              <Box my={"12px"}>
                <Typography ml={"12px"} fontSize={"13px"} color={"#333"}>
                  Bắt buộc mã Pin phải là số và 6 ký tự
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box padding={"0 65px"}>
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
                fontWeight: "700",
              }}>
              Bật xác thực
            </Button>
            {!typeAuthen && (
              <Typography
                onClick={() => setTypeAuthen(true)}
                ml={"15px"}
                fontSize={"13px"}
                color={"blue"}
                mt={"10px"}
                sx={{ cursor: "pointer" }}>
                Quên mã pin
              </Typography>
            )}
          </Box>
        </Box>
      </Drawer>
      <Stack direction={"row"} gap={"40px"}>
        <Box width={"70%"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"end"}>
            <Box>
              <Typography
                variant='h4'
                fontWeight={"bold"}
                display={"flex"}
                alignItems={"center"}>
                <RiWalletLine style={{ marginRight: "10px" }} /> Ví của tôi
              </Typography>
            </Box>

            <Stack>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"end"}
                gap={"10px"}>
                <Typography>Tổng tiền :</Typography>
                <Typography color={"red"} fontWeight={"bold"}>
                  {convertToVND(
                    Number(
                      wallet !== undefined && wallet.length > 0
                        ? wallet[0].balance
                        : 0
                    )
                  )}
                </Typography>
              </Stack>
              <Button
                onClick={toggleDrawer(true)}
                sx={{
                  color: "#1250dc",
                  border: "2px solid #1250dc",
                  height: "35px",
                  px: "15px",
                }}>
                Nạp tiền vào ví
                <RiWalletLine style={{ marginLeft: "5px" }} size={20} />
              </Button>
            </Stack>
          </Stack>
          <Stack>
            <Box width={"100%"} display={"flex"} justifyContent={"center"}>
              <Box
                mt={"20px"}
                sx={{
                  ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected": {
                    color: " #1250dc",
                  },
                  ".css-1aquho2-MuiTabs-indicator": {
                    background: "#1250dc",
                  },
                }}>
                <Tabs value={value} onChange={handleChangeTabs}>
                  <Tab
                    label={
                      <>
                        <Typography sx={{ gap: "5px" }}>Giao dịch</Typography>
                      </>
                    }
                  />
                  <Tab
                    label={
                      <>
                        <Typography sx={{ gap: "5px" }}>Chuyển tiền</Typography>
                      </>
                    }
                  />
                  <Tab
                    label={
                      <>
                        <Typography sx={{ gap: "5px" }}>Rút tiền</Typography>
                      </>
                    }
                  />
                  <Tab
                    label={
                      <>
                        <Typography sx={{ gap: "5px" }}>Thống kê</Typography>
                      </>
                    }
                  />
                </Tabs>
              </Box>
            </Box>
            <Stack direction={"column"} justifyContent={"center"}>
              {value == 0 && (
                <>
                  <TableContainer sx={{ mt: "30px" }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Kiểu</StyledTableCell>
                          <StyledTableCell>Số tiền</StyledTableCell>
                          <StyledTableCell>Trạng thái</StyledTableCell>
                          <StyledTableCell>Email</StyledTableCell>
                          <StyledTableCell>note</StyledTableCell>
                          <StyledTableCell>Thời điểm giao dịch</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      {paginatedRows.length == 0 ? (
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
                                <Skeleton height={"25px"} width='100px' />
                              </TableCell>
                              <TableCell>
                                <Skeleton height={"35px"} width='100px' />
                              </TableCell>
                              <TableCell>
                                <Skeleton height={"25px"} width='200px' />
                              </TableCell>
                              <TableCell>
                                <Skeleton height={"25px"} width='140px' />
                              </TableCell>
                              <TableCell>
                                <Skeleton height={"25px"} width='80px' />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      ) : (
                        <TableBody>
                          {paginatedRows &&
                            paginatedRows.length > 0 &&
                            paginatedRows.map((row: any) => {
                              let message = "";
                              let style = {};
                              if (
                                row.type == "withdraw" &&
                                row.status == "completed"
                              ) {
                                message += "Rút tiền thành công";
                              }
                              if (
                                row.type == "withdraw" &&
                                row.status == "pending"
                              ) {
                                message += "Chờ thanh toán";
                              }
                              if (
                                row.type == "withdraw" &&
                                row.status == "failed"
                              ) {
                                message +=
                                  "Rút tiền thất bại.Ghi chú : " + row.note;
                              }
                              if (
                                row.type == "transfer" &&
                                row.status == "completed"
                              ) {
                                message += "Chuyển tiền thành công";
                              }
                              if (
                                row.type == "transfer" &&
                                row.status == "failed"
                              ) {
                                message += "Chuyển tiền thất bại";
                              }

                              if (
                                row.type == "rechanrge" &&
                                row.status == "completed"
                              ) {
                                message += "Nạp tiền thành công";
                              }
                              if (
                                row.type == "reward" &&
                                row.status == "completed"
                              ) {
                                message += row.note;
                              }
                              if (
                                row.type == "rechanrge" &&
                                row.status == "pending"
                              ) {
                                message += "Chờ thanh toán";
                              }
                              if (
                                row.type == "rechanrge" &&
                                row.status == "failed"
                              ) {
                                message += "Nạp tiền thất bại";
                              }
                              if (
                                row.type == "purchase" &&
                                row.status == "completed"
                              ) {
                                message += "Thanh toán khóa học thành công";
                              }
                              if (row.status == "completed") {
                                style = {
                                  border: "1px solid green",
                                  borderRadius: "80px",
                                  fontSize: "10px",
                                  color: "green",
                                };
                              }
                              if (row.status == "failed") {
                                style = {
                                  border: "1px solid red",
                                  borderRadius: "80px",
                                  fontSize: "10px",
                                  color: "red",
                                };
                              }
                              if (row.status == "pending") {
                                style = {
                                  border: "1px solid #56420c",
                                  borderRadius: "80px",
                                  fontSize: "10px",
                                  color: "#56420c",
                                };
                              }

                              return (
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}>
                                  <TableCell component='th' scope='row'>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        border: "1px solid grey",
                                        padding: "5px",
                                        borderRadius: "8px",
                                        justifyContent: "center",
                                      }}>
                                      {row.type == "transfer" && (
                                        <RiArrowLeftRightFill />
                                      )}
                                      {row.type == "rechanrge" && (
                                        <RiBankCardFill />
                                      )}
                                      {row.type == "withdraw" && (
                                        <RiDownload2Line />
                                      )}
                                      {row.type == "purchase" && (
                                        <RiSparkling2Line />
                                      )}
                                      {row.type == "reward" && <RiGift2Line />}
                                      {row.type}
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    {convertToVND(row.amount)}
                                  </TableCell>
                                  <TableCell>
                                    <Button sx={style}>{row.status}</Button>
                                  </TableCell>

                                  <TableCell>{row.email_transfer}</TableCell>

                                  <TableCell>{message}</TableCell>
                                  <TableCell>
                                    {formatDate(row.createdAt)}
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
                    count={transtions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  <Box
                    p={"15px"}
                    border={"1px solid #dddddd"}
                    borderRadius={"10px"}>
                    <Typography fontWeight={"bold"}>Ghi chú</Typography>
                    <Typography
                      ml={"10px"}
                      fontWeight={"bold"}
                      fontSize={"15px"}>
                      1.Kiểu
                    </Typography>
                    <ul
                      style={{
                        margin: " 0",
                        fontSize: "14px",
                        color: "#423a3a",
                      }}>
                      <li style={{ margin: "0" }}>
                        Rechanrge : Nạp tiền vào ví{" "}
                      </li>
                      <li style={{ margin: "0" }}>
                        Transfer : Chuyển tiền từ ví của mình sang ví nguời khác
                        bằng Email{" "}
                      </li>
                      <li style={{ margin: "0" }}>
                        Withdraw : Rút tiền từ ví của mình về tài khoản ngân
                        hàng{" "}
                      </li>
                      <li style={{ margin: "0" }}>
                        Purchase : Thanh toán tiền khi mua khóa học
                      </li>
                      <li style={{ margin: "0" }}>reward : Phần thưởng</li>
                    </ul>
                    <Typography
                      ml={"10px"}
                      fontWeight={"bold"}
                      fontSize={"15px"}>
                      2.Trạng thái
                    </Typography>
                    <ul
                      style={{
                        margin: " 0",
                        fontSize: "14px",
                        color: "#423a3a",
                      }}>
                      <li style={{ margin: "0" }}>Completed : Thành công </li>
                      <li style={{ margin: "0" }}>Pending : Đang xử lý </li>
                      <li style={{ margin: "0" }}>Failed : Thất bại </li>
                    </ul>
                    <Typography
                      ml={"10px"}
                      fontWeight={"bold"}
                      fontSize={"15px"}>
                      3.Khiếu nại
                    </Typography>
                    <ul
                      style={{
                        margin: " 0",
                        fontSize: "14px",
                        color: "#423a3a",
                      }}>
                      <li style={{ margin: "0" }}>
                        Rút tiền : Nếu quý khách thấy trạng thái rút tiền thành
                        công mà tài khoản chưa nhận được.Vui lòng liên hệ với hỗ
                        trợ để được giải quyết.
                      </li>
                    </ul>
                  </Box>
                </>
              )}

              {value == 1 && (
                <>
                  <Box
                    display={"flex"}
                    mt={"20px"}
                    flexDirection={"column"}
                    alignItems={"start"}
                    width={"100%"}>
                    <Box>
                      <TextField
                        value={searchEmail}
                        size='small'
                        onChange={(e) => setSearchEmail(e.target.value)}
                        type={"email"}
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
                        placeholder='Tìm kiếm người dùng bằng email...'
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='start'>
                              <Box
                                onClick={handleSearchEmail}
                                sx={{ cursor: "pointer" }}>
                                <RiSearchLine />
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    {dataEmail.length > 0 && (
                      <Accordion
                        sx={{ width: "100%", marginTop: "20px" }}
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls='panel1bh-content'
                          id='panel1bh-header'>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            gap={"10px"}>
                            <img
                              src={
                                dataEmail[0].image.url
                                  ? dataEmail[0].image.url
                                  : profile
                              }
                              width={"30px"}
                              height={"30px"}
                              style={{ borderRadius: "50%" }}
                              alt=''
                            />
                            <Typography>{dataEmail[0].user_name}</Typography>
                          </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stack direction={"row"} gap={"20px"}>
                            <TextField
                              value={transfer}
                              id='outlined-basic'
                              size='small'
                              placeholder='Nhập số tiền cần chuyển'
                              variant='outlined'
                              onChange={(e) => setTransfer(e.target.value)}
                            />
                            <Button
                              onClick={handleTrander}
                              sx={{
                                color: "#1250dc",
                                border: "2px solid #1250dc",

                                px: "15px",
                              }}>
                              Chuyển tiền
                              <RiArrowLeftRightFill
                                style={{ marginLeft: "5px" }}
                                size={20}
                              />
                            </Button>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Box>
                  <Box
                    mt={"15px"}
                    p={"15px"}
                    border={"1px solid #dddddd"}
                    borderRadius={"10px"}>
                    <Typography fontWeight={"bold"}>Ghi chú</Typography>
                    <Typography fontSize={"14px"}>
                      Tìm kiếm đúng Email nguời dùng
                    </Typography>
                  </Box>
                </>
              )}
              {value == 2 && (
                <>
                  <Box
                    display={"flex"}
                    width={"100%"}
                    mt={"20px"}
                    justifyContent={"center"}>
                    <Box
                      width={"100%"}
                      border={"1px solid #dddddd"}
                      borderRadius={"10px"}>
                      <Stack
                        p={"15px"}
                        borderBottom={"1px solid #dddddd"}
                        direction={"row"}
                        gap={"30px"}
                        alignItems={"end"}>
                        <RiBankCardFill size={30} style={{ color: "#333" }} />
                        <Typography>Thanh toán bằng thẻ</Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        p={"15px"}
                        width={"100%"}
                        borderBottom={"1px solid #dddddd"}
                        gap={"30px"}>
                        <img
                          width={"50%"}
                          src='http://cafefcdn.com/thumb_w/650/2019/1/15/logo-cac-ngan-hang-o1-1504769513088-1-15426822036241306429105-crop-15426822135161921260068-15475498874711162616360-crop-15475498929411148016221.jpg'
                          alt=''
                        />
                        <Box width={"50%"} mt={"15px"}>
                          <FormControl sx={{ m: 1, width: "95%" }}>
                            <BankSelect
                              optionBank={optionBank}
                              setBank={setBank}
                            />
                          </FormControl>
                          <TextField
                            value={stk}
                            error={
                              nameBank !== null && !nameBank.isCheck
                                ? true
                                : false
                            }
                            onChange={(e) => setStk(e.target.value)}
                            id='outlined-basic'
                            sx={{ width: "95%", m: 1 }}
                            label='Số tài khoản'
                            variant='outlined'
                            autoComplete='off'
                            onBlur={handleFocus}
                          />
                          {nameBank !== null && (
                            <>
                              {nameBank.isCheck ? (
                                <TextField
                                  defaultValue={nameBank.message}
                                  id='outlined-basic'
                                  sx={{ width: "95%", m: 1 }}
                                  label='Tên Tài khoản'
                                  variant='outlined'
                                />
                              ) : (
                                <Typography
                                  color={"red"}
                                  ml={"15px"}
                                  fontSize={"13px"}>
                                  {nameBank.message}
                                </Typography>
                              )}
                            </>
                          )}
                          <TextField
                            value={amount}
                            onChange={(e) => {
                              const inputValue = e.target.value;

                              const numericValue = inputValue.replace(
                                /\D/g,
                                ""
                              );
                              setAmount(formatNumber(Number(numericValue)));
                            }}
                            id='outlined-basic'
                            sx={{ width: "95%", m: 1 }}
                            label='Số tiền'
                            variant='outlined'
                            autoComplete='off'
                            inputMode='numeric'
                          />
                          <Button
                            onClick={handleWithdraw}
                            size='small'
                            sx={{
                              color: "#1250dc",
                              border: "2px solid #1250dc",
                              m: 1,
                              width: "95%",
                              height: "50px",
                            }}>
                            Rút tiền
                            <RiArrowLeftRightFill
                              style={{ marginLeft: "5px" }}
                              size={17}
                            />
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                  <Box
                    mt={"15px"}
                    p={"15px"}
                    border={"1px solid #dddddd"}
                    borderRadius={"10px"}>
                    <Typography fontWeight={"bold"}>Ghi chú</Typography>
                    <Typography fontSize={"14px"}>
                      Chọn đúng ngân hàng
                    </Typography>
                    <Typography fontSize={"14px"}>
                      Nhập đúng số tài khoản
                    </Typography>
                    <Typography fontSize={"14px"}>
                      Số tiền rút không dưòi 10.000Đ
                    </Typography>
                  </Box>
                </>
              )}
              {value == 3 && (
                <>
                  <Box
                    display={"flex"}
                    width={"100%"}
                    mt={"20px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={"40px"}>
                    <Typography>
                      Thông kê từ ngày {getStartOfMonth()}
                    </Typography>
                    <PolarAreaChart statistical={statistical} />
                  </Box>
                </>
              )}
            </Stack>
          </Stack>
        </Box>
        <Box width={"27%"} display={"flex"} justifyContent={"center"}>
          <Box>
            <Box display={"flex"} my={"25px"} justifyContent={"center"}>
              <Button
                onClick={toggleDrawerAuthen(true)}
                sx={{
                  color: "#1250dc",
                  border: "2px solid #1250dc",
                  height: "35px",
                  px: "15px",

                  float: "right",
                }}>
                {wallet && wallet.length > 0 && wallet[0].pin_code
                  ? "Đổi mã PIN"
                  : "Bật xác thực bằng mã PIN"}
              </Button>
            </Box>
            <img
              src={bg}
              width={"100%"}
              height={"400px"}
              style={{ borderRadius: "10px" }}
              alt=''
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default MyWalletView;

const PolarAreaChart = (props: any) => {
  const data = {
    labels: ["Nạp tiền", "Rút tiền", "Thanh toán", "Thưởng", "Chuyển tiền"],
    datasets: [
      {
        data: [
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.rechanrge
            : 0,
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.withdraw
            : 0,
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.purchase
            : 0,
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.reward
            : 0,
          props.statistical !== undefined && props.statistical.status == 0
            ? props.statistical.transfer
            : 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    scales: {
      r: {
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Biểu đồ thống kê chi tiêu trong tháng vừa qua",
      },
    },
  };

  return (
    <Box width={500} height={500}>
      <PolarArea data={data} options={options} />
    </Box>
  );
};

function BankSelect(props: any) {
  return (
    <Autocomplete
      id='country-select-demo'
      options={props.optionBank}
      autoHighlight
      onChange={(e, value) => {
        props.setBank(value);
      }}
      getOptionLabel={(option: any) => option.short}
      renderOption={(props, option) => {
        const { key, ...optionProps }: any = props;
        return (
          <Box
            key={key}
            component='li'
            sx={{ "& > img": { mr: 2, flexShrink: 0 }, fontSize: "15px" }}
            {...optionProps}>
            <img
              loading='lazy'
              width='60'
              style={{ objectFit: "cover" }}
              src={option.image}
              alt=''
            />
            {option.short} : {option.name}
          </Box>
        );
      }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label='Select Bank...'
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
          }}
        />
      )}
    />
  );
}
const formatNumber = (amount: any) => {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
  }).format(amount);
};
