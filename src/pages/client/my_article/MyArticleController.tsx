import React, { useState } from "react";
import MyArticleView from "./MyArticleView";
import { useQuery, useQueryClient } from "react-query";
import { getUserPost } from "@/service/post";
import { useLocalStorage } from "@/hooks/useStorage";
import { usePostMutation } from "@/hooks/usePostMutation";

const MyArticleController = () => {
  const [value, setValue]:any = React.useState(0);
  const [detailPost,setDetailPost]:any = useState(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;
  const [dataActive,setDataActive] = useState([])
  const [dataNotActive,setDataNotActive] = useState([])
  const [user, setUser]:any = useLocalStorage("user", {});
  
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);

 
  const queryClient = useQueryClient();
  const { isLoading } = useQuery(["post_user"], {
    queryFn: () => {
      return getUserPost(user.data[0]._id);
    },
    onSuccess(data:any) {
      if(data?.status==0){
        setDataActive(data.data.filter((item:any)=>item.active==true))
        setDataNotActive(data.data.filter((item:any)=>item.active==false))
      }
      
    },
    refetchOnWindowFocus: false,
  });
  const { onRemove } = usePostMutation({
    action: "DELETE",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post_user"],
      });
      handleClose();
      
    },
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>,data:any) => {
    setAnchorEl(event.currentTarget);
    setDetailPost(data)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeletePost = ()=>{
    onRemove(detailPost)
  }
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const handleEditorChange = (e: any, editor: any) => {
    setContent(editor.getContent());
  };
  const { register, handleSubmit, onFinish, errors, reset } = usePostMutation({
    file,
    action: "UPDATE",
    content,
    onSuccess: () => {
      reset();
      setOpen(false)
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["post_user"],
        });
        
        setFile(null);
        setImageUrl("");
      }, 1000);
    },
  });
  const toggleDrawer = (newOpen: boolean) => () => {
    setImageUrl(detailPost.image.url)
    setContent(detailPost.content)
    reset(detailPost)
    handleClose();
    setOpen(newOpen);
  };

  const handleImageChange = (e: any) => {
    let file = e.target.files[0];

    if (!file) return;
    setFile(file);
    const reader: any = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <>
      <MyArticleView
      toggleDrawer={toggleDrawer}
        id={id}
        openDrawer={open}
        open={openPopover}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        handleChangeTabs={handleChangeTabs}
        value={value}
        dataActive={dataActive}
        dataNotActive={dataNotActive}
        handleDeletePost={handleDeletePost}
        content={content}
        imageUrl={imageUrl}
        handleEditorChange={handleEditorChange}
        handleImageChange={handleImageChange}
        register={register}
        handleSubmit={handleSubmit}
        onFinish={onFinish}
        isLoading={isLoading}
      />
    </>
  );
};

export default MyArticleController;
