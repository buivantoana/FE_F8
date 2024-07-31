import axios from "../core/api";

export const getUserWallet = async (id: any) => {
  try {
    const response = await axios.get(`/wallet/${id}`);

    return response;
  } catch (error) {
    console.log(`get_wallet`, error);
  }
};
export const sendPinCodeWallet = async (data: any) => {
  try {
    const response = await axios.post(`/wallet/send_pin_code`, {
      pin_code_new: data.pin_code_new,
      pin_code_old: data.pin_code_old,
    });

    return response;
  } catch (error) {
    console.log(`get_wallet`, error);
  }
};
export const updateWallet = async (value: any) => {
  try {
    const response = await axios.put(`/wallet/${value._id}`, {
      user_id: value.user_id,
      balance: value.balance,
    });
    return response;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
export const createWalletPinCode = async (value: any) => {
  try {
    const response = await axios.put(`/wallet/create_pin_code/${value._id}`, {
      pin_code: value.pin_code,
      pin_code_new: value.pin_code_new,
      pin_code_old: value.pin_code_old,
      type: value.type,
    });
    return response;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
export const updateRewardWallet = async (value: any) => {
  try {
    const response = await axios.put(`/wallet/reward/${value.user_id}`, {
      amount: value.amount,
    });
    return response;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
