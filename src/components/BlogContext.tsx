
import { Box } from "@mui/material";
import hljs from "highlight.js";
import { useEffect } from "react";

 const BlogContent = ({ content }:{content:string }) => {
    useEffect(() => {
      document.querySelectorAll('pre code').forEach((block:any) => {
        hljs.highlightBlock(block);
      });
    }, [content]);
  
    return (
      <Box
        sx={{
          img: {
            width: '100%',
            height: 'auto',
          },
          '.token.punctuation': {
            color: '#999',
          },
          lineHeight:2
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };
  export default BlogContent