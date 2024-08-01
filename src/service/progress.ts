import axios from "../core/api";
export const addProgress = async (value: any) => {
  try {
    const response = await axios.post(`/progress`, value);
    return response;
  } catch (error) {
    console.log(`add_progress`, error);
  }
};
export const checkExersiceProgress = async (value: any) => {
  try {
    const response = await axios.post(`/progress/exersice`, value);
    return response;
  } catch (error) {
    console.log(`add_progress`, error);
  }
};
export const getProgress = async (id: string,courses_id:string) => {
  try {
    const response = await axios.get(`/progress/detail/${id}/${courses_id}`);
    return response.data;
  } catch (error) {
    console.log(`get_progress`, error);
  }
};
export const getUserProgress = async (id: string) => {
  try {
    const response = await axios.get(`/progress/user/${id}`);
    return response;
  } catch (error) {
    console.log(`get_progress`, error);
  }
};
export const updateProgress = async (value: any) => {
  try {
    const response = await axios.put(`/progress/${value._id}`, {
      lesson_progress: value.lesson_progress,
      completed: value.completed,
      user_id: value.user_id,
      courses_id:value.courses_id[0]._id
    });
    return response;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
export const updateCertificate = async (value: any) => {
  try {
    const response = await axios.put(`/progress/${value._id}`, {
      user_name: value.user_name,
      date_certificate: value.date_certificate,
      status_certificate: value.status_certificate,
    });
    return response;
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
