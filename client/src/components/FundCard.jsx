import { React, useState } from "react";

import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  status,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  var statusString = "";
  if (status === 0) {
    statusString = "Open";
  } else if (status === 1) {
    statusString = "Closed";
  } else if (status === 2) {
    statusString = "Refund";
  }

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-base-200 cursor-pointer hover:bg-base-300 FundCard"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-base-content">
            Education
          </p>
        </div>
        <div className="relative">
          <h3 className="font-epilogue font-semibold text-[16px] text-base-content text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-base-content text-left leading-[18px] truncate">
            {description}
          </p>
          <h3 className="font-epilogue font-semibold text-[16px] text-base-content text-left leading-[26px] truncate">
            Status
          </h3>
          <p
            className={`mt-[5px] font-epilogue font-normal text-left leading-[18px] truncate text-base-content`}
          >
            {statusString}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-base-content leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-base-content sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-base-content leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-base-content sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-base-content truncate">
            by <span className="text-base-content">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
