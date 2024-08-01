import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import {
  RiSlideshow4Fill,
  RiUser3Fill,
  RiWallet3Fill,
  RiWalletFill,
} from "react-icons/ri";
import { convertToVND } from "@/utils/utils";
type Props = {
  rechanrgeTotals: any;
  withdrawTotals: any;
  countUser: any;
  orderStatistical: any;
  topRevenua: any;
  topStar: any;
};
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);
import { subDays, format } from "date-fns";
import StarRatings from "react-star-ratings";
const generateLast7DaysData = () => {
  const labels = [];
  const values = [];
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i);
    labels.push(format(date, "dd-MM-yyyy")); // Định dạng ngày
    values.push(Math.floor(Math.random() * 10000000)); // Giả lập dữ liệu
  }
  return { labels, values };
};
const DashboardView = ({
  rechanrgeTotals,
  withdrawTotals,
  countUser,
  orderStatistical,
  topRevenua,
  topStar,
}: Props) => {
  const data = {
    labels: generateLast7DaysData().labels,
    datasets: [
      {
        label: "Doanh thu từ khóa học",
        data: orderStatistical,
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 2,
        pointStyle: "rectRot", // Styling the points
        pointRadius: 5, // Size of the points
        pointBackgroundColor: "rgba(255, 99, 132, 1)", // Background color of points
        pointBorderColor: "rgba(54, 162, 235, 1)", // Border color of points
        pointHoverRadius: 10, // Size of the points on hover
        pointHoverBackgroundColor: "rgba(255, 206, 86, 1)", // Background color on hover
        pointHoverBorderColor: "rgba(75, 192, 192, 1)", // Border color on hover
      },
    ],
  };
  const data2 = {
    labels: generateLast7DaysData().labels,
    datasets: [
      {
        label: "Nạp tiền",
        data: rechanrgeTotals,
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 2,
        pointStyle: "rectRot", // Styling the points
        pointRadius: 5, // Size of the points
        pointBackgroundColor: "rgba(255, 99, 132, 1)", // Background color of points
        pointBorderColor: "rgba(54, 162, 235, 1)", // Border color of points
        pointHoverRadius: 10, // Size of the points on hover
        pointHoverBackgroundColor: "rgba(255, 206, 86, 1)", // Background color on hover
        pointHoverBorderColor: "rgba(75, 192, 192, 1)", // Border color on hover
      },
      {
        label: "Rút tiền",
        data: withdrawTotals,
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "#ff6384",
        borderWidth: 2,
        pointStyle: "rectRot", // Styling the points
        pointRadius: 5, // Size of the points
        pointBackgroundColor: "rgba(255, 99, 132, 1)", // Background color of points
        pointBorderColor: "rgba(54, 162, 235, 1)", // Border color of points
        pointHoverRadius: 10, // Size of the points on hover
        pointHoverBackgroundColor: "rgba(255, 206, 86, 1)", // Background color on hover
        pointHoverBorderColor: "rgba(75, 192, 192, 1)", // Border color on hover
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  return (
    <Box>
      <Typography variant="h3" fontWeight={"bold"} textAlign={"center"}>
        Thống kê
      </Typography>
      <Stack direction={"row"} gap={"20px"} mt={"50px"}>
        <Box
          width={"25%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            color: "#5b648b",
          }}
        >
          <RiSlideshow4Fill size={30} />
          <Box>
            <Typography fontSize={"17px"}>Tổng doanh thu khóa học</Typography>
            <Typography fontWeight={"bold"} fontSize={"20px"}>
              {convertToVND(
                orderStatistical.reduce((acc: any, cur: any) => acc + cur, 0)
              )}
            </Typography>
          </Box>
        </Box>
        <Box
          width={"25%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            color: "#5b648b",
          }}
        >
          <RiWallet3Fill size={30} />

          <Box>
            <Typography fontSize={"17px"}>Tổng nạp tiền vào ví</Typography>
            <Typography fontWeight={"bold"} fontSize={"20px"}>
              {convertToVND(
                rechanrgeTotals.reduce((acc: any, cur: any) => acc + cur, 0)
              )}
            </Typography>
          </Box>
        </Box>
        <Box
          width={"25%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            color: "#5b648b",
          }}
        >
          <RiWalletFill size={30} />
          <Box>
            <Typography fontSize={"17px"}>Tổng rút tiền từ ví</Typography>
            <Typography fontWeight={"bold"} fontSize={"20px"}>
              {convertToVND(
                withdrawTotals.reduce((acc: any, cur: any) => acc + cur, 0)
              )}
            </Typography>
          </Box>
        </Box>
        <Box
          width={"25%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
            color: "#5b648b",
          }}
        >
          <RiUser3Fill size={30} />
          <Box>
            <Typography fontSize={"17px"}>Người dùng</Typography>
            <Typography fontWeight={"bold"} fontSize={"20px"}>
              {countUser}
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Stack direction={"row"} mt={"50px"} gap={"50px"}>
        <Box width={"50%"}>
          <Typography
            fontWeight={"bold"}
            my={"10px"}
            textAlign={"center"}
            variant="h6"
          >
            Biểu đồ thống kê doanh thu khóa học 7 ngày gần nhất
          </Typography>
          <Line data={data} options={options} />
        </Box>
        <Box width={"50%"}>
          <Typography
            fontWeight={"bold"}
            my={"10px"}
            textAlign={"center"}
            variant="h6"
          >
            Biểu đồ thống kê nạp rút tiền từ ví 7 ngày gần nhất
          </Typography>
          <Line data={data2} options={options} />
        </Box>
      </Stack>
      <Stack direction={"row"} gap={"20px"} mt={"50px"}>
        <Box
          width={"50%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            gap: "30px",
            color: "#5b648b",
            height: "max-content",
          }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            Top 3 khóa học có doanh thu cao nhất
          </Typography>
          {topRevenua &&
            topRevenua.map((item: any, index: number) => {
              return (
                <Stack
                  borderTop={index == 0 ? "none" : "1px solid rgba(0,0,0,.1)"}
                  pt={"15px"}
                  direction={"row"}
                  gap={"15px"}
                >
                  <Box>
                    <img
                      src={item.image.url}
                      width={228}
                      height={128}
                      style={{ borderRadius: "12px" }}
                      alt=""
                    />
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                    <Typography fontWeight={"600"} fontSize={"15px"}>
                      {item.title}
                    </Typography>
                    <Typography fontSize={"14px"}>
                      {item.description}
                    </Typography>
                    <Typography fontSize={"14px"}>
                      Doanh thu : <b>{convertToVND(item.totalPrice)}</b>
                    </Typography>
                  </Box>
                </Stack>
              );
            })}
        </Box>
        <Box
          width={"50%"}
          padding={"20px"}
          sx={{
            background: "white",
            border: "1px solid #dddddd",
            borderRadius: "10px",
            boxShadow: "0 2px 18px rgba(0,0,0,.2)",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            gap: "30px",
            color: "#5b648b",
            height: "max-content",
          }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            Top 3 khóa học có đánh giá sao cao nhất
          </Typography>
          {topStar &&
            topStar.map((item: any, index: number) => {
              return (
                <Stack
                  borderTop={index == 0 ? "none" : "1px solid rgba(0,0,0,.1)"}
                  pt={"15px"}
                  direction={"row"}
                  gap={"15px"}
                >
                  <Box>
                    <img
                      src={item.image.url}
                      width={228}
                      height={128}
                      style={{ borderRadius: "12px" }}
                      alt=""
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    sx={{
                      svg: {
                        width: "30px !important",
                        height: "30px !important",
                      },
                    }}
                    flexDirection={"column"}
                    gap={"10px"}
                  >
                    <Typography fontWeight={"600"} fontSize={"15px"}>
                      {item.title}
                    </Typography>
                    <Typography fontSize={"14px"}>
                      {item.description}
                    </Typography>
                    <StarRatings
                      rating={item.averageStars}
                      starRatedColor="blue"
                      numberOfStars={5}
                      starSpacing="0"
                      starRatedColor={"rgb(250, 175, 0)"}
                      name="rating"
                    />
                  </Box>
                </Stack>
              );
            })}
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardView;
