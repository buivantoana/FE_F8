import {
  Box,
  Fade,
  Paper,
  Popover,
  Popper,
  PopperPlacementType,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiBookReadFill } from "react-icons/ri";

const SideBar = () => {
  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  }));
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        position={"relative"}
        zIndex={11}
        left={"35%"}
      >
        <SpeedDial
          FabProps={{ size: "small" }}
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction={"right"}
        >
          <SpeedDialAction
            onClick={() => navigate("/posts")}
            sx={{ position: "relative", zIndex: 100 }}
            key={"Name"}
            icon={<EditIcon />}
            tooltipTitle={
              <Box>
                <p>Viết Blog</p>
              </Box>
            }
            tooltipPlacement={"bottom"}
          />
        </SpeedDial>
      </Stack>

      <Stack mt={"20px"} direction={"column"} gap={1.5}>
        <Stack
          width={"72px"}
          height={"72px"}
          bgcolor={active == 0 ? "#e8ebed" : undefined}
          onClick={() => {
            navigate("/");
            setActive(0);
          }}
          borderRadius={"16px"}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack direction={"column"} alignItems={"center"} gap={0.5}>
            <Box width={"20px"} height={"16px"}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="house"
                className="svg-inline--fa fa-house "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"
                />
              </svg>
            </Box>
            <Typography fontWeight={700} fontSize={"12px"}>
              Trang chủ
            </Typography>
          </Stack>
        </Stack>
        <Stack
          width={"72px"}
          height={"72px"}
          bgcolor={active == 1 ? "#e8ebed" : undefined}
          onClick={() => {
            navigate("/courses");
            setActive(1);
          }}
          borderRadius={"16px"}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack direction={"column"} alignItems={"center"} gap={0.5}>
            <Box width={"20px"} height={"16px"}>
              <RiBookReadFill size={20} />
            </Box>
            <Typography fontWeight={700} fontSize={"12px"}>
              Khóa học
            </Typography>
          </Stack>
        </Stack>
        <Stack
          width={"72px"}
          height={"72px"}
          bgcolor={active == 2 ? "#e8ebed" : undefined}
          onClick={() => {
            navigate("/learning_roadmap");
            setActive(2);
          }}
          borderRadius={"16px"}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack direction={"column"} alignItems={"center"} gap={0.5}>
            <Box width={"20px"} height={"16px"}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="road"
                className="svg-inline--fa fa-road "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M256 96C256 113.7 270.3 128 288 128C305.7 128 320 113.7 320 96V32H394.8C421.9 32 446 49.08 455.1 74.63L572.9 407.2C574.9 413 576 419.2 576 425.4C576 455.5 551.5 480 521.4 480H320V416C320 398.3 305.7 384 288 384C270.3 384 256 398.3 256 416V480H54.61C24.45 480 0 455.5 0 425.4C0 419.2 1.06 413 3.133 407.2L120.9 74.63C129.1 49.08 154.1 32 181.2 32H255.1L256 96zM320 224C320 206.3 305.7 192 288 192C270.3 192 256 206.3 256 224V288C256 305.7 270.3 320 288 320C305.7 320 320 305.7 320 288V224z"
                />
              </svg>
            </Box>

            <Typography fontWeight={700} fontSize={"12px"}>
              Lộ trình
            </Typography>
          </Stack>
        </Stack>
        <Stack
          width={"72px"}
          height={"72px"}
          bgcolor={active == 3 ? "#e8ebed" : undefined}
          onClick={() => {
            navigate("/article");
            setActive(3);
          }}
          borderRadius={"16px"}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack direction={"column"} alignItems={"center"} gap={0.5}>
            <Box width={"20px"} height={"16px"}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="newspaper"
                className="svg-inline--fa fa-newspaper "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M480 32H128C110.3 32 96 46.33 96 64v336C96 408.8 88.84 416 80 416S64 408.8 64 400V96H32C14.33 96 0 110.3 0 128v288c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V64C512 46.33 497.7 32 480 32zM272 416h-96C167.2 416 160 408.8 160 400C160 391.2 167.2 384 176 384h96c8.836 0 16 7.162 16 16C288 408.8 280.8 416 272 416zM272 320h-96C167.2 320 160 312.8 160 304C160 295.2 167.2 288 176 288h96C280.8 288 288 295.2 288 304C288 312.8 280.8 320 272 320zM432 416h-96c-8.836 0-16-7.164-16-16c0-8.838 7.164-16 16-16h96c8.836 0 16 7.162 16 16C448 408.8 440.8 416 432 416zM432 320h-96C327.2 320 320 312.8 320 304C320 295.2 327.2 288 336 288h96C440.8 288 448 295.2 448 304C448 312.8 440.8 320 432 320zM448 208C448 216.8 440.8 224 432 224h-256C167.2 224 160 216.8 160 208v-96C160 103.2 167.2 96 176 96h256C440.8 96 448 103.2 448 112V208z"
                />
              </svg>
            </Box>

            <Typography fontWeight={700} fontSize={"12px"}>
              Bài viết
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
