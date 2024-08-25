import { useEffect, useState } from "react";
import MyWalletView from "./MyWalletView";
import { useQuery, useQueryClient } from "react-query";
import {
  getUserWallet,
  sendPinCodeWallet,
  updateWallet,
} from "@/service/wallet";
import { useLocalStorage } from "@/hooks/useStorage";
import {
  addTransactions,
  getOneTransaction,
  getUserStatisticalTransaction,
  getUserTransaction,
  updateTransaction,
} from "@/service/transactions";
import { getVnpay } from "@/service/vnpay";
import { toast } from "react-toastify";
import { getOneUser } from "@/service/auth";
import { io } from "socket.io-client";
import { addNotify } from "@/service/notify";
import { convertToVND } from "@/utils/utils";
import { generateQrCode, getbanks } from "@/service/qr_code";

import Progress from "@/components/Process";
const MyWalletController = () => {
  const socket = io("http://localhost:4000");
  const [value, setValue]: any = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState(false);
  const [rechanrge, setRechanrge] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [stk, setStk] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank]: any = useState("");
  const [optionBank, setOptionBank] = useState([]);
  const [dataEmail, setDataEmail]: any = useState([]);
  const [transfer, setTransfer] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [nameBank, setNameBank]: any = useState(null);
  const [isSendPinCode, setIsSendPinCode] = useState(false);
  const [otp, setOtp] = useState("");
  const [typeTransaction, setTypeTransaction] = useState("");

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const queryParams = new URLSearchParams(location.search);
  const paramTransactionStatus = queryParams.get("vnp_TransactionStatus");
  const paramOrder_id = queryParams.get("order_id");
  const [user, setUser]: any = useLocalStorage("user", {});
  const [isPinVerified, setIsPinVerified] = useState({
    isTrans: false,
    isWith: false,
  });
  let count = 0;

  const queryClient = useQueryClient();
  const { data }: any = useQuery("wallet", {
    queryFn: () => {
      if (user.data[0]._id) {
        return getUserWallet(user.data[0]._id);
      }
    },
    refetchOnWindowFocus: false,
  });
  const { data: transtion }: any = useQuery("transtion", {
    queryFn: () => {
      if (user.data[0]._id) {
        return getUserTransaction(user.data[0]._id);
      }
    },
    refetchOnWindowFocus: false,
  });

  const { data: statistical }: any = useQuery("statistical", {
    queryFn: () => {
      if (user.data[0]._id) {
        return getUserStatisticalTransaction(user.data[0]._id);
      }
    },
    refetchOnWindowFocus: false,
  });
  const {}: any = useQuery("banks", {
    queryFn: () => {
      return getbanks();
    },
    onSuccess(data: any) {
      if (data?.data.length > 0) {
        let option = data.data.map((item: any) => {
          return {
            image: item.logo,
            name: item.name,
            short: item.shortName,
            bin: item.bin,
          };
        });
        setOptionBank(option);
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    (async () => {
      let message = "";
      if (paramTransactionStatus) {
        let check: any = await getStatusTransaction();
        console.log(check);
        if (check) {
          if (count == 0) {
            toast.success("không nên sử dụng lại url này");
            count++;
          }
        } else {
          switch (paramTransactionStatus) {
            case "00":
              message += "Giao dịch thành công";
              break;
            case "01":
              message += "Giao dịch chưa hoàn tất";
              break;
            case "02":
              message += "Giao dịch bị lỗi";
              break;
            case "04":
              message +=
                "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)";
              break;
            case "05":
              message += "VNPAY đang xử lý giao dịch này (GD hoàn tiền)";
              break;
            case "06":
              message +=
                "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)";
              break;
            case "07":
              message += "Giao dịch bị nghi ngờ gian lận";
              break;
            case "09":
              message += "GD Hoàn trả bị từ chối";
              break;

            default:
              break;
          }
          if (message == "Giao dịch thành công") {
            if (count == 0) {
              let amount: any = await updateStatusTransaction(
                "completed",
                "rechanrge"
              );
              if (amount) {
                socket.emit("getNewNotify", {
                  user_id: user.data[0]._id,
                });
                await updateWalletSuccess(amount, user.data[0]._id);
                toast.success(message);
                count++;
              }
            }
          } else {
            if (count == 0) {
              await updateStatusTransaction("failed", "rechanrge");
              queryClient.invalidateQueries({
                queryKey: ["wallet"],
              });
              queryClient.invalidateQueries({
                queryKey: ["transtion"],
              });
              toast.error(message);
              count++;
            }
          }
        }
      }
    })();
  }, []);
  const updateStatusTransaction = async (status: any, type: any) => {
    try {
      let data = await updateTransaction({
        _id: paramOrder_id,
        status: status,
        type: type,
      });
      if (data?.status == 0) {
        return Number(data.data.amount);
      }
    } catch (error) {}
  };
  const updateWalletSuccess = async (
    amount: any,
    user_id: any,
    transfer?: any
  ) => {
    try {
      let wallet = await getUserWallet(user_id);
      if (wallet?.status == 0) {
        let res = await updateWallet({
          _id: wallet.data[0]._id,
          user_id: [wallet.data[0].user_id[0]],
          balance: transfer ? amount : Number(wallet.data[0].balance) + amount,
        });
        if (res?.status == 0) {
          queryClient.invalidateQueries({
            queryKey: ["wallet"],
          });
          queryClient.invalidateQueries({
            queryKey: ["transtion"],
          });
          queryClient.invalidateQueries({
            queryKey: ["statistical"],
          });
        }
      }
    } catch (error) {}
  };
  const getStatusTransaction = async () => {
    try {
      let data = await getOneTransaction(paramOrder_id);

      if (data?.status == 0 && data.data.status == "completed") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleRechanrge = async () => {
    try {
      let data = await addTransactions({
        user_id: [user.data[0]._id],
        type: "rechanrge",
        status: "pending",
        amount: rechanrge,
      });
      if (data?.status == 0) {
        let url: any = await getVnpay({
          order_id: data.data._id,
          amount: rechanrge,
          type: "wallet",
        });
        if (url) {
          window.location.href = url;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchEmail = async () => {
    try {
      if (searchEmail == user.data[0].email) {
        toast.warning("Không tìm Email chính mình");
      } else {
        let data = await getOneUser(searchEmail);
        if (data?.status == 0) {
          if (data.data[0]) {
            setDataEmail(data.data);
          } else {
            toast.warning("Không tìm thấy email người dùng.");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleTrander = async () => {
    setTypeTransaction("tranfer");
    try {
      if (Number(data.data[0].balance) - Number(transfer) >= 0) {
        if (!isPinVerified.isTrans) {
          setIsSendPinCode(true);
        } else {
          let transactionsUser = await addTransactions({
            user_id: [user.data[0]._id],
            type: "transfer",
            status: "completed",
            amount: transfer,
            email_transfer: `Đến Email : ${dataEmail[0].email}`,
          });
          let transactionsTranfer = await addTransactions({
            user_id: [dataEmail[0]._id],
            type: "transfer",
            status: "completed",
            amount: transfer,
            email_transfer: `Từ Email: ${user.data[0].email}`,
          });
          let wallet = await getUserWallet(dataEmail[0]._id);
          if (
            transactionsUser?.status == 0 &&
            transactionsTranfer?.status == 0
          ) {
            toast.success("Chuyển tiền thành công");
            await updateWalletSuccess(
              Number(data.data[0].balance) - Number(transfer),
              user.data[0]._id,
              true
            );
            await updateWalletSuccess(
              wallet?.data[0].balance + Number(transfer),
              dataEmail[0]._id,
              true
            );
            await addNotify({
              user_id: [dataEmail[0]._id],
              title: "Ví của bạn.",
              message: `Bạn vừa nhận ${convertToVND(
                transfer
              )} vào ví của mình được chuyển từ tài khoản có email là ${
                user.data[0].email
              }.`,
              url: "/my_wallet",
              read: false,
            });
            await addNotify({
              user_id: [user.data[0]._id],
              title: "Ví của bạn.",
              message: `Bạn vừa chuyển ${convertToVND(
                transfer
              )} vào ví của tài khoản có email là ${dataEmail[0].email}.`,
              url: "/my_wallet",
              read: false,
            });
            setIsPinVerified({ ...isPinVerified, isTrans: false });
            setOtp("");
            setTransfer("");
            setTimeout(() => {
              socket.emit("getNewNotify", {
                user_id: dataEmail[0]._id,
              });
            }, 1000);
            socket.emit("getNewNotify", {
              user_id: user.data[0]._id,
            });

            queryClient.invalidateQueries({
              queryKey: ["wallet"],
            });
            queryClient.invalidateQueries({
              queryKey: ["transtion"],
            });
            queryClient.invalidateQueries({
              queryKey: ["statistical"],
            });
          }
        }
      } else {
        toast.warning("Bạn không đủ số dư");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWithdraw = async () => {
    setTypeTransaction("with");
    try {
      if (bank !== "" && stk !== "" && amount !== "") {
        if (Number(data.data[0].balance) - Number(amount) >= 0) {
          setShowProgress(true);
          const response: any = await generateQrCode({
            bank: bank.bin,
            accountName: nameBank.message,
            accountNumber: stk,
            amount: parseInt(amount.replace(/\./g, ""), 10),
            memo: "",
          });
          setShowProgress(false);
          console.log("handleWithdraw", response);

          if (!isPinVerified.isWith) {
            setIsSendPinCode(true);
          } else {
            let transactions = await addTransactions({
              user_id: [user.data[0]._id],
              type: "withdraw",
              status: "pending",
              amount: parseInt(amount.replace(/\./g, ""), 10),
              stk: stk,
              bankAccount: bank.short,
              qr_code: response.qrCode.data.qrCode,
            });
            if (transactions?.status == 0) {
              updateWalletSuccess(
                Number(data.data[0].balance) -
                  Number(parseInt(amount.replace(/\./g, ""), 10)),
                user.data[0]._id,
                true
              );

              setIsPinVerified({ ...isPinVerified, isWith: false });
              setOtp("");
              queryClient.invalidateQueries({
                queryKey: ["wallet"],
              });
              queryClient.invalidateQueries({
                queryKey: ["transtion"],
              });
              queryClient.invalidateQueries({
                queryKey: ["statistical"],
              });
              toast.success("Thành công");
            }
          }
        }
      } else {
        toast.warning("Cần nhập đầy đủ thông tin.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // send pin code

  const handleChangeOtp = (otp: any) => {
    if (/^\d*$/.test(otp)) {
      setOtp(otp);
    } else {
      toast.warning("Mã Pin phải là số");
    }
  };

  useEffect(() => {
    if (isPinVerified.isTrans) {
      handleTrander();
    }
    if (isPinVerified.isWith) {
      handleWithdraw();
    }
  }, [isPinVerified]);
  const handleSubmitPin = async () => {
    try {
      if (otp.length == 6) {
        let result = await sendPinCodeWallet({
          pin_code_new: otp,
          pin_code_old: data.data[0].pin_code,
        });
        if (result?.status == 0) {
          setIsSendPinCode(false);
          if (typeTransaction == "with") {
            setIsPinVerified({ ...isPinVerified, isWith: true });
          } else {
            setIsPinVerified({ ...isPinVerified, isTrans: true });
          }
        } else {
          toast.error("Sai mã Pin");
        }
      } else {
        toast.warning("Nhập đủ 6 ký tự");
      }
    } catch (error) {}
  };
  return (
    <>
      <Progress showProgress={showProgress} />
      <MyWalletView
        handleRechanrge={handleRechanrge}
        wallet={
          data !== undefined &&
          Object.keys(data)[0] &&
          data.status == 0 &&
          data.data
        }
        transtions={
          transtion !== undefined &&
          Object.keys(transtion)[0] &&
          transtion.status == 0 &&
          transtion.data
        }
        handleChangeTabs={handleChangeTabs}
        handleChange={handleChange}
        toggleDrawer={toggleDrawer}
        open={open}
        expanded={expanded}
        value={value}
        setRechanrge={setRechanrge}
        rechanrge={rechanrge}
        setSearchEmail={setSearchEmail}
        searchEmail={searchEmail}
        handleSearchEmail={handleSearchEmail}
        dataEmail={dataEmail}
        setTransfer={setTransfer}
        transfer={transfer}
        handleTrander={handleTrander}
        stk={stk}
        setStk={setStk}
        amount={amount}
        setAmount={setAmount}
        bank={bank}
        setBank={setBank}
        handleWithdraw={handleWithdraw}
        statistical={statistical}
        optionBank={optionBank}
        setShowProgress={setShowProgress}
        setNameBank={setNameBank}
        nameBank={nameBank}
        queryClient={queryClient}
        isSendPinCode={isSendPinCode}
        setIsSendPinCode={setIsSendPinCode}
        otp={otp}
        handleChangeOtp={handleChangeOtp}
        handleSubmitPin={handleSubmitPin}
      />
    </>
  );
};

export default MyWalletController;
