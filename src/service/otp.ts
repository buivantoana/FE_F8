import { toast } from "react-toastify";
import axios from "../core/api";

export const SendOtp = async (phone: any) => {
  try {
    const response = await axios.post(`/otp/send`, phone);
    if (response.status == 0) {
      return response;
    } else {
      toast.error("Đăng ký thất bại");
      return {};
    }
  } catch (error) {
    console.log(`signup`, error);
  }
};
