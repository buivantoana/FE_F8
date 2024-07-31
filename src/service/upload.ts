import axios from "../core/api";
export const uploadImage = async (data: any) => {
  try {
    const response = await axios.post(`/upload`, data);
    return response;
  } catch (error) {
    console.log(`upload`, error);
  }
};

export const deleteImage = async (id?: string) => {
  try {
    const response = await axios.delete(`/upload/${id}`);
    return response;
  } catch (error) {
    console.log(`delete_upload`, error);
  }
};

export const uploadVideo = async (data: any) => {
  try {
    const response = await axios.post(`/upload/video`, data,{headers: {
      'Content-Type': 'multipart/form-data',
    }});
    return response;
  } catch (error) {
    console.log(`upload`, error);
  }
};

export const deleteVideo = async (id?: string) => {
  try {
    const response = await axios.delete(`/upload/video/${id}`);
    return response;
  } catch (error) {
    console.log(`delete_upload`, error);
  }
};

