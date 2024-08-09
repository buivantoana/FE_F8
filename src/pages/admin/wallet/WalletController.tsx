import { useState } from "react";
import WalletView from "./WalletView";
import { useQuery, useQueryClient } from "react-query";
import {
  getWithdraw,
  updateTransaction,
  updateTransactionWithDrawFaild,
} from "@/service/transactions";
import { toast } from "react-toastify";
import { addNotify } from "@/service/notify";
import { convertToVND } from "@/utils/utils";
import { io } from "socket.io-client";
import { updateRewardWallet } from "@/service/wallet";

const WalletController = () => {
  const socket = io("http://localhost:4000");
  const [value, setValue]: any = useState(0);
  const [note, setNote]: any = useState("");
  const [dataFaild, setDataFaild]: any = useState(null);
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const queryClient = useQueryClient();
  const { data }: any = useQuery("wallet_withdraw", {
    queryFn: () => {
      return getWithdraw();
    },
    refetchOnWindowFocus: false,
  });
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    setAnchorEl(event.currentTarget);
    setDataFaild(data);
  };


  const handleWithdrawSuccess = async (id: any) => {
    try {
      await updateStatusTransaction(id, "completed");
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatusTransaction = async (id: any, status: any) => {
    try {
      let data = await updateTransaction({ _id: id, status: status,type:"withdraw" });
      if (data?.status == 0) {
        toast.success("Thành công");
        socket.emit("getNewNotify", {
          user_id: data.data.user_id[0],
        });
        queryClient.invalidateQueries({
          queryKey: ["wallet_withdraw"],
        });
      }
    } catch (error) {}
  };

  const handleWithdrawFaild = async () => {
    try {
      let data = await updateTransactionWithDrawFaild({
        _id: dataFaild._id,
        type: dataFaild.type,
        amount: dataFaild.amount,
        status: "failed",
        stk: dataFaild.stk,
        bankAccount: dataFaild.bankAccount,
        user_id: [dataFaild.user_id[0]],
        note: note,
      });
      if (data?.status == 0) {
        toast.success("Thành công");
        queryClient.invalidateQueries({
          queryKey: ["wallet_withdraw"],
        });
        await updateRewardWallet({user_id:dataFaild.user_id[0],amount:dataFaild.amount})
        socket.emit("getNewNotify", {
          user_id: dataFaild.user_id[0],
        });
        handleClose()
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <WalletView
        handleChangeTabs={handleChangeTabs}
        value={value}
        completed={
          data !== undefined && data.status == 0
            ? data.data.filter(
                (e: any) => e.status == "completed" || e.status == "failed"
              ).reverse()
            : []
        }
        notcompleted={
          data !== undefined && data.status == 0
            ? data.data.filter((e: any) => e.status == "pending")
            : []
        }
        handleWithdrawSuccess={handleWithdrawSuccess}
        handleClose={handleClose}
        id={id}
        anchorEl={anchorEl}
        handleClick={handleClick}
        open={open}
        note={note}
        setNote={setNote}
        handleWithdrawFaild={handleWithdrawFaild}
      />
    </>
  );
};

export default WalletController;
