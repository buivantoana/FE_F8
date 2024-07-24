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
}

export default WiteBlogPostController;