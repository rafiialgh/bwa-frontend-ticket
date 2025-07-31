import CustomerSignIn from "@/pages/CustomerSignIn";
import CustomerSignUp from "@/pages/CustomerSignUp";
import type { RouteObject } from "react-router-dom";

const customerRoutes: RouteObject[] = [
  {
    path: '/sign-up',
    element: <CustomerSignUp />
  },
  {
    path: '/sign-in',
    element: <CustomerSignIn />
  }
]

export default customerRoutes;