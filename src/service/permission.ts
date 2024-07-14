import axios from "../core/api";
export const getPermission = async () => {
  try {
    const response = await axios.get(`/permission`);
    return response.data;
  } catch (error) {
    console.log(`get_Permission`, error);
  }
};
export const addPermission = async (value: typePermissionValue) => {
  try {
    const response = await axios.post(`/permission`, {
      ...value,
    });
    return response.data;
  } catch (error) {
    console.log(`get_Permission`, error);
  }
};
export const updatePermission = async (value: typePermission) => {
  try {
    const response = await axios.put(`/permission/${value._id}`, {
      name: value.name,
    });
    return response.data;
  } catch (error) {
    console.log(`get_Permission`, error);
  }
};
export const deletePermission = async (id: string) => {
  try {
    const response = await axios.delete(`/permission/${id}`);
    return response.data;
  } catch (error) {
    console.log(`get_Permission`, error);
  }
};
