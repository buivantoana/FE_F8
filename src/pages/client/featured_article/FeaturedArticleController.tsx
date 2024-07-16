import { useQuery } from "react-query";
import FeaturedArticleView from "./FeaturedArticleView";
import { getPostActive } from "@/service/post";
import { useState } from "react";
import { useNavigate } from "react-router";

const FeaturedArticleController = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate()
  const { data: post } = useQuery(["post_active",page], {
    queryFn: () => {
      let skip = page !== 0 ? (page - 1) * limit : 0;
      return getPostActive({page:skip,limit});
    },
    onSuccess(data:any) {
      if(data?.status==0){
        setTotalPage(Math.ceil(data.count / data.size));
      }
      
    },
    refetchOnWindowFocus: false,
  });
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDetailPost = (id:string)=>{
    navigate(`/detail_blog/${id}`)
  }
  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <>
      <FeaturedArticleView
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        post={post && post.data}
        handleDetailPost={handleDetailPost}
        totalPage={totalPage}
        handleChangePagination={handleChangePagination}
        page={page}
      />
    </>
  );
};

export default FeaturedArticleController;
