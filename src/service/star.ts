import axios from "../core/api";
export const getStar = async (courses_id:any,type:any) => {
  try {
    const response = await axios.get(`/star/${courses_id}/${type}`);
    return response;
  } catch (error) {
    console.log(`get_Star`, error);
  }
};
export const getAllStar = async () => {
  try {
    const response = await axios.get(`/star`);
    return response;
  } catch (error) {
    console.log(`get_Star`, error);
  }
};

export const addStar = async (value: any) => {
  try {
    const response = await axios.post(`/star`, value);
    return response;
  } catch (error) {
    console.log(`add_Star`, error);
  }
};
export const deleteStar = async (id: any) => {
    try {
      const response = await axios.delete(`/star/${id}`);
      return response;
    } catch (error) {
      console.log(`add_Star`, error);
    }
  };
  export const updateStar = async (id: any,value:any) => {
    try {
      const response = await axios.put(`/star/${id}`,value);
      return response;
    } catch (error) {
      console.log(`add_Star`, error);
    }
  };