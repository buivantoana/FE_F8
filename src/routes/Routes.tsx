import PrivateRouter from "@/components/PrivateRouter";
import LayoutAdmin from "@/components/layouts/LayoutAdmin";
import LayoutWebsite from "@/components/layouts/LayoutWebsite";
import { useLocalStorage } from "@/hooks/useStorage";
import CategoriesController from "@/pages/admin/categories/CategoriesController";
import CoursesController from "@/pages/admin/courses/CoursesController";
import LessonController from "@/pages/admin/lesson/LessonController";
import PermissionController from "@/pages/admin/permission/PermissionController";
import PostController from "@/pages/admin/post/PostController";
import RoleController from "@/pages/admin/role/RoleController";
import RolePermissionController from "@/pages/admin/role_permission/RolePermissionController";
import SubLessonController from "@/pages/admin/sublesson/SubLessonController";
import UserController from "@/pages/admin/user/UserController";

import DetailBlogController from "@/pages/client/detail_blog/DetailBlogController";
import DetailCourseController from "@/pages/client/detail_course/DetailCourseController";
import FeaturedArticleController from "@/pages/client/featured_article/FeaturedArticleController";
import HomeController from "@/pages/client/home/HomeController";
import LearningController from "@/pages/client/learning/LearningController";
import LearningRoadmapController from "@/pages/client/learning_roadmap/LearningRoadmapController";
import MyArticleController from "@/pages/client/my_article/MyArticleController";
import PageNotFound from "@/pages/client/page_not_found/PageNotFound";
import ProfileController from "@/pages/client/profile/ProfileController";
import SettingProfileController from "@/pages/client/setting_profile/SettingProfileController";
import WiteBlogPostController from "@/pages/client/wite_blog_post/WiteBlogPostController";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Information from "@/pages/client/cv/Information";
import CvController from "@/pages/client/cv/CvController";
import MyWalletController from "@/pages/client/my_wallet/MyWalletController";
import WalletController from "@/pages/admin/wallet/WalletController";
import CoursesClient from "@/pages/client/courses/CoursesController";
import { useCoursesContext } from "@/App";
import CommentControllerAdmin from "@/pages/admin/comment/CommentController";
import ContactController from "@/pages/admin/contact/ContactController";
import DashboardController from "@/pages/admin/dashboard/DashboardController";
import PrivateRouterAdmin from "@/components/PrivateRouterAdmin";
import VouchersController from "@/pages/admin/vouchers/VouchersController";
import UserVouchersController from "@/pages/admin/user_vouchers/UserVouchersController";
import MyCoursesController from "@/pages/client/my_courses/MyCoursesController";
import CourseBuyerController from "@/pages/admin/CourseBuyer/CourseBuyerController";
const Router = () => {
  const context: any = useCoursesContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route path='' element={<HomeController />} />
          <Route path='courses/:id' element={<DetailCourseController />} />
          <Route
            path='learning_roadmap'
            element={<LearningRoadmapController />}
          />
          <Route path='article' element={<FeaturedArticleController />} />
          <Route path='posts' element={<WiteBlogPostController />} />
          <Route path='courses' element={<CoursesClient />} />
          <Route
            path='profile'
            element={
              <PrivateRouter user={context.state.user}>
                <ProfileController />
              </PrivateRouter>
            }
          />
          <Route
            path='my_article'
            element={
              <PrivateRouter user={context.state.user}>
                <MyArticleController />
              </PrivateRouter>
            }
          />
          <Route
            path='setting'
            element={
              <PrivateRouter user={context.state.user}>
                <SettingProfileController />
              </PrivateRouter>
            }
          />
          <Route
            path='my_wallet'
            element={
              <PrivateRouter user={context.state.user}>
                <MyWalletController />
              </PrivateRouter>
            }
          />
          <Route
            path='my_courses'
            element={
              <PrivateRouter user={context.state.user}>
                <MyCoursesController />
              </PrivateRouter>
            }
          />
          <Route path='/detail_blog/:id' element={<DetailBlogController />} />
          <Route path='/cv' element={<CvController />} />
        </Route>
        <Route
          path='/learning/:id'
          element={
            <PrivateRouter user={context.state.user}>
              <LearningController />
            </PrivateRouter>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRouterAdmin>
              <LayoutAdmin />
            </PrivateRouterAdmin>
          }>
          <Route path='' element={<DashboardController />} />
          <Route path='courses' element={<CoursesController />} />
          <Route path='lesson' element={<LessonController />} />
          <Route path='sublesson' element={<SubLessonController />} />
          <Route path='vouchers' element={<VouchersController />} />
          <Route path='user_vouchers' element={<UserVouchersController />} />
          <Route path='categories' element={<CategoriesController />} />
          <Route path='post' element={<PostController />} />
          <Route path='role' element={<RoleController />} />
          <Route path='permission' element={<PermissionController />} />
          <Route
            path='role_permission'
            element={<RolePermissionController />}
          />
          <Route path='user' element={<UserController />} />
          <Route path='wallet' element={<WalletController />} />
          <Route path='course_buyers' element={<CourseBuyerController />} />
          <Route path='comment' element={<CommentControllerAdmin />} />
          <Route path='contact' element={<ContactController />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
