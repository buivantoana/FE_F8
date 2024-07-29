import axios from "../core/api";

export const reportDad = async (value: any) => {
    try {
      const response = await axios.put(`/comment/report_dad`, value);
      return response;
    } catch (error) {
      console.log(`update_Categories`, error);
    }
};


export const reportChild = async (value: any) => {
    try {
      const response = await axios.put(`/comment/report_child`, value);
      return response;
    } catch (error) {
      console.log(`update_Categories`, error);
    }
};
export const deleteComment = async (id?: string) => {
  try {
    const response = await axios.delete(`/comment/${id}`);
    return response;
  } catch (error) {
    console.log(`delete_Categories`, error);
  }
};

export const deleteCommentChild = async (id?: string,idchild?: string) => {
  try {
    const response = await axios.delete(`/comment/comment_child/${id}/${idchild}`);
    return response;
  } catch (error) {
    console.log(`delete_Categories`, error);
  }
};
