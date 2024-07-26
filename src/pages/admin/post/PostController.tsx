import { useQuery, useQueryClient } from "react-query";

import { getCategories } from "@/service/categories";
import { useCategoriesMutation } from "@/hooks/useCategoriesMutation";
import React, { useState } from "react";
import Loading from "@/components/Loading";
import PostView from "./PostView";
import { getPost } from "@/service/post";
import { usePostMutation } from "@/hooks/usePostMutation";
import { deleteImage } from "@/service/upload";
import { io } from "socket.io-client";

const PostController = () => {
  const [loading, setLoading] = useState(false);
  const [detailPost, setDetailPost]: any = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const socket = io("http://localhost:4000");
  const [openModal, setOpenModal] = React.useState(false);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: any
  ) => {
    setAnchorEl(event.currentTarget);
    setDetailPost(data);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data } = useQuery("post", {
    queryFn: () => getPost(),
  });
  // const { register, handleSubmit, onFinish, errors, reset } =
  //   usePostMutation({
  //     action: action,
  //     onSuccess: () => {
  //       reset();
  //       setTimeout(() => {
  //         handleCloseModal();
  //         setLoading(false);
  //       }, 1000);
  //     },
  //   });
  const handleOpenModal = (data: any) => {
    setDetailPost(data);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setDetailPost(null);
    setOpenModal(false);
  };
  const { onRemove } = usePostMutation({
    action: "DELETE",
    onSuccess: () => {
      handleClose();
      setLoading(false);
    },
  });
  const { onActive } = usePostMutation({
    action: "ACTIVE",
    onSuccess: (data: any) => {
      setLoading(false);
      socket.emit("getNewNotify", {
        user_id: data.author[0],
      });
    },
  });
  const onSubmit = () => {
    setLoading(true);
  };
  const handleDelete = async (value: any) => {
    setLoading(true);
    try {
      let image: any = await deleteImage(value.image.public_id);
      if (image.imageUrl.result == "ok") {
        onRemove(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handelChangeActive = (data: any) => {
    setLoading(true);
    onActive(data);
  };
  return (
    <>
      <PostView
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        data={data !== undefined && data.length > 0 ? data : []}
        onSubmit={onSubmit}
        handleDelete={handleDelete}
        handleClick={handleClick}
        handleClose={handleClose}
        id={id}
        anchorEl={anchorEl}
        open={open}
        detailPost={detailPost}
        handelChangeActive={handelChangeActive}
      />

      {loading && <Loading />}
    </>
  );
};

export default PostController;
