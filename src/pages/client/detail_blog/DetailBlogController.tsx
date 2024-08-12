import { useQuery, useQueryClient } from "react-query";
import DetailBlogView from "./DetailBlogView";
import { getOnePost, likePost } from "@/service/post";
import { useParams } from "react-router";
import { useState } from "react";
import Loading from "@/components/Loading";
import { useLocalStorage } from "@/hooks/useStorage";
import { toast } from "react-toastify";

const DetailBlogController = () => {
  const { id }: any = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser]: any = useLocalStorage("user", {});
  const [likes, setLikes]: any = useState([]);

  const { data: post } = useQuery("post_detail", {
    queryFn: () => {
      setLoading(true);
      return getOnePost(id);
    },
    onSuccess(data: any) {
      if (Object.keys(data)[0]) {
        setLoading(false);
        setLikes(data.likes);
      }
    },
    refetchOnWindowFocus: false,
  });
  const handleLikePost = async () => {
    try {
      if (Object.keys(user).length > 0) {
        let data: any = await likePost({
          _id: post._id,
          user_id: user.data[0]._id,
        });
        if (data?.status == 0 && data.message == "liked") {
          setLikes([...likes, user.data[0]._id]);
        }
        if (data?.status == 0 && data.message == "unliked") {
          setLikes(likes.filter((i: any) => i != user.data[0]._id));
        }
      } else {
        toast.warning("Bạn cần đăng nhập để thích bài viết");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!loading && (
        <DetailBlogView
          handleLikePost={handleLikePost}
          likes={likes}
          user={Object.keys(user).length > 0 && user}
          post={post && post}
        />
      )}
    </>
  );
};

export default DetailBlogController;
