import { Box, Grid, Skeleton, Typography } from "@mui/material";
import Product from "./Product";

const ProductList = ({
  title,
  type,
  data,
  progress,
}: {
  title: string;
  type?: string;
  data?: any;
  progress?: any;
}) => {
  let checkRegisterCourses =
    progress &&
    progress.length &&
    progress.map((item: any) => item.courses_id[0]);

  return (
    <Box mt={"20px"} pr={"40px"}>
      <Typography fontSize={30} fontWeight={"bold"}>
        {title}
      </Typography>
      <Grid container mt={"3px"} spacing={3}>
        {data.length>0 ? (
          <>
            {data &&
              data.length &&
              data.map((item: any) => {
                let check = false;
                if (progress && progress[0]) {
                  check = checkRegisterCourses.includes(item._id);
                }

                return (
                  <Grid item xs={12} sm={6} md={3}>
                    <Product type={type} check={check} item={item} />
                  </Grid>
                );
              })}
          </>
        ) : (
          <>
            {Array.from({ length: 4 }, (value, index) => (
              <Grid item xs={12} sm={6} md={3}>
                <Box >
                  <Skeleton variant="rectangular" sx={{borderRadius:"18px"}} height={"228px"}  />
                  <Box>
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                </Box>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
