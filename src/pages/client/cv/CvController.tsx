import { Box } from "@mui/material"
import Information from "./Information"
import cvtop from "../../../images/graph-dot-top-458966.svg"
import cvbot from "../../../images/graph-dot-bottom-458966.svg"

const CvController = () => {
  return (
    <Box bgcolor={"rgba(0,0,0,.5)"} display={"flex"} justifyContent={"center"} py={"50px"} width={"100%"}>
    <Box width={"952px"} height={"842px"} bgcolor={"white"} sx={{position:"relative"}} border={"1px solid #dddddd"}padding={"20px"}>
        <Box sx={{position:"absolute",top:0,left:0,width:"100%",height:"420px",background:`url('${cvtop}') left top / 595px no-repeat`}}></Box>
        <Box sx={{position:"absolute",bottom:0,left:0,width:"100%",height:"420px",background:`url('${cvbot}') left top / 595px no-repeat`}}></Box>
        <Information/>
    </Box>

    </Box>
  )
}

export default CvController