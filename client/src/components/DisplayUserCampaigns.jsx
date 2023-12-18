import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { loader } from "../assets";

const DisplayUserCampaigns = ({
  isLoading,
  createdCampaigns,
  donatedCapaigns,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (createdCampaigns) => {
    navigate(`/campaign-details/${createdCampaigns.title}`, {
      state: createdCampaigns,
    });
  };
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-base-content text-left">
        Your Created Campaigns ({createdCampaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && createdCampaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-base-content">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          createdCampaigns.length > 0 &&
          createdCampaigns.map((createdCampaigns) => (
            <FundCard
              key={uuidv4()}
              {...createdCampaigns}
              handleClick={() => handleNavigate(createdCampaigns)}
            />
          ))}
      </div>

      <h1 className="font-epilogue font-semibold text-[18px] text-base-content text-left mt-[15px]">
        Your Donated Campaigns ({donatedCapaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && donatedCapaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-base-content">
            You have not donated any campigns yet
          </p>
        )}

        {!isLoading &&
          donatedCapaigns.length > 0 &&
          donatedCapaigns.map((donatedCapaigns) => (
            <FundCard
              key={uuidv4()}
              {...donatedCapaigns}
              handleClick={() => handleNavigate(donatedCapaigns)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayUserCampaigns;
