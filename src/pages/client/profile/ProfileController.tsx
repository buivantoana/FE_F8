import { useQuery } from "react-query";
import ProfileView from "./ProfileView"
import { getMyCourses } from "@/service/courses";
import { useLocalStorage } from "@/hooks/useStorage";


const ProfileController = () => {
  const [user, setUser] = useLocalStorage("user", {});
  const { data: courses } = useQuery("detail", {
    queryFn: () => {
      return getMyCourses(user.data[0]._id);
    },
  });
  console.log(courses);
  return (
    <><ProfileView user={user.data} courses={courses?.status==0&&courses.data} /></>
  )
}

export default ProfileController