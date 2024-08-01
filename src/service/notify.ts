import axios from "../core/api";
export const getUserNotify = async (id:any) => {
    try {
      const response = await axios.get(`/notify/${id}`);
      return response;
    } catch (error) {
      console.log(`get_notify`, error);
    }
  };
  export const updateUserReadNotify = async (id:any) => {
    try {
      const response = await axios.put(`/notify/read/${id}`);
      return response;
    } catch (error) {
      console.log(`get_notify`, error);
    }
  };
  export const addNotify = async (value: any) => {
    try {
      const response = await axios.post(`/notify`, value);
      return response;
    } catch (error) {
      console.log(`add_notify`, error);
    }
  };