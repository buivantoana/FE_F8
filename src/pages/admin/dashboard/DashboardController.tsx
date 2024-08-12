import React, { useState } from "react";
import DashboardView from "./DashboardView";
import { useQuery } from "react-query";
import { getAdminStatisticalTransaction } from "@/service/transactions";
import { countUser } from "@/service/auth";
import { getAllOrder } from "@/service/order";
import { getAllStar } from "@/service/star";
import { roundToOneDecimal } from "@/utils/utils";

const DashboardController = () => {
  const [orderStatistical, setOrderStatistical]:any = useState([]);
  const [topRevenua,setTopRevenua]:any = useState([])
  const [topStar,setTopStar]:any = useState([])
  const [value,setValue]:any = useState(30)
  const [valueTime,setValueTime]:any = useState(0)

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: any) => {
    if(newValue==0){
      setValue(30)
    }
    if(newValue==1){
      setValue(60)
    }
    if(newValue==2){
      setValue(90)
    }
    setValueTime(newValue);
  };
  const { data }: any = useQuery(["statistical_line",value], {
    queryFn: () => getAdminStatisticalTransaction(value),
  });
  const { data: count }: any = useQuery("count_user", {
    queryFn: () => countUser(),
  });
  const {  }: any = useQuery("all_star", {
    queryFn: () => getAllStar(),
    onSuccess(data) {
      if(data?.status==0){
        
       
        setTopStar(groupAndAverageStarRatings(data.data).sort((a:any, b:any) => b.averageStars - a.averageStars).slice(0, 3))
      }
    },
  });
  const groupAndAverageStarRatings = (ratings:any) => {
    const groupedRatings:any = {};
  
    ratings.forEach((rating:any) => {
      const courseId = rating.courses_id[0]._id;
      const star = rating.star;
  
      if (!groupedRatings[courseId]) {
        groupedRatings[courseId] = { courseId,image:rating.courses_id[0].image,title:rating.courses_id[0].title,description:rating.courses_id[0].description, totalStars: 0, count: 0 };
      }
  
      groupedRatings[courseId].totalStars += star;
      groupedRatings[courseId].count++;
    });
  
    const result = Object.values(groupedRatings).map((group:any) => ({
      courseId: group.courseId,
      averageStars: roundToOneDecimal(group.totalStars / group.count) ,
      image: group.image,
      title: group.title,
      description: group.description,
    }));
  
    return result;
  };
  const {}: any = useQuery(["all_order",value], {
    queryFn: () => getAllOrder(),
    onSuccess(data) {
      if (data?.status == 0) {
        const today: any = new Date();
        today.setHours(0, 0, 0, 0);
      
        // Initialize array for 30 days
        const orderTotals = Array(value).fill(0);
      
        data.data.forEach((order: any) => {
          const transactionDate: any = new Date(order.createdAt);
          transactionDate.setHours(0, 0, 0, 0);
      
          const daysDifference = Math.floor(
            (today - transactionDate) / (1000 * 60 * 60 * 24)
          );
      
          if (daysDifference < value) {
            const index = (value-1) - daysDifference; // 30 days total, index from 0 to 29
            orderTotals[index] += parseFloat(order.courses_id[0].price);
          }
        });
      
        setOrderStatistical(orderTotals);
      
        const totalPriceByCourse: any = {};
      
        data.data.forEach((order: any) => {
          order.courses_id.forEach((course: any) => {
            const { _id, title, price, image, description } = course;
            if (!totalPriceByCourse[_id]) {
              totalPriceByCourse[_id] = { _id, title, image, description, totalPrice: 0 };
            }
            totalPriceByCourse[_id].totalPrice += price;
          });
        });
      
        const result = Object.values(totalPriceByCourse);
      
        setTopRevenua(result.sort((a: any, b: any) => b.totalPrice - a.totalPrice).slice(0, 3));
      }
      
    },
  });

  return (
    <>
      <DashboardView
        rechanrgeTotals={
          data !== undefined && data.status == 0
            ? data.rechanrgeTotals
            : [0, 0, 0, 0, 0, 0, 0]
        }
        withdrawTotals={
          data !== undefined && data.status == 0
            ? data.withdrawTotals
            : [0, 0, 0, 0, 0, 0, 0]
        }
        countUser={count !== undefined && count.status == 0 ? count.data : 0}
        orderStatistical={orderStatistical}
        topRevenua={topRevenua}
        topStar={topStar}
        handleChangeTabs={handleChangeTabs}
        value={value}
        valueTime={valueTime}
      />
    </>
  );
};

export default DashboardController;
