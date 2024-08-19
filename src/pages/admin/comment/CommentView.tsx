import BlogContent from "@/components/BlogContent";
import {
  deleteComment,
  deleteCommentChild,
  getReport,
} from "@/service/comment";
import { Button, Paper, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledChildPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));
type Props = {};

const CommentView = (props: Props) => {
  const socket = io("http://localhost:4000");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeDelete, setTypeDelete] = useState(null);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { data } = useQuery("get_report", {
    queryFn: () => getReport(),
    onSuccess(data: any) {
      if (data.status === 0) {
        setComments(data.data);
      } else {
        setError(data.message);
      }
      setLoading(false);
    },
  });

  const handleDeleteComment = async (commentId: any, type: any, data?: any) => {
    try {
      if (type == 0) {
        let data = await deleteComment(commentId);
        if (data?.status == 0) {
          toast.success("Xóa thành công");
          queryClient.invalidateQueries({
            queryKey: ["get_report"],
          });
          socket.emit("getCommentsNew", {
            lesson_id:data.data.lesson_id,
            courses_id:data.data.courses_id[0],
          });
        }
      } else {
        let res = await deleteCommentChild(data._id, commentId);
        if (res?.status == 0) {
          toast.success("Xóa thành công");
          queryClient.invalidateQueries({
            queryKey: ["get_report"],
          });
          socket.emit("getCommentsNew", { 
            lesson_id:res.data.lesson_id,
            courses_id:res.data.courses_id[0],
            
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Bình luận bị báo cáo
      </Typography>
      {comments.length > 0 ? (
        comments.map((comment: any) => (
          <StyledPaper key={comment._id}>
            <Typography variant="body1">
              <strong>Nội dung</strong>
              {<BlogContent content={comment.content} />}
            </Typography>
            {comment.report_spam.length > 1 ||
            comment.report_inappropriate.length > 1 ? (
              <StyledButton
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteComment(comment._id, 0)}
              >
                Xóa
              </StyledButton>
            ) : null}
            {comment.report_spam.length > 1 && (
              <Typography variant="body2" color="error">
                Spam bình luận
              </Typography>
            )}
            {comment.report_inappropriate.length > 1 && (
              <Typography variant="body2" color="error">
                Nội dung không phù hợp
              </Typography>
            )}
            <div>
              <Typography fontWeight={"bold"} gutterBottom>
                Bình luận con bị báo cáo
              </Typography>
              {comment.comments_child.map((child: any) => (
                <StyledChildPaper key={child._id}>
                  <Typography variant="body1">
                    <strong>Nội dung</strong>{" "}
                    {<BlogContent content={child.content} />}
                  </Typography>
                  {child.report_spam.length > 1 ||
                  child.report_inappropriate.length > 1 ? (
                    <StyledButton
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteComment(child._id, 1, comment)}
                    >
                      Xóa
                    </StyledButton>
                  ) : null}
                  {child.report_spam.length > 1 && (
                    <Typography variant="body2" color="error">
                      Spam bình luận
                    </Typography>
                  )}
                  {child.report_inappropriate.length > 1 && (
                    <Typography variant="body2" color="error">
                     Nội dung không phù hợp
                    </Typography>
                  )}
                </StyledChildPaper>
              ))}
            </div>
          </StyledPaper>
        ))
      ) : (
        <Typography variant="body1">Không có bình luận nào bị báo cáo </Typography>
      )}
    </div>
  );
};

export default CommentView;
