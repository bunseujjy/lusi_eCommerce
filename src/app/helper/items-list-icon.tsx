import { AiFillMessage } from "react-icons/ai";
import { CiShop } from "react-icons/ci";
import {
  FaGithubAlt,
  FaLocationDot,
  FaUserAstronaut,
  FaUserGroup,
  FaUserSecret,
} from "react-icons/fa6";
import {
  MdComputer,
  MdLightMode,
  MdOutlineSettings,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbUserDollar } from "react-icons/tb";

export const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <MdComputer className="pr-2" size={25} />,
  },
  {
    id: "product",
    label: "Product",
    path: "/admin/products",
    icon: <CiShop className="pr-2" size={25} />,
  },
  {
    id: "order",
    label: "Order",
    path: "/admin/orders",
    icon: <MdOutlineShoppingCartCheckout className="pr-2" size={25} />,
  },
  {
    id: "profile",
    label: "Profile",
    path: "/admin/profile",
    icon: <FaUserSecret className="pr-2" size={25} />,
  },
  {
    id: "user",
    label: "User",
    path: "/admin/user",
    icon: <FaUserAstronaut className="pr-2" size={25} />,
  },
  {
    id: "customers",
    label: "Customers",
    path: "/admin/customers",
    icon: <TbUserDollar className="pr-2" size={25} />,
  },
  {
    id: "error",
    label: "Error",
    path: "/admin/error",
  },
];

export const smSideabar = [
  {
    id: "profile",
    label: "My Profile",
    path: "/admin/profile",
    icon: <FaUserGroup />,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/admin/settings",
    icon: <MdOutlineSettings />,
  },
  {
    id: "message",
    label: "Message",
    path: "/admin/message",
    icon: <AiFillMessage />,
  },
  {
    id: "darkmode",
    label: "Light/Dark",
    path: "",
    icon: <ThemeSwitch />,
  },
  {
    id: "github",
    label: "Github",
    path: "https://github.com/bunseujjy",
    icon: <FaGithubAlt />,
  },
  {
    id: "logout",
    label: "Logout",
    path: "/admin/logout",
    icon: <RiLogoutCircleRLine />,
  },
];

import { FaCat, FaHands, FaLeaf } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import ThemeSwitch from "@/components/ui/ThemeButton";

export const storyItems = [
  {
    icon: <FaHands />,
    title: "Ethics and equality",
    description:
      "Pellentesque quam convallis massa enim, faucibus ornare sollicitudin gravida justo sit suspendisse pellentesque.",
  },
  {
    icon: <FaLeaf />,
    title: "Eco-design",
    description:
      "Risus leo molestie a aliquam amet urna orci nisl dignissim elementum nibh felis ultrices vitae consectetur.",
  },
  {
    icon: <FaCat />,
    title: "Wildlife Preservation",
    description:
      "Pellentesque nunc ante augue adipiscing sed suspendisse amet sed pellentesque convallis erat nibh vivamus.",
  },
];

export const contactItems = [
  {
    icon: <IoMdPhonePortrait />,
    title: "Products & order",
    info: "(+855) 123-456-7890",
    br: "available 24/7",
  },
  {
    icon: <IoMdPhonePortrait />,
    title: "Info & enquiries",
    info: "(+855) 123-456-7890",
    br: "available 24/7",
  },
  {
    icon: <FaLocationDot />,
    title: "Store locator",
    info: "Find our retail near you",
  },
];
