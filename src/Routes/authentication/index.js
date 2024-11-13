import Signup from "../../pages/signup";
import Login from "../../pages/login";
import Home from "../../pages/home";
import { signup, login, home } from "../pathName";

const authRoutes = [
  {
    title: "signup",
    component: Signup,
    path: signup,
  },
  {
    title: "login",
    component: Login,
    path: login,
  },
  {
    title: "home",
    component: Home,
    path: home,
  },

];

export default authRoutes;