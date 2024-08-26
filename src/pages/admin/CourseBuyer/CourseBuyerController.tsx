import { useState } from "react";
import CourseBuyerView from "./CourseBuyerView";
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
import { getAllOrder } from "@/service/order";

const CourseBuyerController = () => {
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
  const { data }: any = useQuery("all_order", {
    queryFn: () => {
      return getAllOrder();
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <CourseBuyerView
        order={
          data !== undefined &&
          data.status == 0 &&
          data.data.length > 0 &&
          data.data.reverse()
        }
      />
    </>
  );
};

export default CourseBuyerController;
