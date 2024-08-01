import axios from "../core/api";
export const getRole = async () => {
  try {
    const response = await axios.get(`/role`);
    return response.data;
  } catch (error) {
    console.log(`get_Role`, error);
  }
};
export const addRole = async (value: typeRoleValue) => {
  try {
    const response = await axios.post(`/role`, {
      ...value,
    });
    return response.data;
  } catch (error) {
    console.log(`get_Role`, error);
  }
};
export const updateRole = async (value: typeRole) => {
  try {
   
    const response = await axios.put(`/role/${value._id}`, {
      name: value.name,
    });
    return response.data;
  } catch (error) {
    console.log(`get_Role`, error);
  }
};
export const deleteRole = async (id: string) => {
  try {
    const response = await axios.delete(`/role/${id}`);
    return response.data;
  } catch (error) {
    console.log(`get_Role`, error);
  }
};