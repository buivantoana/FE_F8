import React from 'react';
import { useLocalStorage } from "@/hooks/useStorage";
import { Navigate, useLocation } from "react-router-dom";

const rolePermissions:any = {
    admin: [
        '/dashboard',
        '/dashboard/courses',
        '/dashboard/categories',
        '/dashboard/post',
        '/dashboard/comment',
        '/dashboard/contact',
        '/dashboard/vouchers',
        '/dashboard/user_vouchers'
    ],
    course_management: [
        '/dashboard/courses',
        '/dashboard/categories',
        '/dashboard/lesson',
        '/dashboard/sublesson',
        '/dashboard/vouchers'
    ],
    interaction_management: [
        '/dashboard/post',
        '/dashboard/comment',
        '/dashboard/contact'
    ]
};

const defaultRedirects:any = {
    course_management: '/dashboard/courses',
    interaction_management: '/dashboard/post'
};

const PrivateRouterAdmin = ({ children }: any) => {
    const [user] = useLocalStorage("user", {});
    const location = useLocation();

    const currentPath = location.pathname;

    if (Object.keys(user).length === 0) {
        return <Navigate to="/" />;
    }

    const allowedPaths = rolePermissions[user.data[0].role] || [];

    if (user.data[0].role === 'admin' || allowedPaths.includes(currentPath)) {
        return <>{children}</>;
    }

    const redirectTo = defaultRedirects[user.data[0].role] || '/';

    return <Navigate to={redirectTo} />;
};

export default PrivateRouterAdmin;
