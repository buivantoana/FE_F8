import { toast } from "react-toastify";
import axios from "../core/api";
export const getCategories = async () => {
  try {
    const response = await axios.get(`/categories`);
    return response.data;
  } catch (error) {
    console.log(`get_Categories`, error);
  }
};
export const getCategoriesCourses = async () => {
  try {
    const response = await axios.get(`/categories/courses`);
    return response.data;
  } catch (error) {
    console.log(`get_Categories`, error);
  }
};
export const addCategories = async (value: typeCategories) => {
  try {
    const response:any = await axios.post(`/categories`, value);
    if(response.status!==0){
      toast.error(response.message)
      return undefined
    }else{
      return response.data;
    }
  } catch (error) {
    console.log(`add_Categories`, error);
  }
};
export const updateCategories = async (value: typeCategories) => {
  try {
    const response:any = await axios.put(`/categories/${value._id}`, {
      name: value.name,
      description: value.description,
    });
    if(response.status!==0){
      toast.error(response.message)
      return undefined
    }else{
      return response.data;
    }
  } catch (error) {
    console.log(`update_Categories`, error);
  }
};
export const deleteCategories = async (id?: string) => {
  try {
    const response:any = await axios.delete(`/categories/${id}`);
    if(response.status!==0){
      toast.error(response.message)
      return undefined
    }else{
      return response.data;
    }
  } catch (error) {
    console.log(`delete_Categories`, error);
  }
};
