import { toast } from "react-toastify";
import axios from "../core/api";
export const getVouchers = async () => {
  try {
    const response = await axios.get(`/vouchers`);
    return response.data;
  } catch (error) {
    console.log(`get_Vouchers`, error);
  }
};
export const addVouchers = async (value: any) => {
  try {
    const response:any = await axios.post(`/vouchers`, value);
    if(response.status!==0){
      toast.error(response.message)
      return undefined
    }else{
      return response.data;
    }
  } catch (error) {
    console.log(`add_Vouchers`, error);
  }
};
export const updateVouchers = async (value: any) => {
  try {
    const response:any = await axios.put(`/vouchers/${value._id}`, {
      code: value.code,
      description: value.description,
      start_date: value.start_date,
      end_date: value.end_date,
      discount_type: value.discount_type,
      discount_value: value.discount_value,
    });
    if(response.status!==0){
      toast.error(response.message)
      return undefined
    }else{
      return response.data;
    }
  } catch (error) {
    console.log(`update_Vouchers`, error);
  }
};
export const deleteVouchers = async (id?: string) => {
  try {
    const response:any = await axios.delete(`/Vouchers/${id}`);
    if(response.status!==0){
      toast.error(response.message)
      return undefined
    }else{
      return response.data;
    }
  } catch (error) {
    console.log(`delete_Vouchers`, error);
  }
};
