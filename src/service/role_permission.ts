import axios from "../core/api";
export const getRolePermission = async () => {
  try {
    const response = await axios.get(`/role_permission`);
    return response.data;
  } catch (error) {
    console.log(`get_RolePermission`, error);
  }
};
export const addRolePermission = async (value: any) => {
  try {
    delete value._id
    const response = await axios.post(`/role_permission`, {
      ...value,
    });
    return response.data;
  } catch (error) {
    console.log(`get_RolePermission`, error);
  }
};
export const updateRolePermission = async (value: any) => {
  try {

    const response = await axios.put(`/role_permission/${value._id}`, {
      role_id: value.role_id,
      permission: value.permission,
    });
    return response.data;
  } catch (error) {
    console.log(`get_RolePermission`, error);
  }
};
export const deleteRolePermission = async (id: string) => {
  try {
    const response = await axios.delete(`/role_permission/${id}`);
    return response.data;
  } catch (error) {
    console.log(`get_RolePermission`, error);
  }
};