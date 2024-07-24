import axios from "../core/api";
export const getOneTransaction = async (id: any) => {
  try {
    const response = await axios.get(`/transaction/${id}`);
    return response;
  } catch (error) {
    console.log(`get_Categories`, error);
  }
};
export const getWithdraw = async () => {
  try {
    const response = await axios.get(`/transaction`);
    return response;
  } catch (error) {
    console.log(`get_transaction`, error);
  }
};
export const getUserTransaction = async (id: any) => {
  try {
    const response = await axios.get(`/transaction/user/${id}`);
    return response;
  } catch (error) {
    console.log(`get_Categories`, error);
  }
};
export const getUserStatisticalTransaction = async (id: any) => {
  try {
    const response = await axios.get(`/transaction/statistical/${id}`);
    return response;
  } catch (error) {
    console.log(`get_wallet`, error);
  }
};
export const getAdminStatisticalTransaction = async (date: any) => {
  try {
    const response = await axios.get(
      `/transaction/statistical/admin/line/${date}`
    );
    return response;
  } catch (error) {
    console.log(`get_wallet`, error);
  }
};
export const addTransactions = async (value: any) => {
  try {
    const response = await axios.post(`/transaction`, value);
    return response;
  } catch (error) {
    console.log(`add_Categories`, error);
  }
};
export const updateTransaction = async (value: any) => {
  try {
    const response = await axios.put(`/transaction/status/${value._id}`, {
      status: value.status,
      type: value.type,
    });
    return response;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
export const updateTransactionWithDrawFaild = async (value: any) => {
  try {
    const response = await axios.put(
      `/transaction/withdraw_faild/${value._id}`,
      {
        type: value.type,
        amount: value.amount,
        status: value.status,
        stk: value.stk,
        bankAccount: value.bankAccount,
        user_id: value.user_id,
        note: value.note,
      }
    );
    return response;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
