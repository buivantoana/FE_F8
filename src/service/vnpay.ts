import axios from "../core/api";
export const getVnpay = async (values: any) => {
  try {
    const response = await axios.post(`/order/create_payment_url`, values);
    return response;
  } catch (error) {
    console.log(`get_Food`, error);
  }
};