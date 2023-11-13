

import Home from "../../pages/Home";
import About from "../../pages/about";
import{
    home,
    about 
}from "../pathName";


const authRoutes = [
    {
      title: "home",
      component: Home,
      path: home,
    },
    {
      title: "about",
      component: About,
      path: about,
    },

  ];
  
  export default authRoutes;