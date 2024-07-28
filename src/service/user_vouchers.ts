import { toast } from "react-toastify";
import axios from "../core/api";
export const getUserVouchers = async () => {
  try {
    const response = await axios.get(`/user_vouchers`);
    return response.data;
  } catch (error) {
    console.log(`get_UserVouchers`, error);
  }
};
export const getVouchersUser = async (id:any) => {
  try {
    const response = await axios.get(`/user_vouchers/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(`get_UserVouchers`, error);
  }
};
export const getUsersWithoutVoucher = async (id:string) => {
  try {
    const response = await axios.get(`/user_vouchers/${id}`);
    return response.data;
  } catch (error) {
    console.log(`get_UserVouchers`, error);
  }
};
export const addUserVouchers = async (value: any) => {
  try {
    const response:any = await axios.post(`/user_vouchers`, value);
    if(response.status!==0){
      toast.error(response.message)
      return undefined
    }else{
      return response.data;
    }
  } catch (error) {
    console.log(`add_UserVouchers`, error);
  }
};
export const updateUserVouchers = async (value: any) => {
  try {
    console.log(value);
    const response:any = await axios.put(`/user_vouchers/${value._id}`, {
      status: value.status,
      user_id: value.user_id,
      vouchers_id: value.vouchers_id,
      
    });
    if(response.status!==0){
      toast.error(response.message)
      return undefined
    }else{
      return response.data;
    }
  } catch (error) {
    console.log(`update_UserVouchers`, error);
  }
};
export const deleteUserVouchers = async (id?: string) => {
  try {
    const response:any = await axios.delete(`/user_vouchers/${id}`);
    if(response.status!==0){
      toast.error(response.message)
      return undefined
    }else{
      return response.data;
    }
  } catch (error) {
    console.log(`delete_UserVouchers`, error);
  }
};
