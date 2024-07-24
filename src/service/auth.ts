import { toast } from "react-toastify";
import axios from "../core/api";

export const Signup = async (email: typeAuth) => {
  try {
    delete email.password;
    const response = await axios.post(`/auth/signup`, email);
    if (response.status == 0) {
      return response;
    } else {
      toast.error("Đăng ký thất bại");
      return {};
    }
  } catch (error) {
    console.log(`signup`, error);
  }
};

export const Signin = async (email: typeAuth) => {
  try {
    const response: any = await axios.post(`/auth/signin`, {
      email: email.email,
      password: email.password,
    });
    if (response.status === 1) {
      toast.error(response.message);
      return {};
    }
    return response;
  } catch (error) {
    console.log(`signup`, error);
  }
};
export const Authentication = async (token: string) => {
  try {
    const response = await axios.get(`/auth/authentication`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(`signup`, error);
  }
};

export const RefeshToken = async (token: string) => {
  try {
    const response = await axios.get(`/auth/refeshtoken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(`signup`, error);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`/auth`);
    return response.data;
  } catch (error) {
    console.log(`get_User`, error);
  }
};
export const countUser = async () => {
  try {
    const response = await axios.get(`/auth/count`);
    return response;
  } catch (error) {
    console.log(`get_User`, error);
  }
};
export const getOneUser = async (email: any) => {
  try {
    const response = await axios.get(`/auth/search/${email}`);
    return response;
  } catch (error) {
    console.log(`get_User`, error);
  }
};
export const updateUSer = async (value: any) => {
  try {
    const response = await axios.put(`/auth/${value._id}`, {
      email: value.email,
      role: value.role,
      user_name: value.user_name,
    });
    return response.data;
  } catch (error) {
    console.log(`get_Role`, error);
  }
};
export const changePassword = async (value: any) => {
  try {
    const response = await axios.put(`/auth/change_password/user`, value);
    return response;
  } catch (error) {
    console.log(`get_Role`, error);
  }
};
export const forgotPassword = async (value: any) => {
  try {
    const response = await axios.put(`/auth/forgot_password/user`, value);
    return response;
  } catch (error) {
    console.log(`get_Role`, error);
  }
};
export const otpEmail = async (value: any) => {
  try {
    const response = await axios.post(`/auth/otp_email/user`, value);
    return response;
  } catch (error) {
    console.log(`get_Role`, error);
  }
};
export const updateProfileUSer = async (value: any) => {
  try {
    const response = await axios.put(`/auth/profile/${value._id}`, value);
    return response;
  } catch (error) {
    console.log(`get_Role`, error);
  }
};
