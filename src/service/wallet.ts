import axios from "../core/api";

export const getUserWallet = async (id: any) => {
  try {
    const response = await axios.get(`/wallet/${id}`);

    return response;
  } catch (error) {
    console.log(`get_wallet`, error);
  }
}
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
