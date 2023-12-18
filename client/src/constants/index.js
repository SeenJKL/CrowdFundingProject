import {
  createCampaign,
  dashboard,
  logout,
  profile,
  withdraw,
  home,
  ranking,
} from "../assets";

export const navlinks = [
  {
    name: "home",
    imgUrl: home,
    link: "/",
  },
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/dashboard",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "ranking",
    imgUrl: ranking,
    link: "/ranking",
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/withdraw",
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: true,
  },
];
