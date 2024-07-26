import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RiUploadCloudFill } from "react-icons/ri";
import minhhoa from "../../../images/minhhoa.png";

type Props = {
    content: any;
    imageUrl: any;
    handleEditorChange: any;
    handleImageChange: any;
    register: any;
    handleSubmit: any;
    onFinish: any;
    onSubmit: any;
    errors: any;
    file: any;
  };