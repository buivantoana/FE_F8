import { Box } from "@mui/material";
import SettingProfileView from "./SettingProfileView";
import { useEffect, useState } from "react";
import userImage from "../../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import { useLocalStorage } from "@/hooks/useStorage";
import { changePassword, updateProfileUSer } from "@/service/auth";
import { deleteImage, uploadImage } from "@/service/upload";
import { useCoursesContext } from "@/App";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = yup.object({
  password_old: yup.string().required(),
  password_new: yup.string().required(),
  confirm_password_new: yup.string().required(),
});
const SettingProfileController = () => {
  const [disableName, setDisableName] = useState(true);
  const [user, setUser] = useLocalStorage("user", {});
  const [imageUrl, setImageUrl] = useState(
    user.data[0].image.url ? user.data[0].image.url : userImage
  );
  const context: any = useCoursesContext();
  const [image, setImage] = useState(true);
  const [bio, setBio] = useState(true);
  const [valueName, setValueName] = useState(user.data[0].user_name);
  const [valueBio, setValueBio] = useState("");
  const [file, setFile]: any = useState(null);
  const [tab, setTab]: any = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleChangeTab = (index: any) => {
    setTab(index);
  };
  const handleClickFocus = () => {
    setDisableName(!disableName);
  };

  const handleClickBio = () => {
    setBio(!bio);
  };
  const handleClickImage = () => {
    setImage(!image);
    setImageUrl(user.data[0].image.url);
  };

  const handleImageChange = (e: any) => {
    let file = e.target.files[0];
    setFile(file);
    if (image) {
      setImage(!image);
    }
    if (!file) return;

    const reader: any = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSaveChange = async (type: any) => {
    if (type == "name") {
      let data = await updateProfileUSer({
        _id: user.data[0]._id,
        type: "name",
        body: {
          user_name: valueName,
          email: user.data[0].email,
          role: user.data[0].role,
        },
      });
      if (data?.status == 0) {
        setUser({ ...user, data: [data.data] });
        handleClickFocus();
        context.dispatch({
          type: "LOGIN",
          payload: {
            ...context.state,
            user: [data.data],
          },
        });
      }
    }
    if (type == "image") {
      if (user.data[0].image.url) {
        let image: any = await deleteImage(user.data[0].image.public_id);
        if (image.imageUrl.result == "ok") {
          const formData = new FormData();
          formData.append("image", file);
          const upload: any = await uploadImage(formData);
          if (Object.keys(upload).length > 0) {
            let data: any = await updateProfileUSer({
              _id: user.data[0]._id,
              type: "image",
              body: {
                user_name: valueName,
                email: user.data[0].email,
                role: user.data[0].role,
                image: {
                  url: upload.imageUrl.secure_url,
                  public_id: upload.imageUrl.public_id,
                },
              },
            });
            if (data?.status == 0) {
              setUser({ ...user, data: [data.data] });
              setImageUrl(data.data.image.url);
              setImage(true);
              context.dispatch({
                type: "LOGIN",
                payload: {
                  ...context.state,
                  user: [data.data],
                },
              });
            }
          }
        }
      } else {
        const formData = new FormData();
        formData.append("image", file);
        const upload: any = await uploadImage(formData);
        if (Object.keys(upload).length > 0) {
          let data: any = await updateProfileUSer({
            _id: user.data[0]._id,
            type: "image",
            body: {
              user_name: valueName,
              email: user.data[0].email,
              role: user.data[0].role,
              image: {
                url: upload.imageUrl.secure_url,
                public_id: upload.imageUrl.public_id,
              },
            },
          });
          if (data?.status == 0) {
            setUser({ ...user, data: [data.data] });
            setImageUrl(data.data.image.url);
            setImage(true);
            context.dispatch({
              type: "LOGIN",
              payload: {
                ...context.state,
                user: [data.data],
              },
            });
          }
        }
      }
    }
  };
 
  const onSubmit = async (value: any) => {
    try {
     if(value.password_new==value.confirm_password_new){
        let data:any = await changePassword({password:value.password_old,password_new:value.password_new,email:context.state.user[0].email})
        if(data.status==0){
          toast.success("Đổi mật khẩu thành công")
        }else{
          toast.warning(data.message)
        }
     }else{
      toast.warning("Mật khẩu không trùng khớp.")
     }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <SettingProfileView
        disableName={disableName}
        image={image}
        bio={bio}
        handleClickFocus={handleClickFocus}
        handleClickImage={handleClickImage}
        handleImageChange={handleImageChange}
        imageUrl={imageUrl}
        handleClickBio={handleClickBio}
        handleSaveChange={handleSaveChange}
        setValueName={setValueName}
        setValueBio={setValueBio}
        valueName={valueName}
        valueBio={valueBio}
        user={user}
        handleChangeTab={handleChangeTab}
        tab={tab}
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </Box>
  );
};

export default SettingProfileController;
