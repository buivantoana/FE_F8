import { useState } from "react";
import WiteBlogPostView from "./WiteBlogPostView";
import { usePostMutation } from "@/hooks/usePostMutation";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import Progress from "@/components/Process";