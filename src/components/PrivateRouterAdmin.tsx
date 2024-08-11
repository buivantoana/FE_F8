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
}
