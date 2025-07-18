import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import NotFound from "../pages/AllErrorPages/NotFound";
import Home from "../pages/Home/Home";
import Login from "../pages/Authenticationpages/Login";
import Register from "../pages/Authenticationpages/Register";

// protected routes
import PrivateRoute from "../ProtectedRoutes/PrivateRoute";
import AdminRoute from "../ProtectedRoutes/AdminRoute";
import TeacherRoute from "../ProtectedRoutes/TeacherRoute";
import StudentRoute from "../ProtectedRoutes/StudentRoute";

// Dashboard Pages
import TeacherRequests from "../pages/Dashboard/AdminDashboard/TeacherRequests";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import ManageClasses from "../pages/Dashboard/AdminDashboard/ManageClasses";
import AdminProfile from "../pages/Dashboard/AdminDashboard/AdminProfile";
import Forbidden from "../components/shared/Forbidden";
import MyEnrollClasses from "../pages/Dashboard/StudentDashboard/MyEnrollClasses";
import StudentProfile from "../pages/Dashboard/StudentDashboard/StudentProfile";
import AddClass from "../pages/Dashboard/TeacherDashboard/AddClass";
import TeacherProfile from "../pages/Dashboard/TeacherDashboard/TeacherProfile";
import MyClasses from "../pages/Dashboard/TeacherDashboard/MyClasses";
import UpdateClass from "../pages/Dashboard/TeacherDashboard/UpdateClass";
import ClassDetails from "../pages/Dashboard/TeacherDashboard/ClassDetails ";
import AllClasses from "../pages/AllClasses/AllClasses";
import PrivateRouteUser from "../ProtectedRoutes/PrivateRouteUser";
import ClassInfo from "../pages/AllClasses/ClassInfo";
import Payment from "../pages/payment/Payment";

export const router = createBrowserRouter([
  /*======================
      Mani layout
      Public Routes - Root
  ========================*/
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "allclass",
        Component: AllClasses,
      },
      {
        path: "allclass/class/:id",
        element: (
          <PrivateRouteUser>
            <ClassInfo></ClassInfo>
          </PrivateRouteUser>
        ),
      },

      {
        path: "payment/:id",
        element: <Payment></Payment>,
      },
    ],
  },

  /*======================
    Authentication Routes
  ========================*/

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },

  /*======================
    // Dashboard Layout (Protected)
  ========================*/
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      /*================ Admin routes============ */
      // {
      //   path: "admin-home",
      //   element: (
      //     <AdminRoute>
      //       <AdminHome />
      //     </AdminRoute>
      //   ),
      // },

      {
        path: "teacher-requests",
        element: (
          <AdminRoute>
            <TeacherRequests />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },

      /*================Teacher routes============ */
      // Teacher routes
      {
        path: "teacher/add-class",
        element: (
          <TeacherRoute>
            <AddClass />
          </TeacherRoute>
        ),
      },
      {
        path: "teacher/my-class",
        element: (
          <TeacherRoute>
            <MyClasses />
          </TeacherRoute>
        ),
      },
      {
        path: "update-class/:id",
        element: (
          <TeacherRoute>
            <UpdateClass></UpdateClass>
          </TeacherRoute>
        ),
      },
      {
        path: "my-class/:id",
        element: (
          <TeacherRoute>
            <ClassDetails></ClassDetails>
          </TeacherRoute>
        ),
      },
      {
        path: "teacher/profile",
        element: (
          <TeacherRoute>
            <TeacherProfile />
          </TeacherRoute>
        ),
      },

      /*================Student routes============ */
      // Student routes
      {
        path: "my-enroll-classes",
        element: (
          <StudentRoute>
            <MyEnrollClasses></MyEnrollClasses>
          </StudentRoute>
        ),
      },
      {
        path: "student-profile",
        element: (
          <StudentRoute>
            <StudentProfile></StudentProfile>
          </StudentRoute>
        ),
      },
    ],
  },
]);
