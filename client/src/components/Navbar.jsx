import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton } from "./";
import { menu, search, thirdweb } from "../assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "cupcake"
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dracula");
    } else {
      setTheme("cupcake");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-base-200 rounded-[100px] text-base-content">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-base-content text-base-content bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-[20px] bg-green-500 flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-green-500" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "cupcake" ? false : true}
          />

          {/* sun icon */}
          <svg
            className="swap-on fill-primary w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-primary w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-accent flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <Link to="/">
          <svg
            viewBox="0 0 24 24"
            width="65"
            height="65"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0L9.798 1.266l-6 3.468L1.596 6v12l2.202 1.266 6.055 3.468L12.055 24l2.202-1.266 5.945-3.468L22.404 18V6l-2.202-1.266-6-3.468zM6 15.468V8.532l6-3.468 6 3.468v6.936l-6 3.468z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>
        <span className="font-bold text-[25px]">Crowdfunding</span>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-base-300 rounded-[20px] z-10 py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="menu menu-vertical w-full">
            <li>
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-house-door"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
                    fill="currentColor"
                  ></path>{" "}
                </svg>
                <span className="ml-[20px]">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 4.5C1 1.87479 1.02811 1 4.5 1C7.97189 1 8 1.87479 8 4.5C8 7.12521 8.01107 8 4.5 8C0.988927 8 1 7.12521 1 4.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4.5C12 1.87479 12.0281 1 15.5 1C18.9719 1 19 1.87479 19 4.5C19 7.12521 19.0111 8 15.5 8C11.9889 8 12 7.12521 12 4.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 15.5C1 12.8748 1.02811 12 4.5 12C7.97189 12 8 12.8748 8 15.5C8 18.1252 8.01107 19 4.5 19C0.988927 19 1 18.1252 1 15.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 15.5C12 12.8748 12.0281 12 15.5 12C18.9719 12 19 12.8748 19 15.5C19 18.1252 19.0111 19 15.5 19C11.9889 19 12 18.1252 12 15.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ml-[20px]">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="create-campaign">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1071_25627)">
                    <path
                      d="M17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1C16 3.949 13.417 5 11 5H4C2.93913 5 1.92172 5.42143 1.17157 6.17157C0.421427 6.92172 0 7.93913 0 9L0 11C0.00218416 11.5987 0.139462 12.1893 0.401603 12.7276C0.663743 13.2659 1.04399 13.7381 1.514 14.109L5.086 22.081C5.34004 22.6521 5.75417 23.1373 6.27827 23.4779C6.80237 23.8185 7.41396 23.9998 8.039 24C8.53631 23.9997 9.02565 23.875 9.46247 23.6373C9.89929 23.3996 10.2697 23.0564 10.54 22.639C10.8104 22.2215 10.972 21.7431 11.0103 21.2473C11.0485 20.7515 10.9621 20.2539 10.759 19.8L8.559 15H11C13.417 15 16 16.051 16 19C16 19.2652 16.1054 19.5196 16.2929 19.7071C16.4804 19.8946 16.7348 20 17 20C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0V0ZM8.937 20.619C9.00324 20.7686 9.03109 20.9323 9.01804 21.0954C9.005 21.2585 8.95145 21.4157 8.86227 21.5529C8.77309 21.69 8.65109 21.8027 8.50733 21.8808C8.36357 21.9589 8.20259 21.9999 8.039 22C7.80039 21.9998 7.56697 21.9304 7.36709 21.8001C7.1672 21.6698 7.00945 21.4842 6.913 21.266L4.105 15H6.359L8.937 20.619ZM16 14.6C14.5713 13.4992 12.8024 12.9331 11 13H4C3.46957 13 2.96086 12.7893 2.58579 12.4142C2.21071 12.0391 2 11.5304 2 11V9C2 8.46957 2.21071 7.96086 2.58579 7.58579C2.96086 7.21071 3.46957 7 4 7H11C12.8018 7.0683 14.5706 6.50403 16 5.405V14.6ZM23.9 15.452C23.8413 15.5696 23.7601 15.6744 23.6609 15.7606C23.5617 15.8467 23.4465 15.9125 23.3218 15.9541C23.1972 15.9957 23.0656 16.0123 22.9345 16.0031C22.8035 15.9938 22.6755 15.9588 22.558 15.9L20.558 14.9C20.3206 14.7814 20.1401 14.5735 20.0561 14.3218C19.972 14.0701 19.9915 13.7954 20.11 13.558C20.2286 13.3206 20.4365 13.1401 20.6882 13.0561C20.9399 12.972 21.2146 12.9914 21.452 13.11L23.452 14.11C23.6881 14.2285 23.8678 14.4356 23.9518 14.6861C24.0357 14.9366 24.0171 15.2102 23.9 15.447V15.452ZM20.11 6.452C20.0512 6.33448 20.0162 6.20653 20.0069 6.07546C19.9977 5.9444 20.0143 5.81279 20.0559 5.68816C20.0975 5.56353 20.1633 5.44832 20.2494 5.34912C20.3356 5.24991 20.4404 5.16866 20.558 5.11L22.558 4.11C22.7954 3.99145 23.0701 3.97205 23.3218 4.05606C23.5735 4.14008 23.7815 4.32063 23.9 4.558C24.0186 4.79537 24.038 5.07011 23.9539 5.32178C23.8699 5.57346 23.6894 5.78145 23.452 5.9L21.452 6.9C21.3345 6.95876 21.2065 6.99378 21.0755 7.00306C20.9444 7.01234 20.8128 6.99571 20.6882 6.9541C20.5635 6.9125 20.4483 6.84674 20.3491 6.76058C20.2499 6.67443 20.1687 6.56957 20.11 6.452V6.452ZM20 10C20 9.73478 20.1054 9.48043 20.2929 9.29289C20.4804 9.10536 20.7348 9 21 9H23C23.2652 9 23.5196 9.10536 23.7071 9.29289C23.8946 9.48043 24 9.73478 24 10C24 10.2652 23.8946 10.5196 23.7071 10.7071C23.5196 10.8946 23.2652 11 23 11H21C20.7348 11 20.4804 10.8946 20.2929 10.7071C20.1054 10.5196 20 10.2652 20 10Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1071_25627">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="ml-[20px]">Campaign</span>
              </Link>
            </li>
            <li>
              <Link to="/ranking">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                    fill="currentColor"
                  ></path>{" "}
                </svg>
                <span className="ml-[20px]">Ranking</span>
              </Link>
            </li>
            <li>
              <Link to="/withdraw">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1071_25635)">
                    <path
                      d="M4.46098 11H2.1C1.49249 11 1 10.5026 1 9.88889V2.11111C1 1.49746 1.49249 1 2.1 1H21.9C22.5075 1 23 1.49746 23 2.11111V9.88889C23 10.5026 22.5075 11 21.9 11H19.8207"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M19.4286 6H4.57143C4.25583 6 4 6.24551 4 6.54839V22.4516C4 22.7545 4.25583 23 4.57143 23H19.4286C19.7442 23 20 22.7545 20 22.4516V6.54839C20 6.24551 19.7442 6 19.4286 6Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 16.3794C15 16.8153 14.8949 17.2259 14.6848 17.6114C14.4825 17.9886 14.179 18.3029 13.7744 18.5543C13.3775 18.7973 12.9066 18.9398 12.3619 18.9817V20H11.6148V18.9691C10.8366 18.8937 10.2101 18.6423 9.73537 18.2149C9.2607 17.779 9.0156 17.1924 9 16.4549H10.751C10.7977 17.0583 11.0856 17.4229 11.6148 17.5486V15.1474C11.0545 14.9966 10.6031 14.8457 10.2607 14.6949C9.9183 14.544 9.62258 14.301 9.37358 13.9657C9.1245 13.6304 9 13.1737 9 12.5954C9 11.8663 9.24128 11.2713 9.72375 10.8103C10.214 10.3493 10.8443 10.0853 11.6148 10.0183V9H12.3619V10.0183C13.109 10.0853 13.7043 10.3284 14.1479 10.7474C14.5992 11.1665 14.8522 11.7447 14.9066 12.4823H13.144C13.1206 12.2393 13.0389 12.0297 12.8988 11.8537C12.7665 11.6693 12.5876 11.5394 12.3619 11.464V13.84C12.9455 13.9993 13.4047 14.1543 13.7393 14.3051C14.0817 14.4476 14.3774 14.6864 14.6264 15.0217C14.8755 15.3486 15 15.8011 15 16.3794ZM10.7043 12.5074C10.7043 12.784 10.7821 13.0103 10.9378 13.1863C11.0934 13.3539 11.3191 13.4922 11.6148 13.6011V11.4263C11.3346 11.4682 11.1128 11.5813 10.9494 11.7657C10.786 11.9501 10.7043 12.1973 10.7043 12.5074ZM12.3619 17.5737C12.6576 17.515 12.8872 17.3851 13.0506 17.184C13.2218 16.9829 13.3074 16.7398 13.3074 16.4549C13.3074 16.1783 13.2256 15.9562 13.0622 15.7886C12.8988 15.621 12.6654 15.4827 12.3619 15.3737V17.5737Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1071_25635">
                      <rect width="24" height="24" fill="currentColor" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="ml-[20px]">Withdraw</span>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="9"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M19 20C18.5871 18.8525 17.6773 17.8384 16.4117 17.1152C15.146 16.392 13.5953 16 12 16C10.4047 16 8.85398 16.392 7.58835 17.1152C6.32271 17.8384 5.41289 18.8525 5 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="ml-[20px]">Profile</span>
              </Link>
            </li>
            <li>
              <a>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 6.64513V5.551C5 3.43076 5 2.37064 5.67965 1.77328C6.35931 1.17591 7.41066 1.31197 9.51337 1.58408L16.77 2.52318C19.2611 2.84556 20.5067 3.00675 21.2533 3.85626C22 4.70577 22 5.9617 22 8.47356V15.5264C22 18.0383 22 19.2942 21.2533 20.1437C20.5067 20.9933 19.2611 21.1544 16.77 21.4768L9.51337 22.4159C7.41066 22.688 6.35931 22.8241 5.67965 22.2267C5 21.6294 5 20.5692 5 18.449V17.5726"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 12L15.8107 11.4145L16.2335 12L15.8107 12.5855L15 12ZM1 13C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11V13ZM11.4773 5.41451L15.8107 11.4145L14.1893 12.5855L9.85599 6.58549L11.4773 5.41451ZM15.8107 12.5855L11.4773 18.5855L9.85599 17.4145L14.1893 11.4145L15.8107 12.5855ZM15 13H1V11H15V13Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="ml-[20px]">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
