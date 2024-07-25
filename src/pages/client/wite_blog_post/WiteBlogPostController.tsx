import { useState } from "react";
import WiteBlogPostView from "./WiteBlogPostView";
import { usePostMutation } from "@/hooks/usePostMutation";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import Progress from "@/components/Process";

const WiteBlogPostController = () => {
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    
    const handleEditorChange = (e: any, editor: any) => {
        setContent(editor.getContent());
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
    const { register, handleSubmit, onFinish, errors, reset } = usePostMutation({
      file,
      action: "CREATE",
      content,
      onSuccess: () => {
        reset();
  
        setTimeout(() => {
          setShowProgress(false);
          toast.success("Tạo bài viết thành công.");
          setLoading(false);
          setFile(null);
          setImageUrl("");
        }, 1000);
      },
    });
}

export default WiteBlogPostController;