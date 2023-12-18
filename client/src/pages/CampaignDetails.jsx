import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();
  const {
    withdrwal,
    contract: contract_withdrawal,
    address: address_withdrawal,
  } = useStateContext();
  const {
    refund,
    contract: contract_refund,
    address: address_refund,
  } = useStateContext();
  const {
    reopen,
    contract: contract_reopen,
    address: address_3,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const remainingDays = daysLeft(state.deadline);

  var isOwner = false;
  if (state.owner === address) {
    isOwner = true;
  } else if (state.owner !== address) {
    isOwner = false;
  }

  var status = "";
  if (state.status === 0) {
    status = "Open";
  } else if (state.status === 1) {
    status = "Closed";
  } else if (state.status === 2) {
    status = "Refund";
  }

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);
    setIsLoading(false);
    console.log("Before navigation");
    navigate("/");
  };
  const handleRefund = async () => {
    setIsLoading(true);
    await refund(state.pId);
    setIsLoading(false);
    navigate("/");
  };
  const handleWithdrawal = async () => {
    setIsLoading(true);
    await withdrwal(state.pId);
    setIsLoading(false);
    navigate("/");
  };
  const handleReOpenFromRefund = async () => {
    setIsLoading(true);
    await reopen(state.pId);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex justify-center md:flex-row flex-col mt-10 gap-[30px] text-base-content font-epilogue font-bold text-[30px]">
        {state.title}
      </div>
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[500px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[15px] bg-neutral-content mt-3">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
          <CountBox title="Status" value={status} />
        </div>
      </div>
      {/* Manullay CountBox of campaign status*/}
      {/* <div className="flex flex-col items-center w-full mt-[10px]">
        <h4 className="font-epilogue font-bold text-[30px] text-base-content p-3 bg-base-300 rounded-t-[10px] w-full text-center truncate">
          {status}
        </h4>
        <p className="font-epilogue font-normal text-[16px] text-base-content bg-base-200 px-3 py-2 w-full rouned-b-[10px] text-center">
          Campaign Status
        </p>
      </div> */}
      {/* End Manullay CountBox */}
      <div className="mt-[30px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-base-content uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-accent cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-base-content break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-base-content">
                  Create By: {state.owner}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-base-content uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-base-content leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-base-content uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-base-content leading-[26px] break-ll">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-base-content leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-base-content leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-base-content uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-base-300 rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-base-content">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-base-content bg-transparent font-epilogue text-base-content text-[18px] leading-[30px] placeholder:text-base-content rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-base-100 rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-base-content">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-base-content">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles={
                  status === "Closed" || status === "Refund"
                    ? "w-full bg-gray-500"
                    : "w-full bg-secondary hover:bg-accent"
                }
                handleClick={
                  status === "Closed" || status === "Refund"
                    ? undefined
                    : handleDonate
                }
                disabled={status === "Closed" || status === "Refund"}
              />
            </div>
          </div>
        </div>
      </div>
      {isOwner && (
        <div>
          <h4 className="font-epilogue font-semibold text-[18px] mt-2 text-white uppercase">
            For Campaign Owner
          </h4>
          <div className="w-full mt-[10px]">
            <CustomButton
              btnType="button"
              title="Withdraw"
              styles={
                status === "Closed" ||
                status === "Refund" ||
                state.amountCollected <= 0
                  ? "w-full bg-gray-500"
                  : "w-full bg-[#B31312] hover:bg-[#FE0000]"
              }
              handleClick={
                status === "Closed" ||
                status === "Refund" ||
                state.amountCollected <= 0
                  ? undefined
                  : handleWithdrawal
              }
              disabled={status === "Closed" || status === "Refund"}
            />
          </div>
          <div className="w-full mt-[10px]">
            <CustomButton
              btnType="button"
              title="Refund to Donator"
              styles={
                status === "Closed" ||
                status === "Refund" ||
                state.amountCollected <= 0
                  ? "w-full bg-gray-500"
                  : "w-full bg-[#224B0C] hover:bg-[#379237]"
              }
              handleClick={
                status === "Closed" ||
                status === "Refund" ||
                state.amountCollected <= 0
                  ? undefined
                  : handleRefund
              }
              disabled={status === "Closed" || status === "Refund"}
            />
          </div>
          <div className="w-full mt-[10px]">
            <CustomButton
              btnType="button"
              title="Reopen the campaign"
              styles={
                status === "Closed" || status === "Open"
                  ? "w-full bg-gray-500"
                  : "w-full bg-[#224B0C] hover:bg-[#379237]"
              }
              handleClick={
                status === "Closed" || status === "Open"
                  ? undefined
                  : handleReOpenFromRefund
              }
              disabled={status === "Closed " || status === "Open"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
