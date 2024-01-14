import { IoMdStats } from "react-icons/io";
import { MdAdsClick } from "react-icons/md";
import { GrRestaurant } from "react-icons/gr";
import { IoLayersSharp } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";

export const navlinks = [{ name: "Dashboard", link: "/dashboard" }];

export const navItems = [
  { id: 1, name: "Your Profile", link: "/dashboard" },
  { id: 2, name: "Home", link: "/" },
  { id: 3, name: "Sign out", link: null },
];

export const DashItems = [
  {
    id: 1,
    name: "Menus",
    icon: <GrRestaurant className="w-8 h-8" />,
    desc: "Customize your restaurant's menus, categories, and individual items",
    link: "/menus",
    active: true,
  },
  {
    id: 2,
    name: "Feedback",
    icon: <IoLayersSharp className="w-8 h-8" />,
    desc: "Foster a dialogue with your customers: Listen, learn, and grow together",
    link: "/feedback",
    active: false,
  },
  {
    id: 3,
    name: "Promotions",
    icon: <MdAdsClick className="w-8 h-8" />,
    desc: "Boost sales by showcasing featured dishes and limited-time offers",
    link: "/banners",
    active: true,
  },
  {
    id: 4,
    name: "Insights",
    icon: <IoMdStats className="w-8 h-8" />,
    desc: "Simple insights, powerful results: Understand what your customers want and deliver.",
    link: "/stats",
    active: false,
  },
  {
    id: 5,
    name: "Payment",
    icon: <RiSecurePaymentLine className="w-8 h-8" />,
    desc: "Unlock control, unlock growth. Powerful payments, seamless management.",
    link: "/payment",
    active: false,
  },
];

export const shops = [
  //70
  {
    id: 1,
    name: "The Bombay Canteen",
    about: "Good sample code is often the best documentatione",
    location: "Mumbai",
    phonenumber: "+918048968911",
    email: "email@gmail.com",
    country: "india",
  },
  {
    id: 2,
    name: "Sienna Store & Café",
    about: "Good sample code is often the best documentatione",
    location: "Kolkata",
    phonenumber: "+918048968911",
    email: "email@gmail.com",
    country: "india",
  },
  {
    id: 3,
    name: "Veronica's",
    about: "Good sample code is often the best documentatione",
    location: "Mumbai",
    phonenumber: "+918048968911",
    email: "email@gmail.com",
    country: "india",
  },
  {
    id: 4,
    name: "Indian Accent",
    about: "Good sample code is often the best documentatione",
    location: "New Delhi",
    phonenumber: "+918048968911",
    email: "email@gmail.com",
    country: "india",
  },
  {
    id: 5,
    name: "Bomras",
    about: "Good sample code is often the best documentatione",
    location: "Goa",
    phonenumber: "+918048968911",
    email: "email@gmail.com",
    country: "india",
  },
];
