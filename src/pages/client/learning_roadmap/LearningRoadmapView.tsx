import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import {
  Box,
  Button,
  Stack,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import arrow from "../../../images/arrow.webp";
import bg from "../../../images/demo_learning.png";
import docker from "../../../images/docker.webp";
import js from "../../../images/javascript.webp";
import learning1 from "../../../images/learning1.png";
import learning2 from "../../../images/learning2.png";
import css from "../../../images/light-css.webp";
import domain from "../../../images/light-domain.webp";
import express from "../../../images/light-express.webp";
import html from "../../../images/light-html.webp";
import nest from "../../../images/light-nestjs.webp";
import next from "../../../images/light-nextjs.webp";
import postgres from "../../../images/light-postgres.webp";
import react from "../../../images/light-react.webp";
import redux from "../../../images/light-redux.webp";
import java from "../../../images/light-spring.webp";
import vps from "../../../images/light-vps.webp";
import mongo from "../../../images/mongodb.webp";
import nginx from "../../../images/nginx.webp";
import ts from "../../../images/typescript.webp";
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundImage:
      theme.palette.mode === "dark"
        ? "red"
        : "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundImage:
    "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));



const steps = ["1. Học kiến thức", "2. Thực hành", "3. Triển khai thực tế"];
const LearningRoadmapView = () => {
  return (
    <Box position={"relative"} display={"flex"} paddingRight={"80px"}  flexDirection={"column"} gap={"20px"}>
   
      <Box width={"100%"}>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          mb={"20px"}
           textAlign={"center"}
        >
          Roadmap
        </Typography>
        <Stepper
          alternativeLabel
          activeStep={1}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography
            variant="h5"
            sx={{
              color: "#007FFF",
              background: "#FFDC48",
              borderRadius: "3px",
              padding: "0 3px",
              width: "max-content",
            }}
            my={"20px"}
            textAlign={"center"}
          >
            Phase 1: Ôn Tập Kiến Thức (Tự Học *)
          </Typography>
        </Box>
        <Box border={"1px dashed #ccc"} padding={"15px"} borderRadius={"10px"}>
          <Box borderBottom={"1px solid #ccc"} paddingBottom={"15px"}>
            <Typography
              variant="h6"
              fontSize={"15px"}
              sx={{
                color: "#007FFF",
                background: "#FFDC48",
                borderRadius: "3px",
                padding: "0 5px",
                width: "max-content",
              }}
              textAlign={"center"}
            >
              Markup/Programing language{" "}
            </Typography>
          </Box>
          <Stack direction={"row"} mt={"15px"} justifyContent={"space-between"}>
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={html}
              alt=""
            />
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={css}
              alt=""
            />
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={js}
              alt=""
            />
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={ts}
              alt=""
            />
          </Stack>
        </Box>
        <Box
          display={"flex"}
          mt={"15px"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"15px"}
          justifyContent={"center"}
        >
          <img
            height={"100px "}
            style={{ objectFit: "contain" }}
            src={arrow}
            alt=""
          />
          <Typography
            variant="h5"
            sx={{
              color: "#007FFF",
              background: "#FFDC48",
              borderRadius: "3px",
              padding: "0 3px",
              width: "max-content",
            }}
            my={"20px"}
            textAlign={"center"}
          >
            Phase 2: Học Kiến Thức (Frontend/Backend)
          </Typography>
        </Box>
        <Box border={"1px dashed #ccc"} padding={"15px"} borderRadius={"10px"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box
              border={"1px dashed #ccc"}
              width={"49%"}
              padding={"15px"}
              borderRadius={"10px"}
            >
              <Box borderBottom={"1px solid #ccc"} paddingBottom={"15px"}>
                <Typography
                  variant="h6"
                  fontSize={"15px"}
                  sx={{
                    color: "#007FFF",
                    background: "#FFDC48",
                    borderRadius: "3px",
                    padding: "0 5px",
                    width: "max-content",
                  }}
                  textAlign={"center"}
                >
                    Frontend   
                </Typography>
              </Box>
              <Stack
                direction={"row"}
                mt={"15px"}
                justifyContent={"space-between"}
              >
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={react}
                  alt=""
                />
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={redux}
                  alt=""
                />
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={next}
                  alt=""
                />
              </Stack>
            </Box>
            <Box
              border={"1px dashed #ccc"}
              width={"49%"}
              padding={"15px"}
              borderRadius={"10px"}
            >
              <Box borderBottom={"1px solid #ccc"} paddingBottom={"15px"}>
                <Typography
                  variant="h6"
                  fontSize={"15px"}
                  sx={{
                    color: "#007FFF",
                    background: "#FFDC48",
                    borderRadius: "3px",
                    padding: "0 5px",
                    width: "max-content",
                  }}
                  textAlign={"center"}
                >
                   Backend  
                </Typography>
              </Box>
              <Stack
                direction={"row"}
                mt={"15px"}
                justifyContent={"space-between"}
              >
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={nest}
                  alt=""
                />
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={express}
                  alt=""
                />
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={java}
                  alt=""
                />
              </Stack>
            </Box>
          </Stack>
          <Box borderBottom={"1px solid #ccc"}mt={"15px"} paddingBottom={"15px"}>
            <Typography
              variant="h6"
              fontSize={"15px"}
              sx={{
                color: "#007FFF",
                background: "#FFDC48",
                borderRadius: "3px",
                padding: "0 5px",
                width: "max-content",
              }}
              textAlign={"center"}
            >
              Công cụ sử dụng khi học Frontend/Backend
            </Typography>
          </Box>
          <Stack direction={"row"} mt={"15px"} justifyContent={"space-between"}>
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={ts}
              alt=""
            />
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={docker}
              alt=""
            />
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={postgres}
              alt=""
            />
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={mongo}
              alt=""
            />
          </Stack>
        </Box>
        <Box
          display={"flex"}
          mt={"15px"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"15px"}
          justifyContent={"center"}
        >
          <img
            height={"100px "}
            style={{ objectFit: "contain" }}
            src={arrow}
            alt=""
          />
          <Typography
            variant="h5"
            sx={{
              color: "#007FFF",
              background: "#FFDC48",
              borderRadius: "3px",
              padding: "0 3px",
              width: "max-content",
            }}
            my={"20px"}
            textAlign={"center"}
          >
           Phase 3: Thực Hành Fullstack
          </Typography>
        </Box>
        <Box border={"1px dashed #ccc"} padding={"15px"} borderRadius={"10px"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box
              border={"1px dashed #ccc"}
              width={"49%"}
              padding={"15px"}
              borderRadius={"10px"}
            >
              <Box borderBottom={"1px solid #ccc"} paddingBottom={"15px"}>
                <Typography
                  variant="h6"
                  fontSize={"15px"}
                  sx={{
                    color: "#007FFF",
                    background: "#FFDC48",
                    borderRadius: "3px",
                    padding: "0 5px",
                    width: "max-content",
                  }}
                  textAlign={"center"}
                >
                     Định Hướng 1   
                </Typography>
              </Box>
              <Stack
                direction={"row"}
                mt={"15px"}
                justifyContent={"space-between"}
              >
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={react}
                  alt=""
                />
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={next}
                  alt=""
                />
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={nest}
                  alt=""
                />
              </Stack>
            </Box>
            <Box
              border={"1px dashed #ccc"}
              width={"49%"}
              padding={"15px"}
              borderRadius={"10px"}
            >
              <Box borderBottom={"1px solid #ccc"} paddingBottom={"15px"}>
                <Typography
                  variant="h6"
                  fontSize={"15px"}
                  sx={{
                    color: "#007FFF",
                    background: "#FFDC48",
                    borderRadius: "3px",
                    padding: "0 5px",
                    width: "max-content",
                  }}
                  textAlign={"center"}
                >
                   Định Hướng 2
                </Typography>
              </Box>
              <Stack
                direction={"row"}
                mt={"15px"}
                justifyContent={"space-between"}
              >
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={react}
                  alt=""
                />
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={next}
                  alt=""
                />
                <img
                  width={"260px"}
                  height={"100px"}
                  style={{ objectFit: "contain" }}
                  src={java}
                  alt=""
                />
              </Stack>
            </Box>
          </Stack>
         
        </Box>
        <Box
          display={"flex"}
          mt={"15px"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"15px"}
          justifyContent={"center"}
        >
          <img
            height={"100px "}
            style={{ objectFit: "contain" }}
            src={arrow}
            alt=""
          />
          <Typography
            variant="h5"
            sx={{
              color: "#007FFF",
              background: "#FFDC48",
              borderRadius: "3px",
              padding: "0 3px",
              width: "max-content",
            }}
            my={"20px"}
            textAlign={"center"}
          >
           Phase 4: Triển khai dự án thực tế
          </Typography>
        </Box>
        <Box border={"1px dashed #ccc"} padding={"15px"} borderRadius={"10px"}>
          <Box borderBottom={"1px solid #ccc"} paddingBottom={"15px"}>
            <Typography
              variant="h6"
              fontSize={"15px"}
              sx={{
                color: "#007FFF",
                background: "#FFDC48",
                borderRadius: "3px",
                padding: "0 5px",
                width: "max-content",
              }}
              textAlign={"center"}
            >
              Markup/Programing language{" "}
            </Typography>
          </Box>
          <Stack direction={"row"} mt={"15px"} justifyContent={"space-between"}>
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={docker}
              alt=""
            />
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={vps}
              alt=""
            />
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={domain}
              alt=""
            />
            <img
              width={"260px"}
              height={"100px"}
              style={{ objectFit: "contain" }}
              src={nginx}
              alt=""
            />
          </Stack>
        </Box>
        <Box mt={"30px"}>
           <Typography mt={"70px"}  variant="h5" fontWeight={"bold"}>
          Tham gia cộng đồng học viên F8s trên Facebook
        </Typography>
        <Typography mt={"20px"}  fontSize={"14px"} color={"#333"}>
          Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy
          tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học
          nhé.
        </Typography>
        <Box>

        <Button
        
          sx={{
            
            mt: "15px",
            background: "white",
            color: "black",
            borderRadius: "99px",
            fontSize: "12px",
            height: "34px",
            border: "1px solid black",
          }}
        >
          Tham gia nhóm
        </Button>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LearningRoadmapView;
