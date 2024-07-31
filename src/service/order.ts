import axios from "../core/api";
export const addOrder = async (value: any) => {
  try {
    const response = await axios.post(`/order`, value);
    return response;
  } catch (error) {
    console.log(`add_Lesson`, error);
  }
};
export const getAllOrder = async () => {
  try {
    const response = await axios.get(`/order`);
    return response;
  } catch (error) {
    console.log(`add_Lesson`, error);
  }
};

export const updateOrder = async (value: any) => {
  try {
    const response = await axios.put(`/order/${value}`);
    return response;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
export const deleteOrder = async (id?: string) => {
  try {
    const response = await axios.delete(`/order/${id}`);
    return response;
  } catch (error) {
    console.log(`delete_Categories`, error);
  }
};

export const getOrderUserAndCourses = async (
  courses_id: string,
  user_id: string
) => {
  try {
    const response = await axios.get(
      `/order/user_courses/${courses_id}/${user_id}`
    );
    return response;
  } catch (error) {
    console.log(`get_Categories`, error);
  }
};
